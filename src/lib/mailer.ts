import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_GOOGLE,
    pass: process.env.PASS_GOOGLE
  },
});

export default transporter;
