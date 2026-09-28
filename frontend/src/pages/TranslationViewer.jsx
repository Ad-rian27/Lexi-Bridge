import { useEffect, useState } from "react";
import PdfPreview from "../components/PdfPreview";
import { getDocumentPdf } from "../services/documentService";

function TranslationViewer() {
  const [selectedTermKey, setSelectedTermKey] = useState(null);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState("");

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
    if (selectedTermKey) {
      const selectedGroup = groupedTerms.get(selectedTermKey);

      activeOccurrences = selectedGroup ? selectedGroup.occurrences : [];
    } else if (showAllHighlights) {
      activeOccurrences = termGroups.flatMap((group) => group.occurrences);
    } else {
      // Default: only the first occurrence of each unique term.
      activeOccurrences = termGroups.map((group) => group.occurrences[0]);
    }
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
          className="legal-highlight"
          onClick={() => {
            setSelectedTermKey(selectedTermKey === termKey ? null : termKey);
          }}
          title={`Click to explore ${term.term}`}
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

  const selectedGroup = selectedTermKey
    ? groupedTerms.get(selectedTermKey)
    : null;

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

        <aside className="term-panel">
          <h2>Legal Terminology</h2>

          <p>{termGroups.length} unique terms detected</p>

          <label className="highlight-toggle">
            <input
              type="checkbox"
              checked={showAllHighlights}
              onChange={(event) => {
                setShowAllHighlights(event.target.checked);
                setSelectedTermKey(null);
              }}
            />
            Highlight all occurrences
          </label>

          <div className="term-list">
            {termGroups.map((group) => (
              <button
                key={group.key}
                className={`term-list-item ${
                  selectedTermKey === group.key ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedTermKey(
                    selectedTermKey === group.key ? null : group.key,
                  );
                }}
              >
                <span>{group.term}</span>

                <span className="occurrence-count">
                  {group.occurrences.length}
                </span>
              </button>
            ))}
          </div>

          {selectedGroup && (
            <div className="term-details">
              <h3>{selectedGroup.term}</h3>

              <p>
                <strong>Category</strong>
                <br />
                {selectedGroup.representative.category}
              </p>

              <p>
                <strong>Translated Term</strong>
                <br />
                {selectedGroup.representative.translatedTerm}
              </p>

              <p>
                <strong>Definition</strong>
                <br />
                {selectedGroup.representative.definitions?.[selectedLanguage]}
              </p>

              <p>
                <strong>Simplified Meaning</strong>
                <br />
                {
                  selectedGroup.representative.simplifiedMeaning?.[
                    selectedLanguage
                  ]
                }
              </p>

              <p>
                <strong>Occurrences</strong>
                <br />
                {selectedGroup.occurrences.length} in this document
              </p>

              <button onClick={() => setSelectedTermKey(null)}>
                Clear Selection
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default TranslationViewer;
