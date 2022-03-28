import React from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Stack from "@mui/material/Stack";
import {Link} from 'react-router-dom';
import logo from '../../../src/FAIRwareLogo.svg';

export default function AppHeader() {

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
            <Button component={Link} to="/FindMetadata" startIcon={<SearchIcon/>} variant={"contained"} size={"medium"}
                    disableElevation>Metadata Search</Button>
            <Button component={Link} to="/MetadataRecords" startIcon={<ListIcon/>} variant={"contained"} size={"medium"} disableElevation>My Records</Button>
            <Button component={Link} to="/SummaryReport" startIcon={<AssessmentOutlinedIcon/>} variant={"contained"} size={"medium"} disableElevation>Summary
              Report</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}