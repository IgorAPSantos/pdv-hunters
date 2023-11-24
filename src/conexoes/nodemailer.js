const nodemailer = require("nodemailer");

// Mailtrap sandbox para testar emails
console.log("process.env.MAIL_PASS")
console.log(process.env.MAIL_HOST)
 
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
 
// Brevo manndando emails reais ate 300 emails por dia gratis
// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS
//   }
// }); 

// async..await is not allowed in global scope, must use a wrapper
// const emailSender = async (from, to, subject, text) => {
//   // send mail with defined transport object
//   const path = __dirname.replace('\conexoes', '') + '/email_template/free-order-receipt.html'
//   const info = await transporter.sendMail({
//     from: `"👻": <${from}>`, // sender address 
//     to, // list of receivers 
//     subject, // Subject line 
//     text, // plain text body
//     html: await require('fs/promises').readFile(path)   
//   });     

//   console.log("Mensagem enviada: %s", info.messageId);
// } 

// async..await is not allowed in global scope, must use a wrapper
const emailSender = async (from, to, subject, data) => { 
  // send mail with defined transport object
  const path = __dirname.replace('\conexoes', '') + '/views/free-order-receipt.ejs'
  
  const info = await transporter.sendMail({
    from: `"👻": <${from}>`, // sender address  
    to, // list of receivers   
    subject, // Subject line  // plain text body
    html: data 
  });     

  console.log("Mensagem enviada: %s", info.messageId);
}


module.exports = emailSender 