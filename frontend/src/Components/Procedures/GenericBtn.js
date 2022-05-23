import React, { useContext } from "react";
import { GlobalContext } from "./../../Context"; // Contecxt for providing props Globally

import axios from "axios";
import Button from "@mui/material/Button";

const classes = {
  extractData: {
    marginTop: "0px",
  },
  icon: {
    color: "white",
  },
  searchBtn: {
    marginTop: "-3rem",
    marginBottom: "3rem",
  },
};

const GenericBtn = (props) => {
  const { diseasesValue, setDiseasesValue } = useContext(GlobalContext); // Catches chosen Diseases in Dropdown
  const { targetsValue, setTargetsValue } = useContext(GlobalContext); // Catches chosen Targets in Dropdown
  const { symptomsValue, setSymptomsValue } = useContext(GlobalContext); // Catches chosen Targets in Dropdown
  const { pricesValue, setPricesValue } = useContext(GlobalContext); // Catches chosen Prices in Slider
  const { procedures, setProcedures } = useContext(GlobalContext); // Catches chosen Prices in Slider

  // Procedures on all filters
  const loadProcTargetsSymptoms = async () => {
    const idsTarQuery = targetsValue.map((n) => `tarIds=${n}`).join("&"); // Take props, mapp it and with query param join
    const idsSympQuery = symptomsValue.map((n) => `&sympIds=${n}`).join("&");
    const idsDisQuery = diseasesValue.map((n) => `&disIds=${n}`).join("&");

    const response = await axios.get(
      `http://localhost:4000/api/procedures/procTarSymp?${idsTarQuery}${idsSympQuery}${idsDisQuery}&priceMax=${pricesValue}`
    );

    setProcedures(response.data);
    console.log(setDiseasesValue);
    console.log(setTargetsValue);
    console.log(setSymptomsValue);
    console.log(setPricesValue);
    console.log(procedures);
  };

  return (
    <Button
      style={classes.searchBtn}
      spacing={5}
      onClick={() => {
        loadProcTargetsSymptoms(
          diseasesValue.disIds,
          targetsValue.tarIds,
          symptomsValue.sympIds,
          pricesValue.priceMax
        );
      }}
      variant="contained"
    >
      Otsi
    </Button>
  );
};

export default GenericBtn;
