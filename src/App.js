import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Home from "./components/routes/Home";
import EvaluateMetadata from "./components/routes/EvaluateMetadata";
import EvaluationReport from "./components/routes/evaluation/EvaluationReport";
import EvaluationResultTable from "./components/routes/evaluation/EvaluationResultTable";
import SelectTemplate from "./components/routes/selection/SelectTemplate";
import PrivacyPolicy from "./components/routes/PrivacyPolicy";
import About from "./components/routes/About";
import Resources from "./components/routes/Resources";
import SummaryReport from "./components/routes/summaryReport/SummaryReport";
import AlignFields from "./components/routes/alignment/AlignFields";

export default function App() {

  return (
    <>
      {/* Note that 'injectFirst' changes the CSS injection order so that we can override MUI's styles. More info at https://mui.com/guides/interoperability/#themeprovider */}
      <StyledEngineProvider injectFirst>
        <React.Fragment>
          <CssBaseline/>
          <div id="appWrapper">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/EvaluateMetadata" element={<EvaluateMetadata/>}/>
                <Route path="/EvaluationReport" element={<EvaluationReport/>}/>
                <Route path="/EvaluationResult" element={<EvaluationResultTable/>}/>
                <Route path="/SelectTemplate" element={<SelectTemplate/>}/>
                <Route path="/AlignFields" element={<AlignFields/>}/>
                <Route path="/SummaryReport" element={<SummaryReport/>}/>
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
                <Route path="/About" element={<About/>}/>
                <Route path="/Resources" element={<Resources/>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </React.Fragment>
      </StyledEngineProvider>
    </>
  );
}
