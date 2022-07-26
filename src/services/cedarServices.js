import {CEDAR_TEMPLATE_INSTANCE_URL} from "../constants";

export async function createTemplateInstance(templateInstance, cedarApiKey) {
    let url = CEDAR_TEMPLATE_INSTANCE_URL;
    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'apiKey ' + cedarApiKey
        },
        body: JSON.stringify(templateInstance)
    };
    return await fetch(url, requestOptions)
        .then(response => {
            let result = {};
            if (response.ok) {
                result = response.json();
            }
            return result;
        });
}