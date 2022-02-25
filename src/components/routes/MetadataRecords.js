import React from "react";
import Button from "@mui/material/Button";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import {shortenUrl} from "../../util/commonUtil";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import {useLocation} from "react-router";
import {useNavigate} from 'react-router-dom';

export default function MetadataRecords() {

  const navigate = useNavigate();
  const state = useLocation().state;
  const results = state.results;

  function handleGoBackButtonClick() {
    navigate("/FindMetadata",
      {
        state: {
          inputText: state.inputText
        }
      });
  }

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <h1>Metadata Records</h1>
        <div className={"searchResults"}>

          {/*<div className={"progressIndicator"}>*/}
          {/*  {searching && <CircularProgress/>}*/}
          {/*</div>*/}

          {results && results.items &&
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
                        <TableCell>{item.metadata ? item.source : "URI not found"}</TableCell>
                        <TableCell>{item.metadata ? item.title : "NA"}</TableCell>
                        <TableCell>{item.metadata ?
                          <Tooltip title={item.schemaId}>
                            <a href={item.schemaId} target="_blank">{shortenUrl(item.schemaId)}</a></Tooltip> : "NA"}
                        </TableCell>
                        <TableCell><IconButton className={"iconButton"}><VisibilityIcon/></IconButton></TableCell>
                        <TableCell><IconButton className={"iconButton"}><DownloadIcon/></IconButton></TableCell>
                      </TableRow>

                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div id={"findMetadataButtons"}>
            <Button onClick={handleGoBackButtonClick}
                    className={"generalButton"}
                    variant={"text"}
                    size={"large"}>
              Go Back</Button>
              <Button
                disabled={results && results.items > 0}
                // onClick={}
                className={"generalButton"}
                variant={"contained"}
                size={"large"}>
                Evaluate All Records</Button>
            </div>

            {/*<div id={"findMetadataButtons"}>*/}
            {/*  <Button*/}
            {/*    disabled={inputText.trim().length === 0}*/}
            {/*    onClick={searchMetadata}*/}
            {/*    className={"generalButton"}*/}
            {/*    variant={"contained"}*/}
            {/*    size={"large"}>*/}
            {/*    Continue</Button>*/}
            {/*</div>*/}
          </>
          }
        </div>

      </div>
      <AppFooter/>
    </>
  );
}