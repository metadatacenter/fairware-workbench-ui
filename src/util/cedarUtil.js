/**
 * CEDAR Utilities
 */
import {CEDAR_REPO_SERVER_BASE, CEDAR_TEMPLATE_INSTANCES_STR, CEDAR_TEMPLATES_STR} from "../constants";

export function isCedarUri(uri) {
  return uri.startsWith(CEDAR_REPO_SERVER_BASE);
}

export function isCedarTemplateInstanceUri(uri) {
  return isCedarUri(uri) && uri.includes(CEDAR_TEMPLATE_INSTANCES_STR);
}

export function isCedarTemplateUri(uri) {
  return isCedarUri(uri) && uri.includes(CEDAR_TEMPLATES_STR);
}