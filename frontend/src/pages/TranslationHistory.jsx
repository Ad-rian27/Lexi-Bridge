
import { useEffect, useState } from "react";
import api from "../services/api";
import { getTranslationHistory } from "../services/translationService";
import { deleteDocument } from "../services/documentService";

function TranslationHistory() {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadError, setDownloadError] = useState("");
  const [deletingDocumentId, setDeletingDocumentId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    getTranslationHistory()
      .then((data) => { if (active) setTranslations(data.translations || []); })
      .catch((err) => { if (active) setError(err.response?.data?.message || "Failed to load translation history."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const handleDownload = async (translation) => {
    setDownloadingId(translation._id);
    setDownloadError("");
    try {
      const response = await api.get(
        `/translations/${translation._id}/download`,
        { responseType: "blob" }
      );

      const blobUrl = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `LexiBridge_${translation.targetLanguage}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      setDownloadError(err.response?.data?.message || "Failed to download the translated PDF.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleView = (translation) => {
    if (translation.status !== "completed") return;
    sessionStorage.setItem("translationResult", JSON.stringify({ translation, highlightTerms: true }));

    window.location.assign("/viewer");
  };

  const handleDelete = async (translation) => {
    const documentId = translation.documentId;

    if (!documentId) {
      alert("Cannot delete this document because its ID is unavailable.");
      return;
    }

    const confirmed = window.confirm(
      `Permanently delete "${translation.documentName}", its original PDF, and ALL translations associated with it? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingDocumentId(documentId);
      setError("");

      await deleteDocument(documentId);

      // Remove every history entry belonging to this document.
      setTranslations((currentTranslations) =>
        currentTranslations.filter(
          (item) => String(item.documentId) !== String(documentId)
        )
      );

      setNotice("Document and associated translations deleted.");
    } catch (err) {
      console.error("Document deletion failed:", err);

      setError(err.response?.data?.message || "Failed to delete the document. Please try again.");
    } finally {
      setDeletingDocumentId(null);
    }
  };

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <section className="dashboard-welcome">
          <div>
            <p className="eyebrow">LEXIBRIDGE WORKSPACE</p>
            <h2>Translation History</h2>
            <p>View, download, or delete previously translated documents.</p>
          </div>

          <button
            className="primary-button"
            onClick={() => (window.location.href = "/translate")}
          >
            + Translate a Document
          </button>
        </section>

        <section className="documents-panel">
          <div className="panel-header">
            <div>
              <h3>Your Translations</h3>
              <p>
                {translations.length} saved translation
                {translations.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          {loading && (
            <div className="empty-state">
              <div className="loading-spinner"></div>
              <p>Loading translation history...</p>
            </div>
          )}

          {error && <div className="error-state">{error}</div>}
          {downloadError && <div className="error-state" role="alert">{downloadError}</div>}
          {notice && <p className="form-message" role="status">{notice}</p>}

          {!loading && !error && translations.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h4>No translations yet</h4>
              <p>Your completed translations will appear here.</p>

              <button
                className="primary-button"
                onClick={() => (window.location.href = "/translate")}
              >
                Translate a Document
              </button>
            </div>
          )}

          {!loading && !error && translations.length > 0 && (
            <div className="document-list">
              {translations.map((translation) => (
                <div className="document-row" key={translation._id}>
                  <div className="document-icon">PDF</div>

                  <div className="document-info">
                    <h4>{translation.documentName}</h4>
                    <p>
                      {translation.sourceLanguage || "English"} →{" "}
                      {translation.targetLanguage}
                    </p>
                    <p>
                      {translation.createdAt
                        ? new Date(translation.createdAt).toLocaleString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <div className={`status-badge ${translation.status}`}>
                    {translation.status}
                  </div>

                  <div className="history-actions">
                    <button
                      className="outline-button"
                      disabled={
                        translation.status !== "completed" ||
                        deletingDocumentId !== null
                      }
                      onClick={() => handleView(translation)}
                    >
                      Open
                    </button>
                    <details className="history-more">
                      <summary aria-label={`More actions for ${translation.documentName}`}>•••</summary>
                      <div className="history-more-menu">
                        <button type="button" disabled={translation.status !== "completed" || deletingDocumentId !== null || downloadingId !== null} onClick={() => handleDownload(translation)}>{String(downloadingId) === String(translation._id) ? "Preparing PDF…" : "Download PDF"}</button>
                        <button type="button" disabled={deletingDocumentId !== null} onClick={() => handleDelete(translation)}>{String(deletingDocumentId) === String(translation.documentId) ? "Deleting…" : "Delete document"}</button>
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

    </div>
  );
}

export default TranslationHistory;
