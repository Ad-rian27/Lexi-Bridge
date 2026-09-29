import { useEffect, useRef, useState } from "react";
import PdfPreview from "../components/PdfPreview";
import { getDocumentPdf } from "../services/documentService";

function TranslationViewer() {
  const [activeTermKey, setActiveTermKey] = useState(null);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState("");
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    left: 0,
  });

  const popupRef = useRef(null);
  const showTermPopup = (termKey, event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const popupWidth = 320;
    const gap = 10;
    const margin = 12;

    // Prefer the right side of the highlighted word.
    let left = rect.right + gap;

    // If there is not enough room, place it on the left.
    if (left + popupWidth > window.innerWidth - margin) {
      left = rect.left - popupWidth - gap;
    }

    // Keep the popup inside the horizontal viewport.
    left = Math.max(
      margin,
      Math.min(left, window.innerWidth - popupWidth - margin),
    );

    // Align it with the highlighted word.
    let top = rect.top;

    // Keep it inside the vertical viewport.
    const maxTop = window.innerHeight - 300 - margin;
    top = Math.max(margin, Math.min(top, maxTop));

    setPopupPosition({ top, left });
    setActiveTermKey(termKey);
  };

  const savedResult = sessionStorage.getItem("translationResult");

  if (!savedResult) {
    return (
      <div className="translation-viewer">
        <h2>No translation found</h2>
        <p>Please upload and translate a document first.</p>

        <button onClick={() => (window.location.href = "/translate")}>
          Translate Document
        </button>
      </div>
    );
  }

  const result = JSON.parse(savedResult);
  const translation = result.translation;

  const documentId = translation.documentId;

  useEffect(() => {
    if (!documentId) {
      setPdfError("Document ID is missing.");
      setPdfLoading(false);
      return;
    }

    let objectUrl;
    let cancelled = false;

    const loadOriginalPdf = async () => {
      try {
        setPdfLoading(true);
        setPdfError("");

        const blob = await getDocumentPdf(documentId);

        if (cancelled) return;

        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (error) {
        console.error("Failed to load original PDF:", error);
        setPdfError("Unable to load the original PDF.");
      } finally {
        if (!cancelled) {
          setPdfLoading(false);
        }
      }
    };

    loadOriginalPdf();

    return () => {
      cancelled = true;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [documentId]);

  console.log("Translation document ID:", translation.documentId);

  const languageKey = {
    Malayalam: "malayalam",
    Hindi: "hindi",
    Tamil: "tamil",
  };

  const selectedLanguage = languageKey[translation.targetLanguage] || "english";

  const translatedText = translation.translatedText || "";

  // Group repeated occurrences by their original English term.
  const groupedTerms = new Map();

  (translation.legalTerms || []).forEach((term) => {
    const key = term.term.trim().toLowerCase();

    if (!groupedTerms.has(key)) {
      groupedTerms.set(key, {
        key,
        term: term.term,
        representative: term,
        occurrences: [],
      });
    }

    groupedTerms.get(key).occurrences.push(term);
  });

  const termGroups = Array.from(groupedTerms.values());

  // Determine which occurrences should be highlighted.
  let activeOccurrences = [];

  if (result.highlightTerms !== false) {
    activeOccurrences = showAllHighlights
      ? termGroups.flatMap((group) => group.occurrences)
      : termGroups.map((group) => group.occurrences[0]);
  }

  // Sort by character position before rendering.
  activeOccurrences.sort((a, b) => a.start - b.start);

  const renderHighlightedText = () => {
    const elements = [];
    let currentPosition = 0;

    activeOccurrences.forEach((term, index) => {
      if (
        term.start < currentPosition ||
        term.end > translatedText.length ||
        term.start >= term.end
      ) {
        return;
      }

      if (term.start > currentPosition) {
        elements.push(
          <span key={`text-${index}`}>
            {translatedText.slice(currentPosition, term.start)}
          </span>,
        );
      }

      const termKey = term.term.trim().toLowerCase();

      elements.push(
        <mark
          key={`term-${index}`}
          className={`legal-highlight ${
            activeTermKey === termKey ? "active" : ""
          }`}
          onMouseEnter={(event) => showTermPopup(termKey, event)}
          onMouseLeave={() => setActiveTermKey(null)}
          onClick={(event) => {
            if (activeTermKey === termKey) {
              setActiveTermKey(null);
            } else {
              showTermPopup(termKey, event);
            }
          }}
          title={`Explore ${term.term}`}
        >
          {translatedText.slice(term.start, term.end)}
        </mark>,
      );

      currentPosition = term.end;
    });

    if (currentPosition < translatedText.length) {
      elements.push(
        <span key="remaining-text">
          {translatedText.slice(currentPosition)}
        </span>,
      );
    }

    return elements;
  };

  const activeGroup = activeTermKey ? groupedTerms.get(activeTermKey) : null;

  return (
    <div className="translation-viewer">
      <header className="viewer-header">
        <button onClick={() => (window.location.href = "/dashboard")}>
          ← Dashboard
        </button>

        <h1>Translated Document</h1>

        <span>{translation.targetLanguage}</span>
      </header>

      <div className="viewer-layout">
        <section className="original-document-panel">
          <div className="document-panel-header">
            <div>
              <h2>Original Document</h2>
              <p>English · Source PDF</p>
            </div>

            <span className="document-type-badge">PDF</span>
          </div>

          <div className="original-pdf-content">
            {pdfLoading && (
              <div className="pdf-loading-state">
                <div className="loading-spinner"></div>
                <p>Loading original document...</p>
              </div>
            )}

            {pdfError && <div className="pdf-error-state">{pdfError}</div>}

            {pdfUrl && !pdfLoading && <PdfPreview file={pdfUrl} />}
          </div>
        </section>
        <main className="document-content">
          <h2>Translated Text</h2>

          <p className="highlight-instruction">
            Select a legal term from the sidebar to highlight all its
            occurrences.
          </p>

          <article className="translated-text">
            {renderHighlightedText()}
          </article>
        </main>

        {activeGroup && (
          <div
            ref={popupRef}
            className="term-popup"
            style={{
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
            }}
            onMouseEnter={() => setActiveTermKey(activeGroup.key)}
            onMouseLeave={() => setActiveTermKey(null)}
          >
            <div className="term-popup-header">
              <span className="term-category">
                {activeGroup.representative.category || "Legal Term"}
              </span>

              <button
                className="term-popup-close"
                onClick={() => setActiveTermKey(null)}
                aria-label="Close terminology popup"
              >
                ×
              </button>
            </div>

            <h3>{activeGroup.term}</h3>

            <p className="term-translated">
              {activeGroup.representative.translatedTerm}
            </p>

            <div className="term-popup-section">
              <strong>Definition</strong>
              <p>
                {activeGroup.representative.definitions?.[selectedLanguage] ||
                  "Definition unavailable."}
              </p>
            </div>

            <div className="term-popup-section">
              <strong>Simple Explanation</strong>
              <p>
                {activeGroup.representative.simplifiedMeaning?.[
                  selectedLanguage
                ] || "Simplified meaning unavailable."}
              </p>
            </div>

            <div className="term-popup-footer">
              {activeGroup.occurrences.length} occurrence(s) in this document
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TranslationViewer;
