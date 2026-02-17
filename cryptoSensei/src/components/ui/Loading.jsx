export default function Loading({ label = "Loading..." }) {
  return (
    <div className="text-slate-700 dark:text-slate-200 animate-pulse">
      <span className="font-arcade tracking-widest text-xs">{label}</span>
    </div>
  );
}
