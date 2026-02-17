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
          className="font-arcade text-xs tracking-widest"
        >
          Crypto<span className="text-primary-500">Sensei</span>
        </button>

        <nav className="hidden md:flex items-center gap-2">
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
            PROFILE
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="px-3 py-2 rounded-xl text-xs border border-light-border dark:border-dark-border hover:shadow-neon transition"
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
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
