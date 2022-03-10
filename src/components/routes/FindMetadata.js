import React, {useState} from "react";
import Button from "@mui/material/Button";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import {searchMetadataByDois} from "../../services/fairwareServices";
import {removeDuplicates} from "../../util/commonUtil";
import CircularProgress from "@mui/material/CircularProgress";
import {useLocation, useNavigate} from 'react-router-dom';

export default function FindMetadata() {

  const navigate = useNavigate();
  const location = useLocation();
  const it = location && location.state && location.state.inputText ? location.state.inputText : "";

  const [inputText, setInputText] = useState(it);
  //const [results, setResults] = useState({});
  const [searching, setSearching] = useState(false);


  const sampleInput1 = "https://repo.metadatacenter.org/template-instances/8e21af07-33ca-4ce3-8e84-d4e3fbe017b6\n" +
    "https://repo.metadatacenter.org/template-instances/7a1ab52b-29ba-41bc-98a1-80f4d5bd696c\n" +
    "https://repo.metadatacenter.org/template-instances/fc07cd73-0a73-4171-84dd-32cf0dec6d32\n" +
  "https://repo.metadatacenter.org/template-instances/392f4f43-2b78-4016-bd66-b5cce4b38d38\n" +
  "https://repo.metadatacenter.org/template-instances/a838e6b6-3257-4551-bedd-229776b20611";
  const sampleInput2 = "10.15468/9vuieb\n" +
    "10.4230/lipics.iclp.2011.16";
  const sampleInput3 = sampleInput1 + "\n" + sampleInput2;

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function handleSampleInput1Click() {
    setInputText(sampleInput1);
  }

  function handleSampleInput2Click() {
    setInputText(sampleInput2);
  }

  function handleSampleInput3Click() {
    setInputText(sampleInput3);
  }

  function handleSearchMetadataButtonClick() {
    setSearching(true);
    let dois = inputText.split("\n").map(e => e.trim());
    dois = removeDuplicates(dois);
    searchMetadataByDois(dois).then(data => {
      setSearching(false);
      navigate("/MetadataRecords",
        {
          state: {
            inputText: inputText,
            results: data
          }
        });
    });
  }

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <div className="mainTitle">Find your Metadata</div>
        <div className="mainSubtitle">Enter one or more URIs. We'll look for the associated metadata</div>
        <div className="inputTextFieldContainer">
          <TextField
            id="mainInputTextField"
            multiline
            rows={4}
            onChange={handleInputChange}
            value={inputText}
            helperText="Enter URIs (one per line)"
          />
          <div className={"sampleInputButton"}>
            <Link component="button" onClick={handleSampleInput1Click}>sample input 1</Link>
            <span>&nbsp;&nbsp;</span>
            <Link component="button" onClick={handleSampleInput2Click}>sample input 2</Link>
            <span>&nbsp;&nbsp;</span>
            <Link component="button" onClick={handleSampleInput3Click}>sample input 3</Link>
          </div>
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
            onClick={handleSearchMetadataButtonClick}
            className={"generalButton"}
            variant={"contained"}
            size={"large"}>
            Search</Button>
        </div>

        <div className={"searchResults"}>

          <div className={"progressIndicator"}>
            {searching && <CircularProgress/>}
          </div>

        </div>
      </div>
      <AppFooter/>
    </>
  );
}