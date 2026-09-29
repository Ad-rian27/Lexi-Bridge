const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFilename: {
      type: String,
      required: true,
    },

    storedFilename: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    extractionMethod: {
      type: String,
      enum: ["pdf-parse", "tesseract-ocr"],
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    extractedPages: {
      type: [
        {
          pageNumber: {
            type: Number,
            required: true,
          },
          text: {
            type: String,
            default: "",
          },
        },
      ],
      default: [],
    },

    processingStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

documentSchema.index({ userId: 1 });

module.exports = mongoose.model("Document", documentSchema);
