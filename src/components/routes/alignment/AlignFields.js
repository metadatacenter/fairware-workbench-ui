import React, {useReducer, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PublicIcon from "@mui/icons-material/Public";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";
import {evaluateMetadata} from "../../../services/fairwareServices";
import {getEvaluationReportWithPatches, handleEvaluationResults} from "../../../util/evaluationUtil";

export default function AlignFields() {

    const navigate = useNavigate();
    const location = useLocation();

    const metadataIndex = location.state.metadataIndex;
    const [evaluationResults, dispatch] = useReducer(handleEvaluationResults, location.state.evaluationResults);

    const evaluationResult = evaluationResults[metadataIndex];

    const metadataArtifact = evaluationResult.metadataArtifact;
    const metadataSpecification = evaluationResult.metadataSpecification;
    const templateFields = Object.keys(metadataSpecification.templateFields);
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

    function handleBackButton() {
        navigate("/SelectTemplate", {
            state: {
                metadataIndex: metadataIndex,
                evaluationResults: evaluationResults
            }
        });
    }

    async function handleViewEvaluationReportButton() {
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
                evaluationResults: evaluationResults
            }
        });
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
                    <SvgIcon style={{color: "#aaaaaa"}} component={Looks3Icon} inheritViewBox/>&nbsp;&nbsp;
                    <span style={{color: "#aaaaaa", fontWeight: ""}}>Repair Metadata</span>
                </div>
            </div>
            <div style={{width: "100%", paddingTop: "0.5vh", paddingLeft: "40px", marginBottom: "-3vh"}}>
                <Button onClick={handleBackButton}
                        className={"generalButton"}
                        size={"large"}
                        startIcon={<ArrowBackIcon/>}>
                    Back to Template Selection
                </Button>
            </div>
            <div id="appContent">
                <h1 className="pageTitle">Align Fields</h1>
                <h2 className={"subTitle"}>
                    Template: <a href={metadataSpecification.templateUrl}
                                 target="_blank">{metadataSpecification.templateName}</a>
                </h2>
                <div className={"alignmentResults"}>
                    <TableContainer className={"table"} style={{width: "50%"}}>
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
                                                                      style={{fontSize: 16, backgroundColor: "#ffffff"}}
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
            </div>
            <div style={{width: "100%", textAlign: "center", margin: "3vh auto"}}>
                <div hidden={evaluating}>
                    <Button onClick={handleViewEvaluationReportButton}
                            className={"generalButton"}
                            variant={"contained"}
                            size={"large"}>
                        View Evaluation Report
                    </Button>
                </div>
                <div className={"evaluateMetadata"}>
                    <div className={"progressIndicator"}>
                        {evaluating && <CircularProgress/>}
                    </div>
                </div>
            </div>
            <AppFooter/>
        </>
    )
}