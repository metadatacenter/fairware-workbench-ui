/**
 * Common Utilities
 */

export function removeDuplicates(array) {
  return [...new Set(array)];
}

export function countUniqueArrayMember(array) {
  return removeDuplicates(array).length;
}

export function shortenMetadataId(metadataId) {
  if (isValidHttpUrl(metadataId)) {
    return metadataId.substring(metadataId.lastIndexOf('/') + 1);
  } else {
    return metadataId;
  }
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}