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
    const metadataRecord = state.metadataRecord;
    const metadataIndex = state.metadataIndex;
    const metadataEvaluationResult = state.metadataEvaluationResult;

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
                <div
                    className={"title2"}><b>XX</b> issues
                </div>
                <Paper className={"evaluationResults"}>
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
                {tabValue === 1 && <ReportMetadataView/>}
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