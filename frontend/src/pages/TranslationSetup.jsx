import { useEffect, useMemo, useState } from "react";
import FileDropzone from "../components/FileDropzone";
import LanguageBridge from "../components/LanguageBridge";
import PdfPreview from "../components/PdfPreview";
import { getDocumentPdf, getDocuments, uploadDocument } from "../services/documentService";
import { translateDocument } from "../services/translationService";

const languages = [
  { code: "ml-IN", name: "Malayalam", native: "മലയാളം" },
  { code: "hi-IN", name: "Hindi", native: "हिन्दी" },
  { code: "ta-IN", name: "Tamil", native: "தமிழ்" },
];

const getDocumentDisplayName = (document) => {
  const candidate = [document.originalFilename, document.fileName, document.storedFilename]
    .find((name) => typeof name === "string" && name.trim());
  const filename = candidate?.split(/[\\/]/).pop()?.trim();
  const stem = filename?.replace(/\.pdf$/i, "");
  const looksLikeStorageId = stem && /^[a-f\d]{24,}$/i.test(stem);
  if (filename && !looksLikeStorageId) return filename;
  const date = document.createdAt ? new Date(document.createdAt).toLocaleDateString() : "";
  return date ? `Legal document · ${date}` : "Legal document";
};

function TranslationSetup() {
  const [documents, setDocuments] = useState([]);
  const [documentId, setDocumentId] = useState(() => new URLSearchParams(window.location.search).get("documentId") || "");
  const [targetLanguage, setTargetLanguage] = useState("ml-IN");
  const [highlightTerms, setHighlightTerms] = useState(true);
  const [file, setFile] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [translationError, setTranslationError] = useState("");
  const [preview, setPreview] = useState({ documentId: null, url: "", error: "" });

  useEffect(() => {
    let active = true;
    getDocuments()
      .then((data) => { if (active) setDocuments(data.documents || []); })
      .catch((err) => { if (active) setError(err.response?.data?.message || "Could not load your documents."); })
      .finally(() => { if (active) setLoadingDocuments(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!documentId) return undefined;
    let active = true;
    let objectUrl;
    getDocumentPdf(documentId)
      .then((blob) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        setPreview({ documentId, url: objectUrl, error: "" });
      })
      .catch((err) => {
        if (active) setPreview({ documentId, url: "", error: err.response?.data?.message || "Could not load this PDF preview." });
      });
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [documentId]);

  const selectedDocument = documents.find((item) => String(item._id) === String(documentId));
  const visibleDocuments = useMemo(() => {
    const ordered = [...documents].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    const recent = ordered.slice(0, 5);
    if (selectedDocument && !recent.some((item) => String(item._id) === String(selectedDocument._id))) recent.push(selectedDocument);
    return recent;
  }, [documents, selectedDocument]);

  const handleFile = (selectedFile) => {
    setError("");
    setMessage("");
    if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      setFile(null);
      setError("Choose a PDF file to continue.");
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Choose a PDF file first.");
      return;
    }
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const data = await uploadDocument(file);
      const uploadedId = data.document?.id || data.document?._id;
      if (!uploadedId) throw new Error("The server did not return a document ID.");
      const uploadedDocument = {
        _id: String(uploadedId),
        originalFilename: data.document.originalFilename || file.name,
        processingStatus: data.document.processingStatus,
        extractionMethod: data.document.extractionMethod,
      };
      setDocumentId(String(uploadedId));
      setDocuments((current) => [uploadedDocument, ...current.filter((item) => String(item._id) !== String(uploadedId))]);
      setPreview({ documentId: null, url: "", error: "" });
      setFile(null);
      setMessage(data.reused ? "Existing PDF selected." : "PDF added to your library.");
      try {
        const refreshed = await getDocuments();
        setDocuments(refreshed.documents || []);
      } catch {
        setError("PDF added, but the library could not refresh. You can still translate the selected file.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleTranslate = async () => {
    if (!documentId) {
      setError("Select a document before starting the translation.");
      return;
    }
    setTranslating(true);
    setError("");
    setTranslationError("");
    setMessage("");
    try {
      const data = await translateDocument({ documentId, targetLanguage });
      sessionStorage.setItem("translationResult", JSON.stringify({
        ...data,
        highlightTerms: data.reused ? data.legalTerms || [] : highlightTerms,
      }));
      window.location.assign("/viewer");
    } catch (err) {
      setTranslationError(err.response?.data?.message || "Translation failed. You can retry when ready.");
    } finally {
      setTranslating(false);
    }
  };

  const chosenLanguage = languages.find((language) => language.code === targetLanguage) || languages[0];

  return (
    <main className="translation-setup translation-workspace-page">
      <header className="page-heading translation-page-heading">
        <div><p className="eyebrow">TRANSLATION WORKSPACE</p><h1>Prepare a translation</h1></div>
        <a className="text-button" href="/history">Translation history</a>
      </header>

      <div className="translation-workspace">
        <aside className="workspace-library" aria-label="Document library">
          <div className="workspace-section-heading"><div><p className="eyebrow">YOUR LIBRARY</p><h2>Choose a document</h2></div><a href="/documents">Browse all</a></div>
          {loadingDocuments && <p className="workspace-hint" role="status">Loading your library…</p>}
          {!loadingDocuments && documents.length === 0 && !showUpload && <p className="workspace-hint">Your library is empty. Add a PDF to begin.</p>}
          {!loadingDocuments && visibleDocuments.length > 0 && <div className="workspace-document-list">
            {visibleDocuments.map((document) => (
              <button key={document._id} type="button" className={`workspace-document-choice${String(documentId) === String(document._id) ? " is-selected" : ""}`} aria-pressed={String(documentId) === String(document._id)} onClick={() => { setDocumentId(String(document._id)); setPreview({ documentId: null, url: "", error: "" }); setError(""); setTranslationError(""); setMessage(""); }}>
                <span className="document-icon" aria-hidden="true">PDF</span>
                <span className="workspace-document-label"><strong title={getDocumentDisplayName(document)}>{getDocumentDisplayName(document)}</strong><small>{document.createdAt ? new Date(document.createdAt).toLocaleDateString() : "PDF document"}</small></span>
                {String(documentId) === String(document._id) && <span className="document-selected-mark" aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>}
          {!showUpload && <button type="button" className="text-button workspace-add-button" onClick={() => { setShowUpload(true); setFile(null); setError(""); }}>+ Add a new PDF</button>}
          {showUpload && <div className="workspace-upload">
            <div className="workspace-upload-heading"><div><strong>Add a PDF</strong><small>PDF files are supported</small></div><button type="button" className="upload-dismiss" aria-label="Close upload panel" onClick={() => { setShowUpload(false); setFile(null); setMessage(""); }} disabled={uploading || translating}>×</button></div>
            <FileDropzone id="translation-upload" onFile={handleFile} disabled={uploading || translating} fileName={file?.name} uploading={uploading} success={Boolean(message && !error && !file)} />
            {file && <p className="selected-file-name" role="status">PDF · {(file.size / 1024 / 1024).toFixed(2)} MB</p>}
            {uploading && <div className="processing-status" role="status" aria-live="polite"><div className="processing-status-heading"><span className="processing-status-dot" aria-hidden="true" />Uploading PDF to your workspace</div><div className="processing-status-track" aria-hidden="true"><span /></div><p className="processing-status-note">Keep this page open while the upload completes.</p></div>}
            <div className="upload-actions">
              <button type="button" className="primary-button" onClick={handleUpload} disabled={!file || uploading || translating}>{uploading ? "Uploading…" : "Add PDF"}</button>
            </div>
          </div>}
          {!translating && error && <p className="workspace-error" role="alert">{error}</p>}
        </aside>

        <section className="workspace-document" aria-labelledby="selected-document-title">
          {selectedDocument ? <>
            <header className="selected-document-heading">
              <div><p className="eyebrow">SELECTED DOCUMENT</p><h2 id="selected-document-title" title={getDocumentDisplayName(selectedDocument)}>{getDocumentDisplayName(selectedDocument)}</h2></div>
              <button type="button" className="text-button" onClick={() => { setDocumentId(""); setPreview({ documentId: null, url: "", error: "" }); }}>Change</button>
            </header>
            <div className="setup-pdf-preview">
              {preview.documentId !== documentId && <div className="preview-state" role="status">Loading PDF preview…</div>}
              {preview.documentId === documentId && preview.error && <div className="preview-state preview-error" role="alert">{preview.error}</div>}
              {preview.documentId === documentId && preview.url && <PdfPreview file={preview.url} />}
            </div>
          </> : <div className="workspace-empty">
            <span className="document-icon" aria-hidden="true">PDF</span>
            <h2 id="selected-document-title">Choose a document</h2>
            <p>Select a PDF from your library. Its details and preview will appear here.</p>
          </div>}
        </section>

        <aside className="workspace-settings" aria-label="Translation settings">
          <p className="eyebrow">LANGUAGE PAIR</p>
          <div className="language-direction"><div><small>FROM</small><strong>English</strong></div><span aria-hidden="true">→</span><div><small>TO</small><strong lang={chosenLanguage.code}>{chosenLanguage.native}</strong><small>{chosenLanguage.name}</small></div></div>
          <label htmlFor="target-language">Target language</label>
          <select id="target-language" value={targetLanguage} onChange={(event) => { setTargetLanguage(event.target.value); setTranslationError(""); }} disabled={translating}>
            {languages.map((language) => <option key={language.code} value={language.code}>{language.name} · {language.native}</option>)}
          </select>
          <label className="term-toggle"><input type="checkbox" checked={highlightTerms} onChange={(event) => setHighlightTerms(event.target.checked)} disabled={translating} /><span>Highlight legal terms</span></label>
          <button type="button" className="primary-button translate-action" onClick={handleTranslate} disabled={!documentId || uploading || translating}>{translating ? "Translating…" : translationError ? "Retry translation" : "Translate document"}</button>
          {translating && <>
            <div className="processing-status" role="status" aria-live="polite">
              <div className="processing-status-heading"><span className="processing-status-dot" aria-hidden="true" />Translation request in progress</div>
              <div className="processing-status-track" aria-hidden="true"><span /></div>
              <ol className="processing-steps" aria-label="Translation status">
                <li className="is-complete">Request submitted</li>
                <li className="is-current">Waiting for translation result</li>
              </ol>
              <p className="processing-status-note">Your translation service reports completion when the result is ready. Detailed extraction and terminology stages are not currently exposed by the API.</p>
            </div>
            <LanguageBridge targetLanguage={targetLanguage} state="loading" />
          </>}
          {!translating && translationError && <LanguageBridge targetLanguage={targetLanguage} state="failed" error={translationError} />}
          {!translating && message && <p className="form-message" role="status">{message}</p>}
        </aside>
      </div>
    </main>
  );
}

export default TranslationSetup;
