import React from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer";
import FieldErrorListItem from "./tableRow/FieldErrorListItem";
import ValueErrorListItem from "./tableRow/ValueErrorListItem";

export default function ReportListView(props) {

    const metadataIndex = props.index;
    const metadataRecord = props.metadataRecord;
    const evaluationReport = props.evaluationReport;
    const dispatch = props.dispatch;

    return (
        <TableContainer className="table">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className="header">FIELD NAME</TableCell>
                        <TableCell className="header">FIELD VALUE</TableCell>
                        <TableCell className="header">ISSUE</TableCell>
                        <TableCell className="header" width="30%">SUGGESTED REPAIR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {evaluationReport.evaluationReportItems
                        .map((reportItem, index) => {
                            const issueCategory = reportItem.metadataIssue.issueCategory;
                            const fieldName = reportItem.metadataIssue.issueLocation;
                            const fieldValue = metadataRecord[fieldName];
                            if (issueCategory === 'FIELD_ERROR') {
                                return <FieldErrorListItem key={`field-error-list-item-${index}`}
                                                           metadataIndex={metadataIndex}
                                                           issueIndex={index}
                                                           fieldName={fieldName}
                                                           fieldValue={fieldValue}
                                                           evaluationReport={reportItem}
                                                           dispatch={dispatch}/>
                            } else if (issueCategory === 'VALUE_ERROR') {
                                return <ValueErrorListItem key={`value-error-list-item-${index}`}
                                                           metadataIndex={metadataIndex}
                                                           issueIndex={index}
                                                           fieldName={fieldName}
                                                           fieldValue={fieldValue}
                                                           evaluationReport={reportItem}
                                                           dispatch={dispatch}/>
                            }
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}