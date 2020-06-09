import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import logo from './logo.svg';
import './App.css';
import Home from "./Home/components/Home"
import Dashboard from './Global/components/Dashboard';


function App() {

  const theme = createMuiTheme({
    typography: {
      "fontFamily": `"Rawline", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500,
      button: {
        textTransform: "none",
        fontSize: 12
      }
    },
    palette: {
      primary: {
        main: '#F9A825',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#6C63FF'
      }
    }
  });


  return (
    <>
      <MuiThemeProvider theme={theme}>
        <div className="App">

          <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route exact={true} path="/dashboard" component={Dashboard}/>
          </Switch>

        </div>
      </MuiThemeProvider>
    </>
  );


}

export default App;
