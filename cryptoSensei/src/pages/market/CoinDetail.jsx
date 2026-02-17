import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import Select from "../../components/ui/Select";
import LineChart from "../../components/charts/LineChart";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { fmtMoney } from "../../utils/format";

export default function CoinDetail() {
  const { coinId } = useParams();
  const [days, setDays] = useState("7");

  const priceReq = useAsync(async () => {
    const res = await api.get(endpoints.crypto.coinPrice(coinId));
    return res.data?.data;
  }, [coinId]);

  const historyReq = useAsync(async () => {
    const res = await api.get(
      `${endpoints.crypto.history(coinId)}?days=${days}`,
    );
    return res.data?.data || [];
  }, [coinId, days]);

  if (priceReq.loading || historyReq.loading)
    return <Loading label="LOADING COIN..." />;
  if (priceReq.error)
    return <ErrorState message={priceReq.error} onRetry={priceReq.run} />;
  if (historyReq.error)
    return <ErrorState message={historyReq.error} onRetry={historyReq.run} />;

  const coin = priceReq.data;
  const hist = historyReq.data;

  const chart = useMemo(() => {
    const labels = hist.map((p) => p.date);
    const data = hist.map((p) => p.price);
    return { labels, data };
  }, [hist]);

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="h-10 w-10 rounded" />
          <div>
            <div className="font-arcade text-xs tracking-widest">
              {coin.name}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              {coin.symbol}
            </div>
          </div>
        </div>

        <div className="mt-3 text-sm text-slate-700 dark:text-slate-200">
          Current:{" "}
          <span className="font-semibold">{fmtMoney(coin.currentPrice)}</span>
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
              Days
            </div>
            <Select value={days} onChange={(e) => setDays(e.target.value)}>
              <option value="7">7</option>
              <option value="30">30</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6 h-[420px]" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest">PRICE HISTORY</div>
        <div className="mt-4 h-[320px]">
          <LineChart
            labels={chart.labels}
            data={chart.data}
            label={`${coin.name} (USD)`}
          />
        </div>
      </Card>
    </div>
  );
}
