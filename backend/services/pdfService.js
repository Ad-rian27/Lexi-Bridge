const fs = require("fs");
const { PDFParse } = require("pdf-parse");

async function extractPDFText(filePath) {
    const data = fs.readFileSync(filePath);

    const parser = new PDFParse({
        data: data
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
}

module.exports = {
    extractPDFText
};