import React from "react";
//import  { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";

// import Stack from "@mui/material/Stack";
import DrawerComponent from "./Drawer";
import logo from "../../Images/Loodus-BioSpa-Logo-300.png"; //
import "../../index.css";
import useStyles from "./styles";
// import axios from "axios";

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar className={classes.navbar} position="static">
      <div className={classes.containerTt}>
        <CssBaseline />
        <Toolbar className={classes.section}>
          <Link className={classes.logo} to="/">
            <img
              width="120px"
              height="auto"
              className="img-responsive"
              src={logo}
              alt="logo"
            />
          </Link>
          <div className={classes.logolinks}>
            {isMobile ? (
              <DrawerComponent />
            ) : (
              <div className={classes.navlinks}>
                <Link to="/" className={classes.link}>
                  Procedurite eelkatse
                </Link>
                <Link to="/about" className={classes.link}>
                  Meist
                </Link>
                {/* <div className={classes.languages}>
                  {/* <Link
                  onClick={() => setLangChoices("dis_title_et")}
                  to="/estonian"
                  className={classes.link}
                >
                  ET
                </Link>
                <Link
                  onClick={() => setLangChoices("dis_title_et")}
                  className={classes.link}
                >
                  RU
                </Link>
                <Link
                  onClick={() => setLangChoices("dis_title_et")}
                  className={classes.link}
                >
                  EN
                </Link>
                </div>*/}

                {/*<Stack direction="row" spacing={2}>
                   <Button variant="outlined">Loogi Sisse</Button>

                  <Button
                    className={classes.button}
                    variant="contained"
                    href="#contained-buttons"
                  >
                    Registreeri
                  </Button> 
                </Stack>*/}
              </div>
            )}
          </div>
        </Toolbar>
      </div>
    </AppBar>
  );
}
export default Navbar;
