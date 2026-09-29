import { useEffect, useState } from "react";
import { getDocuments, getDocumentPdf } from "../services/documentService";
import PdfPreview from "../components/PdfPreview";

function PdfTest() {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDocuments = async () => {
            try {
                const data = await getDocuments();
                setDocuments(data.documents || []);
            } catch (err) {
                console.error(err);
                setError("Failed to load documents.");
            }
        };

        loadDocuments();
    }, []);

    useEffect(() => {
        if (!selectedDocument) return;

        let objectUrl;

        const loadPdf = async () => {
            setLoading(true);
            setError("");
            setPdfUrl("");

            try {
                const blob = await getDocumentPdf(selectedDocument);

                objectUrl = URL.createObjectURL(blob);
                setPdfUrl(objectUrl);
            } catch (err) {
                console.error(err);
                setError("Failed to retrieve PDF.");
            } finally {
                setLoading(false);
            }
        };

        loadPdf();

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [selectedDocument]);

    return (
        <div style={{ padding: "30px" }}>
            <h1>LexiBridge PDF Preview Test</h1>

            <label>Select a document: </label>

            <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
            >
                <option value="">Choose a document</option>

                {documents.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                        {doc.originalFilename}
                    </option>
                ))}
            </select>

            {loading && <p>Loading PDF...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {pdfUrl && (
                <PdfPreview file={pdfUrl} />
            )}
        </div>
    );
}

export default PdfTest;