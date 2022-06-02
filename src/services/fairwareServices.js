import {
  FAIRWARE_METADATA_EVALUATE_URL,
  FAIRWARE_METADATA_SEARCH_URL,
  FAIRWARE_METADATA_SUMMARY_REPORT_URL
} from "../constants";

/**
 * Functions to access the FAIRware REST API
 */

/**
 * Search metadata by URI
 * @param dois A list of uris
 * @constructor
 */
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

/**
 * Place Statistics - All
 * @param dois A list of DOIs
 * @constructor
 */
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

export function evaluateMetadataInBatch(metadataRecordIds, cedarTemplateId) {
  let url = FAIRWARE_METADATA_EVALUATE_URL;
  let requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  let requests = [];
  metadataRecordIds.forEach(function (metadataRecordId) {
    requestOptions.body = JSON.stringify({
      metadataRecordId: metadataRecordId,
      templateId: cedarTemplateId
    });
    requests.push(
        fetch(url, requestOptions)
            .then(response => response.json()));
  });
  return Promise.all(requests);
}

/**
 * Generate summary report
 * @param
 * @constructor
 */
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
    body: JSON.stringify({'evaluateMetadataRequests' : projectionResults})
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
  for (let i=0; i<searchResults.items.length; i++) {
    projectionResults.push({
        'metadataRecordId': searchResults.items[i]['uri'],
        'templateId': searchResults.items[i]['schemaId']
      });
  }
  return projectionResults;
};














