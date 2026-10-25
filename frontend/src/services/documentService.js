import api from "./api";

export const uploadDocument = async (file) => {
    const formData = new FormData();

    formData.append("document", file);

    const response = await api.post(
        "/documents/upload",
        formData
    );

    return response.data;
};

export const getDocuments = async () => {
    const response = await api.get("/documents");

    return response.data;
};

// Retrieve original PDF using authenticated API
export const getDocumentPdf = async (documentId) => {
    const response = await api.get(
        `/documents/${documentId}/file`,
        {
            responseType: "blob",
        }
    );

    return response.data;
};


export const deleteDocument = async (documentId) => {
  const response = await api.delete(`/documents/${documentId}`);
  return response.data;
};
