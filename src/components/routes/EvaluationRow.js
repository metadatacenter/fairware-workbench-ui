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
import ShowMetadata from "./ShowMetadata";

export default function EvaluationRow({metadataEvaluation, metadataRecord, metadataIndex, handleValueChange}) {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell align="right">{metadataEvaluation.metadataRecordId}</TableCell>
                <TableCell align="center"><a href={metadataEvaluation.metadataSpecification.templateUrl}
                                             target="_blank">{metadataEvaluation.metadataSpecification.templateName}</a></TableCell>
                <TableCell align="center">{metadataEvaluation.evaluationReport.evaluationReportItems
                    .filter(report => report.issueDetails.issueLevel === 'WARNING').length}
                </TableCell>
                <TableCell align="center">{metadataEvaluation.evaluationReport.evaluationReportItems
                    .filter(report => report.issueDetails.issueLevel === 'ERROR').length}
                </TableCell>
                <TableCell align="center">
                    SEE EVALUATION DETAILS <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 2}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Repair Form
                            </Typography>
                            <Table size="small" aria-label="repair-form">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width="20%">Field Name</TableCell>
                                        <TableCell align="center">Issue Type</TableCell>
                                        <TableCell align="center">Repair Action</TableCell>
                                        <TableCell align="center" width="20%">Original Value</TableCell>
                                        <TableCell align="center" width="20%">Replaced By</TableCell>
                                        <TableCell align="center" width="20%">Input User Fixes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {metadataEvaluation.evaluationReport.evaluationReportItems
                                        .filter((evaluationReport) => evaluationReport.issueDetails.issueLevel === 'ERROR')
                                        .map((evaluationReport) => {
                                            const issueLocation = evaluationReport.issueDetails.issueLocation;
                                            return <IssueRow key={`${metadataIndex}.${issueLocation}`}
                                                             evaluationReport={evaluationReport}
                                                             metadataRecord={metadataRecord}
                                                             metadataIndex={metadataIndex}
                                                             handleValueChange={handleValueChange}/>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                        <Box style={{marginBottom: "1em"}}>
                            <ShowMetadata metadataRecord={metadataRecord}/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}