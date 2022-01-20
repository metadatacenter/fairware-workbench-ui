import React from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import Stack from "@mui/material/Stack";

export default function AppHeader() {

  return (
    <div>
      <AppBar id={"appHeader"} position={"static"}>
        <Toolbar>
          <Typography variant="h6">
            FAIRware workbench
          </Typography>
          <Box>
            <Button color="inherit">About</Button>
            <Button color="inherit">Support</Button>
            <Button color="inherit">Resources</Button>
          </Box>
        </Toolbar>
        <Toolbar id={"secondaryToolBar"} variant={"dense"}>
          <Stack direction="row" spacing={2}>
            <Button startIcon={<SearchIcon/>} variant={"contained"} size={"medium"} disableElevation>Metadata Search</Button>
            <Button startIcon={<ListIcon/>} variant={"contained"} size={"medium"} disableElevation>My Records</Button>
            <Button startIcon={<AssessmentOutlinedIcon/>} variant={"contained"} size={"medium"} disableElevation>Summary Report</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      {/*<AboutDialog openAboutDialog={openAboutDialog} handleCloseAboutDialog={handleCloseAboutDialog}/>*/}
      {/*<ContactUsDialog openContactUsDialog={openContactUsDialog} handleCloseContactUsDialog={handleCloseContactUsDialog}/>*/}
    </div>
  );
}