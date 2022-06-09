import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./../../Context";

import axios from "axios";

import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// Styling the input
import { makeStyles } from "@material-ui/core/styles";

// For fetching data
import Grid from "@mui/material/Grid";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//////////////////////////////////////////////////////////////////////////////

//  TODO Extract list of diseases from db into dropdown list
function DropTargets() {
  const [targets, setTargets] = useState([]);
  const { targetsValue, setTargetsValue } = useContext(GlobalContext); // Catches chosen Targets in Dropdown

  // Fetch Diseases in dropdown on Page load
  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(
        "http://localhost:4000/api/targets/all/et"
      );
      setTargets(response.data);
    };
    loadData();
  }, [setTargets]);

  function handleSelectChange(event, newValues) {
    setTargetsValue(newValues.map((target) => target.tar_id));
    console.log(targetsValue);
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
  });

  const classes = useStyles();

  return (
    <Tooltip title={<Typography fontSize={20}>Vali oma eesmärgid</Typography>}>
      <Grid container>
        <Grid item xs={12} sm={6} md={12}>
          {/* -------------------------------------------------------------------------------------------------- */}
          {/* Dropdown element */}
          <Autocomplete
            onChange={handleSelectChange}
            multiple={true}
            id="valueId"
            options={targets}
            disableCloseOnSelect
            getOptionLabel={(option) => `${option.tar_title_et}`}
            variant="outlined"
            className={classes.focus}
            // onChange={handleChange}
            renderOption={(props, option, { setTargetsValue }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={setTargetsValue}
                />
                {[option.tar_title_et]}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} autoFocus={true} label="Eesmärgid" />
            )}
          />
        </Grid>

        {/* -------------------------------------------------------------------------------------------------- */}
        {/* Fetching Procedures data from DataBase */}
      </Grid>
    </Tooltip>
  );
}
export default DropTargets;
