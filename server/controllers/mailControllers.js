require("dotenv").config();

const nodemailer = require("nodemailer");

exports.sendMail = (req, res, next) => {
  try {
    console.log("req body", req.query);
    let userName = req.query.name; // name is useState of name form frontend
    let userEmail = req.query.email;
    let userSubject = req.query.subject;
    let userMessage = req.query.message;
    let userProcedures = req.query.procedures;

    // Reusable transport method that opens pool of SMTP connections
    let smtpTransport = nodemailer.createTransport({
      // pool: true, // use pooled connections instead of creating a new connection for every email
      host: "mail.veebimajutus.ee",
      port: 465,
      secure: true,
      logger: true, // logs to console
      debug: true, // logs errors
      transactionLog: true, // include SMTP traffic in the logs
      auth: {
        user: process.env.SMTP_TO_EMAIL,
        pass: process.env.SMTP_TO_PASSWORD,
      },
    });

    smtpTransport.close(); // Closess the connection if there is no need for long

    // Setup email data with unicode symbols
    var mailOptions = {
      from: process.env.SMTP_TO_EMAIL,
      to: userEmail,
      subject: userSubject,

      html: `<b>Tere, ${userName}!</b> 
      </br>
      <p>Loodus BioSpa protseduuride eelvalik</p>\n 
      </br>
      <p>Sisu:\n${userMessage}</p>\n
      <p>Teie poolt valitud protseduurid: ${userProcedures}</p>
      </br>
      </br>
      <p>NB!</p> 
      </br>
      <p>NB!</p></br>
      <ol>
        <li>Kohapeal selgub kas valitud protseduure on võimalik pakkuda.</li>
        <li>Doktori assistent otsustab kas Teie tervisliku seisundi puhul tohib antud protseduure teha.</li>
      </ol>
      </br>
      <p>Loodus BioSpa</p> </br>
      <p>tel. (+372)5093581</p></br>
      <a href="https://biospa.ee/">www.biospa.ee</a></br>
      <a href="mailto:loodus@biospa.ee">loodus@biospa.ee</a></br>
      <a href="mailto:loodus@biospa.ee">loodus@biospa.ee</a></br>
      `,
    };

    // Send email with defined transport object
    smtpTransport.sendMail(mailOptions, (err, response) => {
      setLoading(false);
      console.log(mailOptions);
    });
  } catch (error) {
    if (error) {
      console.log("Error In Sending Mail", error);
      return res.status(400).json({
        status: false,
        respLetter: `Juhtus Viga Kiri Saatmisel ${err}`,
      });
    }

    next(error);
  }
};
