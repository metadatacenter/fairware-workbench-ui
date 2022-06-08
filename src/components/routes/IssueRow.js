import _ from "lodash";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import React from "react";

export default function IssueRow({evaluationReport, metadataRecord, metadataIndex, handleValueChange}) {
    const issueDetails = evaluationReport.issueDetails;
    const issueLocation = issueDetails.issueLocation;
    const issueType = issueDetails.issueType;
    const repairCommand = evaluationReport.repairAction.repairCommand;
    const valueSuggestions = evaluationReport.repairAction.valueSuggestions;
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

    function RepairCommand() {
        if (valueSuggestions != null) {
            return (
                <div>
                    <div>{repairCommand}</div>
                    <div>Suggestions:
                        <ul style={{lineHeight: "0"}}>
                            {valueSuggestions.map((valueSuggestion) => (
                                <li><pre><a href={valueSuggestion} target="_blank">{valueSuggestion}</a></pre></li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div>{repairCommand}</div>
            );
        }
    }

    return (
        <TableRow>
            <TableCell align="right">{issueLocation}</TableCell>
            <TableCell>{issueType}</TableCell>
            <TableCell>
                <RepairCommand/>
            </TableCell>
            <TableCell align="right">{originalValueRepresentation}</TableCell>
            <TableCell align="right">{repairedValueRepresentation}</TableCell>
            <TableCell>
                <input style={{float: "left", width: "100%", textAlign: "right"}}
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