import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const link = ({ isActive }) =>
  [
    "px-3 py-2 rounded-xl text-xs font-arcade tracking-widest transition",
    "hover:bg-light-elevated dark:hover:bg-dark-elevated",
    isActive ? "shadow-neon" : "",
  ].join(" ");

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-dark-surface/60 border-b border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => nav("/dashboard")}
          className="font-dirty text-sm tracking-widest"
        >
          Crypto<span className="font-dirty text-primary-500">Sensei</span>
        </button>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/dashboard" className={link}>
            DASH
          </NavLink>
          <NavLink to="/portfolios" className={link}>
            PORTFOLIOS
          </NavLink>
          <NavLink to="/market" className={link}>
            MARKET
          </NavLink>
          <NavLink to="/achievements" className={link}>
            ACHVIEVEMENTS
          </NavLink>
          <NavLink to="/profile" className={link}>
            PROFILE
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="px-3 py-2 rounded-xl text-xs border border-light-border dark:border-dark-border hover:shadow-neon transition inline-flex items-center gap-2"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              // Sun icon (when currently dark, next is light)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M4.93 19.07l1.41-1.41" />
                <path d="M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              // Moon icon (when currently light, next is dark)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.8A8.5 8.5 0 0 1 11.2 3a6.5 6.5 0 1 0 9.8 9.8Z" />
              </svg>
            )}

            <span>{theme === "dark" ? "LIGHT" : "DARK"}</span>
          </button>

          {user ? (
            <button
              onClick={logout}
              className="px-3 py-2 rounded-xl text-xs bg-primary-600 text-white hover:bg-primary-700 transition"
            >
              LOGOUT
            </button>
          ) : null}
        </div>
      </div>

      <nav className="md:hidden border-t border-light-border dark:border-dark-border px-4 py-2 flex gap-2 overflow-x-auto">
        <NavLink to="/dashboard" className={link}>
          DASH
        </NavLink>
        <NavLink to="/portfolios" className={link}>
          PORTS
        </NavLink>
        <NavLink to="/market" className={link}>
          MARKET
        </NavLink>
        <NavLink to="/achievements" className={link}>
          ACHV
        </NavLink>
        <NavLink to="/profile" className={link}>
          ME
        </NavLink>
      </nav>
    </header>
  );
}
