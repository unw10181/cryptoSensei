import Card from "../ui/Card";
import TradeForm from "./TradeForm";

export default function TradePanel({ portfolioId, onTrade }) {
  return (
    <Card className="p-6" data-aos="fade-up">
      <div className="font-arcade text-xs tracking-widest text-primary-500">
        TRADE CONSOLE
      </div>
      <div className="mt-4">
        <TradeForm portfolioId={portfolioId} onSubmit={onTrade} />
      </div>
    </Card>
  );
}
