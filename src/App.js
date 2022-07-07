import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Home from "./components/routes/Home";
import ResearchNotPublished from "./components/routes/ResearchNotPublished";
import FindMetadata from "./components/routes/FindMetadata";
import EvaluateMetadata from "./components/routes/EvaluateMetadata";
import EvaluationReport from "./components/routes/evaluation/EvaluationReport";
import EvaluationResultTable from "./components/routes/evaluation/EvaluationResultTable";
import SelectTemplate from "./components/routes/selection/SelectTemplate";
import PrivacyPolicy from "./components/routes/PrivacyPolicy";
import About from "./components/routes/About";
import Support from "./components/routes/Support";
import Resources from "./components/routes/Resources";
import MetadataRecords from "./components/routes/MetadataRecords";
import MetadataEvaluationReport from "./components/routes/MetadataEvaluationReport";
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
                <Route path="/ResearchNotPublished" element={<ResearchNotPublished/>}/>
                <Route path="/FindMetadata" element={<FindMetadata/>}/>
                <Route path="/EvaluateMetadata" element={<EvaluateMetadata/>}/>
                <Route path="/EvaluationReport" element={<EvaluationReport/>}/>
                <Route path="/EvaluationResult" element={<EvaluationResultTable/>}/>
                <Route path="/MetadataRecords" element={<MetadataRecords/>}/>
                <Route path="/SelectTemplate" element={<SelectTemplate/>}/>
                <Route path="/AlignFields" element={<AlignFields/>}/>
                <Route path="/MetadataEvaluationReport" element={<MetadataEvaluationReport/>}/>
                <Route path="/SummaryReport" element={<SummaryReport/>}/>
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
                <Route path="/About" element={<About/>}/>
                <Route path="/Support" element={<Support/>}/>
                <Route path="/Resources" element={<Resources/>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </React.Fragment>
      </StyledEngineProvider>
    </>
  );
}
