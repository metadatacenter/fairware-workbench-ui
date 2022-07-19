import React, {useReducer, useState} from "react";
import {useNavigate} from 'react-router-dom';
import _ from "lodash";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from '@mui/lab/LoadingButton';
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

    const metadataExample1 = "10.5281/zenodo.3678320" + "\n" +
        "10.5281/zenodo.3832925" + "\n" +
        "10.3205/000293" + "\n" +
        "10.5281/zenodo.5513879" + "\n" +
        "10.48558/6ddc-1114" + "\n" +
        "10.5281/zenodo.5594842" + "\n" +
        "10.5281/zenodo.5618466" + "\n" +
        "10.34813/32coll2021" + "\n" +
        "10.48558/vm34-2b62" + "\n" +
        "10.48558/2z8n-h673";
    const templateExample1 = "https://repo.metadatacenter.org/templates/0172b2ca-1f8d-4488-9f8b-46bc1dfb8b79";

    const metadataExample2 = "SAMN01821557" + "\n" +
        "SAMN09836229" + "\n" +
        "SAMN06459514" + "\n" +
        "SAMN03070109" + "\n" +
        "SAMN04420088";
    const templateExample2 = "https://repo.metadatacenter.org/templates/db57119c-7860-4569-a3c0-2ced0e0364d1";

    function handleInputMetadataUriChange(event) {
        setMetadataUris(event.target.value);
    }

    function handleInputTemplateIdChange(event) {
        setTemplateId(event.target.value);
    }

    function handleMetadataExample1Click() {
        setMetadataUris(metadataExample1);
    }

    function handleTemplateExample1Click() {
        setTemplateId(templateExample1);
    }

    function handleMetadataExample2Click() {
        setMetadataUris(metadataExample2);
    }

    function handleTemplateExample2Click() {
        setTemplateId(templateExample2);
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
                evaluationResults: evaluationResults,
                enableSummaryReport: false
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
                evaluationResults: evaluationResults,
                enableSummaryReport: true
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
                        <Link component="button" onClick={handleMetadataExample1Click}>example 1</Link>&nbsp;
                        <Link component="button" onClick={handleMetadataExample2Click}>example 2</Link>
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
                                <Link component="button" onClick={handleTemplateExample1Click}>example 1</Link>&nbsp;
                                <Link component="button" onClick={handleTemplateExample2Click}>example 2</Link>
                            </div>
                        </>)}
                    <div style={{marginTop: "5px", textAlign: "left"}}>
                        <FormControlLabel control={<Checkbox onChange={toggleHide}/>}
                                          label="I have the CEDAR template reference for the evaluation"/>
                    </div>
                </div>
                <div style={{width: "100%", textAlign: "center", margin: "3vh auto"}}>
                    <div id={"evaluateButton"}>
                        <LoadingButton disabled={metadataUris.trim().length === 0}
                                       onClick={handleStartEvaluateButtonClick}
                                       loading={evaluating}
                                       loadingIndicator="Processing..."
                                       className={"generalButton"}
                                       variant={"contained"}
                                       size={"large"}>
                            Start Evaluating
                        </LoadingButton>
                    </div>
                </div>
            </div>
            <AppFooter/>
        </>
    );
}