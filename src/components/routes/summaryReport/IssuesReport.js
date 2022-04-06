import React, {useState} from "react";
import Button from "@mui/material/Button";
import AppHeader from "../../common/AppHeader";
import AppFooter from "../../common/AppFooter";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody";
import {useLocation} from "react-router";
import {useNavigate} from 'react-router-dom';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {translateIssueType} from "../../../util/evaluationUtil";
import {ISSUE_LEVEL_ERROR, ISSUE_LEVEL_WARNING} from "../../../constants";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

ChartJS.register(ArcElement, Tooltip);

export default function IssuesReport() {

  const data1 = {
    innerTextTitle: 176,
    innerTextSubtitle: 'Metadata Records',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [2984, 4104, 2238],
        backgroundColor: [
          '#1BA9E3',
          '#CC3051',
          '#FEC02D'
        ],
        borderWidth: 2,
      },
    ],
  };

  const data2 = {
    innerTextTitle: 176,
    innerTextSubtitle: 'Metadata Records',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [2984, 4104, 2238],
        backgroundColor: [
          '#1BA9E3',
          '#CC3051',
          '#FEC02D'
        ],
        borderWidth: 2,
      },
    ],
  };

  const data3 = {
    innerTextTitle: 9328,
    innerTextSubtitle: 'Metadata Fields',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [2984, 4104, 2238],
        backgroundColor: [
          '#1BA9E3',
          '#CC3051',
          '#FEC02D'
        ],
        borderWidth: 2,
      },
    ],
  };

  const data4 = {
    innerTextTitle: 5223,
    innerTextSubtitle: 'Issues',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [2984, 4104, 2238],
        backgroundColor: [
          '#1BA9E3',
          '#CC3051',
          '#FEC02D'
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
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
      beforeDraw: function(chart) {
        let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif"; // Title font

        ctx.textBaseline = "top";
        let textTitle = numberWithCommas(data.innerTextTitle),
          textTitleX = Math.round((width - ctx.measureText(textTitle).width) / 2),
          textTitleY = (height / 2) - 30;
        ctx.fillText(textTitle, textTitleX, textTitleY);
        ctx.font = 0.7 * fontSize + "em sans-serif"; // Subtitle font
        let textSubtitle = data.innerTextSubtitle,
          textSubtitleX = Math.round((width - ctx.measureText(textSubtitle).width) / 2),
          textSubtitleY = height / 2;

        ctx.fillText(textSubtitle, textSubtitleX, textSubtitleY);
        ctx.save();
      }
    }];
    return plugins;
  }

  return (
    <>
        <Paper elevation={1} className={'summaryReportPanel'}>
          <Grid container spacing={4}>
            {/*<Grid item xs={3}>*/}
            {/*  <Doughnut data={data1} options={chartOptions} plugins={generatePlugins(data1)} />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={3}>*/}
            {/*  <Doughnut data={data2} options={chartOptions} plugins={generatePlugins(data2)} />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={3}>*/}
            {/*  <Doughnut data={data3} options={chartOptions} plugins={generatePlugins(data3)} />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={3}>*/}
            {/*  <Doughnut data={data4} options={chartOptions} plugins={generatePlugins(data4)} />*/}
            {/*</Grid>*/}
          </Grid>
        </Paper>
    </>
  );
}


















