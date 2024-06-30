import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dilpreetsaini174@gmail.com",
    pass: process.env.MAILKEY,
  },
});
