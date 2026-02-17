export default function EmptyState({ title = "NO DATA", message }) {
  return (
    <div className="rounded-xl2 border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5">
      <div className="font-arcade text-xs tracking-widest text-primary-500">
        {title}
      </div>
      <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
        {message}
      </div>
    </div>
  );
}
