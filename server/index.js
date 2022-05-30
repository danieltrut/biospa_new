// allows environment variables to be set on process.env should be at top: ;
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "http://localhost:3000",
};
// Allowing to make calls from frontend to backend api
app.use(cors(corsOptions));

//Analise requests from req.body in this middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Redirect requests to endpoint starting with /entity to matching folders /route/file
app.use("/api/procedures", require("./routes/procedureRoutes"));
app.use("/api/symptoms", require("./routes/symptomRoutes"));
app.use("/api/targets", require("./routes/targetRoutes"));
app.use("/api/diseases", require("./routes/diseaseRoutes"));
app.use("/api/mail", require("./routes/mailRoutes"));

app.use((req, rew, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(err.code).json({
    message: "Something went really wrong",
  });
});

// Listening for port cheking if serfer running, in terminal command: run indexjs
app.listen(process.env.PORT || 5000, function () {
  console.log(`Listening on port ${process.env.PORT}`);
});