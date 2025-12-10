import nodemailer from "nodemailer";

export const sendMail = async ({ name, phone, email, destination, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Новая заявка с сайта ЧудаТур",
    html: `
      <h2>Новая заявка</h2>
      <p><b>Имя:</b> ${name}</p>
      <p><b>Телефон:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Направление:</b> ${destination}</p>
      <p><b>Сообщение:</b> ${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
