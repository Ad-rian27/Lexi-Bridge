const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const pdf = new PDFDocument();

const outputPath = path.join(__dirname, "font-test.pdf");

pdf.pipe(fs.createWriteStream(outputPath));

pdf.font(
  path.join(__dirname, "fonts", "NotoSansDevanagari-Regular.ttf")
);

pdf.fontSize(20);

pdf.text("Hindi Font Test");

pdf.text("नमस्ते, यह एक हिंदी परीक्षण है।");

pdf.end();

console.log("PDF test completed.");