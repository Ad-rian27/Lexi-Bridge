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


app.get("/", (req, res) => {
    res.json({
        message: "LexiBridge AI Backend is running!"
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