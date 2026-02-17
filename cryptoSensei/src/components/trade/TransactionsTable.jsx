import Button from "../ui/Button";
import { fmtMoney } from "../../utils/format";

export default function TransactionsTable({ items, onDelete }) {
  return (
    <div className="space-y-2">
      {items.map((t) => (
        <div
          key={t._id}
          className="rounded-xl border border-light-border dark:border-dark-border px-4 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
        >
          <div className="text-sm">
            <span className="font-arcade text-[10px] uppercase tracking-widest">
              {t.type}
            </span>{" "}
            <span className="font-semibold">{t.cryptoSymbol}</span>{" "}
            <span className="text-slate-600 dark:text-slate-300">
              {t.cryptoName}
            </span>
          </div>
          <div className="text-sm text-slate-700 dark:text-slate-200">
            {t.quantity} @ {fmtMoney(t.pricePerCoin)} • {fmtMoney(t.totalValue)}
          </div>
          <Button variant="danger" onClick={() => onDelete(t._id)}>
            DELETE
          </Button>
        </div>
      ))}
    </div>
  );
}
