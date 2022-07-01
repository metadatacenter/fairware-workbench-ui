import React from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import FieldNameIssueItem from "./tableRow/FieldNameIssueItem";
import FieldValueIssueItem from "./tableRow/FieldValueIssueItem";

export default function ReportMetadataView({metadataRecord, metadataEvaluationResult}) {

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
                    {Object.keys(metadataRecord).map((fieldName) => {
                        const fieldValue = metadataRecord[fieldName];
                        const fieldNameEvaluationReport = metadataEvaluationResult.evaluationReport.evaluationReportItems
                            .find((evaluationReport) => evaluationReport.issueDetails.issueLocation === fieldName
                                && evaluationReport.issueDetails.issueCategory === "FIELD_ERROR");
                        const fieldValueEvaluationReport = metadataEvaluationResult.evaluationReport.evaluationReportItems
                            .find((evaluationReport) => evaluationReport.issueDetails.issueLocation === fieldName
                                && evaluationReport.issueDetails.issueCategory === "VALUE_ERROR");
                        return (
                            <>
                                <FieldNameIssueItem fieldName={fieldName}
                                                    evaluationReport={fieldNameEvaluationReport}/>
                                <FieldValueIssueItem fieldValue={fieldValue}
                                                     evaluationReport={fieldValueEvaluationReport}/>
                            </>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}