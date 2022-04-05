import React from "react";
import {Chart as ChartJS, Tooltip as TooltipJS, ArcElement, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import {generateHref, shortenUrl} from "../../../util/commonUtil";
import WarningRoundedIcon from "@mui/material/SvgIcon/SvgIcon";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Tooltip from "@mui/material/Tooltip/Tooltip";

ChartJS.register(ArcElement, TooltipJS, Legend);

export default function CompletenessReport(props) {

  const report = props.completenessReport;

  console.log('report', report);

  const recordsGraphData = {
    labels: ['Complete', 'Missing required values', 'Missing optional values'],
    innerTextTitle: report.recordsReport.recordsCount,
    innerTextSubtitle: 'Metadata Records',
    datasets: [
      {
        data: [
          report.recordsReport.completeRecordsCount,
          report.recordsReport.recordsWithMissingRequiredValuesCount,
          report.recordsReport.recordsWithMissingOptionalValuesCount
        ],
        backgroundColor: [
          '#1BA9E3',
          '#CC3051',
          '#FEC02D'
        ],
        borderWidth: 2,
      },
    ],
  };

  const fieldsGraphData = {
    labels: ['Complete', 'Missing required values', 'Missing optional values'],
    innerTextTitle: report.fieldsReport.items.length,
    innerTextSubtitle: 'Metadata Fields',
    datasets: [
      {
        data: [
          report.fieldsReport.completeFieldsCount,
          report.fieldsReport.fieldsWithMissingRequiredValuesCount,
          report.fieldsReport.fieldsWithMissingOptionalValuesCount
        ],
        backgroundColor: [
          '#1BA9E3',
          '#CC3051',
          '#FEC02D'
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    //responsive: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom"
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
        let fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif"; // Title font
        ctx.textBaseline = "top";
        let textTitle = numberWithCommas(data.innerTextTitle),
          textTitleX = Math.round((width - ctx.measureText(textTitle).width) / 2),
          textTitleY = (height / 2) - 50;
        ctx.fillText(textTitle, textTitleX, textTitleY);
        ctx.font = 0.7 * fontSize + "em sans-serif"; // Subtitle font
        let textSubtitle = data.innerTextSubtitle,
          textSubtitleX = Math.round((width - ctx.measureText(textSubtitle).width) / 2),
          textSubtitleY = (height / 2) - 10;
        ctx.fillText(textSubtitle, textSubtitleX, textSubtitleY);
        ctx.save();
      }
    }];
    return plugins;
  }

  return (
    <>
      <Paper elevation={1} className={'summaryReportPanel'}>
        <Grid container columnSpacing={20}>
          <Grid item xs={1}/>
          <Grid item xs={5}>
            <Doughnut data={recordsGraphData} options={options} plugins={generatePlugins(recordsGraphData)}/>
          </Grid>
          <Grid item xs={5}>
            <Doughnut data={fieldsGraphData} options={options} plugins={generatePlugins(fieldsGraphData)}/>
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      </Paper>
      <h2>Completeness by Metadata Record</h2>
      <TableContainer className={"table"}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>METADATA RECORD</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>SOURCE</TableCell>
              <TableCell>METADATA TEMPLATE</TableCell>
              <TableCell>COMPLETENESS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.recordsReport.items
              .map((item) => (
                <TableRow key={item.metadataRecordId}>
                  <TableCell>
                    <a href={generateHref(item.metadataRecordId)} target="_blank">{shortenUrl(item.metadataRecordId)}</a>
                  </TableCell>
                  <TableCell>{item.metadata ? item.title : "NA"}</TableCell>
                  <TableCell>{item.metadata ? item.source : "URI not found"}</TableCell>
                  <TableCell>{item.metadata ?
                    <Tooltip title={item.schemaId}>
                      <a href={generateHref(item.schemaId)}
                         target="_blank">{shortenUrl(item.schemaId)}</a></Tooltip> : "NA"}
                  </TableCell>
                  <TableCell>{item.missingRequiredValues} / {item.missingOptionalValues}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Completeness by Metadata Field</h2>
      <TableContainer className={"table"}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FIELD NAME</TableCell>
              <TableCell>METADATA TEMPLATE</TableCell>
              <TableCell>NUMBER OF RECORDS</TableCell>
              <TableCell>COMPLETENESS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.fieldsReport.items
              .map((item) => (
                <TableRow key={item.templateId + '-' + item.metadataFieldPath}>
                  <TableCell><b>{item.metadataFieldPath}</b></TableCell>
                  <TableCell>{item.templateId ? item.templateId : "NA"}</TableCell>
                  <TableCell>"NA"</TableCell>
                  <TableCell>{item.completeCount} / {item.missingRequiredValuesCount} / {item.missingOptionalValuesCount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


















