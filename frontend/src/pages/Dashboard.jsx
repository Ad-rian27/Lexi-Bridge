import { useEffect, useState } from "react";
import { getDocuments } from "../services/documentService";

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDocuments();

        console.log("Documents response:", data);

        setDocuments(data.documents || []);
      } catch (error) {
        console.error("Failed to fetch documents:", error);

        setError(error.response?.data?.message || "Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleUpload = () => {
    window.location.href = "/upload";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const completedDocuments = documents.filter(
    (document) => document.processingStatus === "completed",
  ).length;

  return (
    <div className="dashboard">
      {/* ================= NAVBAR ================= */}

      <header className="dashboard-navbar">
        <div className="navbar-brand">
          <div className="brand-icon">L</div>

          <div>
            <h1>LexiBridge</h1>
            <span>LEGAL TECH PLATFORM</span>
          </div>
        </div>

        <nav className="navbar-links">
          <a className="active" href="/dashboard">
            Dashboard
          </a>

          <a href="/documents">Documents</a>

          <a href="/history">Translation History</a>

          <a href="/glossary">Terminology Glossary</a>

          <a href="/api-docs">API / Docs</a>
        </nav>

        <div className="navbar-actions">
          <button className="icon-button" title="Language">
            文
          </button>

          <button className="icon-button" title="Notifications">
            ♧
          </button>

          <div className="profile">
            <div className="profile-avatar">U</div>

            <div className="profile-info">
              <strong>User</strong>
              <span>Legal Workspace</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="dashboard-main">
        {/* Welcome section */}

        <section className="dashboard-welcome">
          <div>
            <p className="eyebrow">LEXIBRIDGE WORKSPACE</p>

            <h2>Welcome back</h2>

            <p>Your multilingual legal document translation workspace.</p>
          </div>

          <button
            className="primary-button"
            onClick={() => (window.location.href = "/translate")}
          >
            + Translate a Document
          </button>
        </section>

        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span>Total Documents</span>
              <span className="stat-icon blue">▣</span>
            </div>

            <strong>{documents.length}</strong>

            <small>Uploaded legal documents</small>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Completed</span>
              <span className="stat-icon green">✓</span>
            </div>

            <strong>{completedDocuments}</strong>

            <small>Successfully processed</small>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>In Processing</span>
              <span className="stat-icon orange">◷</span>
            </div>

            <strong>
              {
                documents.filter(
                  (document) => document.processingStatus !== "completed",
                ).length
              }
            </strong>

            <small>Documents being processed</small>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span>Languages</span>
              <span className="stat-icon purple">文</span>
            </div>

            <strong>3</strong>

            <small>Malayalam · Hindi · Tamil</small>
          </div>
        </section>

        {/* ================= CONTENT GRID ================= */}

        <section className="dashboard-content">
          {/* Recent documents */}

          <div className="documents-panel">
            <div className="panel-header">
              <div>
                <h3>Recent Documents & Translation Records</h3>

                <p>Your recently uploaded legal documents.</p>
              </div>

              <button className="text-button">View All →</button>
            </div>

            {loading && (
              <div className="empty-state">
                <div className="loading-spinner"></div>
                <p>Loading documents...</p>
              </div>
            )}

            {error && <div className="error-state">{error}</div>}

            {!loading && !error && documents.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📄</div>

                <h4>No documents yet</h4>

                <p>Upload your first legal document to get started.</p>

                <button className="primary-button" onClick={handleUpload}>
                  Upload Document
                </button>
              </div>
            )}

            {!loading && !error && documents.length > 0 && (
              <div className="document-list">
                {documents.map((document) => (
                  <div className="document-row" key={document._id}>
                    <div className="document-icon">PDF</div>

                    <div className="document-info">
                      <h4>{document.originalFilename}</h4>

                      <p>
                        Uploaded {new Date(document.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="document-method">
                      <span>{document.extractionMethod}</span>
                    </div>

                    <div
                      className={`status-badge ${document.processingStatus}`}
                    >
                      {document.processingStatus}
                    </div>

                    <button className="more-button">⋮</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right side */}

          <aside className="dashboard-sidebar">
            {/* Legal Term of the Day */}

            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <span className="sidebar-label">⚖ LEGAL TERM OF THE DAY</span>
              </div>

              <h3>Jurisdiction</h3>

              <p className="term-native">അധികാരപരിധി</p>

              <p>
                The authority given to a court to hear and decide particular
                legal matters.
              </p>

              <button className="outline-button">
                Browse Terminology Glossary →
              </button>
            </div>

            {/* Quick translation */}

            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <span className="sidebar-label">
                  ⚡ QUICK TRANSLATION SETUP
                </span>
              </div>

              <label>Source Language</label>

              <select defaultValue="English">
                <option>English</option>
              </select>

              <label>Target Language</label>

              <div className="language-options">
                <button className="language-option active">
                  <strong>Malayalam</strong>
                  <span>മലയാളം</span>
                </button>

                <button className="language-option">
                  <strong>Hindi</strong>
                  <span>हिन्दी</span>
                </button>

                <button className="language-option">
                  <strong>Tamil</strong>
                  <span>தமிழ்</span>
                </button>
              </div>

              <button
                className="primary-button"
                onClick={() => (window.location.href = "/translate")}
              >
                Start Translation
              </button>
            </div>
          </aside>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="dashboard-footer">
        <span>LexiBridge Legal Systems</span>

        <span>Multilingual Legal Translation Platform</span>

        <span>All systems operational</span>
      </footer>
    </div>
  );
}

export default Dashboard;
