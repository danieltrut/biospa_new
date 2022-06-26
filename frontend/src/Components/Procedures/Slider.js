import React, { useContext } from "react";
import { GlobalContext } from "./../../Context";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import ReactTooltip from "react-tooltip";

// Styling the input
import { makeStyles } from "@material-ui/core/styles";

const Input = styled(MuiInput)`
  width: 42px;
`;

function RangeSlider() {
  //const  [price, setPrice] = React.useState([20, 37]);
  const { pricesValue, setPricesValue } = useContext(GlobalContext); // Catches chosen Prices in Slider

  const [value, setValue] = React.useState(30); // Defolt price

  // Function catching input changes
  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  // Function passing new value in slider
  const handleSliderChange = (event, newValues) => {
    setValue(newValues);
    setPricesValue(newValues === "" ? "" : Number(newValues));
    console.log(pricesValue);
  };

  // Tooltip custom color and font size on Focus
  const useStyles = makeStyles({
    tooltip: {
      fontSize: "18px !important",
    },
  });

  const classes = useStyles();

  return (
    <Box className="slider" xs={12} sm={12} md={6}>
      <Typography id="input-slider" gutterBottom>
        Hinnapiir
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            data-tip="Leia protseduurid sobiva hinnapiiriga" // Tooltip text
            value={typeof value === "number" ? value : 30}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
          <ReactTooltip
            // Tooltip
            className={classes.tooltip}
            arrow
            backgroundColor="#4e5154"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            // onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RangeSlider;
