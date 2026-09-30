import { useState } from "react";
import { uploadDocument } from "../services/documentService";
import { translateDocument } from "../services/translationService";

function TranslationSetup() {
  const [file, setFile] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState("ml-IN");
  const [highlightTerms, setHighlightTerms] = useState(true);

  const [documentId, setDocumentId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [translating, setTranslating] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setMessage("");
    setError("");
    setDocumentId(null);

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      const data = await uploadDocument(file);

      console.log("Upload response:", data);

      setDocumentId(data.document.id);
      setMessage("Document uploaded successfully.");
    } catch (error) {
      console.error("Upload failed:", error);

      setError(error.response?.data?.message || "Document upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleTranslate = async () => {
    if (!documentId) {
      setError("Please upload the document first.");
      return;
    }

    try {
      setTranslating(true);
      setError("");
      setMessage("Translation in progress...");

      const data = await translateDocument({
        documentId,
        targetLanguage,
      });

      console.log("Translation response:", data);

      const translation = data.translation;

      // Handle an existing translation
      if (data.reused) {
        console.log("Existing translation found. Redirecting to viewer.");

        sessionStorage.setItem(
          "translationResult",
          JSON.stringify({
            ...data,
            highlightTerms: data.legalTerms || [],
          }),
        );

        window.location.href = "/viewer";
        return;
      }

      // Handle a newly generated translation
      const firstTerm = translation.legalTerms?.[0];

      if (firstTerm) {
        console.log(
          "Offset verification:",
          translation.translatedText.slice(firstTerm.start, firstTerm.end),
        );

        console.log("Expected matched text:", firstTerm.matchedText);
      }

      sessionStorage.setItem(
        "translationResult",
        JSON.stringify({
          ...data,
          highlightTerms: highlightTerms || [],
        }),
      );

      window.location.href = "/viewer";

      sessionStorage.setItem(
        "translationResult",
        JSON.stringify({
          ...data,
          highlightTerms,
        }),
      );

      window.location.href = "/viewer";
    } catch (error) {
      console.error("Translation failed:", error);

      setError(error.response?.data?.message || "Translation failed.");
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="translation-setup">
      <h1>Translate Legal Document</h1>

      <p>
        Upload your legal document and configure your translation preferences.
      </p>

      <section>
        <h2>1. Upload Document</h2>

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
        />

        {file && (
          <div>
            <p>{file.name}</p>
            <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        <button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </section>

      <hr />

      <section>
        <h2>2. Translation Settings</h2>

        <label>Source Language</label>

        <select value="en-IN" disabled>
          <option value="en-IN">English</option>
        </select>

        <label>Target Language</label>

        <select
          value={targetLanguage}
          onChange={(event) => setTargetLanguage(event.target.value)}
        >
          <option value="ml-IN">Malayalam</option>
          <option value="hi-IN">Hindi</option>
          <option value="ta-IN">Tamil</option>
        </select>

        <div>
          <label>
            <input
              type="checkbox"
              checked={highlightTerms}
              onChange={(event) => setHighlightTerms(event.target.checked)}
            />
            Enable Legal Terminology Highlighting
          </label>
        </div>
      </section>

      <hr />

      <section>
        <h2>3. Start Translation</h2>

        <button onClick={handleTranslate} disabled={!documentId || translating}>
          {translating ? "Translating..." : "Start Translation"}
        </button>
      </section>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default TranslationSetup;
