import express from "express";
import dotenv from "dotenv";
import callback from "./callback";

dotenv.config();

const app = express();

app.use(express.json());

// ربط المسار
app.use("/api", callback);

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
