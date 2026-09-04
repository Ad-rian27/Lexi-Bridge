const tesseract = require("node-tesseract-ocr");

const config = {
    lang: "eng",
    oem: 1,
    psm: 6
};

async function extractText(imagePath) {
    const text = await tesseract.recognize(imagePath, config);

    return text;
}

module.exports = {
    extractText
};