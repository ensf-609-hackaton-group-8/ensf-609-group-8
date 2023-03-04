import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./lib/contextLib";
import Routes from "./Routes";
import "./App.css";
import { createGlobalStyle } from "styled-components";

const MainContainer = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

function App() {
  const nav = useNavigate();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isuserType, userType] = useState(false);

  function handleLogout() {
    userHasAuthenticated(false);
    nav("/ensf-609-group-8");
  }

  return (
    <div>
      <MainContainer />
      <AppBar position="static">
        <Toolbar className="navStyle">
          {isAuthenticated ? (
            <>
              <Typography
                variant="h6"
                className="navTitleStyle"
                component={Link}
                to="/ensf-609-group-8/home"
              >
                QR Health Link
              </Typography>
              <Button
                className="navButtonStyle"
                color="inherit"
                component={Link}
                to="/ensf-609-group-8/qr-generator"
              >
                QR Generator
              </Button>
              <Button
                className="navButtonStyle"
                color="inherit"
                component={Link}
                to="/ensf-609-group-8/qr-reader"
              >
                QR Reader
              </Button>
              <Button
                className="navButtonStyle"
                color="inherit"
                component={Link}
                onClick={handleLogout}
                to="/ensf-609-group-8"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" className="navTitleStyle">
                QR Health Link
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated, isuserType, userType }}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
