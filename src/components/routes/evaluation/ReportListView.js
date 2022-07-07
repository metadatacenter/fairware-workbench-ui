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
        <TableContainer className="table">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize: 18}} align="center">FIELD NAME</TableCell>
                        <TableCell style={{fontSize: 18}} align="center">FIELD VALUE</TableCell>
                        <TableCell style={{fontSize: 18}} align="center">ISSUE</TableCell>
                        <TableCell style={{fontSize: 18}} align="center">SUGGESTED REPAIR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {metadataEvaluationResult.evaluationReport.evaluationReportItems
                        .filter((reportItem) => reportItem.metadataIssue.issueLevel === 'ERROR')
                        .map((reportItem, index) => {
                            return <IssueItem issueIndex={index}
                                              metadataRecord={metadataRecord}
                                              metadataIndex={metadataIndex}
                                              evaluationReport={reportItem}/>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}