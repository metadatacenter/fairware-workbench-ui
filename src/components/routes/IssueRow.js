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
            <TableCell>{valuePrint}</TableCell>
            <TableCell>
                <input type="text"
                       data-idx={metadataIndex}
                       className={issueLocation}
                       onChange={handleValueChange}
                       value={value}>
                </input>
            </TableCell>
        </TableRow>
    )
}