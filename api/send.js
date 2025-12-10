import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { name, phone, email, destination, message } = req.body;

  try {
    await resend.emails.send({
      from: "ЧудаТур <onboarding@resend.dev>",
      to: process.env.TO_EMAIL,
      subject: "Новая заявка с сайта ЧудаТур",
      html: `
        <h2>Новая заявка</h2>
        <p><b>Имя:</b> ${name}</p>
        <p><b>Телефон:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Направление:</b> ${destination}</p>
        <p><b>Сообщение:</b> ${message}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({ success: false, error });
  }
}
