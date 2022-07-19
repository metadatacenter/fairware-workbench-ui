import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import logo from '../../../src/FAIRwareLogo.svg';
import ListIcon from "@mui/icons-material/List";

export default function SummaryReportHeader(props) {

    const navigate = useNavigate();

    const evaluationResults = props.evaluationResults;
    const enableSummaryReport = props.enableSummaryReport;

    function handleBackToEvaluationResultButtonClick() {
        navigate("/EvaluationResult", {
            state: {
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
                        <Button onClick={handleBackToEvaluationResultButtonClick}
                                to="/EvaluationResult"
                                startIcon={<ListIcon/>}
                                variant={"contained"}
                                size={"medium"}
                                disableElevation>Evaluation Results List</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}