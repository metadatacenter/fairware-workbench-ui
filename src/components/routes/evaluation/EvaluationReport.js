import React, {useState} from "react";
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
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";

export default function EvaluationReport() {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const metadataIndex = state.metadataIndex;

    const metadataArtifact = state.metadataArtifact;
    const metadataId = metadataArtifact.metadataId;
    const metadataRecord = metadataArtifact.metadataRecord;

    const metadataSpecification = state.metadataSpecification;
    const templateName = metadataSpecification.templateName;
    const templateUrl = metadataSpecification.templateUrl;

    const alignmentReport = state.alignmentReport;
    const evaluationReport = state.evaluationReport;

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
            <div id="appSubHeader">
                <div style={{
                    width: "25%",
                    float: "left",
                    paddingLeft: "100px",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}>
                    <SvgIcon component={PublicIcon} inheritViewBox/>&nbsp;&nbsp;
                    <span>{metadataArtifact.metadataId}</span>
                </div>
                <div style={{
                    width: "70%",
                    float: "left",
                    paddingLeft: "200px",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap"
                }}>
                    <SvgIcon style={{color: "#1e5aab"}} component={LooksOneIcon} inheritViewBox/>&nbsp;&nbsp;
                    <span style={{color: "#1e5aab", fontWeight: "bold"}}>Select Template</span>&nbsp;&nbsp;━&nbsp;&nbsp;
                    <SvgIcon style={{color: "#1e5aab"}} component={LooksTwoIcon} inheritViewBox/>&nbsp;&nbsp;
                    <span style={{color: "#1e5aab", fontWeight: "bold"}}>Align Fields</span>&nbsp;&nbsp;━&nbsp;&nbsp;
                    <SvgIcon style={{color: "#1e5aab"}} component={Looks3Icon} inheritViewBox/>&nbsp;&nbsp;
                    <span style={{color: "#1e5aab", fontWeight: "bold"}}>Repair Metadata</span>
                </div>
            </div>
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
                {tabValue === 0 && <ReportListView metadataIndex={metadataIndex}
                                                   metadataRecord={metadataRecord}
                                                   evaluationReport={evaluationReport}/>}
                {tabValue === 1 && <ReportMetadataView metadataIndex={metadataIndex}
                                                       metadataRecord={metadataRecord}
                                                       evaluationReport={evaluationReport}/>}
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