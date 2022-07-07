import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import _ from "lodash";
import Chip from "@mui/material/Chip";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function FieldNameIssueItem({fieldName, evaluationReportItem}) {

    let issueTypeChipComponent;
    let suggestedRepairFieldComponent;
    if (!_.isEmpty(evaluationReportItem)) {
        const issueType = evaluationReportItem.metadataIssue.issueType;
        const issueLevel = evaluationReportItem.metadataIssue.issueLevel;
        if (issueLevel === "ERROR") {
            issueTypeChipComponent = <Chip icon={<ErrorIcon/>} label={issueType} color="error"/>
        } else if (issueLevel === "WARNING") {
            issueTypeChipComponent = <Chip icon={<WarningIcon/>} label={issueType} color="warning"/>
        } else {
            issueTypeChipComponent = <Chip label={issueType}/>
        }

        const patches = evaluationReportItem.patches;
        const suggestedValue = patches[0].path.slice(1);
        const valueSuggestions = evaluationReportItem.repairAction.valueSuggestions;
        if (valueSuggestions.length === 1) {
            suggestedRepairFieldComponent = (
                <TextField style={{backgroundColor: "#ffffff"}}
                           fullWidth
                           size="small"
                           defaultValue={suggestedValue}/>
            )
        } else {
            suggestedRepairFieldComponent = (
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
    }

    if (typeof (fieldValue) === 'object') {
        return (<></>);
    } else {
        return (
            <TableRow>
                <TableCell style={{fontSize: 16}}>{fieldName}</TableCell>
                <TableCell style={{fontSize: 16}} align="center">{issueTypeChipComponent}</TableCell>
                <TableCell style={{fontSize: 16}}>{suggestedRepairFieldComponent}</TableCell>
            </TableRow>

        );
    }
}