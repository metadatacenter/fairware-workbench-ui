import * as React from 'react';
import AppContent from "./components/AppContent";
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

export default function App() {

  return (
    <React.Fragment>
      <CssBaseline/>
      <AppHeader/>
      <AppContent/>
      <AppFooter/>
    </React.Fragment>
  );
}
