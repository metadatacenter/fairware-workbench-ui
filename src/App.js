import * as React from 'react';
import AppContent from "./components/AppContent";
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

export default function App() {

  return (
    <>
      {/* Note that 'injectFirst' changes the CSS injection order so that we can override MUI's styles. More info at https://mui.com/guides/interoperability/#themeprovider */}
      <StyledEngineProvider injectFirst>
        <React.Fragment>
          <CssBaseline/>
          <div id="appWrapper">
            <AppHeader/>
            <AppContent/>
            <AppFooter/>
          </div>
        </React.Fragment>
      </StyledEngineProvider>
    </>
  );
}
