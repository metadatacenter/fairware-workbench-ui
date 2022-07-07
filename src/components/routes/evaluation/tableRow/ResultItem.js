import React from "react";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import Button from "@mui/material/Button";
import SvgIcon from '@mui/material/SvgIcon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import {recommendMetadataTemplate} from "../../../../services/fairwareServices";

export default function ResultItem({metadataIndex, metadataEvaluationResult}) {

    const navigate = useNavigate();

    const metadataArtifact = metadataEvaluationResult.metadataArtifact;
    const metadataSpecification = metadataEvaluationResult.metadataSpecification;
    const evaluationReport = metadataEvaluationResult.evaluationReport;

    const templateNameComponent = getTemplateNameComponent(metadataSpecification);
    const numberOfIssuesComponent = getNumberOfIssuesComponent(evaluationReport);
    const actionButtonComponent = getActionButtonComponent(evaluationReport);
    const visibilityIconComponent = getVisibilityIconComponent(evaluationReport);
    const downloadIconComponent = getDownloadIconComponent(evaluationReport);

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

    function getVisibilityIconComponent(evaluationReport) {
        let visibilityIconComponent;
        if (!_.isEmpty(evaluationReport)) {
            visibilityIconComponent = (
                <SvgIcon component={VisibilityIcon} inheritViewBox/>
            );
        } else {
            visibilityIconComponent = (
                <SvgIcon component={VisibilityOffIcon} inheritViewBox/>
            );
        }
        return visibilityIconComponent;
    }

    function getDownloadIconComponent(evaluationReport) {
        let downloadIconComponent;
        if (!_.isEmpty(evaluationReport)) {
            downloadIconComponent = (
                <SvgIcon component={DownloadIcon} inheritViewBox/>
            );
        } else {
            downloadIconComponent = (
                <SvgIcon component={FileDownloadOffIcon} inheritViewBox/>
            );
        }
        return downloadIconComponent;
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
                    View Evalution Report</Button>
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
                    metadataArtifact: metadataEvaluationResult.metadataArtifact,
                    metadataSpecification: metadataEvaluationResult.metadataSpecification,
                    alignmentReport: metadataEvaluationResult.alignmentReport,
                    evaluationReport: metadataEvaluationResult.evaluationReport
                }
            });
    }

    async function handleSelectTemplateButtonClick() {
        const metadataId = metadataArtifact.metadataId;
        const response = await recommendMetadataTemplate(metadataId);
        navigate("/SelectTemplate",
            {
                state: {
                    metadataIndex: metadataIndex,
                    metadataArtifact: metadataEvaluationResult.metadataArtifact,
                    metadataSpecification: metadataEvaluationResult.metadataSpecification,
                    alignmentReport: metadataEvaluationResult.alignmentReport,
                    evaluationReport: metadataEvaluationResult.evaluationReport,
                    recommendationReport: response
                }
            })
    }

    return (
        <>
            <TableRow key={`metadata-${metadataIndex}`} sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell className={"cell center"}>{metadataArtifact.metadataId}</TableCell>
                <TableCell className={"cell center"}>{templateNameComponent}</TableCell>
                <TableCell className={"cell center"}>{numberOfIssuesComponent}</TableCell>
                <TableCell className={"cell center"}>{visibilityIconComponent}</TableCell>
                <TableCell className={"cell center"}>{downloadIconComponent}</TableCell>
                <TableCell className={"cell center"}>{actionButtonComponent}</TableCell>
            </TableRow>
        </>
    )
}