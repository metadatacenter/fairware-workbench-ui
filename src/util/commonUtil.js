/**
 * Common Utilities
 */

export function removeDuplicates(array) {
  return [...new Set(array)];
};

export function truncate(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

export function shortenUrl(url) {
  if (url.length > 50) {
    let end = url.slice(url.length - 16);
    let start = url.substr(0, 16);
    return start + '...' + end;
  }
  else {
    return url;
  }
}