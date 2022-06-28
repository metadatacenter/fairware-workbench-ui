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
    const metadataRecordId = metadataEvaluationResult.metadataRecordId;
    const metadataRecord = metadataEvaluationResult.metadataRecord;
    const metadataSpecification = metadataEvaluationResult.metadataSpecification;
    const templateName = metadataSpecification.templateName;
    const templateUrl = metadataSpecification.templateUrl;

    const evaluationReport = metadataEvaluationResult.evaluationReport;
    const issueCount = evaluationReport.evaluationReportItems.length;

    const [tabValue, setTabValue] = useState(0);
    const [submitting, setSubmissionInProgress] = useState(false);

    function handleSubmitChangesButton() {
        setSubmissionInProgress(true);
        navigate(-1);
    }

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
                <div className={"title3"}>Metadata: {metadataRecordId}</div>
                <div className={"title3"}>
                    Template: <a href={templateUrl} target="_blank">{templateName}</a>
                </div>
                <Paper style={{marginTop: "2em", boxShadow: "none", borderBottom: "3px solid #e4e4e4"}}>
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
            </div>
            <div id={"submitChangesButton"} hidden={submitting}>
                <Button
                    onClick={handleSubmitChangesButton}
                    className={"generalButton"}
                    variant={"contained"}
                    size={"large"}>
                    Submit Changes</Button>
                <Button
                    onClick={handleBackButton}
                    className={"generalButton"}
                    variant={"contained"}
                    size={"large"}>
                    Back</Button>
            </div>
            <div className={"submitChanges"}>
                <div className={"progressIndicator"}>
                    {submitting && <CircularProgress/>}
                </div>
            </div>
            <AppFooter/>
        </>
    );
}