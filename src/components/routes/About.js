import React from "react";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Typography from "@material-ui/core/Typography";

export default function About() {

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <h1>About</h1>
      </div>
      <AppFooter/>
    </>
  );
}