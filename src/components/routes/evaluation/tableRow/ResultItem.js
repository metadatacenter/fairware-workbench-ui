import React from "react";
import {useNavigate} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import Button from "@mui/material/Button";
import SvgIcon from '@mui/material/SvgIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

export default function ResultItem({metadataRecord, metadataIndex, metadataEvaluationResult}) {
    const navigate = useNavigate();

    function handleStartEvaluateButtonClick() {
        debugger
        navigate("/EvaluationReport",
            {
                state: {
                    metadataRecord: metadataRecord,
                    metadataIndex: metadataIndex,
                    metadataEvaluationResult: metadataEvaluationResult
                }
            });
    }

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell align="center">{metadataEvaluationResult.metadataRecordId}</TableCell>
                <TableCell align="center">
                    <a href={metadataEvaluationResult.metadataSpecification.templateUrl}
                       target="_blank">{metadataEvaluationResult.metadataSpecification.templateName}</a>
                </TableCell>
                <TableCell align="center">{metadataEvaluationResult.evaluationReport.evaluationReportItems.length}
                </TableCell>
                <TableCell align="center"><SvgIcon component={VisibilityIcon} inheritViewBox /></TableCell>
                <TableCell align="center"><SvgIcon component={DownloadIcon} inheritViewBox /></TableCell>
                <TableCell align="center">
                    <Button
                        onClick={handleStartEvaluateButtonClick}
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}>
                        Evaluate</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}