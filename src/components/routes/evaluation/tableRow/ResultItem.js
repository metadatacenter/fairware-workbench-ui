import React from "react";
import {useNavigate} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import Button from "@mui/material/Button";

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
                <TableCell align="center">PREVIEW ICON</TableCell>
                <TableCell align="center">DOWNLOAD ICON</TableCell>
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