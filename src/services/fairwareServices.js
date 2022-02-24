import {FAIRWARE_METADATA_SEARCH_URL} from "../constants";

/**
 * Functions to access the FAIRware REST API
 */

/**
 * Place Statistics - All
 * @param dois A list of DOIs
 * @constructor
 */
export function searchMetadataByDois(dois) {
  console.log('searching: ', dois);
  let url = FAIRWARE_METADATA_SEARCH_URL;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dois)
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