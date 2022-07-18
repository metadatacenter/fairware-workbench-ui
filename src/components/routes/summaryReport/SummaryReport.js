import React from "react";
import {useLocation} from "react-router";
import {ArcElement, Chart as ChartJS, Tooltip} from 'chart.js';
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import CompletenessReport from "./CompletenessReport";
import SimpleHeader from "../../common/SimpleHeader";
import AppFooter from "../../common/AppFooter";

ChartJS.register(ArcElement, Tooltip);

export default function SummaryReport() {

    const location = useLocation();
    const summaryReport = location.state.summaryReport;

    return (
        <>
            <SimpleHeader/>
            <div id="appContent">
                <h1 className="pageTitle">Metadata Evaluation Summary</h1>
                <h2 className={"subTitle"}>Evaluating <b>{summaryReport.totalMetadata}</b> metadata records</h2>
                <h2 className={"subTitle"}>
                    Template: <a href={summaryReport.templateUrl} target="_blank">{summaryReport.templateName}</a>
                </h2>
                <Box sx={{paddingTop: "2rem"}}>
                    <CompletenessReport data={summaryReport.completenessAndCorrectnessReport}/>
                </Box>
            </div>
            <AppFooter/>
        </>
    );
}


















