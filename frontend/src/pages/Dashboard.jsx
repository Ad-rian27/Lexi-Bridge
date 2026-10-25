import { useEffect, useMemo, useState } from "react";
import { getDocuments } from "../services/documentService";

const LANGUAGES = ["Malayalam", "Hindi", "Tamil"];
const dateLabel = (value) => value && !Number.isNaN(new Date(value).getTime())
  ? new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  : "Date unavailable";
const filename = (doc) => doc.originalFilename || doc.filename || "Untitled document";
function statusOf(doc) {
  const value = String(doc.processingStatus || "available").toLowerCase();
  if (value.includes("complete") || value === "success") return "completed";
  if (value.includes("fail") || value.includes("error")) return "failed";
  if (value.includes("process") || value.includes("progress")) return "processing";
  if (value.includes("pending") || value.includes("upload")) return "pending";
  return "available";
}
const statusLabel = (s) => ({ completed: "Completed", failed: "Failed", processing: "In progress", pending: "Pending", available: "Available" }[s] || "Available");

function getGreetingName() {
  // Support common user-profile storage keys without requiring a backend/API change.
  for (const key of ["user", "profile", "currentUser"]) {
    try {
      const value = localStorage.getItem(key);
      if (!value) continue;
      const user = JSON.parse(value);
      const name = user?.name || user?.fullName || user?.username || user?.firstName;
      if (typeof name === "string" && name.trim()) return name.trim().split(/\s+/)[0];
    } catch {
      // Ignore missing or non-JSON profile values and try the next source.
    }
  }

  // Some authentication systems include the user's name in the JWT payload.
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split(".")[1];
      if (payload) {
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = JSON.parse(atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")));
        const name = decoded?.name || decoded?.fullName || decoded?.username || decoded?.firstName;
        if (typeof name === "string" && name.trim()) return name.trim().split(/\s+/)[0];
      }
    }
  } catch {
    // A token may not be a JWT or may not contain a readable profile.
  }

  return "there";
}

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const greetingName = getGreetingName();
  const timeGreeting = getTimeGreeting();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getDocuments()
      .then((data) => { if (active) setDocuments(Array.isArray(data.documents) ? data.documents : []); })
      .catch((err) => { if (active) setError(err.response?.data?.message || "Could not load your documents."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const sorted = useMemo(() => [...documents].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)), [documents]);
  const recent = sorted.slice(0, 6);
  const counts = useMemo(() => {
    const statuses = documents.map(statusOf);
    return {
      total: documents.length,
      completed: statuses.filter((s) => s === "completed").length,
      inProgress: statuses.filter((s) => s === "processing" || s === "pending").length,
    };
  }, [documents]);
  const week = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now);
      date.setHours(0, 0, 0, 0);
      date.setDate(now.getDate() - (6 - index));
      const end = new Date(date);
      end.setDate(date.getDate() + 1);
      return {
        label: date.toLocaleDateString(undefined, { weekday: "short" }),
        date: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
        count: documents.filter((doc) => doc.createdAt && new Date(doc.createdAt) >= date && new Date(doc.createdAt) < end).length,
      };
    });
  }, [documents]);
  const maxCount = Math.max(1, ...week.map((d) => d.count));
  const activity = sorted.slice(0, 4);

  return (
    <main className="dashboard-main product-dashboard">
      <header className="page-heading dashboard-page-heading">
        <div><p className="eyebrow">DOCUMENT WORKSPACE</p><h1>{timeGreeting}, {greetingName}!</h1><p className="dashboard-subtitle">An overview of your legal translation workspace.</p></div>
        <div className="page-actions"><a className="outline-button" href="/documents">Upload PDF</a><a className="primary-button" href="/translate">New translation</a></div>
      </header>
      {error && <div className="error-state dashboard-error" role="alert">{error}</div>}

      <section className="dashboard-stats" aria-label="Document statistics">
        <article className="stat-card"><div className="stat-card-top"><span className="stat-icon">▤</span><span className="stat-label">Total documents</span></div><strong className="stat-value">{loading ? "—" : counts.total}</strong><span className="stat-footnote">PDFs in your workspace</span></article>
        <article className="stat-card"><div className="stat-card-top"><span className="stat-icon stat-icon-success">✓</span><span className="stat-label">Completed</span></div><strong className="stat-value">{loading ? "—" : counts.completed}</strong><span className="stat-footnote">Marked as completed</span></article>
        <article className="stat-card"><div className="stat-card-top"><span className="stat-icon stat-icon-wait">◷</span><span className="stat-label">In progress</span></div><strong className="stat-value">{loading ? "—" : counts.inProgress}</strong><span className="stat-footnote">Pending or processing</span></article>
        <article className="stat-card"><div className="stat-card-top"><span className="stat-icon stat-icon-language">文</span><span className="stat-label">Target languages</span></div><strong className="stat-value">{LANGUAGES.length}</strong><span className="stat-footnote">Malayalam, Hindi, Tamil</span></article>
      </section>

      <section className="dashboard-quick-actions" aria-labelledby="quick-actions-title">
        <div className="section-heading"><div><p className="eyebrow">GET STARTED</p><h2 id="quick-actions-title">Quick actions</h2></div></div>
        <div className="quick-action-grid">
          <a className="quick-action-card" href="/documents"><span className="quick-action-icon">↑</span><span className="quick-action-copy"><strong>Upload a document</strong><small>Add a legal PDF to your workspace</small></span><span className="quick-action-arrow">↗</span></a>
          <a className="quick-action-card" href="/translate"><span className="quick-action-icon">文</span><span className="quick-action-copy"><strong>Start a translation</strong><small>Choose a target language and begin</small></span><span className="quick-action-arrow">↗</span></a>
          <a className="quick-action-card" href="/history"><span className="quick-action-icon">↻</span><span className="quick-action-copy"><strong>Translation history</strong><small>Revisit previous translation activity</small></span><span className="quick-action-arrow">↗</span></a>
        </div>
      </section>

      <section className="dashboard-insights-grid">
        <article className="dashboard-panel">
          <div className="dashboard-panel-heading"><div><p className="eyebrow">YOUR WORKSPACE</p><h2>Document activity</h2><p>Uploads over the last 7 days</p></div><span className="chart-total">{loading ? "—" : week.reduce((sum, d) => sum + d.count, 0)}<small>this week</small></span></div>
          {loading ? <p className="dashboard-panel-state">Loading activity…</p> : <div className="activity-chart" role="img" aria-label="Documents uploaded each day over the last seven days">{week.map((day) => <div className="activity-chart-column" key={day.date} title={`${day.date}: ${day.count} documents`}><span className="activity-chart-count">{day.count || ""}</span><div className="activity-chart-track"><span style={{ height: `${day.count ? Math.max(8, day.count / maxCount * 100) : 3}%` }} /></div><span className="activity-chart-label">{day.label}</span></div>)}</div>}
          {!loading && documents.length === 0 && <p className="chart-empty-note">Your upload activity will appear here when you add documents.</p>}
        </article>
        <article className="dashboard-panel">
          <div className="dashboard-panel-heading"><div><p className="eyebrow">LATEST UPDATES</p><h2>Recent activity</h2><p>Based on your document library</p></div></div>
          {loading ? <p className="dashboard-panel-state">Loading activity…</p> : activity.length === 0 ? <div className="activity-empty"><span className="activity-empty-icon">◷</span><strong>No activity yet</strong><p>Upload a document to start building your activity history.</p></div> : <div className="activity-feed">{activity.map((doc) => { const status = statusOf(doc); return <div className="activity-feed-item" key={doc._id}><span className={`activity-feed-marker ${status}`} aria-hidden="true">{status === "completed" ? "✓" : status === "failed" ? "!" : "↥"}</span><div className="activity-feed-copy"><strong>{status === "completed" ? "Translation completed" : status === "failed" ? "Document needs attention" : status === "processing" ? "Translation in progress" : "Document added"}</strong><span title={filename(doc)}>{filename(doc)}</span><small>{dateLabel(doc.createdAt)}</small></div></div>; })}</div>}
        </article>
      </section>

      <section className="documents-panel recent-documents dashboard-recent-documents" aria-labelledby="recent-title">
        <div className="panel-header"><div><h2 id="recent-title">Recent documents</h2><p>Your latest uploaded legal PDFs</p></div><a className="text-button" href="/documents">All documents <span aria-hidden="true">→</span></a></div>
        {loading && <p className="list-state" role="status">Loading documents…</p>}
        {!loading && !error && recent.length === 0 && <div className="empty-state compact-empty"><h3>No documents yet</h3><p>Upload a legal PDF to begin a translation.</p><a className="primary-button" href="/documents">Upload a document</a></div>}
        {!loading && recent.length > 0 && <div className="document-list">{recent.map((doc) => { const status = statusOf(doc); return <div className="document-row" key={doc._id}><span className="document-icon" aria-hidden="true">PDF</span><div className="document-info"><h3 title={filename(doc)}>{filename(doc)}</h3><p>Added {dateLabel(doc.createdAt)}</p></div><span className={`status-badge ${status}`}>{statusLabel(status)}</span><a className="row-action" href={`/translate?documentId=${encodeURIComponent(doc._id)}`}>Translate <span aria-hidden="true">→</span></a></div>; })}</div>}
      </section>
      <footer className="dashboard-note"><span className="dashboard-note-mark">L</span><p><strong>LexiBridge AI</strong><span>Translate legal documents with clarity across Indian languages.</span></p><span className="dashboard-note-languages">{LANGUAGES.join(" · ")}</span></footer>
    </main>
  );
}
