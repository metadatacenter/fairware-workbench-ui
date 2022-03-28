import React, {useState} from "react";
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
import {removeDuplicates, shortenUrl, generateHref} from "../../util/commonUtil";
import IconButton from "@mui/material/IconButton";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import DownloadIcon from '@mui/icons-material/Download';
import {useLocation} from "react-router";
import {useNavigate} from 'react-router-dom';
import {evaluateMetadata} from "../../services/fairwareServices";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export default function MetadataRecords() {

  const navigate = useNavigate();
  const state = useLocation().state;
  const results = state.results;

  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState({});

  function handleGoBackButtonClick() {
    navigate("/FindMetadata",
      {
        state: {
          inputText: state.inputText
        }
      });
  }

  function handleEvaluateMetadataButtonClick() {
    setEvaluating(true);
    let resultsMap = {};
    evaluateMetadata(results.items).then(data => {
      setEvaluating(false);
      data.reduce(function (map, obj) {
        resultsMap[obj.metadataRecordId] = obj;
      }, {});
      setEvaluationResults(resultsMap);
    });
  }

  function handleSeeReportButtonClick(e, item) {
    navigate("/MetadataEvaluationReport",
      {
        state: {
          evaluationResults: evaluationResults[item.uri]
        }
      });
  }

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <h1>Metadata Records</h1>
        <div className={"searchResults"}>
          {results && results.items &&
          <>
            <div className={"title2"}><b>Search results</b></div>
            <span className={"title3"}>{results.items.length} metadata {results.items.length <= 1 && 'record'} {results.items.length > 1 && 'records'} found</span>
            <TableContainer className={"table"} component={"Paper"}>
              <Table /*size="small"*/>
                <TableHead>
                  <TableRow>
                    <TableCell>METADATA RECORD</TableCell>
                    <TableCell>TITLE</TableCell>
                    <TableCell>SOURCE</TableCell>
                    <TableCell>METADATA TEMPLATE</TableCell>
                    <TableCell>EVALUATION STATUS</TableCell>
                    <TableCell># ISSUES</TableCell>
                    <TableCell>PREVIEW</TableCell>
                    <TableCell>DOWNLOAD</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.items
                    .map((item) => (
                      <TableRow key={item.uri}>
                        <TableCell>
                          <Tooltip title={item.uri}>
                            <a href={generateHref(item.uri)} target="_blank">{shortenUrl(item.uri)}</a>
                          </Tooltip>
                        </TableCell>
                        <TableCell>{item.metadata ? item.title : "NA"}</TableCell>
                        <TableCell>{item.metadata ? item.source : "URI not found"}</TableCell>
                        <TableCell>{item.metadata ?
                          <Tooltip title={item.schemaId}>
                            <a href={generateHref(item.schemaId)} target="_blank">{shortenUrl(item.schemaId)}</a></Tooltip> : "NA"}
                        </TableCell>
                        <TableCell>
                          {!evaluationResults[item.uri] && <div className={"wrapIcon"}><WarningRoundedIcon className={"textWarning"}/><span className={"textIcon"}>Not started</span></div>}
                          {evaluationResults[item.uri] && <div className={"wrapIcon"}><CheckCircleRoundedIcon className={"textSuccess"}/><span className={"textIcon"}>Complete</span></div>}
                        </TableCell>
                        <TableCell>{evaluationResults[item.uri] ? evaluationResults[item.uri].items.length : "Not available"}</TableCell>
                        <TableCell align={"center"}><IconButton className={"iconButton"}><VisibilityIcon/></IconButton></TableCell>
                        <TableCell align={"center"}><IconButton className={"iconButton"}><DownloadIcon/></IconButton></TableCell>
                        <TableCell>
                          {evaluationResults[item.uri] &&
                          <Button
                            disabled={evaluationResults[item.uri] && evaluationResults[item.uri].items.length === 0}
                            onClick={(e) => handleSeeReportButtonClick(e, item)}
                            className={"generalButton"}
                            variant={"contained"}
                            size={"small"}>
                            See Report</Button>}
                        </TableCell>
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
                onClick={handleEvaluateMetadataButtonClick}
                className={"generalButton"}
                variant={"contained"}
                size={"large"}>
                Evaluate All Records</Button>
            </div>
          </>
          }

          <div className={"progressIndicator"}>
            {evaluating && <CircularProgress/>}
          </div>

        </div>


      </div>
      <AppFooter/>
    </>
  );
}