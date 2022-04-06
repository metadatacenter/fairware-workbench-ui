import React, {useEffect, useState} from "react";
import AppHeader from "../../common/AppHeader";
import AppFooter from "../../common/AppFooter";
import {ArcElement, Chart as ChartJS, Tooltip} from 'chart.js';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as PropTypes from "prop-types";
import CompletenessReport from "./CompletenessReport";
import IssuesReport from "./IssuesReport";
import {useLocation, useNavigate} from "react-router";
import {generateSummaryReport} from "../../../services/fairwareServices";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

ChartJS.register(ArcElement, Tooltip);

export default function SummaryReport() {

  const state = useLocation().state;
  const searchResults = state && state.results ? state.results : [];

  const [summaryReport, setSummaryReport] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateSummaryReport(searchResults).then(data => {
      setSummaryReport(data);
      setIsLoading(false);
    });
  }, []);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{p: 3}}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <AppHeader/>
      <div id="appContent">
        <h1>Summary Report</h1>
        <Paper elevation={1} className={'summaryReportPanel'}>
          {isLoading &&
          <div className={"progressIndicator"}>
            <CircularProgress/>
          </div>
          }
          {!isLoading &&

          <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Metadata Completeness" {...a11yProps(0)} />
                <Tab label="Metadata Issues" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <CompletenessReport completenessReport={summaryReport.completenessReport}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <IssuesReport/>
            </TabPanel>
          </Box>

          }
        </Paper>
      </div>
      <AppFooter/>
    </>
  );

}


















