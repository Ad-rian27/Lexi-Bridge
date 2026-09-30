const puppeteer = require("puppeteer-core");

async function testBrowser() {
  try {
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
      args: ["--no-sandbox"],
    });

    console.log("Chrome launched successfully!");

    const page = await browser.newPage();

    await page.setContent(`
      <html>
        <body>
          <h1>LexiBridge PDF Test</h1>
          <p>नमस्ते, यह हिंदी परीक्षण है।</p>
          <p>ഇത് മലയാളം പരിശോധനയാണ്.</p>
          <p>இது தமிழ் சோதனை.</p>
        </body>
      </html>
    `);

    await page.pdf({
      path: "browser-test.pdf",
      format: "A4",
      printBackground: true,
    });

    console.log("PDF generated successfully!");

    await browser.close();
  } catch (error) {
    console.error("Browser test failed:", error);
  }
}

testBrowser();