const fs = require("fs");
const { PDFParse } = require("pdf-parse");

async function testPDF() {
    try {
        const files = fs.readdirSync("./uploads");

        if (files.length === 0) {
            console.log("No PDF found in uploads folder.");
            return;
        }

        const filePath = `./uploads/${files[0]}`;

        const data = fs.readFileSync(filePath);

        const parser = new PDFParse({
            data: data
        });

        const result = await parser.getText();

        console.log("\n--- EXTRACTED PDF TEXT ---\n");
        console.log(result.text);
        console.log("\n--- END ---");

        await parser.destroy();

    } catch (error) {
        console.error("PDF extraction failed:", error);
    }
}

testPDF();