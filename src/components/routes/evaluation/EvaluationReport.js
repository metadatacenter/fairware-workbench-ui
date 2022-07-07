import React, {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ReportListView from "./ReportListView";
import ReportMetadataView from "./ReportMetadataView";
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";

export default function EvaluationReport() {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const metadataIndex = state.metadataIndex;
    const metadataEvaluationResult = state.metadataEvaluationResult;

    const metadataArtifact = metadataEvaluationResult.metadataArtifact;
    const metadataId = metadataArtifact.metadataId;
    const metadataRecord = metadataArtifact.metadataRecord;

    const metadataSpecification = metadataEvaluationResult.metadataSpecification;
    const templateName = metadataSpecification.templateName;
    const templateUrl = metadataSpecification.templateUrl;

    const alignmentReport = metadataEvaluationResult.alignmentReport;
    const evaluationReport = metadataEvaluationResult.evaluationReport;

    const issueCount = evaluationReport.evaluationReportItems.length;

    const [tabValue, setTabValue] = useState(0);

    function handleBackButton() {
        navigate(-1);
    }

    function handleTabChange(event, value) {
        setTabValue(value);
    }

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <h1>Metadata Evaluation Report</h1>
                <div className={"title2"}>Found <b>{issueCount}</b> issues</div>
                <div className={"title3"}>Metadata: {metadataId}</div>
                <div className={"title3"}>
                    Template: <a href={templateUrl} target="_blank">{templateName}</a>
                </div>

                <div style={{textAlign: "right"}}>
                    <Button
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}>
                        Download (PDF)</Button>
                    <Button
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}>
                        Download (JSON)</Button>
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
                {tabValue === 0 && <ReportListView metadataRecord={metadataRecord}
                                                   metadataIndex={metadataIndex}
                                                   metadataEvaluationResult={metadataEvaluationResult}/>}
                {tabValue === 1 && <ReportMetadataView metadataRecord={metadataRecord}
                                                       metadataIndex={metadataIndex}
                                                       metadataEvaluationResult={metadataEvaluationResult}/>}
                <div style={{textAlign: "center"}}>
                    <Button
                        onClick={handleBackButton}
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}>
                        Go Back</Button>
                </div>
            </div>
            <AppFooter/>
        </>
    );
}