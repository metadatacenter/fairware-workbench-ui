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
import {generateHref, generateMetadataRecordName, shortenUrl} from "../../../util/commonUtil";
import WarningRoundedIcon from "@mui/material/SvgIcon/SvgIcon";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import HSBar from "react-horizontal-stacked-bar-chart";
import HelpIcon from '@mui/icons-material/Help';

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
    maintainAspectRatio: false,
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
        let fontSize = (height / 120).toFixed(2);
        ctx.font = fontSize + "em Helvetica"; // Title font
        ctx.fontWeight = "bold";
        let textTitle = numberWithCommas(data.innerTextTitle),
          textTitleX = Math.round((width - ctx.measureText(textTitle).width) / 2),
          textTitleY = (height / 2) - 50;
        ctx.fillText(textTitle, textTitleX, textTitleY);
        ctx.font = 0.5 * fontSize + "em sans-serif"; // Subtitle font
        let textSubtitle = data.innerTextSubtitle,
          textSubtitleX = Math.round((width - ctx.measureText(textSubtitle).width) / 2),
          textSubtitleY = (height / 2) - 10;
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

  function generateHsBarData(missingRequiredValuesCount, missingOptionalValuesCount, completeCount, fieldsCount) {
    let data = [];
    if (missingRequiredValuesCount > 0) {
      data.push({
        value: missingRequiredValuesCount,
        description: generateDescription(missingRequiredValuesCount, fieldsCount),
        color: '#CC3051'
      })
    }
    if (missingOptionalValuesCount > 0) {
      data.push({
        value: missingOptionalValuesCount,
        description: generateDescription(missingOptionalValuesCount, fieldsCount),
        color: '#FEC02D'
      })
    }
    if (completeCount > 0) {
      data.push({
        value: completeCount,
        description: generateDescription(completeCount, fieldsCount),
        color: '#1BA9E3'
      })
    }
    return data;
  }

  return (
    <>
      <Paper elevation={1} className={'summaryReportPanel'}>
        <Grid container columnSpacing={2}>
          <Grid item xs={1}/>
          <Grid item xs={5}>
            <Doughnut
              data={recordsGraphData}
              height="300px"
              width="300px"
              options={options}
              plugins={generatePlugins(recordsGraphData)}/>
          </Grid>
          <Grid item xs={5}>
            <Doughnut data={fieldsGraphData} options={options} plugins={generatePlugins(fieldsGraphData)}/>
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      </Paper>
      <h2>Completeness by Record</h2>
      <TableContainer className={"table"}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>METADATA RECORD</TableCell>
              <TableCell>METADATA TEMPLATE</TableCell>
              <TableCell>COMPLETENESS
                <Tooltip title="For each metadata record, this column shows the number of fields with missing required values (red), missing optional values (yellow), and complete (blue)." className={'materialTooltip'}>
                  <IconButton>
                    <HelpIcon fontSize={'small'}/>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.recordsReport.items
              .map((item) => (
                <TableRow key={item.metadataRecordId}>
                  <TableCell>
                    <a href={generateHref(item.metadataRecordId)} target="_blank">{generateMetadataRecordName(item.metadataRecordId, item.metadataRecordName)}</a>
                  </TableCell>
                  <TableCell>
                    <Tooltip title={item.templateId}><a href={generateHref(item.templateId)} target="_blank">{item.templateName}</a></Tooltip>
                  </TableCell>
                  <TableCell className={"horizontalBarCell"}>
                    <HSBar
                      height={20}
                      showTextIn
                      outlineColor="#FFFFFF"
                      id="chart"
                      fontColor="#FFFFFF"
                      data={generateHsBarData(item.missingRequiredValuesCount, item.missingOptionalValuesCount, item.completeCount, item.fieldsCount)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Completeness by Field</h2>
      <TableContainer className={"table"}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FIELD NAME</TableCell>
              <TableCell># OF RECORDS</TableCell>
              <TableCell>METADATA TEMPLATE</TableCell>
              <TableCell>COMPLETENESS
                <Tooltip title="Number of fields with missing required values (red), missing optional values (yellow), and complete (blue)." className={'materialTooltip'}>
                  <IconButton>
                    <HelpIcon fontSize={'small'}/>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.fieldsReport.items
              .map((item) => (
                <TableRow key={item.templateId + '-' + item.metadataFieldPath}>
                  <TableCell><b>{item.metadataFieldPath}</b></TableCell>
                  <TableCell>{item.fieldsCount}</TableCell>
                  <TableCell>{item.templateId ?
                    <Tooltip title={item.templateId}>
                      <a href={generateHref(item.templateId)}
                         target="_blank">{shortenUrl(item.templateName)}</a></Tooltip> : "NA"}
                  </TableCell>
                  <TableCell className={"horizontalBarCell"}>
                    <HSBar
                      height={20}
                      showTextIn
                      outlineColor="#FFFFFF"
                      id="chart"
                      fontColor="#FFFFFF"
                      data={generateHsBarData(item.missingRequiredValuesCount, item.missingOptionalValuesCount, item.completeCount, item.fieldsCount)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


















