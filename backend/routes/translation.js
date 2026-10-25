const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const authMiddleware = require("../middleware/authMiddleware.js");
const Document = require("../models/Document");
const Translation = require("../models/Translation");

const {
  translateLongText,
  translatePages,
} = require("../services/translationService");

const { detectTranslatedLegalTerms } = require("../services/legalTermService");

const router = express.Router();

const supportedLanguages = {
  "ml-IN": "Malayalam",
  "hi-IN": "Hindi",
  "ta-IN": "Tamil",
};

// Translate a document
router.post("/translate", authMiddleware, async (req, res) => {
  try {
    const { documentId, targetLanguage } = req.body;

    if (!documentId || !targetLanguage) {
      return res.status(400).json({
        message: "documentId and targetLanguage are required",
      });
    }

    if (!supportedLanguages[targetLanguage]) {
      return res.status(400).json({
        message: "Unsupported target language",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      userId: req.user.userId,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // Reuse an existing completed translation when available
    const existingTranslation = await Translation.findOne({
      documentId: document._id,
      userId: req.user.userId,
      targetLanguage: supportedLanguages[targetLanguage],
      status: "completed",
    }).sort({ createdAt: -1 });

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

      return res.status(201).json({
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

    return res.status(500).json({
      message: "Translation failed",
      error: error.message,
    });
  }
});

// Get translation history
router.get("/", authMiddleware, async (req, res) => {
  try {
    const translations = await Translation.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    const documentIds = [
      ...new Set(translations.map((item) => String(item.documentId))),
    ];

    const documents = await Document.find({
      _id: { $in: documentIds },
      userId: req.user.userId,
    }).select("_id originalFilename");

    const documentMap = new Map(
      documents.map((document) => [
        String(document._id),
        document.originalFilename,
      ]),
    );

    const history = translations.map((item) => ({
      _id: item._id,
      documentId: item.documentId,
      documentName:
        documentMap.get(String(item.documentId)) || "Document unavailable",
      targetLanguage: item.targetLanguage,
      sourceLanguage: item.sourceLanguage,
      status: item.status,
      createdAt: item.createdAt,
    }));

    return res.status(200).json({
      translations: history,
    });
  } catch (error) {
    console.error("Failed to fetch translation history:", error);

    return res.status(500).json({
      message: "Failed to load translation history",
    });
  }
});

// Get a saved translation
router.get("/:translationId", authMiddleware, async (req, res) => {
  try {
    const translation = await Translation.findOne({
      _id: req.params.translationId,
      userId: req.user.userId,
    });

    if (!translation) {
      return res.status(404).json({
        message: "Translation not found",
      });
    }

    return res.status(200).json({
      translation: {
        _id: translation._id,
        id: translation._id,
        documentId: translation.documentId,
        sourceLanguage: translation.sourceLanguage,
        targetLanguage: translation.targetLanguage,
        status: translation.status,
        translatedText: translation.translatedText || "",
        translatedPages: translation.translatedPages || [],
        legalTerms: translation.legalTerms || [],
        createdAt: translation.createdAt,
      },
    });
  } catch (error) {
    console.error("Failed to fetch saved translation:", error);

    return res.status(500).json({
      message: "Failed to load saved translation",
      error: error.message,
    });
  }
});

// Download a translated document as PDF
router.get("/:translationId/download", authMiddleware, async (req, res) => {
  let browser;

  try {
    const { translationId } = req.params;

    // Find the translation belonging to the logged-in user
    const translation = await Translation.findOne({
      _id: translationId,
      userId: req.user.userId,
    });

    if (!translation) {
      return res.status(404).json({
        message: "Translation not found",
      });
    }

    // Confirm that the associated document exists in the database
    const originalDocument = await Document.findOne({
      _id: translation.documentId,
      userId: req.user.userId,
    });

    if (!originalDocument) {
      return res.status(404).json({
        message: "Original document not found",
      });
    }

    if (translation.status !== "completed") {
      return res.status(400).json({
        message: "Translation is not completed yet",
      });
    }

    // Select the font for the translated language

    // Select the correct font for each supported language.
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

    const fontPath = path.resolve(__dirname, "../fonts", fontFile);

    if (!fs.existsSync(fontPath)) {
      throw new Error(`Required font file not found: ${fontPath}`);
    }

    // Embed the font directly so Chromium does not depend
    // on file:// URL resolution in the hosted environment.
    const fontBase64 = fs.readFileSync(fontPath).toString("base64");

    // Prepare translated pages
    const pages =
      translation.translatedPages && translation.translatedPages.length > 0
        ? translation.translatedPages
        : [
            {
              pageNumber: 1,
              text: translation.translatedText || "",
            },
          ];

    // Escape HTML characters in translated text
    const escapeHtml = (text) =>
      String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

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
          <meta charset="UTF-8" />

          <style>
            @font-face {
  font-family: "LexiBridgeFont";
  src: url("data:font/ttf;base64,${fontBase64}") format("truetype");
  font-weight: 400;
  font-style: normal;
}

body,
.translated-text {
  font-family: "LexiBridgeFont", sans-serif;
}

            @page {
              size: A4;
              margin: 22mm 20mm 25mm 20mm;
            }

            body {
              font-family: "LexiBridgeFont", sans-serif;
              color: #222;
              font-size: 12pt;
              line-height: 1.8;
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

            .document-page {
              position: relative;
              page-break-after: auto;
              break-after: auto;
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

    // Launch Puppeteer's bundled Chromium.
    // This avoids using a Windows-specific Chrome path on Render.
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
      timeout: 60000,
    });

    await page.evaluate(async () => {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 10000)),
      ]);
    });

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
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Failed to close Puppeteer browser:", closeError);
      }
    }
  }
});

module.exports = router;
