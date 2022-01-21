import * as React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppHeader from "./components/common/AppHeader";
import AppFooter from "./components/common/AppFooter";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Home from "./components/routes/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ResearchNotPublished from "./components/routes/ResearchNotPublished";
import FindMetadata from "./components/routes/FindMetadata";

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
                <Route path="ResearchNotPublished" element={<ResearchNotPublished/>}/>
                <Route path="FindMetadata" element={<FindMetadata/>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </React.Fragment>
      </StyledEngineProvider>
    </>
  );
}
