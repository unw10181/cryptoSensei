import { useMemo } from "react";
import { useParams } from "react-router-dom";

import Card from "../../components/ui/Card";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import StatPill from "../../components/ui/StatPill";

import HoldingRow from "../../components/portfolio/HoldingRow";
import TradePanel from "../../components/trade/TradePanel";
import TransactionsTable from "../../components/trade/TransactionsTable";

import DoughnutChart from "../../components/charts/DoughnutChart";
import LineChart from "../../components/charts/LineChart";

import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { fmtMoney } from "../../utils/format";

export default function PortfolioDetail() {
  const { id } = useParams();

  const perfReq = useAsync(async () => {
    const res = await api.get(endpoints.portfolios.performance(id));
    return res.data?.data;
  }, [id]);

  const txReq = useAsync(async () => {
    const res = await api.get(endpoints.transactions.byPortfolio(id));
    return res.data?.data || [];
  }, [id]);

  // live pricing for holdings using batch-prices
  const liveReq = useAsync(async () => {
    const perf = await (async () => {
      const res = await api.get(endpoints.portfolios.performance(id));
      return res.data?.data;
    })();
    const holdings = perf?.holdings || [];
    // We need CoinGecko IDs, but holdings store symbol. For demo efficiency,
    // map common symbols to IDs; you can expand this mapping.
    const map = { BTC: "bitcoin", ETH: "ethereum", SOL: "solana" };
    const coinIds = holdings.map((h) => map[h.cryptoSymbol]).filter(Boolean);
    if (coinIds.length === 0) return { map, prices: {} };

    const res = await api.post(endpoints.crypto.batch, { coinIds });
    return { map, prices: res.data?.data || {} };
  }, [id]);

  if (perfReq.loading || txReq.loading || liveReq.loading)
    return <Loading label="LOADING PORTFOLIO..." />;
  if (perfReq.error)
    return <ErrorState message={perfReq.error} onRetry={perfReq.run} />;
  if (txReq.error)
    return <ErrorState message={txReq.error} onRetry={txReq.run} />;
  if (liveReq.error)
    return <ErrorState message={liveReq.error} onRetry={liveReq.run} />;

  const perf = perfReq.data;
  const txs = txReq.data || [];
  const holdings = perf?.holdings || [];

  const live = liveReq.data?.prices || {};
  const map = liveReq.data?.map || {};

  const allocation = useMemo(() => {
    const labels = [];
    const values = [];
    for (const h of holdings) {
      const id = map[h.cryptoSymbol];
      const price = id ? live?.[id]?.usd : 0;
      const val = (Number(h.quantity) || 0) * (Number(price) || 0);
      labels.push(h.cryptoSymbol);
      values.push(Number(val.toFixed(2)));
    }
    return { labels, values };
  }, [holdings, live, map]);

  const tradeTimeline = useMemo(() => {
    // simple line chart of transaction totalValue over time
    const sorted = [...txs].reverse();
    const labels = sorted.map((t) =>
      new Date(t.createdAt).toLocaleDateString(),
    );
    const data = sorted.map((t) => Number(t.totalValue));
    return { labels, data };
  }, [txs]);

  const onTrade = async (payload) => {
    await api.post(endpoints.transactions.create, payload);
    await Promise.all([perfReq.run(), txReq.run(), liveReq.run()]);
  };

  const onDeleteTx = async (txId) => {
    await api.delete(endpoints.transactions.one(txId));
    await Promise.all([perfReq.run(), txReq.run(), liveReq.run()]);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          {perf?.portfolioName}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <StatPill label="Cash" value={fmtMoney(perf?.cashBalance)} />
          <StatPill label="Invested" value={fmtMoney(perf?.totalInvested)} />
          <StatPill label="Trades" value={String(perf?.totalTrades ?? 0)} />
          <StatPill label="Bought" value={fmtMoney(perf?.totalBought ?? 0)} />
          <StatPill label="Sold" value={fmtMoney(perf?.totalSold ?? 0)} />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-6 h-[360px]" data-aos="fade-up">
          <div className="font-arcade text-xs tracking-widest">
            HOLDINGS ALLOCATION
          </div>
          <div className="mt-4 h-[280px]">
            {allocation.labels.length === 0 ? (
              <EmptyState
                title="NO HOLDINGS"
                message="Buy a coin to see allocation."
              />
            ) : (
              <DoughnutChart
                labels={allocation.labels}
                data={allocation.values}
              />
            )}
          </div>
        </Card>

        <Card className="p-6 h-[360px]" data-aos="fade-up">
          <div className="font-arcade text-xs tracking-widest">
            TRADE VALUE TIMELINE
          </div>
          <div className="mt-4 h-[280px]">
            {tradeTimeline.labels.length === 0 ? (
              <EmptyState
                title="NO TRADES"
                message="Execute trades to see timeline."
              />
            ) : (
              <LineChart
                labels={tradeTimeline.labels}
                data={tradeTimeline.data}
                label="Trade Total Value"
              />
            )}
          </div>
        </Card>
      </div>

      <TradePanel portfolioId={id} onTrade={onTrade} />

      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest">HOLDINGS</div>
        <div className="mt-4 space-y-2">
          {holdings.length === 0 ? (
            <EmptyState title="EMPTY" message="No holdings yet." />
          ) : (
            holdings.map((h) => {
              const coinId = map[h.cryptoSymbol];
              const price = coinId ? live?.[coinId]?.usd : 0;
              return (
                <HoldingRow key={h.cryptoSymbol} h={h} livePrice={price} />
              );
            })
          )}
        </div>
      </Card>

      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest">TRANSACTIONS</div>
        <div className="mt-4">
          {txs.length === 0 ? (
            <EmptyState title="EMPTY" message="No transactions yet." />
          ) : (
            <TransactionsTable items={txs} onDelete={onDeleteTx} />
          )}
        </div>
      </Card>
    </div>
  );
}
