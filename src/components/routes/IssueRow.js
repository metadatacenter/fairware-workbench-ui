import _ from "lodash";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import React from "react";

export default function IssueRow({evaluationReport, metadataRecord, metadataIndex, handleValueChange}) {
    const issueDetails = evaluationReport.issueDetails;
    const issueLocation = issueDetails.issueLocation;
    const issueType = issueDetails.issueType;
    const repairCommand = evaluationReport.repairAction.repairCommand;
    const value = _.get(metadataRecord, issueLocation);
    let valuePrint = value + "";
    if (typeof (value) === 'string') {
        valuePrint = "\"" + value + "\"";
    }
    return (
        <TableRow key={`${metadataIndex}.${issueLocation}`}>
            <TableCell align="right">{issueLocation}</TableCell>
            <TableCell>{issueType}</TableCell>
            <TableCell>{repairCommand}</TableCell>
            <TableCell align="right">{valuePrint}</TableCell>
            <TableCell>
                <div>
                    <input style={{float: "left", width: "70%"}}
                           id={`input-${metadataIndex}.${issueLocation}`}
                           type="text"
                           data-idx={metadataIndex}
                           className={issueLocation}
                           onChange={handleValueChange}>
                    </input>
                    <button style={{float: "left"}}>Use Original
                    </button>
                </div>
            </TableCell>
        </TableRow>
    )
}