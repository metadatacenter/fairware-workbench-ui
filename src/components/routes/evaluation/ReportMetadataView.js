import React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import FieldNameIssueItem from "./tableRow/FieldNameIssueItem";
import FieldValueIssueItem from "./tableRow/FieldValueIssueItem";

export default function ReportMetadataView(props) {

    const metadataIndex = props.index;
    const metadataRecord = props.metadataRecord;
    const evaluationReport = props.evaluationReport;
    const dispatch = props.dispatch;

    return (
        <TableContainer className={"table"} style={{marginBottom: "5vh"}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className="header" width="25%">METADATA</TableCell>
                        <TableCell className="header" width="25%">ISSUE</TableCell>
                        <TableCell className="header" width="30%">SUGGESTED REPAIR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(metadataRecord).map((fieldName) => {
                        const fieldValue = metadataRecord[fieldName];
                        const evaluationReportItems = evaluationReport.evaluationReportItems;

                        let issueIndex = 0;
                        let fieldNameEvaluationReport;
                        let fieldValueEvaluationReport;
                        for (; issueIndex < evaluationReportItems.length; issueIndex++) {
                            const reportItem = evaluationReportItems[issueIndex];
                            const issueLocation = reportItem.metadataIssue.issueLocation;
                            const issueCategory = reportItem.metadataIssue.issueCategory;
                            if (issueLocation === fieldName && issueCategory === "FIELD_ERROR") {
                                fieldNameEvaluationReport = reportItem;
                                break;
                            } else if (issueLocation === fieldName && issueCategory === "VALUE_ERROR") {
                                fieldValueEvaluationReport = reportItem;
                                break;
                            }
                        }
                        return (
                            <>
                                <FieldNameIssueItem fieldName={fieldName}
                                                    metadataIndex={metadataIndex}
                                                    issueIndex={issueIndex}
                                                    evaluationReportItem={fieldNameEvaluationReport}
                                                    dispatch={dispatch}/>
                                <FieldValueIssueItem fieldName={fieldName}
                                                     fieldValue={fieldValue}
                                                     metadataIndex={metadataIndex}
                                                     issueIndex={issueIndex}
                                                     evaluationReportItem={fieldValueEvaluationReport}
                                                     dispatch={dispatch}/>
                            </>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}