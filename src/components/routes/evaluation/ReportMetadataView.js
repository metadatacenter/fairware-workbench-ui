import React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

export default function ReportMetadataView({metadataRecord, metadataIndex, metadataEvaluationResult}) {

    return (

        <TableContainer className={"table"}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize: 18}} align="center" width="25%">METADATA</TableCell>
                        <TableCell style={{fontSize: 18}} align="center" width="25%">ISSUE</TableCell>
                        <TableCell style={{fontSize: 18}} align="center" width="30%">SUGGESTED REPAIR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(metadataRecord).map((fieldName, issueIndex) => {
                        const value = metadataRecord[fieldName];
                        const issue = metadataEvaluationResult.evaluationReport.evaluationReportItems
                            .filter((item) => item.issueDetails.issueLocation === fieldName);
                        let issueType = "";
                        let chipColor = "primary";
                        let suggestedRepairField;
                        if (issue.length != 0) {
                            issueType = issue[0].issueDetails.issueType;
                            const issueCategory = issue[0].issueDetails.issueCategory;
                            const patches = issue[0].patches;
                            chipColor = "error";

                            let suggestedValue = "";
                            if (issueCategory === "VALUE_ERROR") {
                                suggestedValue = patches[0].value;
                            } else if (issueCategory === "FIELD_ERROR") {
                                suggestedValue = patches[0].path;
                            }

                            const valueSuggestions = issue[0].repairAction.valueSuggestions;
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
                        }
                        if (typeof (value) === 'object') {
                            return (<></>);
                        } else {
                            return (
                                <>
                                    <TableRow>
                                        <TableCell style={{fontSize: 16}}>{fieldName}</TableCell>
                                        <TableCell style={{fontSize: 16}}></TableCell>
                                        <TableCell style={{fontSize: 16}}></TableCell>
                                    </TableRow>
                                    <TableRow style={{backgroundColor: "#f4f4f4"}}>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                style={{backgroundColor: "#ffffff"}}
                                                size="small"
                                                InputProps={{
                                                    startAdornment: <Chip style={{fontSize: 16}}
                                                                          color={chipColor}
                                                                          size="small"
                                                                          label={JSON.stringify(metadataRecord[fieldName])}/>,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: 16}} align="center">{issueType}</TableCell>
                                        <TableCell style={{fontSize: 16}}>{suggestedRepairField}</TableCell>
                                    </TableRow>
                                </>
                            );
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}