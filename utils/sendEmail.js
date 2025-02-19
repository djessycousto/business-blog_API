const nodemailer = require("nodemailer");
const nodemailerConfig = require("../utils/nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  // let testAccount = await nodemailer.createTestAccount();

  // configuration
  const transporter = await nodemailer.createTransport(nodemailerConfig);

  // send mail with defined transport object
  return transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
};

module.exports = sendEmail;
