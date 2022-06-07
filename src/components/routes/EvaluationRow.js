import React, {useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import IssueRow from "./IssueRow";

export default function EvaluationRow({metadataEvaluation, metadataRecord, metadataIndex, handleValueChange}) {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow key={metadataEvaluation.metadataRecordId} sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>{metadataEvaluation.metadataRecordId}</TableCell>
                <TableCell><a href={metadataEvaluation.metadataSpecification.templateUrl}
                              target="_blank">{metadataEvaluation.metadataSpecification.templateName}</a></TableCell>
                <TableCell>{metadataEvaluation.evaluationReport.evaluationReportItems
                    .filter(report => report.issueDetails.issueLevel === 'WARNING').length}
                </TableCell>
                <TableCell>{metadataEvaluation.evaluationReport.evaluationReportItems
                    .filter(report => report.issueDetails.issueLevel === 'ERROR').length}
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 2}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Repair Form
                            </Typography>
                            <Table size="small" aria-label="repair-form">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width="40%">Issue location</TableCell>
                                        <TableCell align="center">Issue Type</TableCell>
                                        <TableCell align="center">Repair Action</TableCell>
                                        <TableCell align="center">Value</TableCell>
                                        <TableCell align="center">Fix</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {metadataEvaluation.evaluationReport.evaluationReportItems.map((report) => (
                                        <IssueRow evaluationReport={report}
                                                  metadataRecord={metadataRecord}
                                                  metadataIndex={metadataIndex}
                                                  handleValueChange={handleValueChange}/>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}