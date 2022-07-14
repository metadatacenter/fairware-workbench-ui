import React, {useReducer, useState} from "react";
import {useNavigate} from 'react-router-dom';
import _ from "lodash";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SimpleHeader from "../common/SimpleHeader";
import AppFooter from "../common/AppFooter";
import {evaluateMetadataInBatch, searchMetadataInBatch} from "../../services/fairwareServices";
import {removeDuplicates} from "../../util/commonUtil";
import {getEvaluationReportWithPatches, handleEvaluationResults} from "../../util/evaluationUtil";

export default function EvaluateMetadata() {

    const navigate = useNavigate();

    const initialState = [];
    const [evaluationResults, dispatch] = useReducer(handleEvaluationResults, initialState);

    const [metadataUris, setMetadataUris] = useState("");
    const [templateId, setTemplateId] = useState("");
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
        const searchResults = await searchMetadataInBatch(metadataRecordIds);
        searchResults.forEach((searchResult, index) => {
            dispatch({
                type: 'UPDATE_METADATA_ARTIFACT',
                metadataIndex: index,
                data: searchResult.metadataArtifact
            });
        });
        setEvaluationInProgress(false);
        navigate("/EvaluationResult", {
            state: {
                evaluationResults: evaluationResults
            }
        });
    }

    async function evaluateMetadata(metadataRecordIds, templateId) {
        const evaluationResults = await evaluateMetadataInBatch(metadataRecordIds, templateId);
        evaluationResults.forEach((evaluationResult, index) => {
            if (!_.isEmpty(evaluationResult)) {
                dispatch({
                    type: 'UPDATE_METADATA_ARTIFACT',
                    metadataIndex: index,
                    data: evaluationResult.metadataArtifact
                });
                dispatch({
                    type: 'UPDATE_METADATA_SPECIFICATION',
                    metadataIndex: index,
                    data: evaluationResult.metadataSpecification
                });
                dispatch({
                    type: 'UPDATE_ALIGNMENT_REPORT',
                    metadataIndex: index,
                    data: evaluationResult.alignmentReport
                });
                dispatch({
                    type: 'UPDATE_EVALUATION_REPORT',
                    metadataIndex: index,
                    data: getEvaluationReportWithPatches(evaluationResult.evaluationReport)
                })
            }
        });
        setEvaluationInProgress(false);
        navigate("/EvaluationResult", {
            state: {
                evaluationResults: evaluationResults
            }
        });
    }

    function toggleHide() {
        setHideField((hide) => !hide);
    }

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