import React, {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import PublicIcon from '@mui/icons-material/Public';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import SvgIcon from "@mui/material/SvgIcon";
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";
import ProgressBar from "./ProgressBar";
import {alignMetadataFields} from "../../../services/fairwareServices";

export default function SelectTemplate() {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const metadataIndex = state.metadataIndex;

    const metadataArtifact = state.metadataArtifact;
    const metadataId = metadataArtifact.metadataId;

    const recommendationReport = state.recommendationReport;
    const topTemplate = recommendationReport.recommendations[0].resourceExtract['@id'];

    const [selectedTemplate, setSelectedTemplate] = useState(topTemplate);

    function handleSelectionChanged(event) {
        setSelectedTemplate(event.target.value);
    };

    function handleBackButton() {
        navigate(-1);
    }

    async function handleContinueButton() {
        const response = await alignMetadataFields(metadataId, selectedTemplate);
        navigate("/AlignFields",
            {
                state: {
                    metadataIndex: metadataIndex,
                    metadataArtifact: response.metadataArtifact,
                    metadataSpecification: response.metadataSpecification,
                    alignmentReport: response.alignmentReport
                }
            })
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
                    <SvgIcon style={{color: "#aaaaaa"}} component={LooksTwoIcon} inheritViewBox/>&nbsp;&nbsp;
                    <span style={{color: "#aaaaaa", fontWeight: ""}}>Align Fields</span>&nbsp;&nbsp;━&nbsp;&nbsp;
                    <SvgIcon style={{color: "#aaaaaa"}} component={Looks3Icon} inheritViewBox/>&nbsp;&nbsp;
                    <span style={{color: "#aaaaaa", fontWeight: ""}}>Repair Metadata</span>
                </div>
            </div>
            <div id="appContent">
                <h1 class="pageTitle">Select a Metadata Template</h1>
                <h2 class="subTitle">We will use the selected CEDAR template to evaluate the
                    metadata.</h2>
                <div className={"recommendationResult"}>
                    <TableContainer className={"table"}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={"header"} width="1%"></TableCell>
                                    <TableCell className={"header"} width="30%">TEMPLATE NAME</TableCell>
                                    <TableCell className={"header"} width="30%">TEMPLATE DESCRIPTION</TableCell>
                                    <TableCell className={"header"} width="8%">TEMPLATE VERSION</TableCell>
                                    <TableCell className={"header"} width="8%">RECOMMENDATION SCORE</TableCell>
                                    <TableCell className={"header"} width="24%">MATCHED FIELDS</TableCell>
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
                                                <TableCell className={"cell center"}>
                                                    <Radio checked={selectedTemplate === templateId}
                                                           value={templateId}
                                                           onChange={handleSelectionChanged}
                                                           name="template-selection-radio"/>
                                                </TableCell>
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