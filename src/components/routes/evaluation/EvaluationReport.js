import React, {useReducer, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import PublicIcon from "@mui/icons-material/Public";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import ReportListView from "./ReportListView";
import ReportMetadataView from "./ReportMetadataView";
import EvaluationReportHeader from "../../common/EvaluationReportHeader";
import AppFooter from "../../common/AppFooter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {handleEvaluationResults} from "../../../util/evaluationUtil";

export default function EvaluationReport() {

    const navigate = useNavigate();
    const location = useLocation();

    const metadataIndex = location.state.metadataIndex;
    const [evaluationResults, dispatch] = useReducer(handleEvaluationResults, location.state.evaluationResults);

    const evaluationResult = evaluationResults[metadataIndex];

    const metadataArtifact = evaluationResult.metadataArtifact;
    const metadataRecord = metadataArtifact.metadataRecord;

    const metadataSpecification = evaluationResult.metadataSpecification;
    const templateName = metadataSpecification.templateName;
    const templateUrl = metadataSpecification.templateUrl;
    const evaluationReport = evaluationResult.evaluationReport;

    const issueCount = evaluationReport.evaluationReportItems.length;

    const [tabValue, setTabValue] = useState(0);

    function handleTabChange(event, value) {
        setTabValue(value);
    }

    return (
        <>
            <EvaluationReportHeader metadataIndex={metadataIndex} evaluationResults={evaluationResults}/>
            <div id="appContent">
                <h1 className="pageTitle">Metadata Evaluation Report</h1>
                <h2 className={"subTitle"}>Found <b>{issueCount}</b> issues</h2>
                <h2 className={"subTitle"}>
                    Template: <a href={templateUrl} target="_blank">{templateName}</a>
                </h2>

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