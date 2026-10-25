import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function PdfPreview({ file, pageNumber, onPageChange }) {
  const [numPages, setNumPages] = useState(null);
  const [internalPage, setInternalPage] = useState(1);
  const currentPage = pageNumber ?? internalPage;
  const setCurrentPage = (value) => {
    const next = typeof value === "function" ? value(currentPage) : value;
    if (pageNumber === undefined) setInternalPage(next);
    onPageChange?.(next);
  };
  const [scale, setScale] = useState(1);
  const [error, setError] = useState("");
  const [containerWidth, setContainerWidth] = useState(550);
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(([entry]) => setContainerWidth(Math.max(240, Math.min(900, entry.contentRect.width - 28))));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    if (pageNumber === undefined) setCurrentPage(1);
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
          <button onClick={previousPage} disabled={currentPage <= 1} aria-label="Previous PDF page">Previous</button>
          <span>Page {currentPage} of {numPages || "--"}</span>
          <button onClick={nextPage} disabled={!numPages || currentPage >= numPages} aria-label="Next PDF page">Next</button>
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
        <div className="pdf-document-area" ref={containerRef}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<p>Loading PDF...</p>}
          >
            {numPages && (
              <Page
                key={`page_${currentPage}`}
                pageNumber={currentPage}
                width={containerWidth * scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={<p>Rendering page...</p>}
              />
            )}
          </Document>
        </div>
      )}
    </div>
  );
}

export default PdfPreview;
