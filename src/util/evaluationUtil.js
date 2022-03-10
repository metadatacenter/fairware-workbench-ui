/**
 * Common Utilities
 */
import {
  ISSUE_TYPE_MISSING_OPTIONAL_VALUE, ISSUE_TYPE_MISSING_OPTIONAL_VALUE_MSG,
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

