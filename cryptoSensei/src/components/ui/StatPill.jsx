export default function StatPill({ label, value }) {
  return (
    <div className="rounded-xl border border-light-border dark:border-dark-border px-3 py-2 bg-light-elevated/60 dark:bg-dark-elevated/60">
      <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
        {label}
      </div>
      <div className="font-arcade text-xs tracking-widest text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}
