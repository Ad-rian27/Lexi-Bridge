
import { useEffect, useState } from "react";
import api from "../services/api";
import FileDropzone from "../components/FileDropzone";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../services/documentService";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadDocuments = async () => {
    try {
      setError("");
      const data = await getDocuments();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error("Failed to load documents:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load your documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    getDocuments()
      .then((data) => { if (active) setDocuments(data.documents || []); })
      .catch((err) => { if (active) setError(err.response?.data?.message || "Failed to load your documents."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const handleFileChange = (selectedFile) => {
    setMessage("");
    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a PDF file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setError("");

      const data = await uploadDocument(file);

      if (data.reused) {
        setMessage(
          "This PDF has already been uploaded. The existing document has been reused."
        );
      } else {
        setMessage("Document uploaded successfully.");
      }

      setFile(null);

      const input = document.getElementById("document-upload");
      if (input) input.value = "";

      await loadDocuments();
    } catch (err) {
      console.error("Upload error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Document upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (document) => {
    const confirmed = window.confirm(
      `Permanently delete "${document.originalFilename}" and all translations associated with it? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(document._id);
      setError("");
      setMessage("");

      await deleteDocument(document._id);

      setDocuments((current) =>
        current.filter(
          (item) => String(item._id) !== String(document._id)
        )
      );

      setMessage(
        `"${document.originalFilename}" and its associated translations were deleted.`
      );
    } catch (err) {
      console.error("Document deletion failed:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete the document. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenDocument = async (document) => {
    try {
      setError("");

      const response = await api.get(
        `/documents/${document._id}/file`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const newWindow = window.open(url, "_blank");

      if (!newWindow) {
        const link = documentCreateLink(url, document.originalFilename);
        link.click();
      }

      window.setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 60000);
    } catch (err) {
      console.error("Failed to open document:", err);
      setError(
        err.response?.data?.message ||
          "Failed to open the original PDF."
      );
    }
  };

  const documentCreateLink = (url, filename) => {
    const link = window.document.createElement("a");
    link.href = url;
    link.download = filename || "document.pdf";
    return link;
  };

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <section className="dashboard-welcome">
          <div>
            <p className="eyebrow">LEXIBRIDGE WORKSPACE</p>
            <h2>Documents</h2>
            <p>
              Upload legal PDFs, manage saved documents, and remove
              documents you no longer need.
            </p>
          </div>
        </section>

        <section className="documents-panel">
          <div className="panel-header">
            <div>
              <h3>Upload a Document</h3>
              <p>
                Upload a PDF. Identical files from your account should
                reuse the existing document.
              </p>
            </div>
          </div>

          <div className="document-upload-section">
            <FileDropzone id="document-upload" onFile={handleFileChange} disabled={uploading} fileName={file?.name} uploading={uploading} success={Boolean(!file && !error && /upload|reused/i.test(message))} />

            {uploading && <div className="processing-status" role="status" aria-live="polite"><div className="processing-status-heading"><span className="processing-status-dot" aria-hidden="true" />Uploading PDF</div><div className="processing-status-track" aria-hidden="true"><span /></div><p className="processing-status-note">Uploading your document. Please keep this page open.</p></div>}

            {file && (
              <p className="selected-file-name" role="status">
                PDF · {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}

            <div className="upload-actions">
              <button
                className="primary-button"
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          </div>

          {message && <p role="status">{message}</p>}
          {error && <div className="error-state" role="alert">{error}</div>}
        </section>

        <section className="documents-panel">
          <div className="panel-header">
            <div>
              <h3>Your Uploaded Documents</h3>
              <p>
                {documents.length} document
                {documents.length === 1 ? "" : "s"} saved
              </p>
            </div>

            <button
              className="outline-button"
              onClick={loadDocuments}
              disabled={loading}
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="empty-state">
              <p>Loading documents...</p>
            </div>
          )}

          {!loading && documents.length === 0 && !error && (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h4>No documents uploaded</h4>
              <p>Your uploaded PDFs will appear here.</p>
            </div>
          )}

          {!loading && documents.length > 0 && (
            <div className="document-list">
              {documents.map((document) => (
                <div className="document-row" key={document._id}>
                  <div className="document-icon">PDF</div>

                  <div className="document-info">
                    <h4>{document.originalFilename}</h4>

                    <p>
                      Status: {document.processingStatus || "Available"}
                    </p>

                    {document.createdAt && (
                      <p>
                        Uploaded:{" "}
                        {new Date(document.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="history-actions">
                    <button
                      className="outline-button"
                      onClick={() => handleOpenDocument(document)}
                      disabled={deletingId !== null}
                    >
                      Open PDF
                    </button>
                    <details className="history-more">
                      <summary aria-label={`More actions for ${document.originalFilename}`}>•••</summary>
                      <div className="history-more-menu">
                        <a href={`/translate?documentId=${encodeURIComponent(document._id)}`}>Translate</a>
                        <button type="button" onClick={() => handleDelete(document)} disabled={deletingId !== null}>
                          {String(deletingId) === String(document._id) ? "Deleting…" : "Delete document"}
                        </button>
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

export default UploadDocument;
