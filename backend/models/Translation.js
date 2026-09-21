const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        sourceLanguage: {
            type: String,
            required: true
        },

        targetLanguage: {
            type: String,
            enum: ["Malayalam", "Hindi", "Tamil"],
            required: true
        },

        translatedText: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["pending", "processing", "completed", "failed"],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Translation", translationSchema);