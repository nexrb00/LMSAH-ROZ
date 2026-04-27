import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Endpoint للـ callback
app.post("/api/callback", async (req, res) => {
  const cart = req.body;

  try {
    const response = await fetch(process.env.API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: JSON.stringify(cart),
    });

    const data = await response.json();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "فشل في الربط",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
