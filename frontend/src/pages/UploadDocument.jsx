import { useState } from "react";
import { uploadDocument } from "../services/documentService";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setMessage("");
    setError("");

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
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

    setUploading(true);
    setMessage("");
    setError("");

    try {
      const data = await uploadDocument(file);

      console.log("Upload response:", data);

      setMessage("Document uploaded successfully.");
    } catch (error) {
      console.error("Upload error:", error);

      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      console.log("Message:", error.message);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Document upload failed.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload Document</h1>

      <p>Upload a legal PDF document to LexiBridge.</p>

      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
      />

      {file && (
        <div>
          <p>Selected file:</p>
          <p>{file.name}</p>
          <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload Document"}
      </button>

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}
    </div>
  );
}

export default UploadDocument;
