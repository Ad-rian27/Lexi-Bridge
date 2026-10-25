const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware.js");
const Document = require("../models/Document");
const Translation = require("../models/Translation");
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
        // Remove the newly uploaded temporary file.
        await fs.promises.unlink(req.file.path).catch((error) => {
          console.error("Failed to remove duplicate temporary file:", error);
        });

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

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid document ID",
      });
    }

    // Only allow the owner to delete the document.
    const document = await Document.findOne({
      _id: id,
      userId: req.user.userId,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // Find translations associated with this document.
    const translations = await Translation.find({
      documentId: document._id,
      userId: req.user.userId,
    }).select("_id");

    // Remove translation records first.
    await Translation.deleteMany({
      documentId: document._id,
      userId: req.user.userId,
    });

    // Remove the uploaded PDF if it exists.
    const filePath = path.resolve(document.filePath);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }

    // Remove the document record.
    await Document.deleteOne({
      _id: document._id,
      userId: req.user.userId,
    });

    return res.status(200).json({
      message: "Document and associated translations deleted successfully",
      deletedTranslations: translations.length,
    });
  } catch (error) {
    console.error("Document deletion failed:", error);

    return res.status(500).json({
      message: "Failed to delete document",
    });
  }
});

module.exports = router;
