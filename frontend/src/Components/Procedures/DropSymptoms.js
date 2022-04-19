import React, { useEffect } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
  const { symptoms } = props;

  return (
  
        <Autocomplete
          multiple={true}
          id="valueId"
          options={symptoms}
          disableCloseOnSelect
          getOptionLabel={(option) => `${option.symp_title_et}`}
          // onChange={handleChange}
          renderOption={(props, option, { symptoms }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={symptoms}
              />
              {[option.symp_title_et]}
            </li>
          )}
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Kaebused"
              placeholder="Vali kaebused"
            />
          )}
        />
    
  );
}
export default DropSymptoms;