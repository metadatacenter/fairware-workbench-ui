import React from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ListIcon from '@mui/icons-material/List';
import Stack from "@mui/material/Stack";
import logo from '../../../src/FAIRwareLogo.svg';

export default function EvaluationReportHeader() {

    const navigate = useNavigate();
    const location = useLocation();

    const evaluationResults = location.state.evaluationResults;

    function handleEvaluationResultsListClick(event) {
        navigate("/EvaluationResult", {
            state: {
                evaluationResults: evaluationResults
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
                        {evaluationResults.length > 0 &&
                            <Button onClick={handleEvaluationResultsListClick}
                                    to="/EvaluationResult"
                                    startIcon={<ListIcon/>}
                                    variant={"contained"}
                                    size={"medium"}
                                    disableElevation>Evaluation Results List</Button>}
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}