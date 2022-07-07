import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";

export default function FieldNameIssueItem({fieldName, evaluationReportItem}) {

    return (
        <TableRow>
            <TableCell style={{fontSize: 16}}>{fieldName}</TableCell>
            <TableCell style={{fontSize: 16}}></TableCell>
            <TableCell style={{fontSize: 16}}></TableCell>
        </TableRow>
    )
}