import React from "react";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import Button from "@mui/material/Button";
import SvgIcon from '@mui/material/SvgIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import {recommendMetadataTemplate} from "../../../../services/fairwareServices";

export default function ResultItem({metadataIndex, metadataEvaluationResult}) {

    const navigate = useNavigate();

    const metadataSpecification = metadataEvaluationResult.metadataSpecification;
    const evaluationReport = metadataEvaluationResult.evaluationReport;

    let templateNameComponent = getTemplateNameComponent(metadataSpecification);
    let numberOfIssuesComponent = getNumberOfIssuesComponent(evaluationReport);
    let actionButtonComponent = getActionButtonComponent(evaluationReport);

    function getTemplateNameComponent(metadataSpecification) {
        let templateNameComponent;
        if (!_.isEmpty(metadataSpecification)) {
            templateNameComponent = (
                <span>
                    <a href={metadataSpecification.templateUrl} target="_blank">{metadataSpecification.templateName}</a>
                </span>
            )
        } else {
            templateNameComponent = (
                <span style={{color: "#8f8f8f"}}>Not Selected</span>
            );
        }
        return templateNameComponent;
    }

    function getNumberOfIssuesComponent(evaluationReport) {
        let numberOfIssuesComponent;
        if (!_.isEmpty(evaluationReport)) {
            numberOfIssuesComponent = (
                <span>{evaluationReport.evaluationReportItems.length}</span>
            );
        } else {
            numberOfIssuesComponent = (
                <span style={{color: "#8f8f8f"}}>Not Available</span>
            );
        }
        return numberOfIssuesComponent;
    }

    function getActionButtonComponent(evaluationReport) {
        let actionButtonComponent;
        if (!_.isEmpty(evaluationReport)) {
            actionButtonComponent = (
                <Button
                    onClick={handleViewReportButtonClick}
                    className={"generalButton"}
                    variant={"contained"}
                    size={"large"}>
                    View Report</Button>
            );
        } else {
            actionButtonComponent = (
                <Button
                    onClick={handleSelectTemplateButtonClick}
                    className={"generalButton"}
                    variant={"contained"}
                    size={"large"}>
                    Select Template</Button>
            );
        }
        return actionButtonComponent;
    }

    function handleViewReportButtonClick() {
        navigate("/EvaluationReport",
            {
                state: {
                    metadataIndex: metadataIndex,
                    metadataEvaluationResult: metadataEvaluationResult
                }
            });
    }

    async function handleSelectTemplateButtonClick() {
        const metadataRecordId = metadataEvaluationResult.metadataRecordId;
        const response = await recommendMetadataTemplate(metadataRecordId);
        navigate("/SelectTemplate",
            {
                state: {
                    metadataRecordId: metadataRecordId,
                    recommendationResult: response
                }
            })
    }

    return (
        <>
            <TableRow key={`metadata-${metadataIndex}`} sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell style={{fontSize: 16}} align="center">{metadataEvaluationResult.metadataRecordId}</TableCell>
                <TableCell style={{fontSize: 16}} align="center">{templateNameComponent}</TableCell>
                <TableCell style={{fontSize: 16}} align="center">{numberOfIssuesComponent}</TableCell>
                <TableCell align="center"><SvgIcon component={VisibilityIcon} inheritViewBox/></TableCell>
                <TableCell align="center"><SvgIcon component={DownloadIcon} inheritViewBox/></TableCell>
                <TableCell align="center">{actionButtonComponent}</TableCell>
            </TableRow>
        </>
    )
}