import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./../../Context";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ReactTooltip from "react-tooltip";

// Styling the input
import { makeStyles } from "@material-ui/core/styles";

// For fetching data
import Grid from "@mui/material/Grid";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//////////////////////////////////////////////////////////////////////////////

//  TODO Extract list of diseases from db into dropdown list
function DropDiseases() {
  const [diseases, setDiseases] = useState([]);
  const { diseasesValue, setDiseasesValue } = useContext(GlobalContext); // Catches chosen Diseases in Dropdown

  // Fetch Diseases in dropdown on Page load
  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/diseases/all/et"
      );
      setDiseases(response.data);
    };
    loadData();
  }, [setDiseases]);

  // Handling Selected valjues
  function handleSelectChange(event, newValues) {
    setDiseasesValue(newValues.map((disease) => disease.dis_id));
    console.log(diseasesValue);
  }

  // Input TextField color on Focus
  const useStyles = makeStyles({
    focus: {
      // input label when focused
      "& label.Mui-focused": {
        color: "#72bb94",
        "& label.MuiFormLabel-root": {
          backgroundColor: "#fff",
          marginLeft: "-5px",
          padding: "0 6px",
        },
      },

      // focused color for input with variant='outlined'
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#72bb94",
        },
      },
    },
    tooltip: {
      fontSize: "18px !important",
    },
  });

  const classes = useStyles();

  //////////////////////////////////////////////////////////////////////////////

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        {/* -------------------------------------------------------------------------------------------------- */}
        {/* Dropdown element */}
        <Autocomplete
          data-testid="diseasesId" // Unit testing id
          data-tip="Leia protseduurid, mis pole sulle keelatud" // Tooltip text
          style={classes.dropdown}
          onChange={handleSelectChange} // Handler function
          multiple={true}
          id="valueId"
          options={diseases} //useState for entity
          disableCloseOnSelect
          getOptionLabel={(option) => `${option.dis_title_et}`}
          variant="outlined"
          className={classes.focus}
          // onChange={handleChange}
          renderOption={(props, option, { setDiseasesValue }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={setDiseasesValue} // Setting State for checked
              />
              {[option.dis_title_et]}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Terviseseisund"
              // placeholder="Vali vastunäidustused"
            />
          )}
        />

        <ReactTooltip
          // Tooltip
          className={classes.tooltip}
          arrow
          backgroundColor="#4e5154"
        />
      </Grid>

      {/* -------------------------------------------------------------------------------------------------- */}
      {/* Fetching Procedures data from DataBase */}
    </Grid>
  );
}
export default DropDiseases;
