import nodemailer from "nodemailer";

async function sendEmail({
  from=process.env.EMAIL,
  to,
  cc,
  bcc,
  subject,
  html,
  attachments = [],
} = {}) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  let info = await transporter.sendMail({
    from: `"mohamedGendia" <${from}>`,
    to,
    cc,
    bcc,
    subject,
    html,
    attachments,
  });

  return info.rejected.length ? false : true;
}

export default sendEmail;