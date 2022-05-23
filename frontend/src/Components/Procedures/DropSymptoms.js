import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./../../Context";

import axios from "axios";

import Autocomplete from "@mui/material/Autocomplete";

import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// For fetching data
import Grid from "@mui/material/Grid";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//////////////////////////////////////////////////////////////////////////////

//  TODO Extract list of diseases from db into dropdown list
function DropSymptoms(props) {
  const [symptoms, setSymptoms] = useState([]);
  const { symptomsValue, setSymptomsValue } = useContext(GlobalContext); // Catches chosen Symptoms in Dropdown

  // Fetch Diseases in dropdown on Page load
  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/symptoms/all/et"
      );
      setSymptoms(response.data);
    };
    loadData();
  }, [setSymptoms]);

  function handleSelectChange(event, newValues) {
    setSymptomsValue(newValues.map((symptom) => symptom.symp_id));
    console.log(symptomsValue);
  }

  return (
    <Tooltip
      title={<Typography fontSize={20}>Valige oma sümptomid</Typography>}
    >
      <Grid container>
        <Grid item xs={12} sm={6} md={12}>
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* Dropdown element */}
          <Autocomplete
            onChange={handleSelectChange}
            multiple={true}
            id="valueId"
            options={symptoms}
            disableCloseOnSelect
            getOptionLabel={(option) => `${option.symp_title_et}`}
            // onChange={handleChange}
            renderOption={(props, option, { setSymptomsValue }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={setSymptomsValue}
                />
                {[option.symp_title_et]}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kaebused"
                // placeholder="Vali kaebused"
              />
            )}
          />
        </Grid>

        {/* -------------------------------------------------------------------------------------------------- */}
        {/* Fetching Procedures data from DataBase */}
      </Grid>
    </Tooltip>
  );
}
export default DropSymptoms;
