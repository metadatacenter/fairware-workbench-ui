import _ from "lodash";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import React from "react";

export default function IssueRow({evaluationReport, metadataRecord, metadataIndex, handleValueChange}) {
    const issueDetails = evaluationReport.issueDetails;
    const issueLocation = issueDetails.issueLocation;
    const issueType = issueDetails.issueType;
    const repairCommand = evaluationReport.repairAction.repairCommand;
    const originalValue = _.get(metadataRecord, issueLocation + ".original");
    let originalValueRepresentation = originalValue + "";
    if (typeof (originalValue) === 'string') {
        originalValueRepresentation = "\"" + originalValue + "\"";
    }
    const repairedValue = _.get(metadataRecord, issueLocation + ".replacedBy");
    let repairedValueRepresentation = repairedValue + "";
    if (typeof (repairedValue) === 'string') {
        repairedValueRepresentation = "\"" + repairedValue + "\"";
    }

    return (
        <TableRow key={`${metadataIndex}.${issueLocation}`}>
            <TableCell align="right">{issueLocation}</TableCell>
            <TableCell>{issueType}</TableCell>
            <TableCell>{repairCommand}</TableCell>
            <TableCell align="right">{originalValueRepresentation}</TableCell>
            <TableCell align="right">{repairedValueRepresentation}</TableCell>
            <TableCell>
                <input style={{float:"left", width:"100%", textAlign:"right"}}
                       id={`input-${metadataIndex}.${issueLocation}`}
                       type="text"
                       data-idx={metadataIndex}
                       className={issueLocation}
                       onChange={handleValueChange}>
                </input>
            </TableCell>
        </TableRow>
    )
}