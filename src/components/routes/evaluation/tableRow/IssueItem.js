import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

export default function IssueItem({issueIndex, metadataRecord, metadataIndex, evaluationReport}) {
    const issueDetails = evaluationReport.issueDetails;
    const issueLocation = issueDetails.issueLocation;
    const issueCategory = issueDetails.issueCategory;
    const issueType = issueDetails.issueType;
    const issueLevel = issueDetails.issueLevel;
    const repairAction = evaluationReport.repairAction;
    const valueSuggestions = repairAction.valueSuggestions;
    const patches = evaluationReport.patches;
    const oldValue = metadataRecord[issueLocation];
    let oldValueRepresentation = JSON.stringify(oldValue);

    let issueTypeChip;
    if (issueLevel === "ERROR") {
        issueTypeChip = <Chip icon={<ErrorIcon/>} label={issueType} color="error"/>
    } else if (issueLevel === "WARNING") {
        issueTypeChip = <Chip icon={<WarningIcon/>} label={issueType} color="warning"/>
    } else {
        issueTypeChip = <Chip label={issueType}/>
    }

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
    if (valueSuggestions.length === 1) {
        suggestedRepairField = (
            <TextField style={{backgroundColor: "#ffffff"}}
                       fullWidth
                       size="small"
                       defaultValue={suggestedValue}/>
        )
    } else {
        suggestedRepairField = (
            <Autocomplete disablePortal
                          options={valueSuggestions}
                          defaultValue={suggestedValue}
                          size="small"
                          renderInput={(params) =>
                              <TextField style={{backgroundColor: "#ffffff"}}
                                         fullWidth {...params} />
                          }/>
        );
    }

    let fieldNameColor = "#000000";
    let fieldName = issueLocation;
    if (issueCategory === "FIELD_ERROR") {
        fieldNameColor = "#ff0000";
    }
    let fieldValueColor = "#000000";
    let fieldValue = oldValueRepresentation;
    if (issueCategory === "VALUE_ERROR") {
        fieldValueColor = "#ff0000"
    }
    let rowColor = "#ffffff";
    if (issueIndex % 2 === 1) {
        rowColor = "#f4f4f4";
    }
    return (
        <TableRow>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">
                <span style={{color: fieldNameColor}}>{fieldName}</span>
            </TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">
                <span style={{color: fieldValueColor}}>{fieldValue}</span>
            </TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">{issueTypeChip}</TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}}>{suggestedRepairField}</TableCell>
        </TableRow>
    )
}