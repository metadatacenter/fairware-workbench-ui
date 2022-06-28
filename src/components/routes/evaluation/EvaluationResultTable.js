import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import _ from "lodash";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import ResultItem from "./tableRow/ResultItem";
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";

export default function EvaluationResultTable() {

    const state = useLocation().state;
    const evaluationResults = state && state.evaluationResults ? state.evaluationResults : {};
    const [metadataState, setMetadataState] = useState([...evaluationResults]);

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <h1>Metadata Evaluation Result</h1>
                <div
                    className={"title2"}>Evaluating <b>{evaluationResults.length}</b> metadata records
                </div>
                <div className={"evaluationResults"}>
                    <TableContainer className={"table"}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: 18}} align="center" width="20%">METADATA REFERENCE</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="20%">TEMPLATE NAME</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="15%"># OF ISSUES</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="15%">PREVIEW</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="15%">DOWNLOAD</TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="15%"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {evaluationResults.map((evaluationResult, index) => {
                                    return <ResultItem metadataIndex={index}
                                                       metadataEvaluationResult={evaluationResult}/>
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