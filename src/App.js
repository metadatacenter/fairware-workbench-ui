import * as React from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppHeader from "./components/common/AppHeader";
import AppFooter from "./components/common/AppFooter";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import Home from "./components/Home";

export default function App() {

  return (
    <>
      {/* Note that 'injectFirst' changes the CSS injection order so that we can override MUI's styles. More info at https://mui.com/guides/interoperability/#themeprovider */}
      <StyledEngineProvider injectFirst>
        <React.Fragment>
          <CssBaseline/>
          <div id="appWrapper">
            <AppHeader/>
            <div id="appContent">
            <Home/>
            </div>
            <AppFooter/>
          </div>
        </React.Fragment>
      </StyledEngineProvider>
    </>
  );
}
