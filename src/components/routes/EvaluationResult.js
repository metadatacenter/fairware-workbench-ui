import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import AppHeader from "../common/AppHeader";
import AppFooter from "../common/AppFooter";
import EvaluationRow from "./EvaluationRow";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import _ from "lodash";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function EvaluationReport() {

    const state = useLocation().state;
    const evaluationResults = state && state.evaluationResults ? state.evaluationResults : {};

    const [metadataState, setMetadataState] = useState([...evaluationResults]);
    const [submitting, setSubmissionInProgress] = useState(false);

    function handleValueChange(event) {
        const repairedMetadata = [...metadataState];
        const metadataRecord = repairedMetadata[event.target.dataset.idx]["metadataRecord"];
        const issueLocation = event.target.className
        _.set(metadataRecord, issueLocation + ".replacedBy", event.target.value);
        setMetadataState(repairedMetadata);
    }

    return (
        <>
            <AppHeader/>
            <div id="appContent">
                <h1>Metadata Evaluation Result</h1>
                <div
                    className={"title2"}>Evaluating <b>{evaluationResults.length}</b> metadata
                </div>
                <div className={"evaluationResults"}>
                    <TableContainer className={"table"}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" width="10%">METADATA URI</TableCell>
                                    <TableCell align="center" width="20%">TEMPLATE NAME</TableCell>
                                    <TableCell align="center" width="15%"># OF WARNINGS</TableCell>
                                    <TableCell align="center" width="15%"># OF ERRORS</TableCell>
                                    <TableCell align="center" width="40%"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {evaluationResults.map((metadataEvaluation, metadataIndex) => {
                                    const metadataRecord = metadataState[metadataIndex]["metadataRecord"];
                                    return <EvaluationRow metadataEvaluation={metadataEvaluation}
                                                          metadataRecord={metadataRecord}
                                                          metadataIndex={metadataIndex}
                                                          handleValueChange={handleValueChange}/>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{margin: "auto", textAlign: "center"}} hidden={submitting}>
                    <Button
                        className={"generalButton"}
                        variant={"contained"}
                        size={"large"}>
                        Submit Metadata</Button>
                </div>
                <div className={"submitEvaluation"}>
                    <div className={"progressIndicator"}>
                        {submitting && <CircularProgress/>}
                    </div>
                </div>
            </div>
            <AppFooter/>
        </>
    );
}