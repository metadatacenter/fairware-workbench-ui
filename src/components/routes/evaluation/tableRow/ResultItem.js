import React from "react";
import {useNavigate} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import Button from "@mui/material/Button";
import SvgIcon from '@mui/material/SvgIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

export default function ResultItem({metadataIndex, metadataEvaluationResult}) {
    const navigate = useNavigate();

    function handleViewReportButtonClick() {
        navigate("/EvaluationReport",
            {
                state: {
                    metadataIndex: metadataIndex,
                    metadataEvaluationResult: metadataEvaluationResult
                }
            });
    }

    return (
        <React.Fragment>
            <TableRow key={`metadata-${metadataIndex}`} sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell style={{fontSize: 16}} align="center">{metadataEvaluationResult.metadataRecordId}</TableCell>
                <TableCell style={{fontSize: 16}} align="center">
                    <a href={metadataEvaluationResult.metadataSpecification.templateUrl}
                       target="_blank">{metadataEvaluationResult.metadataSpecification.templateName}</a>
                </TableCell>
                <TableCell style={{fontSize: 16}} align="center">
                    {metadataEvaluationResult.evaluationReport.evaluationReportItems.length}
                </TableCell>
                <TableCell align="center"><SvgIcon component={VisibilityIcon} inheritViewBox /></TableCell>
                <TableCell align="center"><SvgIcon component={DownloadIcon} inheritViewBox /></TableCell>
                <TableCell align="center">
                    <Button
                        onClick={handleViewReportButtonClick}
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}>
                        View Report</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}