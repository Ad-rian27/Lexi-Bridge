
import api from "./api";

export const translateDocument = async (translationData) => {
  const response = await api.post(
    "/translations/translate",
    translationData
  );

  return response.data;
};

export const getTranslationHistory = async () => {
  const response = await api.get("/translations");
  return response.data;
};
