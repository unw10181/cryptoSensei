import { useEffect, useMemo, useState } from "react";
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

const symbolToCoinId = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
};

export default function PortfolioDetail() {
  // ✅ HOOKS (always called, top-level)
  const { id } = useParams();

  const perfReq = useAsync(async () => {
    const res = await api.get(endpoints.portfolios.performance(id));
    return res.data?.data;
  }, [id]);

  const txReq = useAsync(async () => {
    const res = await api.get(endpoints.transactions.byPortfolio(id));
    return res.data?.data || [];
  }, [id]);

  const [live, setLive] = useState({});
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState("");

  // ✅ Derived state (safe defaults)
  const perf = perfReq.data || null;
  const txs = txReq.data || [];
  const holdings = perf?.holdings || [];

  // ✅ Stable dependency key (prevents effect spam + avoids hook-order issues)
  const holdingsKey = useMemo(
    () =>
      holdings
        .map((h) => h.cryptoSymbol)
        .sort()
        .join(","),
    [holdings],
  );

  // ✅ Effect to load live prices (NOT a hook depending on another hook)
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLiveError("");
      setLiveLoading(true);
      try {
        const coinIds = holdings
          .map((h) => symbolToCoinId[h.cryptoSymbol])
          .filter(Boolean);

        if (coinIds.length === 0) {
          if (!cancelled) setLive({});
          return;
        }

        const res = await api.post(endpoints.crypto.batch, { coinIds });
        if (!cancelled) setLive(res.data?.data || {});
      } catch (e) {
        if (!cancelled) {
          setLiveError(
            e?.response?.data?.message ||
              e?.message ||
              "Failed to load live prices",
          );
        }
      } finally {
        if (!cancelled) setLiveLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
    // ✅ depends on id + holdingsKey only
  }, [id, holdingsKey]); // <-- IMPORTANT

  // ✅ useMemo (always called)
  const allocation = useMemo(() => {
    const labels = [];
    const values = [];

    for (const h of holdings) {
      const coinId = symbolToCoinId[h.cryptoSymbol];
      const price = coinId ? Number(live?.[coinId]?.usd || 0) : 0;
      const qty = Number(h.quantity || 0);
      labels.push(h.cryptoSymbol);
      values.push(Number((qty * price).toFixed(2)));
    }

    return { labels, values };
  }, [holdings, live]);

  const tradeTimeline = useMemo(() => {
    const sorted = [...txs].slice().reverse();
    return {
      labels: sorted.map((t) => new Date(t.createdAt).toLocaleDateString()),
      data: sorted.map((t) => Number(t.totalValue) || 0),
    };
  }, [txs]);

  // ✅ No early returns BEFORE hooks (we already called hooks)
  const isLoading = perfReq.loading || txReq.loading || liveLoading;
  const errorMsg = perfReq.error || txReq.error || liveError;

  const refresh = async () => {
    await perfReq.run();
    await txReq.run();
    // live prices auto-refresh from holdingsKey changes
  };

  const onTrade = async (payload) => {
    await api.post(endpoints.transactions.create, payload);
    await refresh();
  };

  const onDeleteTx = async (txId) => {
    await api.delete(endpoints.transactions.one(txId));
    await refresh();
  };

  // ✅ Render
  if (isLoading) return <Loading label="LOADING PORTFOLIO..." />;
  if (errorMsg) return <ErrorState message={errorMsg} onRetry={refresh} />;
  if (!perf)
    return <EmptyState title="NOT FOUND" message="Portfolio not found." />;

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          {perf.portfolioName || "PORTFOLIO"}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <StatPill label="Cash" value={fmtMoney(perf.cashBalance)} />
          <StatPill label="Invested" value={fmtMoney(perf.totalInvested)} />
          <StatPill label="Trades" value={String(perf.totalTrades ?? 0)} />
          <StatPill label="Bought" value={fmtMoney(perf.totalBought ?? 0)} />
          <StatPill label="Sold" value={fmtMoney(perf.totalSold ?? 0)} />
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
              const coinId = symbolToCoinId[h.cryptoSymbol];
              const price = coinId ? Number(live?.[coinId]?.usd || 0) : 0;
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
