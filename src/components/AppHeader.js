import React from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function AppHeader() {

  return (
    <div>
      <AppBar position="static">
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
      </AppBar>

      {/*<AboutDialog openAboutDialog={openAboutDialog} handleCloseAboutDialog={handleCloseAboutDialog}/>*/}
      {/*<ContactUsDialog openContactUsDialog={openContactUsDialog} handleCloseContactUsDialog={handleCloseContactUsDialog}/>*/}

    </div>
  );
}