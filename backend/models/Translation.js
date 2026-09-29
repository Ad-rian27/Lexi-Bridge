const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sourceLanguage: {
      type: String,
      required: true,
    },

    targetLanguage: {
      type: String,
      enum: ["Malayalam", "Hindi", "Tamil"],
      required: true,
    },

    translatedText: {
      type: String,
      default: "",
    },

    translatedPages: {
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

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

translationSchema.index({ documentId: 1 });
translationSchema.index({ userId: 1 });

module.exports = mongoose.model("Translation", translationSchema);
