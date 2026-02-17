import { NavLink } from "react-router-dom";

const tabClass = ({ isActive }) =>
  [
    "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition",
    "border border-transparent",
    "text-[10px] font-arcade tracking-widest",
    "text-slate-700 dark:text-slate-200",
    "hover:bg-light-elevated dark:hover:bg-dark-elevated",
    isActive ? "shadow-neon border-primary-500/40" : "",
  ].join(" ");

function Icon({ children }) {
  return (
    <span className="grid place-items-center h-6 w-6 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
      <span className="text-xs">{children}</span>
    </span>
  );
}

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-3 left-0 right-0 z-50 px-3">
      <div className="max-w-6xl mx-auto">
        <div
          className={[
            "rounded-xl2 border shadow-gaming backdrop-blur",
            "border-light-border dark:border-dark-border",
            "bg-white/80 dark:bg-dark-surface/70",
            "px-2 py-2",
          ].join(" ")}
        >
          <div className="grid grid-cols-5 gap-2">
            <NavLink to="/dashboard" className={tabClass}>
              <Icon>⌁</Icon>
              <span>DASH</span>
            </NavLink>

            <NavLink to="/portfolios" className={tabClass}>
              <Icon>⧉</Icon>
              <span>PORTS</span>
            </NavLink>

            <NavLink to="/market" className={tabClass}>
              <Icon>✦</Icon>
              <span>MARKET</span>
            </NavLink>

            <NavLink to="/achievements" className={tabClass}>
              <Icon>★</Icon>
              <span>ACHV</span>
            </NavLink>

            <NavLink to="/profile" className={tabClass}>
              <Icon>☺</Icon>
              <span>ME</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
