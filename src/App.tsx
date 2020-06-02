import React from 'react';
import { Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import logo from './logo.svg';
import './App.css';
import Home from "./Home/Home"


function App() {

  const theme = createMuiTheme({
    typography: {
      "fontFamily": `"Rawline", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500,
      button: {
        textTransform: "none"
      }
    }
  });

  //this should be changed to work with the react-router module
  //const [route, setRoute] = useState("login");

  // const user = useSelector((state: UserReducer) => state.UserReducer.user)

  // const PrivateRoute = ({ component, ...rest }: any) => {
  //   const routeComponent = (props: any) => {

  //     //TODO remove true and change to true
  //     if (user) {
  //       return React.createElement(component, props)
  //     }
  //     else {
  //       return <Redirect to={'/'} />
  //     }
  //   };
  //   return <Route {...rest} render={routeComponent} />;
  // };


  return (
    <>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Home />
        </div>
      </MuiThemeProvider>
    </>
  );



  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

}

export default App;
