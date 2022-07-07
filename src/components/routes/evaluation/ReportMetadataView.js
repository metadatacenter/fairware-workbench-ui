import React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import FieldNameIssueItem from "./tableRow/FieldNameIssueItem";
import FieldValueIssueItem from "./tableRow/FieldValueIssueItem";

export default function ReportMetadataView({metadataIndex, metadataRecord, evaluationReport}) {

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
                        const fieldNameEvaluationReport = evaluationReport.evaluationReportItems
                            .find((reportItem) => reportItem.metadataIssue.issueLocation === fieldName
                                && reportItem.metadataIssue.issueCategory === "FIELD_ERROR");
                        const fieldValueEvaluationReport = evaluationReport.evaluationReportItems
                            .find((reportItem) => reportItem.metadataIssue.issueLocation === fieldName
                                && reportItem.metadataIssue.issueCategory === "VALUE_ERROR");
                        return (
                            <>
                                <FieldNameIssueItem fieldName={fieldName}
                                                    evaluationReportItem={fieldNameEvaluationReport}/>
                                <FieldValueIssueItem fieldValue={fieldValue}
                                                     evaluationReportItem={fieldValueEvaluationReport}/>
                            </>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}