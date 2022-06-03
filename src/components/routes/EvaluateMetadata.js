import React, {useState} from "react";
import Button from "@mui/material/Button";
import SimpleHeader from "../common/SimpleHeader";
import AppFooter from "../common/AppFooter";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import {evaluateMetadataInBatch} from "../../services/fairwareServices";
import {removeDuplicates} from "../../util/commonUtil";
import CircularProgress from "@mui/material/CircularProgress";
import {useLocation, useNavigate} from 'react-router-dom';

export default function EvaluateMetadata() {

    const navigate = useNavigate();
    const location = useLocation();
    const it = location && location.state
                && location.state.metadataUris ? location.state.metadataUris : ""
                && location.state.templateId ? location.state.templateId : "";

    const [metadataUris, setMetadataUris] = useState(it);
    const [templateId, setTemplateId] = useState(it);
    const [evaluating, setEvaluationInProgress] = useState(false);

    const sampleMetadataUris = "10.5061/dryad.rm2n805" + "\n" + "10.4230/lipics.iclp.2011.16";
    const sampleTemplateId = "https://repo.metadatacenter.org/templates/08cbe8f2-d7ee-431f-8a17-2ff9d3189acb";

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
        evaluateMetadataInBatch(metadataRecordIds, templateId).then(data => {
            setEvaluationInProgress(false);
            navigate("/EvaluationResult",
                {
                    state: {
                        metadataUris: metadataUris,
                        templateId: templateId,
                        results: data
                    }
                });
        });
    }

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <div className="mainTitle">Evaluate Metadata</div>
                <div className="mainSubtitle">Enter one or more metadata URIs followed by an optional CEDAR template ID</div>
                <div className="inputTextFieldContainer">
                    <TextField
                        id="inputMetadataUris"
                        multiline
                        rows={10}
                        onChange={handleInputMetadataUriChange}
                        value={metadataUris}
                        helperText="Enter metadata URIs* (one per line)"
                    />
                    <TextField
                        id="inputTemplateId"
                        onChange={handleInputTemplateIdChange}
                        value={templateId}
                        helperText="Enter CEDAR template ID"
                    />
                    <div className={"sampleInputButton"}>
                        <Link component="button" onClick={handleSampleInputClick}>sample input</Link>
                    </div>
                </div>

                <div id={"findMetadataButtons"} hidden={evaluating}>
                    <Button
                        disabled={metadataUris.trim().length === 0}
                        onClick={handleStartEvaluateButtonClick}
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}>
                        Start Evaluate</Button>
                </div>

                <div className={"searchResults"}>
                    <div className={"progressIndicator"}>
                        {evaluating && <CircularProgress/>}
                    </div>
                </div>
            </div>
            <AppFooter/>
        </>
    );
}