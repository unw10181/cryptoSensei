import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen text-slate-900 dark:text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8 pb-24">{children}</main>
      <MobileNav />
    </div>
  );
}
