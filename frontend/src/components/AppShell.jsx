import { useEffect, useRef, useState } from "react";

const links = [
  ["/dashboard", "Overview", "overview"],
  ["/documents", "Documents", "documents"],
  ["/translate", "New translation", "translate"],
  ["/history", "Translation history", "history"],
];

function NavIcon({ name }) {
  const paths = {
    overview: <><rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="13.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="13.5" width="7" height="7" rx="1" /><rect x="13.5" y="13.5" width="7" height="7" rx="1" /></>,
    documents: <><path d="M6 3.5h8l4 4v13H6z" /><path d="M14 3.5v4h4M9 12h6M9 16h6" /></>,
    translate: <><path d="M4 6h11M9.5 4v2c0 5-2.5 8-5.5 10M6 10c1.2 2 3.2 3.5 5.5 4.5M14 20l3.5-9 3.5 9M15.2 17h4.6" /></>,
    history: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
    theme: <><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17a8.5 8.5 0 0 0 0-17z" /></>,
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10" /></>,
  };
  return <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function AppShell({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("lexibridge-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem("lexibridge-sidebar-collapsed") === "true");
  const mobileMenuButtonRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const mobileCloseButtonRef = useRef(null);
  const wasMobileMenuOpen = useRef(false);
  const activePath = window.location.pathname === "/viewer" ? "/translate" : window.location.pathname;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("lexibridge-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lexibridge-sidebar-collapsed", String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    wasMobileMenuOpen.current = true;
    mobileCloseButtonRef.current?.focus();
    const handleKeys = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = [...(mobileDrawerRef.current?.querySelectorAll("a[href], button:not(:disabled)") || [])];
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeys);
    return () => document.removeEventListener("keydown", handleKeys);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && wasMobileMenuOpen.current) {
      wasMobileMenuOpen.current = false;
      mobileMenuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  const toggleSidebar = () => setSidebarCollapsed((current) => !current);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

  return (
    <div className={`app-frame${sidebarCollapsed ? " is-sidebar-collapsed" : ""}`}>
      <aside className="app-sidebar" aria-label="Main navigation">
        <div className="sidebar-top">
          <a className="shell-brand" href="/dashboard" aria-label="LexiBridge home">
            <span className="shell-mark">L</span><span className="shell-brand-copy"><b>LexiBridge</b><small>LEGAL TRANSLATION</small></span>
          </a>
          <button type="button" className="sidebar-collapse-button" onClick={toggleSidebar} aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} aria-pressed={sidebarCollapsed} title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d={sidebarCollapsed ? "m7 4 6 6-6 6" : "m13 4-6 6 6 6"} /></svg>
          </button>
        </div>
        <nav className="shell-nav">
          {links.map(([href, label, icon]) => <a key={href} href={href} aria-label={label} title={sidebarCollapsed ? label : undefined} aria-current={activePath === href ? "page" : undefined}><NavIcon name={icon} /><span className="shell-nav-label">{label}</span></a>)}
        </nav>
        <div className="shell-bottom">
          <button className="theme-button sidebar-utility" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"} title={sidebarCollapsed ? (theme === "dark" ? "Light appearance" : "Dark appearance") : undefined}>
            <NavIcon name="theme" /><span className="sidebar-utility-label">{theme === "dark" ? "Light appearance" : "Dark appearance"}</span>
          </button>
          <button className="theme-button sidebar-utility" onClick={logout} aria-label="Sign out" title={sidebarCollapsed ? "Sign out" : undefined}><NavIcon name="logout" /><span className="sidebar-utility-label">Sign out</span></button>
          <small>Private workspace · English to Indian languages</small>
        </div>
      </aside>
      <div className="shell-content">
        <div className="mobile-topbar">
          <a className="shell-brand" href="/dashboard"><span className="shell-mark">L</span><b>LexiBridge</b></a>
          <button ref={mobileMenuButtonRef} type="button" className="mobile-menu-button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
        </div>
        {menuOpen && <div className="mobile-drawer-layer" onClick={() => setMenuOpen(false)}>
          <div ref={mobileDrawerRef} id="mobile-navigation" className="mobile-menu" role="dialog" aria-label="Workspace navigation" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-drawer-heading"><strong>Workspace</strong><button ref={mobileCloseButtonRef} type="button" className="mobile-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">×</button></div>
            <nav className="mobile-menu-links" aria-label="Main navigation">{links.map(([href, label, icon]) => <a key={href} href={href} aria-current={activePath === href ? "page" : undefined}><NavIcon name={icon} />{label}</a>)}</nav>
            <div className="mobile-menu-utilities"><button onClick={toggleTheme}><NavIcon name="theme" />{theme === "dark" ? "Light appearance" : "Dark appearance"}</button><button onClick={logout}><NavIcon name="logout" />Sign out</button></div>
          </div>
        </div>}
        {children}
      </div>
    </div>
  );
}
