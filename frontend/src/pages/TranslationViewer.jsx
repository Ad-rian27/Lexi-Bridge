import { useEffect, useRef, useState } from "react";
import PdfPreview from "../components/PdfPreview";
import { getDocumentPdf } from "../services/documentService";
import api from "../services/api";

function TranslationViewer() {
  const [activeTermKey, setActiveTermKey] = useState(null);
  const [pinnedTermKey, setPinnedTermKey] = useState(null);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [focus, setFocus] = useState("compare");
  const [narrowView, setNarrowView] = useState(
    () => window.matchMedia("(max-width: 980px)").matches,
  );
  const [textSize, setTextSize] = useState(17);
  const [page, setPage] = useState(1);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [speechStatus, setSpeechStatus] = useState("idle");
  const [speechError, setSpeechError] = useState("");
  const [speechRate, setSpeechRate] = useState(1);
  const [cloudAudioUrl, setCloudAudioUrl] = useState("");
  const [cloudAudioLoading, setCloudAudioLoading] = useState(false);
  const [cloudAudioError, setCloudAudioError] = useState("");
  const [loadedTranslation, setLoadedTranslation] = useState(null);
  const [translationLoadError, setTranslationLoadError] = useState("");
  const [translationLoading, setTranslationLoading] = useState(false);

  const speechRef = useRef(null);
  const audioElementRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    left: 0,
  });

  const popupRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 980px)");
    const update = () => setNarrowView(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const shell = document.querySelector(".app-frame");
    const originalViewport = document.querySelector(".original-pdf-content");
    const translatedViewport = document.querySelector(
      ".translated-content-viewport",
    );
    if (!shell || typeof MutationObserver === "undefined") return undefined;

    let savedPositions = null;
    let restoreTimer;
    const restorePositions = () => {
      if (!savedPositions) return;
      const positions = savedPositions;
      window.requestAnimationFrame(() => {
        if (originalViewport?.isConnected) {
          originalViewport.scrollTop = positions.originalTop;
          originalViewport.scrollLeft = positions.originalLeft;
        }
        if (translatedViewport?.isConnected) {
          translatedViewport.scrollTop = positions.translatedTop;
          translatedViewport.scrollLeft = positions.translatedLeft;
        }
        savedPositions = null;
      });
    };
    const observer = new MutationObserver(() => {
      savedPositions ||= {
        originalTop: originalViewport?.scrollTop || 0,
        originalLeft: originalViewport?.scrollLeft || 0,
        translatedTop: translatedViewport?.scrollTop || 0,
        translatedLeft: translatedViewport?.scrollLeft || 0,
      };
      window.clearTimeout(restoreTimer);
      restoreTimer = window.setTimeout(restorePositions, 260);
    });

    observer.observe(shell, { attributes: true, attributeFilter: ["class"] });
    return () => {
      observer.disconnect();
      window.clearTimeout(restoreTimer);
    };
  }, []);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (cloudAudioUrl) URL.revokeObjectURL(cloudAudioUrl);
    };
  }, [cloudAudioUrl]);

  const savedResult = sessionStorage.getItem("translationResult");
  let result = null;
  if (savedResult) {
    try {
      result = JSON.parse(savedResult);
    } catch {
      result = null;
    }
  }
  const initialTranslation = result?.translation;
  const translation = loadedTranslation || initialTranslation;
  const documentId = translation?.documentId;

  
  // Always fetch the latest saved translation and glossary details.
  useEffect(() => {
    const translationId =
      initialTranslation?._id || initialTranslation?.id;

    if (!translationId) {
      setLoadedTranslation(null);
      setTranslationLoadError("");
      setTranslationLoading(false);
      return undefined;
    }

    let cancelled = false;

    setTranslationLoading(true);
    setTranslationLoadError("");

    api
      .get(`/translations/${translationId}`, {
        params: { refresh: Date.now() },
      })
      .then((response) => {
        if (cancelled) return;

        const fullTranslation = response.data?.translation;

        if (!fullTranslation) {
          throw new Error(
            "The saved translation was not returned by the server."
          );
        }

        // Use the fresh backend response, including legalTerms.
        setLoadedTranslation(fullTranslation);
      })
      .catch((error) => {
        if (cancelled) return;

        console.error(
          "Failed to load the latest saved translation:",
          error
        );

        setTranslationLoadError(
          error.response?.data?.message ||
            "Unable to load the latest saved translation."
        );
      })
      .finally(() => {
        if (!cancelled) {
          setTranslationLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [initialTranslation?._id, initialTranslation?.id]);


  const showTermPopup = (termKey, event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const popupWidth = 320;
    const popupHeight = Math.min(420, window.innerHeight - 24);
    const gap = 10;
    const margin = 12;

    let left = rect.right + gap;

    if (left + popupWidth > window.innerWidth - margin) {
      left = rect.left - popupWidth - gap;
    }

    left = Math.max(
      margin,
      Math.min(left, window.innerWidth - popupWidth - margin),
    );

    let top = rect.top;

    const maxTop = window.innerHeight - popupHeight - margin;
    top = Math.max(margin, Math.min(top, maxTop));

    setPopupPosition({ top, left });
    setActiveTermKey(termKey);
  };

  useEffect(() => {
    if (!pinnedTermKey) return;

    const handleOutsideClick = (event) => {
      const clickedPopup = popupRef.current?.contains(event.target);
      const clickedHighlight = event.target.closest?.(".legal-highlight");
      const changedViewerLayout = event.target.closest?.(
        ".sidebar-collapse-button, .viewer-mode-controls",
      );

      if (!clickedPopup && !clickedHighlight && !changedViewerLayout) {
        setPinnedTermKey(null);
        setActiveTermKey(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPinnedTermKey(null);
        setActiveTermKey(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [pinnedTermKey]);

  useEffect(() => {
    if (!documentId) return undefined;
    let objectUrl;
    let cancelled = false;

    const loadOriginalPdf = async () => {
      try {
        const blob = await getDocumentPdf(documentId);
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (error) {
        console.error("Failed to load original PDF:", error);
        if (!cancelled) setPdfError("Unable to load the original PDF.");
      } finally {
        if (!cancelled) setPdfLoading(false);
      }
    };

    void loadOriginalPdf();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [documentId]);

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

  if (!result) {
    return (
      <div className="translation-viewer">
        <h2>Unable to load translation</h2>
        <p>
          The saved translation data is invalid. Please translate the document
          again.
        </p>
        <button onClick={() => (window.location.href = "/translate")}>
          Translate Document
        </button>
      </div>
    );
  }

  if (!translation) {
    return (
      <div className="translation-viewer">
        <h2>Translation data unavailable</h2>
        <button onClick={() => (window.location.href = "/translate")}>
          Translate Document
        </button>
      </div>
    );
  }

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);
      setDownloadError("");

      const response = await api.get(
        `/translations/${translation._id || translation.id}/download`,
        { responseType: "blob" },
      );
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `LexiBridge_${translation.targetLanguage}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error);
      setDownloadError("Unable to download the translated PDF.");
    } finally {
      setDownloading(false);
    }
  };

  const languageKey = {
    Malayalam: "malayalam",
    Hindi: "hindi",
    Tamil: "tamil",
  };

  const speechLanguage =
    {
      Malayalam: "ml-IN",
      Hindi: "hi-IN",
      Tamil: "ta-IN",
      English: "en-IN",
    }[translation.targetLanguage] || "en-IN";

  const selectedLanguage = languageKey[translation.targetLanguage] || "english";

  const translatedText = translation.translatedText || "";
  const translatedPages = Array.isArray(translation.translatedPages)
    ? translation.translatedPages
    : [];
  const hasPageTranslations =
    translatedPages.length > 0 &&
    translatedPages.some((item) => typeof item.text === "string");
  const totalTextPages = hasPageTranslations ? translatedPages.length : 1;
  const visibleText = hasPageTranslations
    ? translatedPages[page - 1]?.text || ""
    : translatedText;
  const pageTextOffset = hasPageTranslations
    ? translatedPages
        .slice(0, page - 1)
        .reduce((total, item) => total + (item.text || "").length + 2, 0)
    : 0;

  // Group repeated occurrences by their original English term.
  const groupedTerms = new Map();

  (translation.legalTerms || []).forEach((term) => {
    if (!term.term) return;

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

  let activeOccurrences = [];

  if (result.highlightTerms !== false) {
    activeOccurrences = showAllHighlights
      ? termGroups.flatMap((group) => group.occurrences)
      : termGroups.map((group) => group.occurrences[0]);
  }

  activeOccurrences = activeOccurrences
    .map((term) => ({
      ...term,
      start: term.start - pageTextOffset,
      end: term.end - pageTextOffset,
    }))
    .filter((term) => term.start >= 0 && term.end <= visibleText.length)
    .sort((a, b) => a.start - b.start);

  const renderHighlightedText = () => {
    const elements = [];
    let currentPosition = 0;

    activeOccurrences.forEach((term, index) => {
      if (
        typeof term.start !== "number" ||
        typeof term.end !== "number" ||
        term.start < currentPosition ||
        term.end > visibleText.length ||
        term.start >= term.end
      ) {
        return;
      }

      if (term.start > currentPosition) {
        elements.push(
          <span key={`text-${index}`}>
            {visibleText.slice(currentPosition, term.start)}
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
          role="button"
          tabIndex={0}
          aria-label={`Show details for ${term.term}`}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              showTermPopup(termKey, event);
              setPinnedTermKey(termKey);
            }
          }}
          onClick={(event) => {
            event.preventDefault();

            if (pinnedTermKey === termKey) {
              setPinnedTermKey(null);
              setActiveTermKey(null);
            } else {
              showTermPopup(termKey, event);
              setPinnedTermKey(termKey);
            }
          }}
          title={`Explore ${term.term}`}
        >
          {visibleText.slice(term.start, term.end)}
        </mark>,
      );

      currentPosition = term.end;
    });

    if (currentPosition < visibleText.length) {
      elements.push(
        <span key="remaining-text">{visibleText.slice(currentPosition)}</span>,
      );
    }

    return elements;
  };

  const activeGroup = activeTermKey ? groupedTerms.get(activeTermKey) : null;

  const representative = activeGroup?.representative;

  const cleanTextForSpeech = (text) => {
    return (
      text
        // Remove URLs
        .replace(/https?:\/\/\S+/gi, " ")

        // Remove common programming and mathematical symbols
        .replace(/[=+*/\\<>|~^_#@%&$]/g, " ")

        // Remove brackets and decorative punctuation
        .replace(/[{}\[\]()]/g, " ")

        // Collapse repeated punctuation
        .replace(/[!?.,;:—–-]{2,}/g, " ")

        // Normalize whitespace
        .replace(/\s+/g, " ")
        .trim()
    );
  };

  const playMalayalamSpeech = async () => {
    if (!visibleText.trim()) {
      setCloudAudioError("No translated text is available.");
      return;
    }

    try {
      setCloudAudioLoading(true);
      setCloudAudioError("");

      const speechText = cleanTextForSpeech(visibleText);

      if (!speechText) {
        setCloudAudioError("No readable text is available on this page.");
        return;
      }

      const response = await api.post("/tts/malayalam", {
        text: speechText,
      });

      const audioBase64 = response.data?.audioBase64;
      if (!audioBase64) {
        throw new Error("The speech service returned no audio.");
      }

      const binary = window.atob(audioBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: response.data.mimeType || "audio/mpeg",
      });
      const url = URL.createObjectURL(blob);

      setCloudAudioUrl((previousUrl) => {
        if (previousUrl) URL.revokeObjectURL(previousUrl);
        return url;
      });

      if (audioElementRef.current) {
        audioElementRef.current.src = url;
        await audioElementRef.current.play();
      }
    } catch (error) {
      console.error("Malayalam speech error:", error);
      setCloudAudioError(
        error.response?.data?.message ||
          error.message ||
          "Unable to generate Malayalam audio. Please try again.",
      );
    } finally {
      setCloudAudioLoading(false);
    }
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    speechRef.current = null;
    setSpeechStatus("idle");
    setSpeechError("");
  };

  const startSpeech = () => {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      setSpeechError("Text-to-speech is not supported in this browser.");
      return;
    }

    if (!visibleText.trim()) {
      setSpeechError("There is no translated text available to read.");
      return;
    }

    window.speechSynthesis.cancel();
    setSpeechError("");

    const utterance = new SpeechSynthesisUtterance(visibleText);
    utterance.lang = speechLanguage;
    utterance.rate = speechRate;

    const voices = window.speechSynthesis.getVoices();
    const languagePrefix = speechLanguage.split("-")[0].toLowerCase();

    const matchingVoice =
      voices.find(
        (voice) => voice.lang.toLowerCase() === speechLanguage.toLowerCase(),
      ) ||
      voices.find((voice) =>
        voice.lang.toLowerCase().startsWith(`${languagePrefix}-`),
      );

    if (!matchingVoice) {
      setSpeechError(
        `No installed voice for ${translation.targetLanguage || "this language"} was found. Check your browser or device's text-to-speech settings.`,
      );
      return;
    }

    utterance.voice = matchingVoice;

    utterance.onstart = () => {
      setSpeechStatus("speaking");
    };

    utterance.onend = () => {
      speechRef.current = null;
      setSpeechStatus("idle");
    };

    utterance.onerror = (event) => {
      speechRef.current = null;
      setSpeechStatus("idle");

      if (event.error !== "canceled" && event.error !== "interrupted") {
        setSpeechError("Unable to play the translated text. Please try again.");
      }
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeechPlayback = () => {
    const targetLanguage = (translation.targetLanguage || "")
      .trim()
      .toLowerCase();

    // Malayalam must use cloud-generated audio, not browser voices.
    if (targetLanguage === "malayalam") {
      void playMalayalamSpeech();
      return;
    }

    // Keep the existing browser-based playback for other languages.
    if (!("speechSynthesis" in window)) {
      setSpeechError("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speechStatus === "speaking" && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setSpeechStatus("paused");
    } else if (speechStatus === "paused" && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setSpeechStatus("speaking");
    } else {
      startSpeech();
    }
  };

  console.log("Selected language:", selectedLanguage);
  console.log("Selected legal term:", representative);
  console.log("Saved legal terms:", translation.legalTerms);

  return (
    <div className="translation-viewer">
      <header className="viewer-header">
        <button onClick={() => (window.location.href = "/dashboard")}>
          ← Dashboard
        </button>

        <h1>Translated Document</h1>

        <span>{translation.targetLanguage}</span>

        <div
          className="focus-controls viewer-mode-controls"
          role="group"
          aria-label={narrowView ? "Choose document panel" : "Viewer layout"}
        >
          {(narrowView
            ? [
                ["original", "Original"],
                ["translation", "Translation"],
              ]
            : [
                ["compare", "Compare"],
                ["original", "Original focus"],
                ["translation", "Translation focus"],
              ]
          ).map(([key, label]) => (
            <button
              key={key}
              className={focus === key ? "selected" : ""}
              aria-pressed={
                focus === key ||
                (narrowView && key === "original" && focus === "compare")
              }
              onClick={() => setFocus(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <button onClick={handleDownloadPdf} disabled={downloading}>
          {downloading ? "Preparing PDF..." : "Download PDF"}
        </button>
      </header>

      <div className={`viewer-layout focus-${focus}`}>
        <section className="original-document-panel">
          <div className="document-panel-header">
            <div>
              <h2>Original PDF</h2>
              <p>English · Source PDF</p>
            </div>

            <span className="document-type-badge">PDF</span>
          </div>

          <div className="original-pdf-content">
            {pdfLoading && documentId && (
              <div className="pdf-loading-state">
                <div className="loading-spinner"></div>
                <p>Loading original document...</p>
              </div>
            )}

            {(pdfError || !documentId) && (
              <div className="pdf-error-state">
                {pdfError || "Document ID is missing."}
              </div>
            )}

            {pdfUrl && !pdfLoading && (
              <PdfPreview
                file={pdfUrl}
                pageNumber={hasPageTranslations ? page : undefined}
                onPageChange={hasPageTranslations ? setPage : undefined}
              />
            )}
          </div>
        </section>

        <main className="document-content">
          <div className="document-panel-header translation-panel-header">
            <div className="translation-heading">
              <h2>Translated Text</h2>
              <p>
                {translation.targetLanguage || "Target language"} · translated
                document
              </p>
            </div>

            <div className="translation-utility-controls">
              <div
                className="text-size-controls"
                role="group"
                aria-label="Text size"
              >
                <button
                  type="button"
                  aria-label="Decrease text size"
                  onClick={() => setTextSize((size) => Math.max(13, size - 1))}
                >
                  A−
                </button>
                <button
                  type="button"
                  aria-label="Reset text size"
                  onClick={() => setTextSize(17)}
                >
                  A
                </button>
                <button
                  type="button"
                  aria-label="Increase text size"
                  onClick={() => setTextSize((size) => Math.min(26, size + 1))}
                >
                  A+
                </button>
              </div>
              <button
                type="button"
                className="copy-text-button"
                onClick={() => navigator.clipboard?.writeText(visibleText)}
              >
                Copy
              </button>
            </div>
          </div>

          <div className="audio-toolbar">
            <div className="audio-playback-controls">
              <button
                type="button"
                className="listen-button"
                onClick={toggleSpeechPlayback}
                disabled={!visibleText.trim() || cloudAudioLoading}
                aria-label={
                  speechStatus === "speaking"
                    ? "Pause reading"
                    : speechStatus === "paused"
                      ? "Resume reading"
                      : "Listen to translated page"
                }
              >
                {cloudAudioLoading
                  ? "Generating audio…"
                  : speechStatus === "speaking"
                    ? "⏸ Pause"
                    : speechStatus === "paused"
                      ? "▶ Resume"
                      : "🔊 Listen"}
              </button>

              {speechStatus !== "idle" && (
                <button type="button" onClick={stopSpeech}>
                  Stop
                </button>
              )}

              <label className="speech-rate-control">
                <span>Speed</span>
                <select
                  value={speechRate}
                  onChange={(event) => {
                    const newRate = Number(event.target.value);
                    setSpeechRate(newRate);
                    if (speechStatus !== "idle") stopSpeech();
                  }}
                  aria-label="Speech playback speed"
                >
                  <option value={0.75}>0.75×</option>
                  <option value={1}>1×</option>
                  <option value={1.25}>1.25×</option>
                  <option value={1.5}>1.5×</option>
                </select>
              </label>
            </div>

            <audio
              ref={audioElementRef}
              className={`translated-audio-player ${cloudAudioUrl ? "is-visible" : "is-hidden"}`}
              controls
              onEnded={() => setCloudAudioLoading(false)}
            />
          </div>

          {cloudAudioLoading && (
            <p className="audio-status" role="status">
              Generating Malayalam audio…
            </p>
          )}
          {cloudAudioError && (
            <p className="speech-error" role="alert">
              {cloudAudioError}
            </p>
          )}
          {speechError && (
            <p className="speech-error" role="alert">
              {speechError}
            </p>
          )}
          <div className="translated-content-viewport">
            {termGroups.length > 0 && (
              <label className="highlight-toggle">
                <input
                  type="checkbox"
                  checked={showAllHighlights}
                  onChange={(event) =>
                    setShowAllHighlights(event.target.checked)
                  }
                />{" "}
                Highlight all legal term occurrences
              </label>
            )}
            {totalTextPages > 1 && (
              <div className="text-page-controls">
                <button
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={page <= 1}
                >
                  Previous page
                </button>
                <span>
                  Page {page} of {totalTextPages}
                </span>
                <button
                  onClick={() =>
                    setPage((value) => Math.min(totalTextPages, value + 1))
                  }
                  disabled={page >= totalTextPages}
                >
                  Next page
                </button>
              </div>
            )}

            {downloadError && (
              <div className="pdf-error-state">{downloadError}</div>
            )}
            {translationLoading && (
              <p className="audio-status" role="status">
                Loading saved translation text…
              </p>
            )}
            {translationLoadError && (
              <div className="pdf-error-state" role="alert">
                {translationLoadError}
              </div>
            )}

            <p className="highlight-instruction">
              Select a highlighted term to view its definition and
              plain-language explanation.
            </p>

            <article
              className="translated-text"
              style={{ fontSize: `${textSize}px` }}
            >
              {visibleText ? (
                renderHighlightedText()
              ) : (
                <p className="missing-translation">
                  {translationLoading
                    ? "Loading the saved translation…"
                    : "Translation text is not available for this record. You can still download the translated PDF if available."}
                </p>
              )}
            </article>
          </div>
        </main>

        {activeGroup && (
          <div
            ref={popupRef}
            className="term-popup"
            role="dialog"
            aria-label={`Legal term details for ${activeGroup.term}`}
            style={{
              position: "fixed",
              top: `${popupPosition.top}px`,
              left: `${popupPosition.left}px`,
              zIndex: 1000,
            }}
            onMouseEnter={() => {
              if (!pinnedTermKey) {
                setActiveTermKey(activeGroup.key);
              }
            }}
            onMouseLeave={() => {
              if (!pinnedTermKey) {
                setActiveTermKey(null);
              }
            }}
          >
            <div className="term-popup-header">
              <span className="term-category">
                {representative.category || "Legal Term"}
              </span>

              <button
                type="button"
                className="term-popup-close"
                onClick={() => {
                  setPinnedTermKey(null);
                  setActiveTermKey(null);
                }}
                aria-label="Close terminology popup"
              >
                ×
              </button>
            </div>

            <h3>{activeGroup.term}</h3>

            <p className="term-translated">
              {representative.translatedTerm ||
                representative.translations?.[selectedLanguage] ||
                "Translation unavailable"}
            </p>

            <div className="term-popup-section">
              <strong>Definition</strong>
              <p>
                {representative.definitions?.[selectedLanguage] ||
                  representative.definition ||
                  "Definition unavailable."}
              </p>
            </div>

            <div className="term-popup-section">
              <strong>Simple Explanation</strong>
              <p>
                {typeof representative.simplifiedMeaning === "string"
                  ? representative.simplifiedMeaning
                  : representative.simplifiedMeaning?.[selectedLanguage] ||
                    "Simplified meaning unavailable."}
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
