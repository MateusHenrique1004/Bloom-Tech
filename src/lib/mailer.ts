import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bloomtechsuporte0@gmail.com",
    pass: "zdsxksabazqtwhxt",
  },
});

export default transporter;
