/*** General ***/
export const DOI_BASE_URI = "https://doi.org/";

/*** FAIRware Constants ***/
const FAIRWARE_API_BASE_URL = "https://api.fairware.metadatacenter.org/";
export const FAIRWARE_TEMPLATE_RECOMMEND_URL = FAIRWARE_API_BASE_URL + "template/recommend"
export const FAIRWARE_METADATA_ALIGN_URL = FAIRWARE_API_BASE_URL + "metadata/align";
export const FAIRWARE_METADATA_SEARCH_URL = FAIRWARE_API_BASE_URL + "metadata/search";
export const FAIRWARE_METADATA_EVALUATE_URL = FAIRWARE_API_BASE_URL + "metadata/evaluate";
export const FAIRWARE_METADATA_SUMMARY_REPORT_URL = FAIRWARE_API_BASE_URL + "metadata/report";

export const ISSUE_TYPE_MISSING_REQUIRED_VALUE = "MISSING_REQUIRED_VALUE";
export const ISSUE_TYPE_MISSING_REQUIRED_VALUE_MSG = "Missing required value";
export const ISSUE_TYPE_MISSING_OPTIONAL_VALUE = "MISSING_OPTIONAL_VALUE";
export const ISSUE_TYPE_MISSING_OPTIONAL_VALUE_MSG = "Missing optional value";

export const ISSUE_LEVEL_ERROR = "ERROR";
export const ISSUE_LEVEL_WARNING = "WARNING";


/*** CEDAR Constants ***/
export const CEDAR_REPO_SERVER_BASE = "https://repo.metadatacenter.org/";
export const CEDAR_EDIT_TEMPLATE_BASE_URI = "https://cedar.metadatacenter.org/templates/edit/";
export const CEDAR_EDIT_TEMPLATE_INSTANCE_BASE_URI = "https://cedar.metadatacenter.org/instances/edit/";

export const CEDAR_TEMPLATES_STR = "templates/";
export const CEDAR_TEMPLATE_INSTANCES_STR = "template-instances/";

export const CEDAR_API_BASE_URL = "https://resource.metadatacenter.org/";
export const CEDAR_TEMPLATE_INSTANCE_URL = CEDAR_API_BASE_URL + "template-instances";
