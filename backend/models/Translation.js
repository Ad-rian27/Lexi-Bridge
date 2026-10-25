
const mongoose = require("mongoose");

const legalTermSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: true,
      trim: true,
    },

    translatedTerm: {
      type: String,
      default: "",
    },

    translations: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Retain compatibility with existing records.
    definition: {
      type: String,
      default: "",
    },

    // Definitions in different languages.
    definitions: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Simplified explanations in different languages.
    simplifiedMeaning: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    category: {
      type: String,
      default: "Legal Term",
    },

    start: {
      type: Number,
      required: true,
    },

    end: {
      type: Number,
      required: true,
    },

    matchedText: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
    strict: true,
  }
);

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

    legalTerms: {
      type: [legalTermSchema],
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
  }
);

translationSchema.index({ documentId: 1 });
translationSchema.index({ userId: 1 });

module.exports = mongoose.model(
  "Translation",
  translationSchema
);
