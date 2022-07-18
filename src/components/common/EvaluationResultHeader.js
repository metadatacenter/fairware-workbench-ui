import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReportOffIcon from '@mui/icons-material/ReportOff';
import Stack from "@mui/material/Stack";
import logo from '../../../src/FAIRwareLogo.svg';
import {generateSummaryReport} from "../../services/fairwareServices";

export default function EvaluationResultHeader(props) {

    const navigate = useNavigate();

    const evaluationResults = props.evaluationResults;
    const enableSummaryReport = props.enableSummaryReport;

    function handleSummaryReportButtonClick() {
        navigate("/SummaryReport", {
            state: {
                summaryReport: generateSummaryReport(evaluationResults)
            }
        })
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
                    <Stack id={"headerButtonsContainer"} direction="row" spacing={2}>
                        <Button component={Link}
                                to="/EvaluateMetadata"
                                startIcon={<SearchIcon/>}
                                variant={"contained"}
                                size={"medium"}
                                disableElevation>New Evaluation</Button>
                        <Button onClick={handleSummaryReportButtonClick}
                                startIcon={enableSummaryReport ? <AssessmentIcon/> : <ReportOffIcon/>}
                                variant={"contained"}
                                size={"medium"}
                                disabled={!enableSummaryReport}
                                disableElevation>Summary Report</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}