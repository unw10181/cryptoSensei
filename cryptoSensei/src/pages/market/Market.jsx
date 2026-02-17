import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";

import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { useDebounce } from "../../hooks/useDebounce";
import { fmtMoney } from "../../utils/format";

export default function Market() {
  // ✅ Hooks first — always
  const [q, setQ] = useState("");
  const dq = useDebounce(q, 350);

  const topReq = useAsync(async () => {
    const res = await api.get(`${endpoints.crypto.prices}?perPage=24&page=1`);
    return res.data?.data || [];
  }, []);

  const searchReq = useAsync(
    async () => {
      const term = dq.trim();
      if (!term) return [];
      const res = await api.get(
        `${endpoints.crypto.search}?query=${encodeURIComponent(term)}`,
      );
      return res.data?.data || [];
    },
    [dq],
    { immediate: true },
  );

  // ✅ useMemo must NEVER be conditional
  const topCoins = useMemo(() => topReq.data || [], [topReq.data]);
  const searchResults = useMemo(
    () => (dq.trim() ? searchReq.data || [] : []),
    [dq, searchReq.data],
  );

  // ✅ No early returns that skip hooks
  // Instead, render states inside JSX.

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          MARKET
        </div>

        <div className="mt-4">
          <Input
            placeholder="Search coin (name or symbol)..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {/* SEARCH PANEL */}
        {dq.trim() ? (
          <div className="mt-4">
            {searchReq.loading ? (
              <Loading label="SEARCHING..." />
            ) : searchReq.error ? (
              <ErrorState message={searchReq.error} onRetry={searchReq.run} />
            ) : searchResults.length === 0 ? (
              <EmptyState
                title="NO RESULTS"
                message="Try a different search."
              />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.map((c) => (
                  <Link key={c.id} to={`/market/${c.id}`}>
                    <div className="rounded-xl border border-light-border dark:border-dark-border px-4 py-3 hover:shadow-neon transition">
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {c.symbol} • rank {c.marketCapRank}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 text-xs text-slate-600 dark:text-slate-300">
            Tip: search BTC, ETH, SOL, etc.
          </div>
        )}
      </Card>

      {/* TOP COINS GRID */}
      {topReq.loading ? (
        <Loading label="LOADING MARKET..." />
      ) : topReq.error ? (
        <ErrorState message={topReq.error} onRetry={topReq.run} />
      ) : topCoins.length === 0 ? (
        <EmptyState title="NO DATA" message="Market data unavailable." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topCoins.map((c) => (
            <Link key={c.id} to={`/market/${c.id}`}>
              <Card
                className="p-5 hover:shadow-neon transition"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-10 w-10 rounded"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      {c.symbol}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-sm text-slate-700 dark:text-slate-200">
                  Price:{" "}
                  <span className="font-semibold">
                    {fmtMoney(c.currentPrice)}
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  24h: {Number(c.priceChangePercentage24h ?? 0).toFixed(2)}%
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
