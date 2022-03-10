import {isCedarUri, isCedarTemplateInstanceUri, isCedarTemplateUri} from "./cedarUtil";
import {CEDAR_EDIT_TEMPLATE_BASE_URI, CEDAR_EDIT_TEMPLATE_INSTANCE_BASE_URI, DOI_BASE_URI} from "../constants";

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
};

export function shortenUrl(url) {
  if (url.length > 50) {
    let end = url.slice(url.length - 16);
    let start = url.substr(0, 16);
    return start + '...' + end;
  }
  else {
    return url;
  }
};

export function generateHref(uri) {
  if (isCedarTemplateUri(uri)) {
    return CEDAR_EDIT_TEMPLATE_BASE_URI + uri;
  }
  else if (isCedarTemplateInstanceUri(uri)) {
    return CEDAR_EDIT_TEMPLATE_INSTANCE_BASE_URI + uri;
  }
  else if (!uri.startsWith("http") && !uri.startsWith("https")) {
    return DOI_BASE_URI + uri;
  }
  else {
    return uri;
  }
}