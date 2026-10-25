import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PdfTest from "./pages/PdfTest.jsx";
import TranslationHistory from "./pages/TranslationHistory.jsx";
import TranslationSetup from "./pages/TranslationSetup.jsx";
import TranslationViewer from "./pages/TranslationViewer.jsx";
import UploadDocument from "./pages/UploadDocument.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<UploadDocument />} />
      <Route path="/translation-setup" element={<TranslationSetup />} />
      <Route path="/translation-viewer" element={<TranslationViewer />} />
      <Route path="/history" element={<TranslationHistory />} />
      <Route path="/pdf-test" element={<PdfTest />} />
    </Routes>
  );
}

export default App;