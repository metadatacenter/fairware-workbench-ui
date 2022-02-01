import React, {useState} from "react";
import Button from "@mui/material/Button";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";

export default function FindMetadata() {

  const [inputText, setInputText] = useState("");

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <div className="mainTitle">Find your Metadata</div>
        <div className="mainSubtitle">Enter one or more DOIs. We'll look for the associated metadata</div>
        <div className="inputTextFieldContainer">
          <TextField
            id="mainInputTextField"
            multiline
            rows={4}
            defaultValue={""}
            onChange={handleInputChange}
            helperText="Enter DOIs (one per line). Example: https://doi.org/10.15468/9vuieb"
          />
        </div>
        <div id={"findMetadataButtons"}>
          <Button component={Link}
                  to="/"
                  className={"generalButton"}
                  variant={"text"}
                  size={"large"}>
            Go Back</Button>
          <Button
            disabled={inputText.trim().length === 0}
            component={Link}
            to="/FindMetadata"
            className={"generalButton"}
            variant={"contained"}
            size={"large"}>
            Search</Button>
        </div>
      </div>
      <AppFooter/>
    </>
  );
}