import React, {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Radio from "@mui/material/Radio";
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";
import ProgressBar from "./ProgressBar";
import Button from "@mui/material/Button";

export default function SelectTemplate() {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const metadataEvaluationResult = state.metadataEvaluationResult;
    const metadataArtifact = metadataEvaluationResult.metadataArtifact;
    const metadataId = metadataArtifact.metadataId;

    const recommendationReport = state.recommendationReport;

    const [selectedTemplate, setSelectedTemplate] = useState();

    function handleSelectionChanged(event) {
        setSelectedTemplate(event.target.value);
    };

    function handleBackButton() {
        navigate(-1);
    }

    function handleContinueButton() {
        navigate(-1);
    }

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <h1 class="pageTitle">Select a Metadata Template</h1>
                <h2 class="subTitle">We will use the selected CEDAR template to evaluate the
                    metadata.</h2>
                <div className={"recommendationResult"}>
                    <TableContainer className={"table"}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: 18}} align="center" width="1%"></TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="30%">TEMPLATE
                                        NAME</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="30%">TEMPLATE DESCRIPTION</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="10%">TEMPLATE VERSION</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="10%">RECOMMENDATION SCORE</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="19%">MATCHED
                                        FIELDS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recommendationReport.recommendations.slice(0, 10)
                                    .map((recommendation, index) => {
                                        const template = recommendation.resourceExtract;
                                        const templateId = template['@id'];
                                        const templateName = template['schema:name'];
                                        const templateDescription = template['schema:description'] ? template['schema:description'] : "-";
                                        const templateVersion = template['pav:version'];
                                        const recommendationScore = recommendation['recommendationScore'];
                                        const matchingFields = recommendation['sourceFieldsMatched'];
                                        const metadataFieldsCount = recommendationReport.requestSummary.sourceFieldsCount;
                                        const templateFieldsCount = recommendation['targetFieldsCount'];
                                        const matchingRate = matchingFields * 100 / metadataFieldsCount;
                                        return (
                                            <TableRow key={`template-selection-${index}`}
                                                      sx={{'& > *': {borderBottom: 'unset'}}}>
                                                <TableCell align="center">
                                                    <Radio checked={selectedTemplate === templateId}
                                                           value={templateId}
                                                           onChange={handleSelectionChanged}
                                                           name="template-selection-radio"/>
                                                </TableCell>
                                                <TableCell style={{fontSize: 16}}>{templateName}</TableCell>
                                                <TableCell style={{fontSize: 16}}>{templateDescription}</TableCell>
                                                <TableCell style={{fontSize: 16}}
                                                           align="center">{templateVersion}</TableCell>
                                                <TableCell style={{fontSize: 16}}
                                                           align="center">{(recommendationScore).toFixed(2)}</TableCell>
                                                <TableCell>
                                                    <ProgressBar completed={matchingRate.toFixed(0)}/>
                                                    <span>{matchingFields} / {metadataFieldsCount} fields are matched</span>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{textAlign: "center", marginBottom: "5vh"}}>
                <Button
                    onClick={handleBackButton}
                    className={"generalButton"}
                    variant={"contained"}
                    size={"large"}>
                    Go Back</Button>
                <Button
                    onClick={handleContinueButton}
                    className={"generalButton"}
                    variant={"contained"}
                    size={"large"}>
                    Continue</Button>
            </div>
            <AppFooter/>
        </>
    )
}