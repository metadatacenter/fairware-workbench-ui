import React, {useReducer} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProgressBar from "./ProgressBar";
import SelectTemplateHeader from "../../common/SelectTemplateHeader";
import AppFooter from "../../common/AppFooter";
import {alignMetadataFields} from "../../../services/fairwareServices";
import {handleEvaluationResults} from "../../../util/evaluationUtil";

export default function SelectTemplate() {

    const navigate = useNavigate();
    const location = useLocation();

    const metadataIndex = location.state.metadataIndex;
    const [evaluationResults, dispatch] = useReducer(handleEvaluationResults, location.state.evaluationResults);

    const evaluationResult = evaluationResults[metadataIndex];

    const metadataArtifact = evaluationResult.metadataArtifact;
    const metadataId = metadataArtifact.metadataId;

    const recommendationReport = evaluationResult.recommendationReport;

    async function handleContinueButton(event, selectedTemplate) {
        const response = await alignMetadataFields(metadataId, selectedTemplate);
        dispatch({
            type: 'UPDATE_METADATA_SPECIFICATION',
            metadataIndex: metadataIndex,
            data: response.metadataSpecification
        });
        dispatch({
            type: 'UPDATE_ALIGNMENT_REPORT',
            metadataIndex: metadataIndex,
            data: response.alignmentReport
        });
        navigate("/AlignFields", {
            state: {
                metadataIndex: metadataIndex,
                evaluationResults: evaluationResults,
            }
        });
    }

    return (
        <>
            <SelectTemplateHeader metadataIndex={metadataIndex} evaluationResults={evaluationResults}/>
            <div id="appContent">
                <h1 className="pageTitle">Select a Metadata Template</h1>
                <h2 className="subTitle">Use the arrow icon to select the CEDAR template for evaluating the
                    metadata.</h2>
                <div className={"recommendationResults"}>
                    <TableContainer className={"table"} style={{marginBottom: "8vh"}}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={"header"} width="30%">TEMPLATE NAME</TableCell>
                                    <TableCell className={"header"} width="30%">TEMPLATE DESCRIPTION</TableCell>
                                    <TableCell className={"header"} width="8%">TEMPLATE VERSION</TableCell>
                                    <TableCell className={"header"} width="8%">RECOMMENDATION SCORE</TableCell>
                                    <TableCell className={"header"} width="24%">MATCHED FIELDS</TableCell>
                                    <TableCell className={"header"} width="1%"></TableCell>
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
                                                <TableCell className={"cell"}>{templateName}</TableCell>
                                                <TableCell className={"cell"}>{templateDescription}</TableCell>
                                                <TableCell className={"cell center"}>{templateVersion}</TableCell>
                                                <TableCell className={"cell center"}>
                                                    {(recommendationScore).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <ProgressBar completed={matchingRate.toFixed(0)}/>
                                                    <span
                                                        style={{fontSize: 14}}>{matchingFields} / {metadataFieldsCount} fields are matched</span>
                                                </TableCell>
                                                <TableCell className={"cell center"}>
                                                    <IconButton onClick={(e) => handleContinueButton(e, templateId)}
                                                                className={"generalButton"}
                                                                variant={"contained"}
                                                                size={"small"}>
                                                        <ArrowForwardIosIcon/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <AppFooter/>
        </>
    )
}