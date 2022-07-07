import React from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableContainer from "@mui/material/TableContainer";
import IssueItem from "./tableRow/IssueItem";

export default function ReportListView({metadataIndex, metadataRecord, evaluationReport}) {

    return (
        <TableContainer className="table" style={{marginBottom: "2vh"}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className="header">FIELD NAME</TableCell>
                        <TableCell className="header">FIELD VALUE</TableCell>
                        <TableCell className="header">ISSUE</TableCell>
                        <TableCell className="header">SUGGESTED REPAIR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {evaluationReport.evaluationReportItems
                        .map((reportItem, index) => {
                            return <IssueItem issueIndex={index}
                                              metadataIndex={metadataIndex}
                                              metadataRecord={metadataRecord}
                                              evaluationReport={reportItem}/>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}