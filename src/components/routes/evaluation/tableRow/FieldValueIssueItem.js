import React from "react";
import _ from "lodash";
import Chip from "@mui/material/Chip";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import EllipsisText from "../../../common/EllipsisText";

export default function FieldValueIssueItem(props) {

    const fieldName = props.fieldName
    let fieldValue = props.fieldValue;
    const metadataIndex = props.metadataIndex;
    const issueIndex = props.issueIndex;
    const evaluationReportItem = props.evaluationReportItem;
    const dispatch = props.dispatch;

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

    let chipColor = "primary";
    let issueTypeChipComponent;
    let suggestedRepairFieldComponent;
    if (!_.isEmpty(evaluationReportItem)) {
        chipColor = "error";
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
        const suggestedValue = patches[0].value;
        const valueSuggestions = evaluationReportItem.repairAction.valueSuggestions;
        if (valueSuggestions.length <= 1) {
            suggestedRepairFieldComponent = (
                <TextField style={{backgroundColor: "#ffffff"}}
                           fullWidth
                           size="small"
                           defaultValue={suggestedValue}
                           onChange={handleInputTextChange}/>
            )
        } else {
            suggestedRepairFieldComponent = (
                <Autocomplete disablePortal
                              options={valueSuggestions}
                              defaultValue={suggestedValue}
                              getOptionLabel={(value) => value.split("|")[1]}
                              size="small"
                              onChange={handleInputAutocompleteChange}
                              renderInput={(params) =>
                                  <TextField style={{backgroundColor: "#ffffff"}}
                                             fullWidth {...params} />
                              }/>
            );
        }
    }

    if (typeof (fieldValue) === 'object') {
        if (fieldValue === null) {
            return (
                <TableRow style={{backgroundColor: "#f4f4f4"}}>
                    <TableCell>
                        <TextField
                            fullWidth
                            style={{backgroundColor: "#ffffff"}}
                            size="small"/>
                    </TableCell>
                    <TableCell style={{fontSize: 16}} align="center">{issueTypeChipComponent}</TableCell>
                    <TableCell style={{fontSize: 16}}>{suggestedRepairFieldComponent}</TableCell>
                </TableRow>
            )
        } else {
            return (<></>);
        }
    } else {
        if (typeof (fieldValue) === "string" && fieldValue.includes("|")) {
            fieldValue = fieldValue.split("|")[1];
        }
        return (
            <TableRow style={{backgroundColor: "#f4f4f4"}}>
                <TableCell>
                    <TextField
                        fullWidth
                        style={{backgroundColor: "#ffffff"}}
                        size="small"
                        InputProps={{
                            startAdornment: <Chip style={{fontSize: 16, maxWidth: 600}}
                                                  color={chipColor}
                                                  label={<EllipsisText
                                                      maxWidth={"40rem"}>{JSON.stringify(fieldValue)}</EllipsisText>}
                                                  title={JSON.stringify(fieldValue)}/>,
                        }}
                    />
                </TableCell>
                <TableCell style={{fontSize: 16}} align="center">{issueTypeChipComponent}</TableCell>
                <TableCell style={{fontSize: 16}}>{suggestedRepairFieldComponent}</TableCell>
            </TableRow>
        );
    }
}