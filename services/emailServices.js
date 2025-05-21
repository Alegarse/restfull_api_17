const nodemailer = require("nodemailer");
 
const emailConfig = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aleboy80@gmail.com",
        pass: "sowp cilb zguy cdzv"
    },
    tls: {
        rejectUnauthorized: false
    }
});


const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: "aleboy80@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
 
    await emailConfig.sendMail(mailOptions);
  } catch (error) {
    console.log("ha fallado el envio", error.message);
  }
};
 
module.exports = { sendEmail };
 