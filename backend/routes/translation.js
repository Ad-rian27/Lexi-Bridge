const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const Document = require("../models/Document");
const Translation = require("../models/Translation");
const { translateLongText } = require("../services/translationService");
const {
  detectLegalTerms,
  detectTranslatedLegalTerms,
} = require("../services/legalTermService");

const router = express.Router();

const supportedLanguages = {
  "ml-IN": "Malayalam",
  "hi-IN": "Hindi",
  "ta-IN": "Tamil",
};

router.post("/translate", authMiddleware, async (req, res) => {
  try {
    const { documentId, targetLanguage } = req.body;

    // Validate input
    if (!documentId || !targetLanguage) {
      return res.status(400).json({
        message: "documentId and targetLanguage are required",
      });
    }

    // Validate target language
    if (!supportedLanguages[targetLanguage]) {
      return res.status(400).json({
        message: "Unsupported target language",
      });
    }

    // Find the document belonging to the logged-in user
    const document = await Document.findOne({
      _id: documentId,
      userId: req.user.userId,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    if (!document.extractedText) {
      return res.status(400).json({
        message: "Document has no extracted text",
      });
    }

    // Create a pending translation record
    const translation = new Translation({
      documentId: document._id,
      userId: req.user.userId,
      sourceLanguage: "English",
      targetLanguage: supportedLanguages[targetLanguage],
      status: "processing",
    });

    await translation.save();

    try {
      // Translate the extracted document text
      const translatedText = await translateLongText(
        document.extractedText,
        targetLanguage,
      );

      const legalTerms = await detectTranslatedLegalTerms(
        translatedText,
        targetLanguage,
      );

      translation.translatedText = translatedText;
      translation.status = "completed";

      await translation.save();

      res.status(201).json({
        message: "Document translated successfully",
        translation: {
          id: translation._id,
          documentId: translation.documentId,
          targetLanguage: translation.targetLanguage,
          status: translation.status,
          translatedText: translation.translatedText,
          legalTerms,
        },
      });
    } catch (translationError) {
      translation.status = "failed";
      await translation.save();

      throw translationError;
    }
  } catch (error) {
    console.error("Translation failed:", error);

    res.status(500).json({
      message: "Translation failed",
      error: error.message,
    });
  }
});

module.exports = router;
