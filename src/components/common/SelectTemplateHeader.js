import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import logo from '../../../src/FAIRwareLogo.svg';
import SvgIcon from "@mui/material/SvgIcon";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import PublicIcon from "@mui/icons-material/Public";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SelectTemplateHeader(props) {

    const navigate = useNavigate();

    const metadataIndex = props.metadataIndex;
    const evaluationResults = props.evaluationResults;
    const enableSummaryReport = props.enableSummaryReport;

    const evaluationResult = evaluationResults[metadataIndex];

    function handleBackToEvaluationResultButtonClick() {
        navigate("/EvaluationResult", {
            state: {
                metadataIndex: metadataIndex,
                evaluationResults: evaluationResults,
                enableSummaryReport: enableSummaryReport
            }
        });
    }

    return (
        <div>
            <AppBar id={"appHeader"} position={"static"}>
                <Toolbar>
                    <div id={"logoContainer"}>
                        <Link to="/"><img className={"logo"} src={logo} alt="logo"/></Link>
                    </div>
                    <Stack id={"linksContainer"} direction="row" spacing={4}>
                        <Button component={Link} to="/About" color="inherit">About</Button>
                        <Button component={Link} to="/Support" color="inherit">Support</Button>
                        <Button component={Link} to="/Resources" color="inherit">Resources</Button>
                    </Stack>
                </Toolbar>
                <Toolbar id={"secondaryToolBar"} variant={"dense"}>
                    <Stack id={"headerButtonsContainer"} direction="row" spacing={4}>
                    </Stack>
                </Toolbar>
                <div id="appSubHeader">
                    <div style={{
                        width: "25%",
                        float: "left",
                        paddingLeft: "50px",
                        display: "flex",
                        flexWrap: "wrap"
                    }}>
                        <Button style={{margin: "0", padding: "0"}}
                                onClick={handleBackToEvaluationResultButtonClick}
                                className={"generalButton"}
                                size={"large"}
                                startIcon={<ArrowBackIcon/>}>
                            Back to Evaluation Result
                        </Button>
                    </div>
                    <div style={{
                        width: "50%",
                        float: "left",
                        paddingLeft: "150px",
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap"
                    }}>
                        <SvgIcon style={{color: "#1e5aab"}} component={LooksOneIcon} inheritViewBox/>&nbsp;&nbsp;
                        <span style={{
                            color: "#1e5aab",
                            fontWeight: "bold"
                        }}>Select Template</span>&nbsp;&nbsp;━&nbsp;&nbsp;
                        <SvgIcon style={{color: "#aaaaaa"}} component={LooksTwoIcon} inheritViewBox/>&nbsp;&nbsp;
                        <span style={{color: "#aaaaaa", fontWeight: ""}}>Align Fields</span>&nbsp;&nbsp;━&nbsp;&nbsp;
                        <SvgIcon style={{color: "#aaaaaa"}} component={Looks3Icon} inheritViewBox/>&nbsp;&nbsp;
                        <span style={{color: "#aaaaaa", fontWeight: ""}}>Repair Metadata</span>
                    </div>
                    <div style={{
                        width: "20%",
                        float: "right",
                        display: "flex",
                        flexWrap: "wrap",
                        color: "#444444"
                    }}>
                        <SvgIcon component={PublicIcon}/>&nbsp;&nbsp;
                        <span>{evaluationResult.metadataArtifact.metadataId}</span>
                    </div>
                </div>
            </AppBar>
        </div>
    );
}