
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadDocument from "./pages/UploadDocument";
import TranslationSetup from "./pages/TranslationSetup";
import TranslationViewer from "./pages/TranslationViewer";
import TranslationHistory from "./pages/TranslationHistory";
import PdfTest from "./pages/PdfTest";
import AppShell from "./components/AppShell";

function App() {
  const path = window.location.pathname;

  if (path === "/register") return <Register />;
  if (path === "/" || path === "/login") return <Login />;

  let page;
  if (path === "/dashboard") page = <Dashboard />;

  if (path === "/history") {
    page = <TranslationHistory />;
  }

  if (path === "/documents") {
    page = <UploadDocument />;
  }

  if (path === "/translate") {
    page = <TranslationSetup />;
  }

  if (path === "/viewer") {
    page = <TranslationViewer />;
  }

  if (path === "/pdf-test") {
    page = <PdfTest />;
  }
  if (path === "/upload") page = <UploadDocument />;
  if (!page) return <Login />;
  return <AppShell>{page}</AppShell>;
}

export default App;
