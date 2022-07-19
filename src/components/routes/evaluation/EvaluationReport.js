import React, {useReducer, useState} from "react";
import {useLocation} from 'react-router-dom';
import * as jsonpatch from 'fast-json-patch';
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ReportListView from "./ReportListView";
import ReportMetadataView from "./ReportMetadataView";
import EvaluationReportHeader from "../../common/EvaluationReportHeader";
import AppFooter from "../../common/AppFooter";
import {handleEvaluationResults} from "../../../util/evaluationUtil";

export default function EvaluationReport() {

    const location = useLocation();

    const metadataIndex = location.state.metadataIndex;
    const [evaluationResults, dispatch] = useReducer(handleEvaluationResults, location.state.evaluationResults);
    const enableSummaryReport = location.state.enableSummaryReport;

    const evaluationResult = evaluationResults[metadataIndex];

    const metadataArtifact = evaluationResult.metadataArtifact;
    const metadataRecord = metadataArtifact.metadataRecord;

    const metadataSpecification = evaluationResult.metadataSpecification;
    const templateName = metadataSpecification.templateName;
    const templateUrl = metadataSpecification.templateUrl;
    const evaluationReport = evaluationResult.evaluationReport;

    const issueCount = evaluationReport.evaluationReportItems
        .filter(reportItem => reportItem.metadataIssue.issueCategory !== "FIELD_ERROR")
        .length;

    const [tabValue, setTabValue] = useState(0);

    function handleTabChange(event, value) {
        setTabValue(value);
    }

    function handleDownloadJsonButton() {
        const metadataName = metadataArtifact.metadataId;
        const metadataRecord = metadataArtifact.metadataRecord;
        const patches = evaluationReport.evaluationReportItems
            .filter((item) => item.metadataIssue.issueCategory === "VALUE_ERROR")
            .map((item) => item.patches)
            .flat()
        const patchedMetadata = jsonpatch.applyPatch(metadataRecord, patches).newDocument;
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(patchedMetadata, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = metadataName + "-patched.json";
        link.click();
    }

    return (
        <>
            <EvaluationReportHeader metadataIndex={metadataIndex}
                                    evaluationResults={evaluationResults}
                                    enableSummaryReport={enableSummaryReport}/>
            <div id="appContent">
                <h1 className="pageTitle">Metadata Evaluation Report</h1>
                <h2 className={"subTitle"}>Found <b>{issueCount}</b> issues</h2>
                <h2 className={"subTitle"}>
                    Template: <a href={templateUrl} target="_blank">{templateName}</a>
                </h2>

                <div style={{textAlign: "right"}}>
                    <Button
                        onClick={handleDownloadJsonButton}
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}
                        startIcon={<FileDownloadIcon/>}>
                        Download Result</Button>
                </div>

                <Paper style={{marginTop: "-2em", boxShadow: "none", borderBottom: "3px solid #e4e4e4"}}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary">
                        <Tab label="List View"/>
                        <Tab label="Metadata View"/>
                    </Tabs>
                </Paper>
                {tabValue === 0 && <ReportListView index={metadataIndex}
                                                   metadataRecord={metadataRecord}
                                                   evaluationReport={evaluationReport}
                                                   dispatch={dispatch}/>}
                {tabValue === 1 && <ReportMetadataView index={metadataIndex}
                                                       metadataRecord={metadataRecord}
                                                       evaluationReport={evaluationReport}
                                                       dispatch={dispatch}/>}
            </div>
            <AppFooter/>
        </>
    );
}