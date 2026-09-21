const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        originalFilename: {
            type: String,
            required: true
        },

        storedFilename: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        extractionMethod: {
            type: String,
            enum: ["pdf-parse", "tesseract-ocr"],
            required: true
        },

        extractedText: {
            type: String,
            default: ""
        },

        processingStatus: {
            type: String,
            enum: ["pending", "processing", "completed", "failed"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Document", documentSchema);