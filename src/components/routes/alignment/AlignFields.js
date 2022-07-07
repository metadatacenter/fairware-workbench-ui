import React, {useState} from "react";
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
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";
import {evaluateMetadata} from "../../../services/fairwareServices";

export default function AlignFields() {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const metadataIndex = state.metadataIndex;
    const metadataArtifact = state.metadataArtifact;
    const metadataSpecification = state.metadataSpecification;
    const templateFields = Object.keys(metadataSpecification.templateFields);
    const alignmentReport = state.alignmentReport;

    const [evaluating, setEvaluationInProgress] = useState(false);

    function handleBackButton() {
        navigate(-1);
    }

    async function handleContinueButton() {
        setEvaluationInProgress(true);
        const metadataId = metadataArtifact.metadataId;
        const templateId = metadataSpecification.templateId;
        const fieldAlignments = alignmentReport.fieldAlignments;
        const response = await evaluateMetadata(metadataId, templateId, fieldAlignments);
        const evaluationReport = response.evaluationReport;
        evaluationReport.evaluationReportItems
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
            });
        setEvaluationInProgress(false);
        navigate("/EvaluationReport",
            {
                state: {
                    metadataIndex: metadataIndex,
                    metadataArtifact: metadataArtifact,
                    metadataSpecification: metadataSpecification,
                    alignmentReport: alignmentReport,
                    evaluationReport: evaluationReport
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
            <div id="appContent">
                <h1 className="pageTitle">Align Fields</h1>
                <h2 className="subTitle">Template: {metadataSpecification.templateName}</h2>
                <div className={"recommendationResult"}>
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
            <div style={{textAlign: "center", marginBottom: "5vh"}}>
                <div hidden={evaluating}>
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