const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// async..await is not allowed in global scope, must use a wrapper
const emailSender = async (from, to, subject, text) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"👻": <${from}>`, // sender address
    to, // list of receivers 
    subject, // Subject line
    text, // plain text body  
  }); 

  console.log("Mensagem enviada: %s", info.messageId);
}


module.exports = emailSender