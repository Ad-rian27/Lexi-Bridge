const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
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

      const fileBuffer = require("fs").readFileSync(req.file.path);

      const fileHash = crypto
        .createHash("sha256")
        .update(fileBuffer)
        .digest("hex");

      console.log("Uploaded PDF Hash:", fileHash);

      const existingDocument = await Document.findOne({
        userId: req.user.userId,
        fileHash,
      });

      if (existingDocument) {
        return res.status(200).json({
          message: "Document already exists",
          reused: true,
          document: {
            id: existingDocument._id,
            originalFilename: existingDocument.originalFilename,
            extractionMethod: existingDocument.extractionMethod,
            processingStatus: existingDocument.processingStatus,
          },
        });
      }

      const result = await extractTextFromPDF(req.file.path);

      const document = new Document({
        userId: req.user.userId,
        fileHash,
        originalFilename: req.file.originalname,
        storedFilename: req.file.filename,
        filePath: req.file.path,
        extractionMethod: result.method,
        extractedText: result.text,
        extractedPages: result.pages || [],
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
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      documents,
    });
  } catch (error) {
    console.error("Failed to fetch documents:", error);

    res.status(500).json({
      message: "Failed to fetch documents",
      error: error.message,
    });
  }
});

router.get("/:id/file", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid document ID",
      });
    }

    const document = await Document.findOne({
      _id: id,
      userId: req.user.userId,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const filePath = path.resolve(document.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Original PDF file not found",
      });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(document.originalFilename)}"`,
    );

    return res.sendFile(filePath);
  } catch (error) {
    console.error("Failed to retrieve PDF:", error);

    return res.status(500).json({
      message: "Failed to retrieve PDF",
    });
  }
});

module.exports = router;
