import { fmtMoney } from "../../utils/format";

export default function HoldingRow({ h, livePrice }) {
  const value = (Number(h.quantity) || 0) * (Number(livePrice) || 0);
  return (
    <div className="rounded-xl border border-light-border dark:border-dark-border px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="text-sm">
        <span className="font-semibold">{h.cryptoSymbol}</span>{" "}
        <span className="text-slate-600 dark:text-slate-300">
          {h.cryptoName}
        </span>
      </div>
      <div className="text-sm text-slate-700 dark:text-slate-200">
        Qty: {h.quantity} • Avg: {fmtMoney(h.avgBuyPrice)} • Value:{" "}
        {fmtMoney(value)}
      </div>
    </div>
  );
}
