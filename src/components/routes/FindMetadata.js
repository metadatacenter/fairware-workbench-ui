import React, {useState} from "react";
import Button from "@mui/material/Button";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import {searchMetadataByDois} from "../../services/fairwareServices";
import {removeDuplicates, shortenUrl, truncate} from "../../util/commonUtil";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function FindMetadata() {

  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState({});
  const [searching, setSearching] = useState(false);

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function handleSampleInput1Click(event) {
    let sampleInput = "https://repo.metadatacenter.org/template-instances/8e21af07-33ca-4ce3-8e84-d4e3fbe017b6\n" +
      "https://repo.metadatacenter.org/template-instances/7a1ab52b-29ba-41bc-98a1-80f4d5bd696c";
    setInputText(sampleInput);
  }

  function handleSampleInput2Click(event) {
    let sampleInput = "10.15468/9vuieb\n" +
      "10.4230/lipics.iclp.2011.16";
    setInputText(sampleInput);
  }

  function searchMetadata() {
    setSearching(true);
    setResults({}); // Clear previous results
    let dois = inputText.split("\n").map(e => e.trim());
    dois = removeDuplicates(dois);
    searchMetadataByDois(dois).then(data => {
      setSearching(false);
      setResults(data);
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
            onClick={searchMetadata}
            className={"generalButton"}
            variant={"contained"}
            size={"large"}>
            Search</Button>
        </div>

        <div className={"searchResults"}>

          <div className={"progressIndicator"}>
            {searching && <CircularProgress/>}
          </div>

          {results.items &&
          <>
            <div className={"title2"}>Search results</div>
            <span>{results.items.length} metadata {results.items.length <= 1 && 'record'} {results.items.length > 1 && 'records'} found</span>
            <TableContainer className={"table"}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>URI</TableCell>
                    <TableCell>SOURCE</TableCell>
                    <TableCell>TITLE</TableCell>
                    <TableCell>METADATA SCHEMA</TableCell>
                    <TableCell>PREVIEW</TableCell>
                    <TableCell>DOWNLOAD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.items
                    .map((item) => (
                      <TableRow key={item.uri}>
                        <TableCell>
                          <Tooltip title={item.uri}>
                            <a href={"https://doi.org/" + item.uri} target="_blank">{shortenUrl(item.uri)}</a>
                          </Tooltip>
                        </TableCell>
                        <TableCell>{item.uri ? item.source : "URI not found"}</TableCell>
                        <TableCell>{item.uri ? item.title : "NA"}</TableCell>
                        <TableCell>{item.uri ?
                          <Tooltip title={item.schemaId}>
                            <a href={item.schemaId} target="_blank">{shortenUrl(item.schemaId)}</a></Tooltip>: "NA"}
                        </TableCell>
                        <TableCell><IconButton className={"iconButton"}><VisibilityIcon/></IconButton></TableCell>
                        <TableCell><IconButton className={"iconButton"}><DownloadIcon/></IconButton></TableCell>
                      </TableRow>

                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div id={"findMetadataButtons"}>
              <Button
                disabled={inputText.trim().length === 0}
                onClick={searchMetadata}
                className={"generalButton"}
                variant={"contained"}
                size={"large"}>
                Continue</Button>
            </div>
          </>
          }
        </div>
      </div>
      <AppFooter/>
    </>
  );
}