import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";

const number = (value) => new Intl.NumberFormat().format(value || 0);
const date = (value) => {
  if (!value) return "—";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? "—"
    : parsed.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};
const languageNames = { Malayalam: "Malayalam", Hindi: "Hindi", Tamil: "Tamil" };

function MetricCard({ label, value, detail, icon }) {
  return (
    <article className="admin-metric-card">
      <div className="admin-metric-icon" aria-hidden="true">{icon}</div>
      <p>{label}</p>
      <strong>{number(value)}</strong>
      <small>{detail}</small>
    </article>
  );
}

function StatusList({ title, statuses }) {
  const entries = Object.entries(statuses || {});
  const total = entries.reduce((sum, [, count]) => sum + count, 0);
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div><p className="admin-eyebrow">PROCESSING HEALTH</p><h2>{title}</h2></div>
        <span className="admin-total-pill">{number(total)} total</span>
      </div>
      {entries.map(([status, count]) => (
        <div className="admin-status-row" key={status}>
          <div className="admin-status-label"><span className={`admin-status-dot ${status}`} />{status.charAt(0).toUpperCase() + status.slice(1)}</div>
          <strong>{number(count)}</strong>
          <div className="admin-status-track"><span className={`admin-status-fill ${status}`} style={{ width: `${total ? Math.max(count > 0 ? 2 : 0, (count / total) * 100) : 0}%` }} /></div>
        </div>
      ))}
      {!entries.length && <p className="admin-muted">No status data yet.</p>}
    </section>
  );
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [userPagination, setUserPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOverview = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/admin/overview");
      setOverview(response.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not load admin statistics.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadUsers = useCallback(async (page = 1, query = "") => {
    setUsersLoading(true);
    try {
      const response = await api.get("/admin/users", {
        params: { page, limit: 8, search: query.trim() || undefined },
      });
      setUsers(response.data.users || []);
      setUserPagination(response.data.pagination || { page: 1, pages: 1, total: 0 });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not load the user directory.");
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => { loadOverview(); }, [loadOverview]);
  useEffect(() => { loadUsers(1, ""); }, [loadUsers]); // Load the first page once on mount.

  const activity = useMemo(() => overview?.translationActivity || [], [overview]);
  const maxActivity = Math.max(1, ...activity.map((item) => item.count));
  const summary = overview?.summary || {};
  const languages = overview?.languageUsage || {};

  const submitSearch = (event) => {
    event.preventDefault();
    loadUsers(1, search);
  };

  return (
    <main className="admin-page">
      <header className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">LEXIBRIDGE · CONTROL CENTRE</p>
          <h1>Admin overview</h1>
          <p className="admin-subtitle">Monitor usage, translation health and registered accounts.</p>
        </div>
        <button className="admin-refresh-button" type="button" onClick={() => { loadOverview(); loadUsers(userPagination.page, search); }} disabled={loading || usersLoading}>
          <span aria-hidden="true">↻</span> Refresh data
        </button>
      </header>

      {error && <div className="admin-alert" role="alert">{error}</div>}

      {loading ? (
        <div className="admin-loading" role="status">Loading admin statistics…</div>
      ) : (
        <>
          <section className="admin-metrics-grid" aria-label="Platform summary">
            <MetricCard label="Registered users" value={summary.totalUsers} detail={`${number(summary.newUsers7d)} joined in the last 7 days`} icon="♙" />
            <MetricCard label="Uploaded documents" value={summary.totalDocuments} detail={`${number(summary.documents7d)} uploaded in the last 7 days`} icon="▤" />
            <MetricCard label="Translations" value={summary.totalTranslations} detail={`${number(summary.translations7d)} created in the last 7 days`} icon="文" />
            <MetricCard label="Languages supported" value={3} detail="Malayalam · Hindi · Tamil" icon="◎" />
          </section>

          <section className="admin-analytics-grid">
            <section className="admin-panel admin-activity-panel">
              <div className="admin-panel-heading">
                <div><p className="admin-eyebrow">LAST 30 DAYS</p><h2>Translation activity</h2></div>
                <span className="admin-total-pill">{number(summary.translations7d)} this week</span>
              </div>
              {activity.length ? (
                <div className="admin-chart" role="img" aria-label="Bar chart of translations created each day over the last 30 days">
                  {activity.map((item) => (
                    <div className="admin-chart-column" key={item.date} title={`${date(item.date)}: ${item.count} translations`}>
                      <span className="admin-chart-value">{item.count || ""}</span>
                      <div className="admin-chart-bar-wrap"><span className="admin-chart-bar" style={{ height: `${item.count ? Math.max(4, (item.count / maxActivity) * 100) : 0}%` }} /></div>
                      <small>{new Date(`${item.date}T12:00:00`).getDate() % 5 === 1 ? new Date(`${item.date}T12:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short" }) : ""}</small>
                    </div>
                  ))}
                </div>
              ) : <p className="admin-muted">No translation activity yet.</p>}
            </section>

            <section className="admin-panel">
              <div className="admin-panel-heading"><div><p className="admin-eyebrow">LANGUAGE BREAKDOWN</p><h2>Target languages</h2></div></div>
              {Object.entries(languageNames).map(([key, label]) => {
                const count = languages[key] || 0;
                const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
                return <div className="admin-language-row" key={key}><div><span>{label}</span><strong>{number(count)}</strong></div><div className="admin-language-track"><span style={{ width: `${total ? (count / total) * 100 : 0}%` }} /></div></div>;
              })}
            </section>
          </section>

          <section className="admin-analytics-grid admin-status-grid">
            <StatusList title="Document processing" statuses={overview?.documentStatuses} />
            <StatusList title="Translation processing" statuses={overview?.translationStatuses} />
          </section>
        </>
      )}

      <section className="admin-panel admin-users-panel">
        <div className="admin-panel-heading admin-users-heading">
          <div><p className="admin-eyebrow">ACCOUNT DIRECTORY</p><h2>Registered users</h2><p className="admin-muted">Names, email addresses, roles and join dates only. Document contents are not exposed here.</p></div>
          <span className="admin-total-pill">{number(userPagination.total)} accounts</span>
        </div>
        <form className="admin-search-form" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="admin-user-search">Search users</label>
          <input id="admin-user-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or email" />
          <button type="submit" disabled={usersLoading}>Search</button>
        </form>
        <div className="admin-table-wrap">
          <table className="admin-users-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
            <tbody>
              {usersLoading ? <tr><td colSpan="4" className="admin-table-empty">Loading users…</td></tr> : users.length ? users.map((user) => (
                <tr key={user.id}><td>{user.name || "Unnamed user"}</td><td>{user.email}</td><td><span className={`admin-role-badge ${user.role === "admin" ? "is-admin" : ""}`}>{user.role || "user"}</span></td><td>{date(user.createdAt)}</td></tr>
              )) : <tr><td colSpan="4" className="admin-table-empty">No matching users found.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="admin-pagination">
          <span>Page {userPagination.page || 1} of {userPagination.pages || 1}</span>
          <div><button type="button" onClick={() => loadUsers(Math.max(1, userPagination.page - 1), search)} disabled={usersLoading || userPagination.page <= 1}>Previous</button><button type="button" onClick={() => loadUsers(Math.min(userPagination.pages, userPagination.page + 1), search)} disabled={usersLoading || userPagination.page >= userPagination.pages}>Next</button></div>
        </div>
      </section>
      <p className="admin-footnote">Statistics generated {overview?.generatedAt ? new Date(overview.generatedAt).toLocaleString() : "when data loads"}. Only authorized administrators can access this page.</p>
    </main>
  );
}
