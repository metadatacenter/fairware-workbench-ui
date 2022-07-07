import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import Button from "@mui/material/Button";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SvgIcon from "@mui/material/SvgIcon";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";

export default function AlignFields() {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const metadataIndex = state.metadataIndex;
    const metadataArtifact = state.metadataArtifact;
    const metadataSpecification = state.metadataSpecification;
    const templateFields = Object.keys(metadataSpecification.templateFields);
    const alignmentReport = state.alignmentReport;


    function handleBackButton() {
        navigate(-1);
    }

    async function handleContinueButton() {
        navigate("/EvaluationReport",
            {
                state: {}
            })
    }

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <h1 class="pageTitle">Align Fields</h1>
                <h2 class="subTitle">Template: {metadataSpecification.templateName}</h2>
                <div className={"recommendationResult"}>
                    <TableContainer className={"table"} style={{width: "50%"}}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize: 18}} align="center" width="46%">
                                        METADATA FIELD
                                    </TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="8%"></TableCell>
                                    <TableCell style={{fontSize: 18}} align="center" width="46%">
                                        TEMPLATE FIELD
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {metadataArtifact.metadataFields.map((metadataField, index) => {
                                    const rowColor = (index % 2 === 1) ? "#ffffff" : "#f4f4f4";
                                    const foundValue = alignmentReport.fieldAlignments
                                        .filter((alignment) => alignment.metadataFieldPath === metadataField)
                                    const defaultValue = foundValue.length != 0 ? foundValue[0].templateFieldPath : "";
                                    return (<TableRow key={`field-alignment-${index}`}>
                                            <TableCell style={{fontSize: 16, backgroundColor: rowColor}}>
                                                {metadataField}
                                            </TableCell>
                                            <TableCell style={{backgroundColor: rowColor}}>
                                                <SvgIcon component={ArrowForwardIcon}
                                                         inheritViewBox/>
                                            </TableCell>
                                            <TableCell style={{backgroundColor: rowColor}}>
                                                <Autocomplete disablePortal
                                                              options={templateFields}
                                                              defaultValue={defaultValue}
                                                              size="small"
                                                              renderInput={(params) =>
                                                                  <TextField
                                                                      style={{fontSize: 16, backgroundColor: "#ffffff"}}
                                                                      fullWidth {...params} />
                                                              }/>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{textAlign: "center", marginBottom: "5vh"}}>
                <Button
                    onClick={handleBackButton}
                    className={"generalButton"}
                    variant={"contained"}
                    size={"large"}>
                    Go Back</Button>
                <Button
                    onClick={handleContinueButton}
                    className={"generalButton"}
                    variant={"contained"}
                    size={"large"}>
                    Continue</Button>
            </div>
            <AppFooter/>
        </>
    )
}