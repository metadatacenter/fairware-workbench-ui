import {
    FAIRWARE_TEMPLATE_RECOMMEND_URL,
    FAIRWARE_METADATA_EVALUATE_URL,
    FAIRWARE_METADATA_SEARCH_URL,
    FAIRWARE_METADATA_SUMMARY_REPORT_URL
} from "../constants";

const delay = (ms = 100) => new Promise(r => setTimeout(r, ms));

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

// TODO: Remove this
export function evaluateMetadata(metadataRecords) {
    let url = FAIRWARE_METADATA_EVALUATE_URL;
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let requests = [];
    metadataRecords.forEach(function (record) {
        requestOptions.body = JSON.stringify({
            metadataRecordId: record.uri,
            templateId: record.schemaId
        });
        requests.push(
            fetch(url, requestOptions)
                .then(response => response.json()));
    });
    return Promise.all(requests);
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

export function generateSummaryReport(searchResults) {
    console.log('sr', searchResults.items);
    let projectionResults = projectMetadataAndTemplateId(searchResults);
    console.log('projectionResults', projectionResults);
    let url = FAIRWARE_METADATA_SUMMARY_REPORT_URL;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'evaluateMetadataRequests': projectionResults})
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

/*** Helper functions ***/

function projectMetadataAndTemplateId(searchResults) {
    let projectionResults = [];
    for (let i = 0; i < searchResults.items.length; i++) {
        projectionResults.push({
            'metadataRecordId': searchResults.items[i]['uri'],
            'templateId': searchResults.items[i]['schemaId']
        });
    }
    return projectionResults;
};














