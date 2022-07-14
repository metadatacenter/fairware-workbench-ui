import React, {useState} from "react";
import Button from "@mui/material/Button";
import EvaluationReportHeader from "../common/EvaluationReportHeader";
import AppFooter from "../common/AppFooter";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import {searchMetadataByDois} from "../../services/fairwareServices";
import {removeDuplicates} from "../../util/commonUtil";
import CircularProgress from "@mui/material/CircularProgress";
import {useLocation, useNavigate} from 'react-router-dom';
import biosampleInput from "../../resources/sampleInputs/biosample.txt";

export default function FindMetadata() {

  const navigate = useNavigate();
  const location = useLocation();
  const it = location && location.state && location.state.inputText ? location.state.inputText : "";

  const [inputText, setInputText] = useState(it);
  const [searching, setSearching] = useState(false);


  // TODO: read from input file (using 'readInputFromFile' function defined below)
  const sampleInput1 = "https://repo.metadatacenter.org/template-instances/50a55feb-dbbf-457d-b2c0-6e36a162106c\n" +
    "https://repo.metadatacenter.org/template-instances/4407ab01-4cc9-4998-8cdf-7ad8d6c05753\n" +
    "https://repo.metadatacenter.org/template-instances/cacb0731-4b2a-48d0-8368-7a9b3b405e3a\n" +
    "https://repo.metadatacenter.org/template-instances/cc2ccd04-18f5-4313-b6a7-8fef7e72bf4d\n" +
    "https://repo.metadatacenter.org/template-instances/094ccd43-6f84-455e-a498-b53d5927a434\n" +
    "https://repo.metadatacenter.org/template-instances/e93d0f1a-0e14-461b-aeda-ea202b3d034b\n" +
    "https://repo.metadatacenter.org/template-instances/0f697b6c-f826-436e-b05d-3043d43b4ba7\n" +
    "https://repo.metadatacenter.org/template-instances/550033d8-3a1d-4e99-ae3f-2deefd970300\n" +
    "https://repo.metadatacenter.org/template-instances/35226e4d-8401-45a6-8f55-f5346ef4c1e8\n" +
    "https://repo.metadatacenter.org/template-instances/0275ce04-ed3a-4e01-a4ba-6b28f3a02b87\n" +
    "https://repo.metadatacenter.org/template-instances/0e1d4a79-026d-4320-a22a-bf2d03538414\n" +
    "https://repo.metadatacenter.org/template-instances/10b7f00c-8374-4369-a122-214624343c4d\n" +
    "https://repo.metadatacenter.org/template-instances/39406788-e9d5-412e-9495-b472bc29f5f4\n" +
    "https://repo.metadatacenter.org/template-instances/f9d4da71-5035-4511-a20d-b81cbbc5b5e3\n" +
    "https://repo.metadatacenter.org/template-instances/3fc77f64-ef2c-4064-8a99-4a8bffb3e263\n" +
    "https://repo.metadatacenter.org/template-instances/0bb0623f-52f7-42ae-84e7-b850fec1489f\n" +
    "https://repo.metadatacenter.org/template-instances/3f0e3652-2f20-482b-a344-d2b088d04d74\n" +
    "https://repo.metadatacenter.org/template-instances/beb219a7-a6d1-45b4-a116-30456c0a4e50\n" +
    "https://repo.metadatacenter.org/template-instances/24840930-43d8-4de1-a3ad-56b25bb5b4f2\n" +
    "https://repo.metadatacenter.org/template-instances/ca4b0f2f-0421-42ea-bc61-ec3d53447e10\n" +
    "https://repo.metadatacenter.org/template-instances/f05b436a-db8b-4598-9f35-8d62da068362\n" +
    "https://repo.metadatacenter.org/template-instances/8ac3e78c-ef1f-4199-b95a-ba6c467425ed\n" +
    "https://repo.metadatacenter.org/template-instances/909e3372-3dde-4ca9-a2e4-c4aa96d62815\n" +
    "https://repo.metadatacenter.org/template-instances/066a5fdf-6775-42af-a29f-3f249c8faf91\n" +
    "https://repo.metadatacenter.org/template-instances/fab8c84b-0991-4f52-ac19-4ba20c628721\n" +
    "https://repo.metadatacenter.org/template-instances/68721fe3-be4f-4989-9516-2edf706a9bca\n" +
    "https://repo.metadatacenter.org/template-instances/6d2c4199-6f6a-410c-bcb4-23f7b42c894e\n" +
    "https://repo.metadatacenter.org/template-instances/a60bd578-7d36-466f-bba3-0acc676d12af\n" +
    "https://repo.metadatacenter.org/template-instances/37499476-2770-4665-a61b-4f48fbe9f3be\n" +
    "https://repo.metadatacenter.org/template-instances/fd75f33d-209d-4ba2-b80f-e0f974c32207\n" +
    "https://repo.metadatacenter.org/template-instances/c4843efa-6d44-4d9e-8732-7d7ae12c35f2\n" +
    "https://repo.metadatacenter.org/template-instances/b81f0212-5606-474a-9382-e8f01a26c8d0\n" +
    "https://repo.metadatacenter.org/template-instances/06ff6789-96f8-41ce-b77b-8fdab44430cf\n" +
    "https://repo.metadatacenter.org/template-instances/18919281-b2d4-4a77-a2ba-57f8f74edf5e\n" +
    "https://repo.metadatacenter.org/template-instances/3169f35a-5c7b-45e3-ac78-c4ad50bd980b\n" +
    "https://repo.metadatacenter.org/template-instances/905970c8-3c03-46ca-a7c6-92ad047da4af\n" +
    "https://repo.metadatacenter.org/template-instances/489542b7-c301-4158-8be2-14a5b636b34c\n" +
    "https://repo.metadatacenter.org/template-instances/564425d9-840a-44da-908a-21486c304bb6\n" +
    "https://repo.metadatacenter.org/template-instances/83141cb1-4797-42c5-a4f5-f7d304905b67\n" +
    "https://repo.metadatacenter.org/template-instances/ccbf37ea-601c-4f59-9563-0d127285602f\n" +
    "https://repo.metadatacenter.org/template-instances/99b5e6e6-9908-42f4-955e-d1e022feb51f\n" +
    "https://repo.metadatacenter.org/template-instances/f6463e43-cdd7-46d1-b60e-b800d6a40b43\n" +
    "https://repo.metadatacenter.org/template-instances/f27445e2-c349-483b-a73d-301c913804c4\n" +
    "https://repo.metadatacenter.org/template-instances/ab1ebada-c35e-4f3b-8b72-4fb28026feb8\n" +
    "https://repo.metadatacenter.org/template-instances/d0506d6d-9987-4a4b-ab8e-c3ebc2a545ac\n" +
    "https://repo.metadatacenter.org/template-instances/c81b0f05-a2ee-461e-8eb0-0b295f72a63a\n" +
    "https://repo.metadatacenter.org/template-instances/8c9698f2-e5ff-4ad4-acc2-c29b1bc0f8a8\n" +
    "https://repo.metadatacenter.org/template-instances/0ac7dd32-a581-4c09-9343-4863c07c29c7\n" +
    "https://repo.metadatacenter.org/template-instances/ab8c0a70-bbe0-428e-904c-581314533187\n" +
    "https://repo.metadatacenter.org/template-instances/30f4a555-91f7-44be-8fc5-442862c3b538";

  const sampleInput2 = "10.15468/9vuieb\n" +
    "10.4230/lipics.iclp.2011.16";
  const sampleInput3 = sampleInput1 + "\n" + sampleInput2;

  function readInputFromFile(file) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        // Do something with your data
        return data;
      });
  }

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
      <EvaluationReportHeader/>
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