const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const documentRoutes = require("./routes/document");
const translationRoutes = require("./routes/translation");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/translations", translationRoutes);
app.post("/api/tts/malayalam", async (req, res) => {
  try {
    const { text } = req.body;

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        message: "Text is required.",
      });
    }

    if (text.length > 2500) {
      return res.status(400).json({
        message: "Text must be 2500 characters or fewer.",
      });
    }

    if (!process.env.SARVAM_API_KEY) {
      return res.status(500).json({
        message: "Sarvam API key is not configured on the server.",
      });
    }

    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": process.env.SARVAM_API_KEY,
      },
      body: JSON.stringify({
        text: text.trim(),
        model: "bulbul:v3",
        language_code: "ml-IN",
        output_audio_codec: "mp3",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Sarvam TTS error:", data);

      return res.status(response.status).json({
        message: "Malayalam speech generation failed.",
      });
    }

    if (!data.audios?.[0]) {
      return res.status(502).json({
        message: "The speech service returned no audio.",
      });
    }

    return res.json({
      audioBase64: data.audios[0],
      mimeType: "audio/mpeg",
    });
  } catch (error) {
    console.error("Malayalam TTS error:", error.message);

    return res.status(500).json({
      message: "Unable to generate Malayalam speech.",
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "LexiBridge AI Backend is running!",
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
