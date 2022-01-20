import React from "react";
import Button from "@mui/material/Button";

export default function Home() {

  return (
    <>
      <div className="mainTitle">Making data fair</div>
      <div className="mainSubtitle">Get suggestions for improving your metadata. Make your research data more Findable,
        Accessible, Interoperable
        and Reusable
      </div>
      <div id={"mainButtons"}>
        <Button className={"mainButton"} variant={"contained"} size={"large"}>My research is not yet published</Button>
        <Button className={"mainButton"} variant={"contained"} size={"large"}>My research is published</Button>
      </div>
    </>
  );
}