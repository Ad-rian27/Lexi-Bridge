
import { useState } from "react";

export default function FileDropzone({
  id,
  onFile,
  disabled = false,
  fileName = "",
  uploading = false,
  success = false,
}) {
  const [dragging, setDragging] = useState(false);

  const acceptFile = (file) => {
    if (file && !disabled) {
      onFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!disabled) setDragging(true);
  };

  const handleDragLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDragging(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    if (!disabled) {
      acceptFile(event.dataTransfer.files?.[0]);
    }
  };

  return (
    <label
      className={`file-dropzone${dragging ? " is-dragging" : ""}${disabled ? " is-disabled" : ""}${fileName ? " has-file" : ""}${uploading ? " is-uploading" : ""}${success ? " is-success" : ""}`}
      htmlFor={id}
      aria-disabled={disabled}
      aria-busy={uploading}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id={id}
        className="file-dropzone-input"
        type="file"
        accept=".pdf,application/pdf"
        disabled={disabled}
        onChange={(event) => {
          acceptFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      <span className="dropzone-mark" aria-hidden="true">
        {uploading ? "…" : success ? "✓" : "PDF"}
      </span>

      <span className="dropzone-copy">
        <strong>
          {uploading
            ? "Adding your PDF…"
            : success
              ? "PDF added to your library"
              : fileName || "Drop a PDF here"}
        </strong>
        <span>
          {uploading
            ? "Your document is being processed"
            : success
              ? "Available in your library"
              : fileName
                ? "PDF selected · Choose another file to replace it"
                : "or browse files · PDF only"}
        </span>
      </span>

      {!uploading && !success && (
        <span className="dropzone-action">
          {fileName ? "Change file" : "Choose file"}
        </span>
      )}
    </label>
  );
}
