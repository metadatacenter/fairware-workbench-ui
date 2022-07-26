import React, {useReducer, useState} from "react";
import {useLocation} from 'react-router-dom';
import * as jsonpatch from 'fast-json-patch';
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReportListView from "./ReportListView";
import ReportMetadataView from "./ReportMetadataView";
import EvaluationReportHeader from "../../common/EvaluationReportHeader";
import AppFooter from "../../common/AppFooter";
import {handleEvaluationResults} from "../../../util/evaluationUtil";
import {generateCedarTemplateInstance} from "../../../util/cedarUtil";
import {createTemplateInstance} from "../../../services/cedarServices";

export default function EvaluationReport() {

    const location = useLocation();

    const metadataIndex = location.state.metadataIndex;
    const [evaluationResults, dispatch] = useReducer(handleEvaluationResults, location.state.evaluationResults);
    const enableSummaryReport = location.state.enableSummaryReport;

    const [open, setOpen] = useState(false);
    const [cedarApiKey, setCedarApiKey] = useState("");

    const evaluationResult = evaluationResults[metadataIndex];

    const metadataArtifact = evaluationResult.metadataArtifact;
    const metadataRecord = metadataArtifact.metadataRecord;

    const metadataSpecification = evaluationResult.metadataSpecification;
    const templateName = metadataSpecification.templateName;
    const templateUrl = metadataSpecification.templateUrl;

    const alignmentReport = evaluationResult.alignmentReport;
    const evaluationReport = evaluationResult.evaluationReport;

    const issueCount = evaluationReport.evaluationReportItems
        .filter(reportItem => reportItem.metadataIssue.issueCategory !== "FIELD_ERROR")
        .length;

    const [tabValue, setTabValue] = useState(0);

    function handleTabChange(event, value) {
        setTabValue(value);
    }

    function handleSaveResultButtonClick() {
        setOpen(true);
    }

    function handleSaveResultDialogClose() {
        setOpen(false);
    }

    function handleInputChange(event) {
        setCedarApiKey(event.target.value);
    }

    function handleSaveResultDialogCancelButtonClick() {
        handleSaveResultDialogClose();
    }

    function handleSaveResultDialogSaveButtonClick() {
        const patchedMetadata = createPatchedMetadata();
        const templateInstance = generateCedarTemplateInstance(metadataSpecification, alignmentReport, patchedMetadata);
        createTemplateInstance(templateInstance, cedarApiKey);
        handleSaveResultDialogClose();
    }

    function handleDownloadResultButtonClick() {
        const patchedMetadata = createPatchedMetadata();
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(patchedMetadata, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = metadataArtifact.metadataId + "-patched.json";
        link.click();
    }

    function createPatchedMetadata() {
        const metadataRecord = metadataArtifact.metadataRecord;
        const patches = evaluationReport.evaluationReportItems
            .filter((item) => item.metadataIssue.issueCategory === "VALUE_ERROR")
            .map((item) => item.patches)
            .flat()
        return jsonpatch.applyPatch(metadataRecord, patches).newDocument;
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
                <div style={{width: "100%"}}>
                    <div style={{textAlign: "right", float: "right"}}>
                        <Button
                            onClick={handleDownloadResultButtonClick}
                            className={"generalButton"}
                            variant={"contained"}
                            size={"large"}
                            startIcon={<FileDownloadIcon/>}>
                            Download Result</Button>
                    </div>
                    <div style={{textAlign: "right"}}>
                        <Button
                            onClick={handleSaveResultButtonClick}
                            className={"generalButton"}
                            variant={"contained"}
                            size={"large"}
                            startIcon={<CloudUploadIcon/>}>
                            Save Result</Button>
                        <Dialog open={open} onClose={handleSaveResultDialogClose}>
                            <DialogTitle>Save Result</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To save the result on the cloud, please enter the CEDAR API key here.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="apiKey"
                                    label="CEDAR API Key"
                                    type="text"
                                    onChange={handleInputChange}
                                    value={cedarApiKey}
                                    fullWidth
                                    variant="standard"/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleSaveResultDialogCancelButtonClick}>Cancel</Button>
                                <Button onClick={handleSaveResultDialogSaveButtonClick}>Save</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
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