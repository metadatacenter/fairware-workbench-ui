import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";

export default function IssueItem({metadataRecord, metadataIndex, evaluationReport}) {
    const issueDetails = evaluationReport.issueDetails;
    const issueLocation = issueDetails.issueLocation;
    const issueCategory = issueDetails.issueCategory;
    const issueType = issueDetails.issueType;
    const repairAction = evaluationReport.repairAction;
    const valueSuggestions = repairAction.valueSuggestions;
    const patches = evaluationReport.patches;
    debugger
    const oldValue = metadataRecord[issueLocation];
    let oldValueRepresentation = JSON.stringify(oldValue);

    let suggestedValue = "";
    if (issueCategory === "VALUE_ERROR") {
        suggestedValue = patches[0].value;
    } else if (issueCategory === "FIELD_ERROR") {
        suggestedValue = patches[0].path;
    }

    // function handleValueChange(event) {
    //     const repairedMetadata = [...metadataState];
    //     const metadataIndex = event.target.dataset.idx
    //     const metadataRecord = repairedMetadata[metadataIndex]["metadataRecord"];
    //     const issueLocation = event.target.className;
    //     const metadataTemplateFields = repairedMetadata[metadataIndex]["metadataSpecification"]["templateFieldNames"];
    //     const expectedDataType = metadataTemplateFields[issueLocation];
    //     let userInput = event.target.value;
    //     if (expectedDataType === 'number') {
    //         userInput = parseInt(userInput);
    //     }
    //     // _.set(metadataRecord, issueLocation + ".replacedBy", userInput);
    //     setMetadataState(repairedMetadata);
    // }

    function handleValueClicked(event) {
        const inputElement = document.getElementById(`input-${metadataIndex}.${issueLocation}`);
        const value = event.target.innerHTML;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
        ).set;
        nativeInputValueSetter.call(inputElement, value);
        const inputEvent = new Event("input", {bubbles: true});
        inputElement.dispatchEvent(inputEvent);
    }

    let suggestionList;
    if (valueSuggestions != null && valueSuggestions.length > 1) {
        suggestionList = (
            <div style={{paddingTop: "2em"}}><b>Value suggestions</b>:
                <ul style={{marginTop: "0"}}>
                    {valueSuggestions.map((valueSuggestion, index) => (
                        <li>
                            <div key={`suggestion-${index}`}
                                 style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}
                                 onClick={handleValueClicked}>{valueSuggestion}</div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    let fieldName = issueLocation;
    if (issueCategory === "FIELD_ERROR") {
        fieldName = <span style={{color: "red"}}>{issueLocation}</span>
    }
    let fieldValue = oldValueRepresentation;
    if (issueCategory === "VALUE_ERROR") {
        fieldValue = <span style={{color: "red"}}>{oldValueRepresentation}</span>
    }
    return (<TableRow>
            <TableCell align="center">{fieldName}</TableCell>
            <TableCell align="center">{fieldValue}</TableCell>
            <TableCell align="center">{issueType}</TableCell>
            <TableCell>
                <div>
                    <div><input style={{float: "left", width: "100%"}}
                                id={`input-${metadataIndex}.${issueLocation}`}
                                type="text"
                                data-idx={metadataIndex}
                                className={issueLocation}
                                value={suggestedValue}>
                    </input></div>
                    {suggestionList}
                </div>
            </TableCell>
        </TableRow>
    )
}