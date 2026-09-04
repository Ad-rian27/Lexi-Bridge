const express = require("express");
const multer = require("multer");
const { extractTextFromPDF } = require("../services/documentService");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post("/upload", upload.single("document"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No document uploaded"
            });
        }

        const result = await extractTextFromPDF(req.file.path);

        res.status(200).json({
            message: "Document uploaded and text extracted successfully",
            filename: req.file.originalname,
            method: result.method,
            text: result.text
        });

    } catch (error) {
        console.error("Document processing failed:", error);

        res.status(500).json({
            message: "Document processing failed",
            error: error.message
        });
    }
});

module.exports = router;