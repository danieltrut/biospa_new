import React from "react";

import Grid from "@mui/material/Grid";
// import { Link } from "react-router-dom";

import facebook from "../../Images/facebook.png";
import instagram from "../../Images/instagram.png";

const classes = {
  root: {
    marginTop: "5rem",
  },
  intro: {
    backgroundColor: "#1d242d",
    color: "#fff",
    paddingTop: "5rem",
    paddingBottom: "5rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    margin: "auto",
  },
  sec: {
    display: "flex",
    maxWidth: "1160px",
    width: "100%",
    margin: "auto",
    justifyContent: "space-between",
  },
  social: {
    display: "flex",
  },
  inst: {
    marginLeft: "12px",
  },
};

function FooterComponent() {
  return (
    <div style={classes.root}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ md: 3 }}
        id="procedurePage"
      >
        <Grid item xs={12} style={classes.intro}>
          {/* HEADER */}
          <div style={classes.sec}>
            <div>Loodus BioSpa | Copyright © 2022. Kõik õigused kaitstud</div>
            <div style={classes.social}>
              <a href="https://www.facebook.com/LoodusBioSpa/">
                <img
                  width="24px"
                  height="auto"
                  src={facebook}
                  alt="Loodus BioSpa"
                ></img>
              </a>
              <a href="https://www.instagram.com/loodusbiospa/">
                <img
                  style={classes.inst}
                  width="24px"
                  height="auto"
                  src={instagram}
                  alt="Loodus BioSpa"
                ></img>
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default FooterComponent;
