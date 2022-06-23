import React from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer";
import IssueItem from "./tableRow/IssueItem";

export default function ReportListView({metadataRecord, metadataIndex, metadataEvaluationResult}) {

    return (
        <TableContainer className={"table"}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="25%">FIELD NAME</TableCell>
                        <TableCell align="center" width="25%">FIELD VALUE</TableCell>
                        <TableCell align="center" width="20%">ISSUE</TableCell>
                        <TableCell align="center" width="30%">SUGGESTED REPAIR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {metadataEvaluationResult.evaluationReport.evaluationReportItems
                        .filter((evaluationReport) => evaluationReport.issueDetails.issueLevel === 'ERROR')
                        .map((evaluationReport) => {
                            const issueLocation = evaluationReport.issueDetails.issueLocation;
                            return <IssueItem key={`${metadataIndex}.${issueLocation}`}
                                              metadataRecord={metadataRecord}
                                              metadataIndex={metadataIndex}
                                              evaluationReport={evaluationReport}/>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}