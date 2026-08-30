const { extractText } = require("./services/ocrService");

const imagePath = "./test-files/test.png";

async function testOCR() {
    try {
        const text = await extractText(imagePath);

        console.log("\n--- EXTRACTED TEXT ---\n");
        console.log(text);
        console.log("\n--- END ---");

    } catch (error) {
        console.error("OCR failed:", error);
    }
}

testOCR();