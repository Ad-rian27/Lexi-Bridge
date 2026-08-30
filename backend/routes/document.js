const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post("/upload", upload.single("document"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No document uploaded"
            });
        }

        res.status(200).json({
            message: "Document uploaded successfully",
            file: req.file
        });

    } catch (error) {
        res.status(500).json({
            message: "Document upload failed",
            error: error.message
        });
    }
});

module.exports = router;