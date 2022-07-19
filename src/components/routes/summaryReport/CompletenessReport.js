import React from "react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip as TooltipJS} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import HSBar from "react-horizontal-stacked-bar-chart";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SvgIcon from "@mui/material/SvgIcon";

ChartJS.register(ArcElement, TooltipJS, Legend);

export default function CompletenessReport(props) {

    const data = props.data;

    const recordsWithMissingRequiredValuesCount = data.byRecords.completeness.recordsWithMissingRequiredValuesCount;
    const recordsWithoutMissingRequiredValuesCount = data.byRecords.completeness.totalRecords - recordsWithMissingRequiredValuesCount;
    const completenessReportData = {
        labels: ['Some required fields are not filled', 'All required fields are filled'],
        innerTextTitle: recordsWithoutMissingRequiredValuesCount + ' / ' + data.byRecords.completeness.totalRecords,
        innerTextSubtitle: 'Completeness',
        datasets: [{
            data: [
                recordsWithMissingRequiredValuesCount,
                recordsWithoutMissingRequiredValuesCount
            ],
            backgroundColor: [
                '#d50753',
                '#90d914'
            ],
            borderWidth: 2,
        }],
    };

    const recordsWithInvalidValuesCount = data.byRecords.correctness.recordsWithInvalidValuesCount;
    const recordsWithAllValidValuesCount = data.byRecords.correctness.totalRecords - recordsWithInvalidValuesCount;
    const conformanceReportData = {
        labels: ['Some values are of incorrect data types', 'All values are of correct data types'],
        innerTextTitle: recordsWithAllValidValuesCount + ' / ' + data.byRecords.correctness.totalRecords,
        innerTextSubtitle: 'Conformance',
        datasets: [{
            data: [
                recordsWithInvalidValuesCount,
                recordsWithAllValidValuesCount
            ],
            backgroundColor: [
                '#d50753',
                '#90d914'
            ],
            borderWidth: 2,
        }],
    };

    const options = {
        //responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                width: '20%'
            },
        },
        cutout: '80%',
        doughnutlabel: {
            labels: [{
                text: '550',
                font: {
                    size: 20,
                    weight: 'bold'
                }
            }, {
                text: 'total'
            }]
        }
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function generatePlugins(data) {
        let plugins = [{
            beforeDraw: function (chart) {
                let width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;
                ctx.restore();
                let fontSize = (height / 120).toFixed(2);
                ctx.font = fontSize + "em Helvetica"; // Title font
                ctx.fontWeight = "bold";
                let textTitle = numberWithCommas(data.innerTextTitle),
                    textTitleX = Math.round((width - ctx.measureText(textTitle).width) / 2),
                    textTitleY = (height / 2) - 30;
                ctx.fillText(textTitle, textTitleX, textTitleY);
                ctx.font = 0.5 * fontSize + "em sans-serif"; // Subtitle font
                let textSubtitle = data.innerTextSubtitle,
                    textSubtitleX = Math.round((width - ctx.measureText(textSubtitle).width) / 2),
                    textSubtitleY = (height / 2) + 10;
                ctx.fillText(textSubtitle, textSubtitleX, textSubtitleY);
                ctx.save();
            }
        }];
        return plugins;
    }

    function generatePercentageStr(num, total) {
        return Math.round((num / total) * 100) + '%';
    }

    function generateDescription(count, total) {
        if (count > 0) {
            return count + ' (' + generatePercentageStr(count, total) + ')';
        } else {
            return '';
        }
    }

    function createCompletenessBar(requiredFieldsCount, missingRequiredValuesCount) {
        let data = [];
        if (missingRequiredValuesCount > 0) {
            data.push({
                value: missingRequiredValuesCount,
                description: generateDescription(missingRequiredValuesCount, requiredFieldsCount),
                color: '#d50753'
            })
        }
        const noMissingRequiredValuesCount = requiredFieldsCount - missingRequiredValuesCount;
        if (noMissingRequiredValuesCount > 0) {
            data.push({
                value: noMissingRequiredValuesCount,
                description: generateDescription(noMissingRequiredValuesCount, requiredFieldsCount),
                color: '#90d914'
            })
        }
        return data;
    }

    function createCorrectnessBar(nonEmptyFieldsCount, invalidFieldsCount) {
        let data = [];
        if (invalidFieldsCount > 0) {
            data.push({
                value: invalidFieldsCount,
                description: generateDescription(invalidFieldsCount, nonEmptyFieldsCount),
                color: '#d50753'
            })
        }
        const validFieldCount = nonEmptyFieldsCount - invalidFieldsCount;
        if (validFieldCount > 0) {
            data.push({
                value: validFieldCount,
                description: generateDescription(validFieldCount, nonEmptyFieldsCount),
                color: '#90d914'
            })
        }
        return data;
    }

    function createCorrectnessBarByField(errorCount, inputCount) {
        let data = [];
        if (errorCount > 0) {
            data.push({
                value: errorCount,
                description: generateDescription(errorCount, inputCount),
                color: '#d50753'
            })
        }
        const validInputCount = inputCount - errorCount;
        if (validInputCount > 0) {
            data.push({
                value: validInputCount,
                description: generateDescription(validInputCount, inputCount),
                color: '#90d914'
            })
        }
        return data;
    }

    function getStatusIconComponent(missingRequiredValuesCount, invalidFieldsCount) {
        if (missingRequiredValuesCount === 0 && invalidFieldsCount === 0) {
            return <SvgIcon component={CheckCircleIcon} style={{color: "#90d914"}} inheritViewBox/>
        } else {
            return <SvgIcon component={CancelIcon} style={{color: "#d50753"}} inheritViewBox/>
        }
    }

    return (
        <>
            <Paper elevation={1} className={'summaryReportPanel'}>
                <Grid container columnSpacing={2}>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <div>
                            <Doughnut data={completenessReportData}
                                      height="300px"
                                      width="300px"
                                      options={options}
                                      plugins={generatePlugins(completenessReportData)}/>
                        </div>
                        <div style={{color: "#888888", textAlign: "center"}}>Completeness is measured based on the presence or absence of <i>required</i> values in the metadata fields defined in the metadata schema.</div>
                    </Grid>
                    <Grid item xs={5}>
                        <div>
                            <Doughnut data={conformanceReportData}
                                      height="300px"
                                      width="300px"
                                      options={options}
                                      plugins={generatePlugins(conformanceReportData)}/>
                        </div>
                        <div style={{color: "#888888", textAlign: "center"}}>Conformance is measured based on the compliance of the value in the metadata field with its data type defined in the metadata schema.</div>
                    </Grid>
                    <Grid item xs={1}/>
                </Grid>
            </Paper>
            <TableContainer className={"table"} style={{width: "95%", paddingTop: "2rem"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={"header"} width={"25%"}>METADATA REFERENCE</TableCell>
                            <TableCell className={"header"} width={"10%"}>STATUS</TableCell>
                            <TableCell className={"header"}>COMPLETENESS</TableCell>
                            <TableCell className={"header"}>CONFORMANCE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.byRecords.recordsReportDetails
                            .map((item) => {
                                const statusIcon = getStatusIconComponent(item.fieldsWithMissingRequiredValueCount, item.fieldsWithInvalidValueCount);
                                return (<TableRow key={item.metadataId}>
                                        <TableCell className={"cell center"}>{item.metadataId}</TableCell>
                                        <TableCell className={"cell center"}>{statusIcon}</TableCell>
                                        <TableCell className={"horizontalBarCell"}>
                                            <HSBar height={20}
                                                   showTextIn
                                                   outlineColor="#FFFFFF"
                                                   id="chart"
                                                   fontColor="#FFFFFF"
                                                   data={createCompletenessBar(item.requiredFieldsCount, item.fieldsWithMissingRequiredValueCount)}/>
                                            <span style={{fontSize: 14, fontWeight: "normal", color: "#666666"}}>
                                                {item.requiredFieldsCount - item.fieldsWithMissingRequiredValueCount} out of {item.requiredFieldsCount} required metadata fields are filled.
                                            </span>
                                        </TableCell>
                                        <TableCell className={"horizontalBarCell"}>
                                            <HSBar height={20}
                                                   showTextIn
                                                   outlineColor="#ffffff"
                                                   id="chart"
                                                   fontColor="#ffffff"
                                                   data={createCorrectnessBar(item.fieldsWithNonEmptyValueCount, item.fieldsWithInvalidValueCount)}/>
                                            <span style={{fontSize: 14, fontWeight: "normal", color: "#666666"}}>
                                                {item.fieldsWithInvalidValueCount} out of {item.fieldsWithNonEmptyValueCount} filled metadata fields are invalid.
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    < /TableBody>
                </Table>
            </TableContainer>
            <h2 style={{paddingTop: "2rem"}}>Metadata Field Analysis</h2>
            <TableContainer className={"table"} style={{width: "95%"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={"header"} width={"25%"}>FIELD NAME</TableCell>
                            <TableCell className={"header"} width={"10%"}>NUMBER OF RECORDS</TableCell>
                            <TableCell className={"header"}>FREQUENCY OF ERRORS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(data.byFields.fieldReportDetails)
                            .map((fieldName) => {
                                const reportItem = data.byFields.fieldReportDetails[fieldName];
                                return (<TableRow key={fieldName}>
                                        <TableCell className={"cell center"}>{fieldName}</TableCell>
                                        <TableCell className={"cell center"}>{reportItem.inputCount}</TableCell>
                                        <TableCell className={"horizontalBarCell"}>
                                            <HSBar height={20}
                                                   showTextIn
                                                   outlineColor="#ffffff"
                                                   id="chart"
                                                   fontColor="#ffffff"
                                                   data={createCorrectnessBarByField(reportItem.errorCount, reportItem.inputCount)}/>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


















