import React from "react";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

export default function PrivacyPolicy() {

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <h1>Privacy Policy</h1>
      </div>
      <AppFooter/>
    </>
  );
}