import React, {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import _ from "lodash";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import CircularProgress from "@mui/material/CircularProgress";
import SimpleHeader from "../common/SimpleHeader";
import AppFooter from "../common/AppFooter";
import {evaluateMetadataInBatch, searchMetadataInBatch} from "../../services/fairwareServices";
import {removeDuplicates} from "../../util/commonUtil";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function EvaluateMetadata() {

    const navigate = useNavigate();
    const location = useLocation();
    const it = location && location.state
    && location.state.metadataUris ? location.state.metadataUris : ""
    && location.state.templateId ? location.state.templateId : "";

    const [metadataUris, setMetadataUris] = useState(it);
    const [templateId, setTemplateId] = useState(it);
    const [evaluating, setEvaluationInProgress] = useState(false);
    const [hide, setHideField] = useState(false)

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

    function handleSampleInputMetadataClick() {
        setMetadataUris(sampleMetadataUris);
    }

    function handleSampleInputTemplateClick() {
        setTemplateId(sampleTemplateId);
    }

    function handleStartEvaluateButtonClick() {
        setEvaluationInProgress(true);
        let metadataRecordIds = metadataUris.split("\n").map(e => e.trim());
        metadataRecordIds = removeDuplicates(metadataRecordIds);
        if (templateId.trim().length === 0) {
            searchMetadata(metadataRecordIds);
        } else {
            evaluateMetadata(metadataRecordIds, templateId);
        }
    }

    async function searchMetadata(metadataRecordIds) {
        const evaluationResults = [];
        const searchResults = await searchMetadataInBatch(metadataRecordIds);
        searchResults.forEach((searchResult) => {
            if (!_.isEmpty(searchResult)) {
                const metadataArtifact = searchResult.metadataArtifact;
                const evaluationResult = {
                    metadataArtifact: metadataArtifact,
                    metadataSpecification: {},
                    alignmentReport: {},
                    evaluationReport: {}
                };
                evaluationResults.push(evaluationResult);
            }
        });
        setEvaluationInProgress(false);
        navigate("/EvaluationResult",
            {
                state: {
                    evaluationResults: evaluationResults
                }
            });
    }

    async function evaluateMetadata(metadataRecordIds, templateId) {
        const evaluationResults = await evaluateMetadataInBatch(metadataRecordIds, templateId);
        evaluationResults.forEach((evaluationResult) => {
            if (!_.isEmpty(evaluationResult)) {
                evaluationResult.evaluationReport.evaluationReportItems
                    .forEach((reportItem) => {
                        Object.assign(reportItem, {patches: []});
                        const metadataIssue = reportItem.metadataIssue;
                        const issueCategory = metadataIssue.issueCategory;
                        const issueLocation = metadataIssue.issueLocation;
                        const valueSuggestions = reportItem.repairAction.valueSuggestions;
                        let valueSuggestion = ""
                        if (valueSuggestions.length !== 0) {
                            valueSuggestion = valueSuggestions[0]
                        }
                        if (issueCategory === "VALUE_ERROR") {
                            reportItem.patches.push({
                                op: "replace",
                                path: "/" + issueLocation,
                                value: valueSuggestion
                            })
                        } else if (issueCategory === "FIELD_ERROR") {
                            reportItem.patches.push({
                                op: "move",
                                from: "/" + issueLocation,
                                path: "/" + valueSuggestion
                            })
                            reportItem.patches.push({
                                op: "remove",
                                path: "/" + issueLocation
                            })
                        }
                    })
            }
        });
        const successEvaluationResults = evaluationResults.filter(evaluationResult => !_.isEmpty(evaluationResult))
        setEvaluationInProgress(false);
        navigate("/EvaluationResult",
            {
                state: {
                    evaluationResults: successEvaluationResults
                }
            });
    }

    function toggleHide() {
        setHideField((hide) => !hide);
    };

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <div className="mainTitle" style={{marginTop: "4vh"}}>Evaluate Metadata</div>
                <div className="mainSubtitle">Enter one or more metadata references followed by a CEDAR template ID
                </div>
                <div className="inputTextFieldContainer">
                    <TextField
                        required
                        id="inputMetadataUris"
                        multiline
                        rows={8}
                        inputProps={{style: {fontSize: 18, lineHeight: "24px"}}}
                        onChange={handleInputMetadataUriChange}
                        value={metadataUris}
                        label="Enter metadata references (one per line)"
                    />
                    <div className="sampleInputButton">
                        <Link component="button" onClick={handleSampleInputMetadataClick}>sample input</Link>
                    </div>
                    {hide && (
                        <>
                            <TextField
                                id="inputTemplateId"
                                style={{marginTop: "20px"}}
                                onChange={handleInputTemplateIdChange}
                                value={templateId}
                                inputProps={{style: {fontSize: 18}}}
                                label="CEDAR template IRI"
                            />
                            <div className="sampleInputButton">
                                <Link component="button" onClick={handleSampleInputTemplateClick}>sample input</Link>
                            </div>
                        </>)}
                    <div style={{marginTop: "5px", textAlign: "left"}}>
                        <FormControlLabel control={<Checkbox onChange={toggleHide}/>}
                                          label="I have the CEDAR template reference for the evaluation"/>
                    </div>
                </div>
                <div style={{width: "100%", textAlign: "center", margin: "3vh auto"}}>
                    <div id={"evaluateButton"} hidden={evaluating}>
                        <Button disabled={metadataUris.trim().length === 0}
                                onClick={handleStartEvaluateButtonClick}
                                className={"generalButton"}
                                variant={"contained"}
                                size={"large"}>
                            Start Evaluating
                        </Button>
                    </div>
                    <div className={"evaluateMetadata"}>
                        <div className={"progressIndicator"}>
                            {evaluating && <CircularProgress/>}
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter/>
        </>
    );
}