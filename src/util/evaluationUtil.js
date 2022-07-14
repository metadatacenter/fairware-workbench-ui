/**
 * Common Utilities
 */
import {
    ISSUE_TYPE_MISSING_OPTIONAL_VALUE,
    ISSUE_TYPE_MISSING_OPTIONAL_VALUE_MSG,
    ISSUE_TYPE_MISSING_REQUIRED_VALUE,
    ISSUE_TYPE_MISSING_REQUIRED_VALUE_MSG
} from "../constants";

export function translateIssueType(issueType) {
    if (issueType === ISSUE_TYPE_MISSING_REQUIRED_VALUE) return ISSUE_TYPE_MISSING_REQUIRED_VALUE_MSG;
    else if (issueType === ISSUE_TYPE_MISSING_OPTIONAL_VALUE) return ISSUE_TYPE_MISSING_OPTIONAL_VALUE_MSG;
    else {
        console.error("Invalid issue type: " + issueType);
    }
}

export function handleEvaluationResults(state, action) {
    const metadataIndex = action.metadataIndex;
    const actionType = action.type;
    const evaluationResult = getOrCreateEvaluationResult(state, metadataIndex);
    if (actionType === 'UPDATE_METADATA_ARTIFACT') {
        evaluationResult.metadataArtifact = action.data;
    } else if (actionType === 'UPDATE_METADATA_SPECIFICATION') {
        evaluationResult.metadataSpecification = action.data;
    } else if (actionType === 'UPDATE_ALIGNMENT_REPORT') {
        evaluationResult.alignmentReport = action.data;
    } else if (actionType === 'UPDATE_EVALUATION_REPORT') {
        evaluationResult.evaluationReport = action.data;
    } else if (actionType === 'UPDATE_RECOMMENDATION_REPORT') {
        evaluationResult.recommendationReport = action.data;
    } else if (actionType === 'UPDATE_METADATA_PATCH') {
        const issueIndex = action.issueIndex;
        const issueItem = evaluationResult.evaluationReport.evaluationReportItems[issueIndex];
        issueItem.patches = action.data;
    } else if (actionType === 'UPDATE_FIELD_ALIGNMENT') {
        const alignmentIndex = action.alignmentIndex;
        const fieldAlignments = evaluationResult.alignmentReport.fieldAlignments;
        fieldAlignments.splice(alignmentIndex, 1, action.data);
    }
    return state;
}

function getOrCreateEvaluationResult(state, index) {
    if (typeof state[index] === 'undefined') {
        state[index] = {
            metadataArtifact: {},
            metadataSpecification: {},
            alignmentReport: {},
            evaluationReport: {},
            recommendationReport: {}
        }
    }
    return state[index];
}

export function getEvaluationReportWithPatches(evaluationReport) {
    evaluationReport.evaluationReportItems
        .forEach((reportItem) => {
            Object.assign(reportItem, {patches: []});
            const metadataIssue = reportItem.metadataIssue;
            const issueCategory = metadataIssue.issueCategory;
            const issueLocation = metadataIssue.issueLocation;
            const valueSuggestions = reportItem.repairAction.valueSuggestions;
            let valueSuggestion = ""
            if (valueSuggestions.length !== 0) {
                valueSuggestion = valueSuggestions[0]
            }
            if (issueCategory === "VALUE_ERROR") {
                reportItem.patches.push({
                    op: "replace",
                    path: "/" + issueLocation,
                    value: valueSuggestion
                })
            } else if (issueCategory === "FIELD_ERROR") {
                reportItem.patches.push({
                    op: "move",
                    from: "/" + issueLocation,
                    path: "/" + valueSuggestion
                })
                reportItem.patches.push({
                    op: "remove",
                    path: "/" + issueLocation
                })
            }
        })
    return evaluationReport;
}

