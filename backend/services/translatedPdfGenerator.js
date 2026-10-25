const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");
const { inspectPdf } = require("./pdfProcessor");

const FONT_FILES = {
  Malayalam: "NotoSansMalayalam-Regular.ttf",
  Hindi: "NotoSansDevanagari-Regular.ttf",
  Tamil: "NotoSansTamil-Regular.ttf",
};

const CHROME_PATH =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function pointsToCssPixels(points) {
  return (points * 96) / 72;
}

function buildPageHtml(page, fontFamily) {
  const width = pointsToCssPixels(page.width);
  const height = pointsToCssPixels(page.height);

  return `
    <section
      class="document-page"
      style="
        width: ${width}mm;
        height: ${height}mm;
      "
    >
      <div class="translated-text">${escapeHtml(page.text)}</div>
      <div class="watermark">LexiBridge AI</div>
    </section>
  `;
}

function buildHtml(pages, fontPath, fontFamily) {
  const pageContent = pages
    .map((page) => buildPageHtml(page, fontFamily))
    .join("");

  const safeFontPath = fontPath.replace(/\\/g, "/");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        <style>
          @font-face {
            font-family: "${fontFamily}";
            src: url("file://${safeFontPath}") format("truetype");
            font-weight: normal;
            font-style: normal;
          }

          * {
            box-sizing: border-box;
          }

          @page {
            margin: 0;
          }

          html,
          body {
            margin: 0;
            padding: 0;
          }

          body {
            font-family: "${fontFamily}", sans-serif;
            color: #222;
          }

          .document-page {
            position: relative;
            box-sizing: border-box;
            padding: 22mm 20mm 25mm;
            overflow: hidden;
            page-break-after: always;
            break-after: page;
          }

          .document-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .translated-text {
            white-space: pre-wrap;
            overflow-wrap: anywhere;
            font-size: 12pt;
            line-height: 1.5;
          }

          .watermark {
            position: absolute;
            right: 20mm;
            bottom: 8mm;
            color: #999;
            font: italic 9pt Arial, sans-serif;
            opacity: 0.55;
          }
        </style>
      </head>

      <body>
        ${pageContent}
      </body>
    </html>
  `;
}

/**
 * Generates a translated PDF using the original page dimensions.
 *
 * This is an initial layout-aware renderer. It does not yet reproduce
 * the original PDF's images, tables, text positions, or backgrounds.
 */
async function generateTranslatedPdf({
  originalPdfPath,
  translatedPages,
  targetLanguage,
}) {
  let browser;

  try {
    if (!fs.existsSync(originalPdfPath)) {
      throw new Error("Original PDF file not found");
    }

    const fontFile = FONT_FILES[targetLanguage];

    if (!fontFile) {
      throw new Error("Unsupported translation language");
    }

    const fontPath = path.resolve(__dirname, "../fonts", fontFile);

    if (!fs.existsSync(fontPath)) {
      throw new Error(`Translation font not found: ${fontFile}`);
    }

    const originalLayout = await inspectPdf(originalPdfPath);

    if (!originalLayout.pages.length) {
      throw new Error("The original PDF contains no pages");
    }

    const pages =
      Array.isArray(translatedPages) && translatedPages.length > 0
        ? translatedPages
        : [{ pageNumber: 1, text: "" }];

    const htmlPages = pages.map((page, index) => {
      const originalPage =
        originalLayout.pages[Math.min(index, originalLayout.pages.length - 1)];

      return {
        pageNumber: page.pageNumber ?? index + 1,
        width: originalPage.width,
        height: originalPage.height,
        text: page.text ?? "",
      };
    });

    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ["--no-sandbox"],
    });

    const browserPage = await browser.newPage();

    const fontFamily = "LexiBridgeTranslationFont";

    await browserPage.setContent(buildHtml(htmlPages, fontPath, fontFamily), {
      waitUntil: "networkidle0",
    });

    await browserPage.evaluate(async () => {
      await document.fonts.ready;
    });

    const pdfBuffer = await browserPage.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      width: `${htmlPages[0].width / 72}in`,
      height: `${htmlPages[0].height / 72}in`,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });

    return pdfBuffer;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = {
  generateTranslatedPdf,
};
