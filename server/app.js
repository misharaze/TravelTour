import express from "express";
import cors from "cors";
import env from "dotenv";
import { sendMail } from "./mail.js";

env.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    await sendMail(req.body);
    res.json({ success: true, message: "Заявка отправлена!" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Ошибка отправки" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
