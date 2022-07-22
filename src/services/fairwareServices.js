import {
    FAIRWARE_METADATA_ALIGN_URL,
    FAIRWARE_METADATA_EVALUATE_URL,
    FAIRWARE_METADATA_SEARCH_URL,
    FAIRWARE_TEMPLATE_RECOMMEND_URL
} from "../constants";
import {countUniqueArrayMember} from "../util/commonUtil";

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));

// TODO: Remove this
export function searchMetadataByDois(uris) {
    let url = FAIRWARE_METADATA_SEARCH_URL;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(uris)
    };
    return fetch(url, requestOptions).then(response => {
        // Check if the request is 200
        if (response.ok) {
            let data = response.json();
            return data;
        }
        return Promise.reject(response);
    });
};

export async function recommendMetadataTemplate(metadataRecordId) {
    let url = FAIRWARE_TEMPLATE_RECOMMEND_URL;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: metadataRecordId
    }
    return await fetch(url, requestOptions)
        .then(response => {
            let result = {};
            if (response.ok) {
                result = response.json();
            }
            return result;
        });
}

export async function alignMetadataFields(metadataId, templateId) {
    let url = FAIRWARE_METADATA_ALIGN_URL;
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'metadataId': metadataId,
            'templateId': templateId
        })
    };
    return await fetch(url, requestOptions)
        .then(response => {
            let result = {};
            if (response.ok) {
                result = response.json();
            }
            return result;
        });
}

export async function searchMetadataInBatch(metadataRecordIds) {
    let url = FAIRWARE_METADATA_SEARCH_URL;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        }
    };
    let results = [];
    for (let i = 0; i < metadataRecordIds.length; i++) {
        await delay();
        requestOptions.body = metadataRecordIds[i];
        const res = await fetch(url, requestOptions)
            .then(response => {
                let result = {};
                if (response.ok) {
                    result = response.json();
                }
                return result;
            });
        results.push(res);
    }
    return results;
}

export async function evaluateMetadata(metadataId, templateId, fieldAlignments) {
    let url = FAIRWARE_METADATA_EVALUATE_URL;
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({
                metadataId: metadataId,
                templateId: templateId,
                fieldAlignments: fieldAlignments
            })
    };
    return await fetch(url, requestOptions)
        .then(response => {
            let result = {};
            if (response.ok) {
                result = response.json();
            }
            return result;
        });
}

export async function evaluateMetadataInBatch(metadataRecordIds, cedarTemplateId) {
    let url = FAIRWARE_METADATA_EVALUATE_URL;
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let results = [];
    for (let i = 0; i < metadataRecordIds.length; i++) {
        await delay();
        requestOptions.body = JSON.stringify({
            metadataId: metadataRecordIds[i],
            templateId: cedarTemplateId
        });
        const res = await fetch(url, requestOptions)
            .then(response => {
                let result = {};
                if (response.ok) {
                    result = response.json();
                }
                return result;
            });
        results.push(res);
    }
    return results;
}

export function generateSummaryReport(evaluationResults) {
    let recordsReportDetails = [];
    const nonEmptyEvaluationResults = evaluationResults.filter((result) => "evaluationReport" in result);
    for (let i = 0; i < nonEmptyEvaluationResults.length; i++) {
        const evaluationResult = nonEmptyEvaluationResults[i];
        const evaluationReport = evaluationResult.evaluationReport;
        const metadataArtifact = evaluationResult.metadataArtifact;
        const metadataSpecification = evaluationResult.metadataSpecification;
        const requiredFields = metadataSpecification.templateFields.filter((field => field.isRequired));
        const evaluationReportItems = evaluationReport.evaluationReportItems;
        const valueErrorReportItemsOnly = evaluationReportItems
            .filter((item) => item.metadataIssue.issueCategory === "VALUE_ERROR"
                && item.metadataIssue.issueLevel === "ERROR");
        const fieldsWithMissingRequiredValue = valueErrorReportItemsOnly
            .filter((item) => item.metadataIssue.issueType === "MISSING_REQUIRED_VALUE")
            .map((item) => item.metadataIssue.issueLocation);
        const issueTypes = [
            "EXPECTING_INPUT_STRING",
            "EXPECTING_INPUT_NUMBER",
            "INVALID_DATE_TIME_FORMAT",
            "INVALID_DATE_FORMAT",
            "INVALID_TIME_FORMAT",
            "INVALID_NUMBER_FORMAT",
            "VALUE_NOT_ONTOLOGY_TERM"
        ]
        const fieldsWithInvalidValue = valueErrorReportItemsOnly
            .filter((item) => issueTypes.indexOf(item.metadataIssue.issueType) !== -1)
            .map((item) => item.metadataIssue.issueLocation);
        const metadataRecord = metadataArtifact.metadataRecord;
        const fieldsWithNonEmptyValue = Object.keys(metadataRecord)
            .filter((key) => metadataRecord[key] != null || metadataRecord[key] !== "");

        recordsReportDetails.push({
            metadataId: metadataArtifact.metadataId,
            metadataName: metadataArtifact.metadataName,
            totalFieldsCount: metadataArtifact.metadataFields.length,
            requiredFieldsCount: requiredFields.length,
            fieldsWithMissingRequiredValueCount: countUniqueArrayMember(fieldsWithMissingRequiredValue),
            fieldsWithNonEmptyValueCount: countUniqueArrayMember(fieldsWithNonEmptyValue),
            fieldsWithInvalidValueCount: countUniqueArrayMember(fieldsWithInvalidValue)
        });
    }

    const metadataSpecification = nonEmptyEvaluationResults[0].metadataSpecification;
    const templateFields = metadataSpecification.templateFields.map((field) => field.name);
    const requiredFields = metadataSpecification.templateFields
        .filter((field) => field.isRequired)
        .map((field) => field.name);
    nonEmptyEvaluationResults
        .map((result) => result.evaluationReport.evaluationReportItems).flat()
        .filter((item) => item.metadataIssue.issueCategory === "VALUE_ERROR"
            && item.metadataIssue.issueLevel === "ERROR");
    const fieldReportDetails = {}
    templateFields.forEach((templateField) => {
        let inputCount = 0;
        let errorCount = 0;
        nonEmptyEvaluationResults.forEach((result) => {
            const foundAlignment = result.alignmentReport.fieldAlignments
                .filter((alignment) => alignment.templateFieldPath === templateField);
            if (foundAlignment.length === 1) {
                const metadataField = foundAlignment[0].metadataFieldPath;
                const metadataRecord = result.metadataArtifact.metadataRecord
                if (metadataField in metadataRecord && !!metadataRecord[metadataField]) {
                    inputCount = inputCount + 1;
                }
                const errorOccurrences = result.evaluationReport.evaluationReportItems
                    .filter((item) => item.metadataIssue.issueLocation === metadataField)
                    .filter((item) => item.metadataIssue.issueType !== "MISSING_REQUIRED_VALUE")
                    .filter((item) => item.metadataIssue.issueType !== "MISSING_OPTIONAL_VALUE");
                if (errorOccurrences.length > 0) {
                    errorCount = errorCount + 1;
                }
            }
            fieldReportDetails[templateField] = {
                inputCount: inputCount,
                errorCount: errorCount,
                isRequiredField: requiredFields.indexOf(templateField) !== -1
            };
        });
    });
    const sortedFieldReportDetails = Object.entries(fieldReportDetails)
        .sort(([, a], [, b]) => (b.errorCount - a.errorCount) * 10 + b.inputCount - a.inputCount)
        .reduce((r, [k, v]) => ({...r, [k]: v}), {});

    return {
        templateName: metadataSpecification.templateName,
        templateUrl: metadataSpecification.templateUrl,
        totalMetadata: nonEmptyEvaluationResults.length,
        completenessAndConformanceReport: {
            byRecords: {
                completeness: {
                    totalRecords: recordsReportDetails.length,
                    recordsWithMissingRequiredValuesCount: recordsReportDetails
                        .filter((details) => details.fieldsWithMissingRequiredValueCount > 0)
                        .length
                },
                conformance: {
                    totalRecords: recordsReportDetails.length,
                    recordsWithInvalidValuesCount: recordsReportDetails
                        .filter((details) => details.fieldsWithInvalidValueCount > 0)
                        .length,
                },
                recordsReportDetails: recordsReportDetails
            },
            byFields: {
                fieldReportDetails: sortedFieldReportDetails
            }
        }
    }
}