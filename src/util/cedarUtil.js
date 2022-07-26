/**
 * CEDAR Utilities
 */
export function generateCedarContext(templateFields) {
    let context = {
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "pav": "http://purl.org/pav/",
        "schema": "http://schema.org/",
        "oslc": "http://open-services.net/ns/core#",
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "rdfs:label": {
            "@type": "xsd:string"
        },
        "schema:isBasedOn": {
            "@type": "@id"
        },
        "schema:name": {
            "@type": "xsd:string"
        },
        "schema:description": {
            "@type": "xsd:string"
        },
        "pav:derivedFrom": {
            "@type": "@id"
        },
        "pav:createdOn": {
            "@type": "xsd:dateTime"
        },
        "pav:createdBy": {
            "@type": "@id"
        },
        "pav:lastUpdatedOn": {
            "@type": "xsd:dateTime"
        },
        "oslc:modifiedBy": {
            "@type": "@id"
        },
        "skos:notation": {
            "@type": "xsd:string"
        }
    };
    templateFields.forEach((templateField) => {
        const fieldName = templateField.name;
        context[fieldName] = templateField.schemaIri;
    });
    return context;
}

export function generateCedarTemplateInstance(metadataSpecification, alignmentReport, patchedMetadata) {
    const templateFields = metadataSpecification.templateFields;
    let cedarTemplateInstance = {
        "@context": generateCedarContext(templateFields)
    };
    templateFields.forEach((templateField) => {
        const templateFieldName = templateField.name;
        const metadataFieldName = getMetadataFieldName(templateFieldName, alignmentReport);
        const metadataValue = patchedMetadata[metadataFieldName];
        if (templateField.useVocabulary) {
            if (typeof metadataValue === "undefined") {
                cedarTemplateInstance[templateFieldName] = {};
            } else {
                let termId = "http://www.example.org/feature-not-implemented";
                let termLabel = metadataValue;
                if (metadataValue.includes("|")) {
                    const metadataValueSplit = metadataValue.split("|");
                    termId = metadataValueSplit[0];
                    termLabel = metadataValueSplit[1];
                }
                cedarTemplateInstance[templateFieldName] = {
                    "@id": termId,
                    "rdfs:label": termLabel
                };
            }
        } else {
            if (typeof metadataValue === "undefined") {
                cedarTemplateInstance[templateFieldName] = {
                    "@value": null
                };
            } else {
                cedarTemplateInstance[templateFieldName] = {
                    "@value": metadataValue + ""
                };
            }
            const dataType = templateField.dataType;
            if (dataType !== "xsd:string") {
                cedarTemplateInstance[templateFieldName]["@type"] = dataType;
            }
        }
    })
    cedarTemplateInstance["schema:isBasedOn"] = metadataSpecification.templateId;
    cedarTemplateInstance["schema:name"] = metadataSpecification.templateName + " metadata";
    cedarTemplateInstance["schema:description"] = "";
    return cedarTemplateInstance;
}

function getMetadataFieldName(templateFieldName, alignmentReport) {
    let metadataFieldName = templateFieldName;
    const foundMetadataFieldName = alignmentReport.fieldAlignments
        .filter((alignment => alignment.templateFieldPath === templateFieldName))
        .map(alignment => alignment.metadataFieldPath);
    if (foundMetadataFieldName.length === 1) {
        metadataFieldName = foundMetadataFieldName[0];
    }
    return metadataFieldName;
}