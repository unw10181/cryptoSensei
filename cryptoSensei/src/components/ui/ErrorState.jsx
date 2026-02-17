import Button from "./Button";

export default function ErrorState({
  title = "SYSTEM ERROR",
  message,
  onRetry,
}) {
  return (
    <div className="rounded-xl2 border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5">
      <div className="font-arcade text-xs tracking-widest text-red-500">
        {title}
      </div>
      <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
        {message}
      </div>
      {onRetry ? (
        <div className="mt-4">
          <Button onClick={onRetry}>RETRY</Button>
        </div>
      ) : null}
    </div>
  );
}
