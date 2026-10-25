const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");
const tesseract = require("node-tesseract-ocr");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);

const PDFTOPPM_PATH =
  "C:\\Users\\rian2\\OneDrive\\Desktop\\Adrian\\Code_tools\\poppler\\poppler-26.02.0\\Library\\bin\\pdftoppm.exe";

async function extractTextFromPDF(filePath) {
  // First try normal PDF text extraction
  const data = fs.readFileSync(filePath);

  const parser = new PDFParse({
    data: data,
  });

  const result = await parser.getText();

  console.log("PDF result properties:", Object.keys(result));

  console.log("Extracted page count:", result.pages?.length);

  console.log(
    "First page properties:",
    result.pages?.[0] ? Object.keys(result.pages[0]) : "No page data",
  );

  await parser.destroy();

  // If meaningful text was found, use it
  if (result.text && result.text.trim().length > 50) {
    const pages = result.pages.map((page) => ({
      pageNumber: page.num,
      text: page.text.trim(),
    }));

    return {
      method: "pdf-parse",
      text: result.text,
      pages,
    };
  }

  // Otherwise use OCR
  console.log("Little or no text found. Using OCR...");

  const outputFolder = path.join("uploads", "ocr");

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const outputPrefix = path.join(outputFolder, "page");

  await execFileAsync(PDFTOPPM_PATH, ["-png", filePath, outputPrefix]);

  const files = fs
    .readdirSync(outputFolder)
    .filter((file) => file.endsWith(".png"))
    .sort();

  let extractedText = "";

  for (const file of files) {
    const imagePath = path.join(outputFolder, file);

    const text = await tesseract.recognize(imagePath, {
      lang: "eng",
      oem: 1,
      psm: 6,
    });

    extractedText += text + "\n";

    // fs.unlinkSync(imagePath);
  }

  return {
    method: "tesseract-ocr",
    text: extractedText,
  };
}

module.exports = {
  extractTextFromPDF,
};
