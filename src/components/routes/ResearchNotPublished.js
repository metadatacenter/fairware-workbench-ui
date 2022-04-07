import React from "react";
import Button from "@mui/material/Button";
import AppFooter from "../common/AppFooter";
import AppHeader from "../common/AppHeader";

export default function ResearchNotPublished() {

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <div className="mainTitle">Research not published</div>
        {/*<div className="mainSubtitle">Get suggestions for improving your metadata. Make your research data more*/}
        {/*  Findable,*/}
        {/*  Accessible, Interoperable*/}
        {/*  and Reusable*/}
        {/*</div>*/}
        <div id={"mainButtons"}>

        </div>
      </div>
      <AppFooter/>
    </>
  );
}