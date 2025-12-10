import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, phone, email, destination, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: "Заявка с сайта <info@chudatour.com>",
      to: process.env.EMAIL,
      subject: "НОВАЯ ЗАЯВКА",
      html: `
        <h2>Новая заявка</h2>
        <b>Имя:</b> ${name}<br>
        <b>Телефон:</b> ${phone}<br>
        <b>Email:</b> ${email}<br>
        <b>Направление:</b> ${destination}<br>
        <b>Сообщение:</b> ${message}
      `
    });

    res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
}
