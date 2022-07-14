import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

export default function ValueErrorListItem(props) {

    const metadataIndex = props.metadataIndex;
    const issueIndex = props.issueIndex;
    const fieldName = props.fieldName;
    const fieldValue = props.fieldValue;
    const evaluationReport = props.evaluationReport;
    const dispatch = props.dispatch;

    const metadataIssue = evaluationReport.metadataIssue;
    const issueType = metadataIssue.issueType;
    const issueLevel = metadataIssue.issueLevel;
    const repairAction = evaluationReport.repairAction;
    const valueSuggestions = repairAction.valueSuggestions;
    const patches = evaluationReport.patches;

    const fieldNameComponent = getFieldNameComponent(fieldName);
    const fieldValueComponent = getFieldValueComponent(JSON.stringify(fieldValue));
    const issueTypeChipComponent = getIssueTypeChipComponent(issueLevel, issueType);
    const repairFieldComponent = getRepairFieldComponent(valueSuggestions, patches);

    function handleInputTextChange(event) {
        handleValueChange(event.target.value);
    }

    function handleInputAutocompleteChange(event, value) {
        handleValueChange(value);
    }

    function handleValueChange(value) {
        dispatch({
            type: 'UPDATE_METADATA_PATCH',
            metadataIndex: metadataIndex,
            issueIndex: issueIndex,
            data: [{
                op: "replace",
                path: "/" + fieldName,
                value: value
            }]
        })
    }

    function getFieldNameComponent(fieldName) {
        return (
            <span>{fieldName}</span>
        );
    }

    function getFieldValueComponent(fieldValue) {
        return (
            <span style={{color: "#ff0000"}}>{fieldValue}</span>
        )
    }

    function getIssueTypeChipComponent(issueLevel, issueTypeString) {
        let issueTypeChip;
        if (issueLevel === "ERROR") {
            issueTypeChip = <Chip icon={<ErrorIcon/>} label={issueTypeString} color="error"/>
        } else if (issueLevel === "WARNING") {
            issueTypeChip = <Chip icon={<WarningIcon/>} label={issueTypeString} color="warning"/>
        } else {
            issueTypeChip = <Chip label={issueTypeString}/>
        }
        return issueTypeChip;
    }

    function getRepairFieldComponent(valueSuggestions, patches) {
        let repairField;
        const repairValue = getRepairValue(patches);
        if (valueSuggestions.length === 1) {
            repairField = (
                <TextField style={{backgroundColor: "#ffffff"}}
                           fullWidth
                           size="small"
                           defaultValue={repairValue}
                           onChange={handleInputTextChange}/>
            )
        } else {
            repairField = (
                <Autocomplete disablePortal
                              options={valueSuggestions}
                              defaultValue={repairValue}
                              size="small"
                              onChange={handleInputAutocompleteChange}
                              renderInput={(params) =>
                                  <TextField style={{backgroundColor: "#ffffff"}}
                                             fullWidth {...params} />
                              }/>
            );
        }
        return repairField;
    }

    function getRepairValue(patches) {
        return patches[0].value;
    }

    const rowColor = (issueIndex % 2 === 1) ? "#f4f4f4" : "#ffffff";
    return (
        <TableRow>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">{fieldNameComponent}</TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">{fieldValueComponent}</TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}} align="center">{issueTypeChipComponent}</TableCell>
            <TableCell style={{fontSize: 16, backgroundColor: rowColor}}>{repairFieldComponent}</TableCell>
        </TableRow>
    )
}