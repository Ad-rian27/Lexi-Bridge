
const fs = require("fs");
const path = require("path");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.mjs");

function groupTextItemsIntoLines(textItems, yTolerance = 3) {
  const sortedItems = [...textItems].sort(
    (a, b) => a.y - b.y || a.x - b.x
  );

  const lines = [];

  for (const item of sortedItems) {
    let matchingLine = lines.find(
      (line) => Math.abs(line.y - item.y) <= yTolerance
    );

    if (!matchingLine) {
      matchingLine = { y: item.y, items: [] };
      lines.push(matchingLine);
    }

    matchingLine.items.push(item);

    matchingLine.y =
      matchingLine.items.reduce((sum, entry) => sum + entry.y, 0) /
      matchingLine.items.length;
  }

  return lines
    .map((line) => {
      const items = [...line.items].sort((a, b) => a.x - b.x);

      return {
        y: line.y,
        x: items[0].x,
        text: items.map((item) => item.text).join(" "),
        items,
      };
    })
    .sort((a, b) => a.y - b.y);
}

function groupLinesIntoParagraphs(lines) {
  if (!lines.length) return [];

  const sortedLines = [...lines].sort((a, b) => a.y - b.y);
  const paragraphs = [];
  let current = [sortedLines[0]];

  for (let i = 1; i < sortedLines.length; i++) {
    const previous = sortedLines[i - 1];
    const next = sortedLines[i];

    const previousHeight = Math.max(
      1,
      ...previous.items.map((item) => item.height)
    );

    const nextHeight = Math.max(
      1,
      ...next.items.map((item) => item.height)
    );

    const verticalGap = next.y - previous.y;
    const normalGap = Math.max(previousHeight, nextHeight) * 2.2;

    if (verticalGap > normalGap) {
      paragraphs.push(current);
      current = [];
    }

    current.push(next);
  }

  paragraphs.push(current);

  return paragraphs.map((paragraph) => ({
    x: Math.min(...paragraph.map((line) => line.x)),
    y: paragraph[0].y,
    lines: paragraph,
    text: paragraph.map((line) => line.text).join("\n"),
  }));
}

function analyzePageLayout(page) {
  const lines = groupTextItemsIntoLines(page.textItems);

  const regions = lines.map((line) => {
    const ratio = line.y / page.height;

    return {
      text: line.text,
      x: line.x,
      y: line.y,
      region:
        ratio < 0.12
          ? "top"
          : ratio > 0.88
            ? "bottom"
            : "body",
    };
  });

  return {
    pageNumber: page.pageNumber,
    width: page.width,
    height: page.height,
    lineCount: lines.length,
    regions,
  };
}

async function inspectPdf(pdfPath) {
  const resolvedPath = path.resolve(pdfPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error("PDF file not found");
  }

  const data = new Uint8Array(fs.readFileSync(resolvedPath));

  const loadingTask = pdfjsLib.getDocument({
    data,
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;

  try {
    const pages = [];

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      const page = await pdf.getPage(pageNumber);

      try {
        const [textContent, viewport] = await Promise.all([
          page.getTextContent(),
          Promise.resolve(page.getViewport({ scale: 1 })),
        ]);

        const textItems = textContent.items
          .filter(
            (item) =>
              typeof item.str === "string" && item.str.trim().length > 0
          )
          .map((item) => {
            const transform = item.transform;

            return {
              text: item.str,
              x: transform[4],
              y: viewport.height - transform[5],
              width: item.width,
              height: item.height,
              fontSize: Math.hypot(transform[2], transform[3]),
            };
          });

        const pageData = {
          pageNumber,
          width: viewport.width,
          height: viewport.height,
          rotation: page.rotate,
          textItems,
          hasExtractableText: textItems.length > 0,
        };

        const lines = groupTextItemsIntoLines(textItems);

        pages.push({
          ...pageData,
          lineCount: lines.length,
          paragraphs: groupLinesIntoParagraphs(lines),
          layout: analyzePageLayout(pageData),
          needsOcrCheck: textItems.length === 0,
        });
      } finally {
        page.cleanup();
      }
    }

    return {
      pageCount: pdf.numPages,
      pages,
    };
  } finally {
    await pdf.destroy();
  }
}

module.exports = {
  inspectPdf,
  groupTextItemsIntoLines,
  groupLinesIntoParagraphs,
  analyzePageLayout,
};
