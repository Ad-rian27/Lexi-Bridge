const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware.js");
const Document = require("../models/Document");
const { extractTextFromPDF } = require("../services/documentService");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("document"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No document uploaded",
        });
      }

      const result = await extractTextFromPDF(req.file.path);

      const document = new Document({
        userId: req.user.userId,
        originalFilename: req.file.originalname,
        storedFilename: req.file.filename,
        filePath: req.file.path,
        extractionMethod: result.method,
        extractedText: result.text,
        processingStatus: "completed",
      });

      await document.save();

      res.status(201).json({
        message: "Document uploaded and saved successfully",
        document: {
          id: document._id,
          originalFilename: document.originalFilename,
          extractionMethod: document.extractionMethod,
          processingStatus: document.processingStatus,
        },
      });
    } catch (error) {
      console.error("Document processing failed:", error);

      res.status(500).json({
        message: "Document processing failed",
        error: error.message,
      });
    }
  },
);

router.get("/", authMiddleware, async (req, res) => {
    try {
        const documents = await Document.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            documents
        });
    } catch (error) {
        console.error("Failed to fetch documents:", error);

        res.status(500).json({
            message: "Failed to fetch documents",
            error: error.message
        });
    }
});

module.exports = router;
