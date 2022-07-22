import React, {useReducer, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SvgIcon from "@mui/material/SvgIcon";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AppFooter from "../../common/AppFooter";
import {evaluateMetadata} from "../../../services/fairwareServices";
import {getEvaluationReportWithPatches, handleEvaluationResults} from "../../../util/evaluationUtil";
import AlignFieldsHeader from "../../common/AlignFieldsHeader";
import LoadingButton from "@mui/lab/LoadingButton";

export default function AlignFields() {

    const navigate = useNavigate();
    const location = useLocation();

    const metadataIndex = location.state.metadataIndex;
    const [evaluationResults, dispatch] = useReducer(handleEvaluationResults, location.state.evaluationResults);
    const enableSummaryReport = location.state.enableSummaryReport;

    const evaluationResult = evaluationResults[metadataIndex];

    const metadataArtifact = evaluationResult.metadataArtifact;
    const metadataSpecification = evaluationResult.metadataSpecification;
    const templateFields = metadataSpecification.templateFields.map((field) => field.name);
    const alignmentReport = evaluationResult.alignmentReport;

    const [evaluating, setEvaluationInProgress] = useState(false);

    function handleInputAutocompleteChange(metadataField, event, value) {
        const fieldAlignments = alignmentReport.fieldAlignments;
        let alignmentIndex = 0;
        for (; alignmentIndex < fieldAlignments.length; alignmentIndex++) {
            const alignmentItem = fieldAlignments[alignmentIndex];
            if (alignmentItem.metadataFieldPath === metadataField) {
                break;
            }
        }
        dispatch({
            type: 'UPDATE_FIELD_ALIGNMENT',
            metadataIndex: metadataIndex,
            alignmentIndex: alignmentIndex,
            data: {
                similarityScore: 1.0,
                metadataFieldPath: metadataField,
                templateFieldPath: value
            }
        })
    }

    async function handleContinueButtonClick() {
        setEvaluationInProgress(true);
        const metadataId = metadataArtifact.metadataId;
        const templateId = metadataSpecification.templateId;
        const fieldAlignments = alignmentReport.fieldAlignments;
        const response = await evaluateMetadata(metadataId, templateId, fieldAlignments);
        const evaluationReport = response.evaluationReport;
        dispatch({
            type: 'UPDATE_EVALUATION_REPORT',
            metadataIndex: metadataIndex,
            data: getEvaluationReportWithPatches(evaluationReport)
        })
        setEvaluationInProgress(false);
        navigate("/EvaluationReport", {
            state: {
                metadataIndex: metadataIndex,
                evaluationResults: evaluationResults,
                enableSummaryReport: enableSummaryReport
            }
        });
    }

    return (
        <>
            <AlignFieldsHeader metadataIndex={metadataIndex}
                               evaluationResults={evaluationResults}
                               enableSummaryReport={enableSummaryReport}/>
            <div id="appContent">
                <div>
                    <h1 className="pageTitle">Align Fields</h1>
                    <h2 className={"subTitle"}>
                        Template: <a href={metadataSpecification.templateUrl}
                                     target="_blank">{metadataSpecification.templateName}</a>
                    </h2>
                    <div>
                        <div className={"alignmentResults"} style={{width: "80%", float: "left"}}>
                            <TableContainer className={"table"} style={{width: "70%"}}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={"header"} width="46%">METADATA FIELD</TableCell>
                                            <TableCell className={"header"} width="8%"></TableCell>
                                            <TableCell className={"header"} width="46%">TEMPLATE FIELD</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {metadataArtifact.metadataFields.map((metadataField, index) => {
                                            const rowColor = (index % 2 === 1) ? "#ffffff" : "#f4f4f4";
                                            const foundValue = alignmentReport.fieldAlignments
                                                .filter((alignment) => alignment.metadataFieldPath === metadataField)
                                            const defaultValue = foundValue.length != 0 ? foundValue[0].templateFieldPath : "";
                                            return (<TableRow key={`field-alignment-${index}`}>
                                                    <TableCell className={"cell"} style={{backgroundColor: rowColor}}>
                                                        {metadataField}
                                                    </TableCell>
                                                    <TableCell className={"cell"} style={{backgroundColor: rowColor}}>
                                                        <SvgIcon component={ArrowForwardIcon}
                                                                 inheritViewBox/>
                                                    </TableCell>
                                                    <TableCell className={"cell"} style={{backgroundColor: rowColor}}>
                                                        <Autocomplete disablePortal
                                                                      options={templateFields}
                                                                      defaultValue={defaultValue}
                                                                      size="small"
                                                                      onChange={(event, value) => handleInputAutocompleteChange(metadataField, event, value)}
                                                                      renderInput={(params) =>
                                                                          <TextField
                                                                              style={{
                                                                                  fontSize: 16,
                                                                                  backgroundColor: "#ffffff"
                                                                              }}
                                                                              fullWidth {...params} />
                                                                      }/>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className={"floatindContinueButton"}>
                            <LoadingButton onClick={handleContinueButtonClick}
                                           className={"generalButton"}
                                           loading={evaluating}
                                           loadingIndicator={"Processing..."}
                                           endIcon={<ArrowForwardIcon/>}
                                           variant={"contained"}
                                           size={"large"}>
                                Continue
                            </LoadingButton>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter/>
        </>
    )
}