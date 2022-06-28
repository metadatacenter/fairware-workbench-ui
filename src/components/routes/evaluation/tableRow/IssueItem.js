import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

export default function IssueItem({issueIndex, metadataRecord, metadataIndex, evaluationReport}) {
    const issueDetails = evaluationReport.issueDetails;
    const issueLocation = issueDetails.issueLocation;
    const issueCategory = issueDetails.issueCategory;
    const issueType = issueDetails.issueType;
    const repairAction = evaluationReport.repairAction;
    const valueSuggestions = repairAction.valueSuggestions;
    const patches = evaluationReport.patches;
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

    let suggestedRepairField;
    if (valueSuggestions.length == 1) {
        suggestedRepairField = (
            <TextField style={{backgroundColor: "#ffffff"}}
                       fullWidth
                       defaultValue={suggestedValue}/>
        )
    } else {
        suggestedRepairField = (
            <Autocomplete disablePortal
                          options={valueSuggestions}
                          defaultValue={suggestedValue}
                          renderInput={(params) =>
                              <TextField style={{backgroundColor: "#ffffff"}}
                                         fullWidth {...params} />
                          }/>
        );
    }

    let textColor = "#000000";
    let fieldName = issueLocation;
    if (issueCategory === "FIELD_ERROR") {
        textColor = "#ff0000";
    }
    let chipColor = "primary";
    let fieldValue = oldValueRepresentation;
    if (issueCategory === "VALUE_ERROR") {
        chipColor = "error"
    }
    let rowColor = "#ffffff";
    if (issueIndex % 2 == 1) {
        rowColor = "#f4f4f4";
    }
    return (
        <TableRow>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">
                <span style={{color: textColor}}>{fieldName}</span>
            </TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">
                <Chip style={{fontSize: 16}}
                      color={chipColor}
                      label={fieldValue}
                      size="small"/>
            </TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">{issueType}</TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}}>{suggestedRepairField}</TableCell>
        </TableRow>
    )
}