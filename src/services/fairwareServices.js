import {FAIRWARE_METADATA_EVALUATE_URL, FAIRWARE_METADATA_SEARCH_URL} from "../constants";

/**
 * Functions to access the FAIRware REST API
 */

/**
 * Search metadata by URI
 * @param dois A list of uris
 * @constructor
 */
export function searchMetadataByDois(uris) {
  console.log('searching: ', uris);
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
      console.log('response ok');
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
  console.log("records", metadataRecords);
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
    //console.log("requestOptions", requestOptions);
    requests.push(
      fetch(url, requestOptions)
        .then(response => response.json()));
  });
  return Promise.all(requests);
};