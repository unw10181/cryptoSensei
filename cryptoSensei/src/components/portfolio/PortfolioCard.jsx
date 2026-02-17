import Card from "../ui/Card";
import { fmtMoney } from "../../utils/format";
import { Link } from "react-router-dom";

export default function PortfolioCard({ p }) {
  return (
    <Link to={`/portfolios/${p._id}`}>
      <Card className="p-5 hover:shadow-neon transition" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest">{p.name}</div>
        <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
          Cash: {fmtMoney(p.cashBalance)}
        </div>
        <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
          {p.description || "No description"}
        </div>
      </Card>
    </Link>
  );
}
