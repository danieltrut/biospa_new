import React, { useState } from "react";
import Grid from "@mui/material/Grid";
// import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import DropTargets from "../Components/Procedures/DropTargets";
import DropSymptoms from "../Components/Procedures/DropSymptoms";
import DropDiseases from "../Components/Procedures/DropDiseases";
import Slider from "../Components/Procedures/Slider";

import ProceduresList from "../Components/Procedures/ProceduresList";

// import axios from "axios";

const classes = {
  root: {
    /* marginLeft: "2rem",
    marginRight: "2rem", */
  },
  intro: {
    backgroundColor: "#EDEDED",
    color: "#000000",
    paddingTop: "5rem",
    paddingBottom: "5rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    margin: "auto",
  },
  sec: {
    margin: "auto",
    maxWidth: "1200px",
  },
  secTwo: {
    margin: "auto",
    maxWidth: "1180px",
    marginTop: "5rem",
    marginLeft: "20px !important",
  },
  container: {
    width: "100%",
    display: "flex",
  },
  filter: {
    width: "100%",
    justifyContent: "right",
  },
  paper: {
    padding: 20,
    textAlign: "center",
    color: "blue",
    fontFamily: "Roboto",
    marginTop: "10rem",
  },
  textsec: {
    marginBottom: "30px",
  },
};

/**Drop Down elements in two colomns and two rows */

export const Procedures = () => {
  const [diseases, setDiseases] = useState([]);
  const [diseasesValue, setDiseasesValue] = useState([]); // Catches chosen Diseases in Dropdown
  const [targets, setTargets] = useState([]);
  const [targetsValue, setTargetsValue] = useState([]); // Catches chosen Targets in Dropdown
  const [symptoms, setSymptoms] = useState([]);
  const [symptomsValue, setSymptomsValue] = useState([]); // Catches chosen Symptoms in Dropdown
  const [procedures, setProcedures] = useState([]);
  const [procValue, setProcValue] = useState([]); // Catches chosen Procedures in Tabel
  const [pricesValue, setPricesValue] = useState([]);

  /**Drop
   * One variable for all useStates for passing, priceValue and procedures initia
   * */
  const obj = {
    targets,
    setTargets,
    targetsValue,
    setTargetsValue,
    diseases,
    setDiseases,
    diseasesValue,
    setDiseasesValue,
    symptoms,
    setSymptoms,
    symptomsValue,
    setSymptomsValue,
    procedures,
    setProcedures,
    pricesValue,
    setPricesValue,
    procValue,
    setProcValue,
  };

  return (
    <div style={classes.root}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        id="procedurePage"
      >
        <Grid item xs={12} style={classes.intro}>
          {/* HEADER */}
          <div style={classes.sec}>
            <Typography variant="h4" component="div" gutterBottom>
              Loodus BioSpa on eksklusiivne butiikspaa
            </Typography>
            {/* INTRO TEXT */}
            <Typography variant="h6" component="div" gutterBottom mt={5} mb={3}>
              Oleme ravipaastumisele spetsialiseerundu
              loodusravi ja -spaakeskus. Pakume tõhusat
              võimalust vabanemiseks tervistkahjustavatest
              harjumustest - teie teekond liigsete ravimiteta
              tervisliku elu poole algab siit!
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              Pakume võimalust teha lisahoolitsuste eelvalik
              vastavalt oma kaebustele, näidustustele ja
              soovidele. Saate valida soovitud ravimeetodid, täita
              vormi ja edastada tulemus meile e-posti teel.
            </Typography>
          </div>
        </Grid>
      </Grid>
      <div style={classes.secTwo}>
        <Typography style={classes.textsec} variant="h6" component="div" gutterBottom>
          Tee valik soovitud eesmärkide, olemasolevate
          kaebuste ja haiguste hulgas ning määra hinnapiir. 
        </Typography>
        {/*-------------------------- First row Targets and Symptoms ---------------------------- */}
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6}>
            <DropTargets {...obj} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <DropSymptoms {...obj} />
          </Grid>
        </Grid>
        {/*-------------------------- Second row Diseases and Slider ---------------------------- */}
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6}>
            <DropDiseases {...obj} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Slider {...obj} />
          </Grid>
        </Grid>
        {/*------------------------------------------------------ */}
      </div>

      {/* Procedures List component */}
      <div style={classes.secTwo}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <ProceduresList {...obj} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};