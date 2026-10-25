
import { Routes, Route, Navigate } from "react-router-dom";

import AppShell from "./components/AppShell.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PdfTest from "./pages/PdfTest.jsx";
import TranslationHistory from "./pages/TranslationHistory.jsx";
import TranslationSetup from "./pages/TranslationSetup.jsx";
import TranslationViewer from "./pages/TranslationViewer.jsx";
import UploadDocument from "./pages/UploadDocument.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { hasAdminRole } from "./services/authSession.js";

function Workspace({ children }) {
  return <AppShell>{children}</AppShell>;
}

function AdminRoute() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  if (!hasAdminRole()) return <Navigate to="/dashboard" replace />;
  return <Workspace><AdminDashboard /></Workspace>;
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Authentication pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Workspace pages */}
      <Route
        path="/dashboard"
        element={
          <Workspace>
            <Dashboard />
          </Workspace>
        }
      />

      <Route path="/admin" element={<AdminRoute />} />

      <Route
        path="/documents"
        element={
          <Workspace>
            <UploadDocument />
          </Workspace>
        }
      />

      <Route
        path="/upload"
        element={<Navigate to="/documents" replace />}
      />

      <Route
        path="/translate"
        element={
          <Workspace>
            <TranslationSetup />
          </Workspace>
        }
      />

      <Route
        path="/translation-setup"
        element={<Navigate to="/translate" replace />}
      />

      <Route
        path="/viewer"
        element={
          <Workspace>
            <TranslationViewer />
          </Workspace>
        }
      />

      <Route
        path="/translation-viewer"
        element={<Navigate to="/viewer" replace />}
      />

      <Route
        path="/history"
        element={
          <Workspace>
            <TranslationHistory />
          </Workspace>
        }
      />

      <Route
        path="/pdf-test"
        element={
          <Workspace>
            <PdfTest />
          </Workspace>
        }
      />

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
