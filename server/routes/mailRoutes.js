const express = require("express");
const mControllers = require("../controllers/mailControllers");
const router = express.Router();

// Routing for Sending email, post with method in  Model
// http://localhost:4000/api/sendMail/
router.route("/sendmail").post(mControllers.sendMail);

module.exports = router;
