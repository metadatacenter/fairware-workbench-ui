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

export default function EvaluationReport() {

    const state = useLocation().state;
    const responses = state && state.results ? state.results : {};

    const [metadataState, setMetadataState] = useState([{...responses}]);

    function handleValueChange(event) {
        const repairedMetadata = [...metadataState];
        const metadataRecord = repairedMetadata[0][event.target.dataset.idx]["metadataRecord"];
        _.set(metadataRecord, event.target.className, event.target.value);
        setMetadataState(repairedMetadata);
    }

    return (
        <>
            <AppHeader/>
            <div id="appContent">
                <h1>Metadata Evaluation Result</h1>
                <div
                    className={"title2"}>Evaluating <b>{responses.length}</b> metadata
                </div>
                <div className={"searchResults"}>
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
                                {responses.map((metadataEvaluation, metadataIndex) => {
                                    let metadataRecord = metadataState[0][metadataIndex]["metadataRecord"];
                                    return <EvaluationRow metadataEvaluation={metadataEvaluation}
                                                          metadataRecord={metadataRecord}
                                                          metadataIndex={metadataIndex}
                                                          handleValueChange={handleValueChange}/>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <AppFooter/>
        </>
    );
}