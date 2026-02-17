export default function Card({ className = "", ...props }) {
  return (
    <div
      className={[
        "rounded-xl2 border shadow-gaming",
        "border-light-border dark:border-dark-border",
        "bg-light-surface dark:bg-dark-surface",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
