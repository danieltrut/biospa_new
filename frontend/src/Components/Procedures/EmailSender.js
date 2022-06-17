import React, { useContext } from "react";
import { GlobalContext } from "./../../Context";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import "../../index.css";
// Styling the input
import { makeStyles } from "@material-ui/core/styles";

// Styling the input

function EmailSender(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [letter, setLetter] = useState(""); // Hook for creating letter
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [procValueErr, setProcValueErr] = useState(false);
  const { proceduresValue, setProceduresValue } = useContext(GlobalContext); // Catches chosen Procedures in Tabel
  const handleRequest = async (e) => {
    e.preventDefault(); // stops the default action of a selected element
    // Email validation
    const regexTest = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g);
    setNameError("");
    setEmailError(false);

    //  Form validation
    name === "" ? setNameError(true) : setName("");
    !email.match(regexTest) ? setEmailError(true) : setEmail("");

    // Chosed procedures looping for API URL integration and loading
    // Take props, mapp it and with query param join
    const chosenProcedures = proceduresValue.map((n) => `${n}`).join(", ");
    // Error Component
    // Loading  is true if...
    if (name && email && chosenProcedures !== "" && email.match(regexTest)) {
      setLoading(true); // Set the fraise and then use Axios
      // Adding array of procedures to Rest Api, if Checkbox is checked - add to Api
      console.log({ email, message, name, subject }); // TODO see the object in console
      // Rest Api with query parameters
      const response = await axios
        .post(
          `http://localhost:4000/api/mail/sendmail?name=${name}&email=${email}&subject=${subject}&message=${message}&procedures=${chosenProcedures}`
        )
        .then((res) => {
          setLetter(response.data);
          alert("Email Sent Successfully");
          console.log(res);
          console.log(setProceduresValue);
          console.log(letter);
        });
    } else if (!chosenProcedures) {
      setProcValueErr(true);
      console.log(procValueErr);
    }
  };

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
    <form onSubmit={handleRequest} method="POST">
      <Typography
        variant="h5"
        error={procValueErr}
        component="div"
        gutterBottom
        mt={7}
        mb={3}
      >
        {loading
          ? "Kiri on saadetud!"
          : setProcValueErr
          ? "* Palun sisesta andmed"
          : "-"}
      </Typography>
      <Grid container spacing={2}>
        {/* --------------------- Name ---------------------------- */}

        <Grid item xs={12} sm={6} md={6}>
          <Tooltip
            title={<Typography fontSize={20}>Sisestage nimi</Typography>}
          >
            <Box>
              <TextField
                // data-private Hides Input Data in LogRocket Video
                data-private="lipsum"
                id="name"
                disabled={proceduresValue.length === 0}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                variant="outlined"
                // className={classes.focus}
                label="Sinu nimi"
                fullWidth
                autoComplete="name"
                error={nameError}
                name="Username"
                required
                className={classes.focus}
              />
            </Box>
          </Tooltip>
        </Grid>

        {/* ---------------------- Email with validation -------------------- */}

        <Grid item xs={12} sm={6} md={6}>
          <Tooltip
            title={
              <Typography fontSize={20}>Sisestage e-posti aadress</Typography>
            }
          >
            <Box>
              <TextField
                // data-private Hides Input Data in LogRocket Video
                data-private="lipsum"
                id="email"
                disabled={proceduresValue.length === 0}
                data-testid="email-input"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                variant="outlined"
                // className={classes.focus}
                label="E-post"
                fullWidth
                autoComplete="email"
                error={emailError}
                required
                className={classes.focus}
              />
              {email &&
                !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g.test(email) && (
                  <span className="error" data-testid="error-msg">
                    Palun sisestage õige e-posti aadress.
                  </span>
                )}
            </Box>
          </Tooltip>
        </Grid>
      </Grid>

      {/* ------------------------------- Second grid with subject and message ---------------------------- */}

      <Grid container spacing={2} style={{ marginTop: 15 }}>
        {/* ------------------------- Subject  -------------------------- */}

        <Grid item xs={12} sm={6} md={6}>
          <Tooltip
            title={<Typography fontSize={20}>Sisestage pealkiri</Typography>}
          >
            <Box>
              <TextField
                // data-private Hides Input Data in LogRocket Video
                data-private="lipsum"
                id="subject"
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                variant="outlined"
                //className={classes.focus}
                label="Pealkiri"
                fullWidth
                className={classes.focus}
              />
            </Box>
          </Tooltip>
        </Grid>

        {/* -------------------------- Message  -------------------------- */}

        <Grid item xs={12} sm={6} md={6}>
          <Tooltip
            title={
              <Typography fontSize={20}>Sisestage lisamärkused</Typography>
            }
          >
            <TextField
              // data-private Hides Input Data in LogRocket Video
              id="message"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              variant="outlined"
              // className={classes.focus}
              label="Lisamärkused"
              multiline
              rows={3}
              className={classes.focus}
            />
          </Tooltip>
        </Grid>
      </Grid>
      {/* ------------------------- Button --------------------------------- */}
      <Grid item xs={12} sm={6} md={6} style={{ marginTop: -10 }}>
        <Button
          id="buttonEmail"
          disabled={!name || !email}
          data-testid="button"
          onClick={() => {
            handleRequest(name, email);
          }}
          type="submit"
          variant="contained"
        >
          SAADA E-POSTILE
        </Button>
      </Grid>
    </form>
  );
}

export default EmailSender;
