import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function PdfPreview({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [error, setError] = useState("");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setCurrentPage(1);
    setError("");
  }

  function onDocumentLoadError(error) {
    console.error("PDF loading failed:", error);
    setError("Unable to load the PDF document.");
  }

  function previousPage() {
    setCurrentPage((page) => Math.max(1, page - 1));
  }

  function nextPage() {
    setCurrentPage((page) => Math.min(numPages, page + 1));
  }

  function zoomIn() {
    setScale((value) => Math.min(2, value + 0.1));
  }

  function zoomOut() {
    setScale((value) => Math.max(0.5, value - 0.1));
  }

  function resetZoom() {
    setScale(1);
  }

  return (
    <div className="pdf-preview">
      <div className="pdf-toolbar">
        <div className="pdf-navigation">
          <span>{numPages || "--"} Pages</span>
        </div>

        <div className="pdf-zoom">
          <button onClick={zoomOut} disabled={scale <= 0.5}>
            −
          </button>

          <span>{Math.round(scale * 100)}%</span>

          <button onClick={zoomIn} disabled={scale >= 2}>
            +
          </button>

          <button onClick={resetZoom}>Reset</button>
        </div>
      </div>

      {error ? (
        <p>{error}</p>
      ) : (
        <div className="pdf-document-area">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<p>Loading PDF...</p>}
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={550 * scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={<p>Rendering page...</p>}
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}

export default PdfPreview;
