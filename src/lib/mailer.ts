import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_GOOGLE,
    pass: process.env.PASS_GOOGLE,
  },
});

export default transporter;
