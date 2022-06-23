import React, {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import _ from "lodash";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import CircularProgress from "@mui/material/CircularProgress";
import SimpleHeader from "../common/SimpleHeader";
import AppFooter from "../common/AppFooter";
import {evaluateMetadataInBatch} from "../../services/fairwareServices";
import {removeDuplicates} from "../../util/commonUtil";

export default function EvaluateMetadata() {

    const navigate = useNavigate();
    const location = useLocation();
    const it = location && location.state
    && location.state.metadataUris ? location.state.metadataUris : ""
    && location.state.templateId ? location.state.templateId : "";

    const [metadataUris, setMetadataUris] = useState(it);
    const [templateId, setTemplateId] = useState(it);
    const [evaluating, setEvaluationInProgress] = useState(false);

    const sampleMetadataUris = "SAMN01821557" + "\n" +
        "SAMN09836229" + "\n" +
        "SAMN06459514" + "\n" +
        "SAMN03070109" + "\n" +
        "SAMN04420088";
    const sampleTemplateId = "https://repo.metadatacenter.org/templates/db57119c-7860-4569-a3c0-2ced0e0364d1";

    function handleInputMetadataUriChange(event) {
        setMetadataUris(event.target.value);
    }

    function handleInputTemplateIdChange(event) {
        setTemplateId(event.target.value);
    }

    function handleSampleInputClick() {
        setMetadataUris(sampleMetadataUris);
        setTemplateId(sampleTemplateId);
    }

    function handleStartEvaluateButtonClick() {
        setEvaluationInProgress(true);
        let metadataRecordIds = metadataUris.split("\n").map(e => e.trim());
        metadataRecordIds = removeDuplicates(metadataRecordIds);
        evaluateMetadataInBatch(metadataRecordIds, templateId).then(evaluationResults => {
            evaluationResults.forEach((evaluationResult) => {
                if (!_.isEmpty(evaluationResult)) {
                    const metadataRecord = evaluationResult.metadataRecord;
                    evaluationResult.evaluationReport.evaluationReportItems
                        .filter((report) => report.issueDetails.issueLevel === "ERROR")
                        .forEach((report) => {
                            const issueLocation = report.issueDetails.issueLocation;
                            const originalValue = _.get(metadataRecord, issueLocation);
                            _.set(metadataRecord, issueLocation, {"original": originalValue, "replacedBy": null});
                        })
                }
            });
            const successEvaluationResults = evaluationResults.filter(evaluationResult => !_.isEmpty(evaluationResult))
            setEvaluationInProgress(false);
            navigate("/EvaluationResult",
                {
                    state: {
                        metadataUris: metadataUris,
                        templateId: templateId,
                        evaluationResults: successEvaluationResults
                    }
                });
        });
    }

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <div className="mainTitle">Evaluate Metadata</div>
                <div className="mainSubtitle">Enter one or more metadata references followed by a CEDAR template ID</div>
                <div className="inputTextFieldContainer">
                    <TextField
                        id="inputMetadataUris"
                        multiline
                        rows={10}
                        inputProps={{style: {fontSize: 18, lineHeight: "25px"}}}
                        onChange={handleInputMetadataUriChange}
                        value={metadataUris}
                        helperText="Enter metadata references* (one per line)"
                    />
                    <TextField
                        id="inputTemplateId"
                        onChange={handleInputTemplateIdChange}
                        value={templateId}
                        inputProps={{style: {fontSize: 18}}}
                        helperText="Enter CEDAR template ID*"
                    />
                    <div className={"sampleInputButton"}>
                        <Link component="button" onClick={handleSampleInputClick}>sample input</Link>
                    </div>
                </div>

                <div id={"evaluateButton"} hidden={evaluating}>
                    <Button
                        disabled={metadataUris.trim().length === 0}
                        onClick={handleStartEvaluateButtonClick}
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}>
                        Evaluate</Button>
                </div>

                <div className={"evaluateMetadata"}>
                    <div className={"progressIndicator"}>
                        {evaluating && <CircularProgress/>}
                    </div>
                </div>
            </div>
            <AppFooter/>
        </>
    );
}