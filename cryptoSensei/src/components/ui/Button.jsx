export default function Button({
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500/60 disabled:opacity-60";
  const styles =
    variant === "ghost"
      ? "border border-light-border dark:border-dark-border hover:shadow-neon"
      : variant === "danger"
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-primary-600 text-white hover:bg-primary-700";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
