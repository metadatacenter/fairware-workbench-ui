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
import {useLocation} from "react-router";
import {useNavigate} from 'react-router-dom';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {translateIssueType} from "../../util/evaluationUtil";
import {ISSUE_LEVEL_ERROR, ISSUE_LEVEL_WARNING} from "../../constants";

export default function MetadataEvaluationReport() {

  const navigate = useNavigate();
  const state = useLocation().state;
  const evaluationResults = state && state.evaluationResults ? state.evaluationResults : {};
  const itemUri = state && state.itemUri ? state.itemUri : null;

  function handleGoBackButtonClick() {
    navigate(-1);
    // navigate("/MetadataRecords",
    //   {
    //     state: {
    //       evaluationResults: evaluationResults,
    //     }
    //   });
  }

  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <h1>Metadata Evaluation Report</h1>
        <div
          className={"title2"}><b>{evaluationResults[itemUri].totalIssuesCount}</b> metadata {evaluationResults[itemUri].totalIssuesCount === 1 && 'issue'} {evaluationResults[itemUri].totalIssuesCount !== 1 && 'issues'} found
        </div>
        <div className={"title3"}>
          <span className={"textError"}><b>{evaluationResults[itemUri].errorsCount}</b> errors</span>
          <span>{" - "}</span>
          <span className={"textWarning"}><b>{evaluationResults[itemUri].warningsCount}</b> warnings</span>
        </div>
        <div className={"searchResults"}>
          {evaluationResults[itemUri] && evaluationResults[itemUri].items &&
          <>
            <TableContainer className={"table"}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>FIELD NAME</TableCell>
                    <TableCell>FIELD VALUE</TableCell>
                    <TableCell>ISSUE</TableCell>
                    <TableCell>SUGGESTED REPAIR</TableCell>
                    <TableCell>ACCEPT SUGGESTION?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evaluationResults[itemUri].items
                    .map((item) => (
                      <TableRow key={item.metadataFieldPath}>
                        <TableCell><b>{item.metadataFieldPath}</b></TableCell>
                        <TableCell><span>(empty)</span>
                          {/*{item.issue.issueLevel === ISSUE_LEVEL_ERROR && <span className="textError">(empty)</span>}*/}
                          {/*{item.issue.issueLevel === ISSUE_LEVEL_WARNING && <span className="textWarning">(empty)</span>}*/}
                        </TableCell>
                        <TableCell>
                          {item.issue.issueLevel === ISSUE_LEVEL_ERROR &&
                          <div className={"wrapIcon wrapIconError"}>
                            <ErrorRoundedIcon/>
                            <span className={"textIcon"}>{translateIssueType(item.issue.issueType)}</span>
                          </div>}
                          {item.issue.issueLevel === ISSUE_LEVEL_WARNING &&
                          <div className={"wrapIcon wrapIconWarning"}>
                            <WarningRoundedIcon/>
                            <span className={"textIcon"}>{translateIssueType(item.issue.issueType)}</span>
                          </div>}
                        </TableCell>
                        <TableCell>{item.repairAction.message}</TableCell>
                        <TableCell>
                          <Button
                            // disabled={evaluationResults[item.uri] && evaluationResults[item.uri].items.length === 0}
                            disabled={true}
                            className={"generalButton"}
                            variant={"contained"}
                            size={"small"}>
                            Accept</Button>
                          <Button
                            // disabled={evaluationResults[item.uri] && evaluationResults[item.uri].items.length === 0}
                            disabled={true}
                            className={"generalButton"}
                            variant={"contained"}
                            size={"small"}>
                            Decline</Button>
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
            </div>
          </>
          }
        </div>
      </div>
      <AppFooter/>
    </>
  );
}