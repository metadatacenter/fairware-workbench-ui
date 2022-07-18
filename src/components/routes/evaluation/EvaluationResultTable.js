import React, {useReducer} from "react";
import {useLocation} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import ResultItem from "./tableRow/ResultItem";
import EvaluationResultHeader from "../../common/EvaluationResultHeader";
import AppFooter from "../../common/AppFooter";
import {handleEvaluationResults} from "../../../util/evaluationUtil";

export default function EvaluationResultTable() {

    const location = useLocation();

    const [evaluationResults, dispatch] = useReducer(handleEvaluationResults, location.state.evaluationResults)
    const enableSummaryReport = location.state.enableSummaryReport;

    return (
        <>
            <EvaluationResultHeader evaluationResults={evaluationResults} enableSummaryReport={enableSummaryReport}/>
            <div id="appContent">
                <h1 className="pageTitle">Metadata Evaluation Result</h1>
                <h2 className="subTitle">Evaluating <b>{evaluationResults.length}</b> metadata records</h2>
                <div className={"evaluationResults"}>
                    <TableContainer className={"table"}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={"header"} width="20%">METADATA REFERENCE</TableCell>
                                    <TableCell className={"header"} width="25%">TEMPLATE NAME</TableCell>
                                    <TableCell className={"header"} width="15%"># OF ISSUES</TableCell>
                                    <TableCell className={"header"} width="10%">PREVIEW</TableCell>
                                    <TableCell className={"header"} width="10%">DOWNLOAD</TableCell>
                                    <TableCell className={"header"} width="20%"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {evaluationResults.map((evaluationResult, index) => {
                                    return <ResultItem key={`evaluation-result-${index}`}
                                                       metadataIndex={index}
                                                       evaluationResults={evaluationResults}
                                                       dispatch={dispatch}/>
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