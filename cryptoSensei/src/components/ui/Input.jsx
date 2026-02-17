export default function Input({ className = "", ...props }) {
  return (
    <input
      className={[
        "w-full rounded-xl px-3 py-2 bg-transparent",
        "border border-light-border dark:border-dark-border",
        "text-slate-900 dark:text-white",
        "outline-none focus:shadow-neon",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
