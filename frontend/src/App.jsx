import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./pages/UploadDocument";
import TranslationSetup from "./pages/TranslationSetup";
import TranslationViewer from "./pages/TranslationViewer";
import PdfTest from "./pages/PdfTest";

function App() {
  const path = window.location.pathname;

  if (path === "/register") {
    return <Register />;
  }

  if (path === "/dashboard") {
    return <Dashboard />;
  }

  if (path === "/upload") {
    return <UploadDocument />;
  }

  if (path === "/translate") {
    return <TranslationSetup />;
  }

  if (path === "/viewer") {
    return <TranslationViewer />;
  }

  if (path === "/pdf-test") {
    return <PdfTest />;
  }

  return <Login />;
}

export default App;