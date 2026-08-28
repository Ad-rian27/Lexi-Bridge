const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const User = require("./models/Users");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "LexiBridge AI Backend is running!"
    });
});

app.post("/test-user", async (req, res) => {
    try {
        const user = new User({
            name: "Test User",
            email: "test@lexibridge.com",
            password: "temporary-password"
        });

        await user.save();

        res.json({
            message: "Test user created successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
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