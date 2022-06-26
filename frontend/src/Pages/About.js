import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./about.css";

const classes = {
  root: {
    margin: "auto",
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
  textsec: {
    width: "70%",
  },
  secTwo: {
    margin: "auto",
    maxWidth: "1180px",
    marginTop: "5rem",
    paddingLeft: "20px !important",
  },
  container: {
    width: "100%",
    display: "flex",
  },
  containerSecond: {
    width: "100%",
    display: "flex",
    marginTop: "4rem",
  },
  containerThird: {
    width: "100%",
    display: "flex",
    marginLeft: "-19px !important",
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
};

export const About = () => {
  return (
    <div style={classes.root}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        id="aboutIntro"
      >
        <Grid item xs={12} style={classes.intro}>
          {/* HEADER */}
          <div style={classes.sec}>
            <Typography variant="h4" component="div" gutterBottom>
              Meist
            </Typography>
            {/* INTRO TEXT */}
            <Typography
              variant="h6"
              style={classes.textsec}
              component="div"
              gutterBottom
              mt={5}
              mb={3}
            >
              Oleme eksklusiivne loodusravi ja spaakeskus. Pakume erakordset
              võimalust vabanemiseks tervistkahjustavatest harjumustest – teie
              teekond ravimiteta tervisliku eluviisi poole algab siit!
              <br></br>
              <br></br>
              Loodus BioSpa pakub professionaalseid organismi puhastamise,
              noorendamise ja kaalulangetamise programme Põhjamaade parimate
              spetsialistide hoole all.
            </Typography>
          </div>
        </Grid>
      </Grid>
      <div id="aboutText" style={classes.secTwo}>
        <Typography variant="h5" component="div" gutterBottom>
          Meie ajalugu
        </Typography>

        <Typography
          style={classes.textsec}
          component="div"
          gutterBottom
          mt={5}
          mb={3}
        >
          <b>
            Loodus Biospa asutas 22 aastat tagasi Dr. Med. Natalia Trofimova -
            sisearst-dietoloog ning Eestis selle ala enimmüüdud raamatu
            "Paastuga terveks" autor.
          </b>
          <br></br>
          <br></br>
          Oleme siiamaani jäänud perekondlikuks ettevõtteks, mille eesmärk on
          aidata inimestel astuda nende tervisliku tuleviku teekonnale.
          <br></br>
          <br></br>
          Meie meeskond koosneb koolitatud ja pikaajalise kogemusega
          spetsialistidest ja meditsiinitöötajatest, kes kindlustavad Teiel
          siinviibimise ajal professionaalse järelvalve tervisliku olukorra üle
          ning meeldiva ja sõbraliku õhkkonna.
        </Typography>
      </div>
    </div>
  );
};
