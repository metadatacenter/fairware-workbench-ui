import React from "react";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Typography from "@material-ui/core/Typography";

export default function Home() {

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <div className="mainTitle">Making data fair</div>
        <div className="mainSubtitle">Get suggestions for improving your metadata. Make your research data more
          Findable,
          Accessible, Interoperable
          and Reusable
        </div>
        <div id={"mainButtons"}>
          <Button component={Link}
                  to="/ResearchNotPublished"
                  className={"mainButton"}
                  variant={"contained"}
                  size={"large"}>
            My research is not yet published</Button>
          <Button
            component={Link}
            to="/FindMetadata"
            className={"mainButton"}
            variant={"contained"}
            size={"large"}>
            My research is published</Button>
        </div>
        <Typography align={"center"}><Link to={"/PrivacyPolicy"}>How this tool uses your data</Link></Typography>
      </div>
      <AppFooter/>
    </>
  );
}