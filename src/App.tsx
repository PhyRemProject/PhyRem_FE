import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import logo from './logo.svg';
import './App.css';
import Home from "./Home/components/Home"
import Dashboard from './Global/components/Dashboard';
import Appointments from './Appointments/components/Appointments';


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
    },
    overrides: {
      MuiOutlinedInput: {
        root: {
          fontSize: '15px',
          lineHeight: '20px',
        },
        input: {
          height: '0.1em',
        }
      },
      MuiInputLabel: {
        shrink: {
          fontSize: '15px'
        },
        root: {
          fontSize: '15px'
        },
        outlined: {
          transform: "translate(14px, 12px) scale(1)"
        }
      }
    }
  });


  return (
    <>
      <MuiThemeProvider theme={theme}>
        <div className="App">

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>

        </div>
      </MuiThemeProvider>
    </>
  );


}

export default App;
