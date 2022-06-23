import React from "react";
import _ from "lodash";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";

export default function IssueRow({metadataRecord, metadataIndex, evaluationReport, handleValueChange}) {
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
    const newValue = _.get(metadataRecord, issueLocation + ".replacedBy");

    function handleValueClicked(event) {
        const inputElement = document.getElementById(`input-${metadataIndex}.${issueLocation}`);
        const value = event.target.innerHTML;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
        ).set;
        nativeInputValueSetter.call(inputElement, value);
        const inputEvent = new Event("input", {bubbles: true});
        inputElement.dispatchEvent(inputEvent);
    }

    if (valueSuggestions != null) {
        return (<TableRow>
                <TableCell align="right">{issueLocation}</TableCell>
                <TableCell align="center">{originalValueRepresentation}</TableCell>
                <TableCell align="center">{issueType}</TableCell>
                <TableCell>
                    <div>
                        <div><input style={{float: "left", width: "100%"}}
                                    id={`input-${metadataIndex}.${issueLocation}`}
                                    type="text"
                                    data-idx={metadataIndex}
                                    className={issueLocation}
                                    onInputCapture={handleValueChange}
                                    value={newValue}>
                        </input></div>
                        <div style={{paddingTop: "2em"}}><b>Value suggestions</b>:
                            <ul style={{marginTop: "0"}}>
                                {valueSuggestions.map((valueSuggestion, index) => (
                                    <li>
                                        <div key={`suggestion-${index}`}
                                             style={{cursor: "pointer", textDecoration: "underline", color: "blue"}}
                                             onClick={handleValueClicked}>{valueSuggestion}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        )
    } else {
        return (
            <TableRow>
                <TableCell align="right">{issueLocation}</TableCell>
                <TableCell align="center">{originalValueRepresentation}</TableCell>
                <TableCell align="center">{issueType}</TableCell>
                <TableCell>
                    <div>
                        <div><input style={{float: "left", width: "100%"}}
                                    id={`input-${metadataIndex}.${issueLocation}`}
                                    type="text"
                                    data-idx={metadataIndex}
                                    className={issueLocation}
                                    onChange={handleValueChange}
                                    value={newValue}>
                        </input></div>
                    </div>
                </TableCell>
            </TableRow>
        )
    }
}