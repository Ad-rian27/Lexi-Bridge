const puppeteer = require("./backend/node_modules/puppeteer-core");
const fs = require("fs");
const path = require("path");

async function testMalayalam() {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  const fontPath = path.resolve("backend/fonts/NotoSansMalayalam-Regular.ttf");

  const fontBase64 = fs.readFileSync(fontPath).toString("base64");

  const html = `
    <!DOCTYPE html>
    <html lang="ml">
    <head>
      <meta charset="UTF-8">

      <style>
        @font-face {
          font-family: "NotoMalayalam";
          src: url(data:font/ttf;base64,${fontBase64}) format("truetype");
        }

        body {
          font-family: "NotoMalayalam", sans-serif;
          font-size: 24px;
          padding: 40px;
        }
      </style>
    </head>

    <body>
      <h2>Malayalam Rendering Test</h2>

      <p>ഹർജി പരിഗണിച്ച ശേഷം ഉത്തരവ് പുറപ്പെടുവിക്കുന്നു.</p>

      <p>കേരള ഹൈക്കോടതി</p>

      <p>പ്രതിയുടെ ജാമ്യാപേക്ഷ പരിഗണിച്ചു.</p>
    </body>
    </html>
  `;

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const outputPath = path.resolve(
    "pdf-layout-test/malayalam_chromium_test.pdf",
  );

  await page.pdf({
    path: outputPath,
    width: "8.5in",
    height: "14in",
    printBackground: true,
  });

  await browser.close();

  console.log("Malayalam PDF generated successfully!");
  console.log("Output:", outputPath);
}

testMalayalam().catch(console.error);
