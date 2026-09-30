const express = require("express");
const puppeteer = require("puppeteer-core");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware.js");
const Document = require("../models/Document");
const Translation = require("../models/Translation");
const {
  translateLongText,
  translatePages,
} = require("../services/translationService");
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

    // Check whether a completed translation already exists
    const existingTranslation = await Translation.findOne({
      documentId: document._id,
      userId: req.user.userId,
      targetLanguage: supportedLanguages[targetLanguage],
      status: "completed",
    }).sort({ createdAt: -1 });

    console.log("Checking existing translation...");
    console.log("Document ID:", document._id);
    console.log("User ID:", req.user.userId);
    console.log("Target Language:", supportedLanguages[targetLanguage]);
    console.log("Existing Translation:", existingTranslation);

    if (existingTranslation) {
      return res.status(200).json({
        message: "Existing translation retrieved successfully",
        reused: true,
        translation: {
          id: existingTranslation._id,
          documentId: existingTranslation.documentId,
          targetLanguage: existingTranslation.targetLanguage,
          status: existingTranslation.status,
          translatedText: existingTranslation.translatedText,
          translatedPages: existingTranslation.translatedPages,
          legalTerms: existingTranslation.legalTerms || [],
        },
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
      let translatedPages = [];
      let translatedText = "";

      if (document.extractedPages && document.extractedPages.length > 0) {
        translatedPages = await translatePages(
          document.extractedPages,
          targetLanguage,
        );

        translatedText = translatedPages.map((page) => page.text).join("\n\n");
      } else {
        // Fallback for documents uploaded before page extraction was implemented
        translatedText = await translateLongText(
          document.extractedText,
          targetLanguage,
        );
      }

      const legalTerms = await detectTranslatedLegalTerms(
        translatedText,
        targetLanguage,
      );

      translation.translatedText = translatedText;
      translation.translatedPages = translatedPages;
      translation.legalTerms = legalTerms;
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
          translatedPages: translation.translatedPages,
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

// Download translated document as PDF
router.get("/:translationId/download", authMiddleware, async (req, res) => {
  let browser;

  try {
    const { translationId } = req.params;

    // Find translation belonging to the logged-in user
    const translation = await Translation.findOne({
      _id: translationId,
      userId: req.user.userId,
    });

    if (!translation) {
      return res.status(404).json({
        message: "Translation not found",
      });
    }

    // Only completed translations can be downloaded
    if (translation.status !== "completed") {
      return res.status(400).json({
        message: "Translation is not completed yet",
      });
    }

    // Select font based on target language
    const fontFiles = {
      Malayalam: "NotoSansMalayalam-Regular.ttf",
      Hindi: "NotoSansDevanagari-Regular.ttf",
      Tamil: "NotoSansTamil-Regular.ttf",
    };

    const fontFile = fontFiles[translation.targetLanguage];

    if (!fontFile) {
      return res.status(400).json({
        message: "Unsupported translation language",
      });
    }

    const fontPath = path.join(__dirname, "../fonts", fontFile);

    // Prepare translated pages
    const pages =
      translation.translatedPages && translation.translatedPages.length > 0
        ? translation.translatedPages
        : [{ pageNumber: 1, text: translation.translatedText }];

    // Escape HTML special characters
    const escapeHtml = (text) =>
      String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Build HTML content
    const pageContent = pages
      .map(
        (page) => `
      <section class="document-page">
        <div class="translated-text">${escapeHtml(page.text)}</div>
      </section>
    `,
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">

        <style>
          @font-face {
            font-family: "LexiBridgeFont";
            src: url("file://${fontPath.replace(/\\/g, "/")}");
          }

          @page {
            size: A4;
            margin: 22mm 20mm;
          }

          body {
            font-family: "LexiBridgeFont", sans-serif;
            color: #222;
            font-size: 12pt;
            line-height: 1.8;
          }

          @page {
  size: A4;
  margin: 22mm 20mm 25mm 20mm;
}

.watermark {
  position: fixed;
  bottom: 8mm;
  right: 20mm;
  font-size: 9pt;
  color: #999;
  opacity: 0.55;
  font-style: italic;
  font-family: Arial, sans-serif;
}

          .subtitle {
            font-size: 11pt;
            color: #666;
          }

          .document-page {
  page-break-after: always;
  position: relative;
}

.document-page:last-child {
  page-break-after: auto;
}

.translated-text {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  text-align: justify;
  font-size: 12pt;
  line-height: 1.5;
}
        </style>
      </head>

      <body>
        <div class="watermark">LexiBridge AI</div>
        ${pageContent}
      </body>
      </html>
    `;

    // Launch installed Chrome
    browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    // Ensure font is loaded before PDF generation
    await page.evaluate(() => document.fonts.ready);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    const filename = `LexiBridge_${translation.targetLanguage}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", pdfBuffer.length);

    return res.end(pdfBuffer);
  } catch (error) {
    console.error("PDF generation failed:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Failed to generate translated PDF",
        error: error.message,
      });
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

module.exports = router;
