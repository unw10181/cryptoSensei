import Card from "../../components/ui/Card";
import StatPill from "../../components/ui/StatPill";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAsync } from "../../hooks/useAsync";
import { fmtMoney } from "../../utils/format";

export default function Dashboard() {
  const { user } = useAuth();

  const statsReq = useAsync(async () => {
    const res = await api.get(endpoints.users.stats(user._id));
    return res.data?.data;
  }, [user._id]);

  const txReq = useAsync(async () => {
    const res = await api.get(endpoints.transactions.userAll);
    return res.data?.data || [];
  }, [user._id]);

  if (statsReq.loading || txReq.loading)
    return <Loading label="LOADING DASHBOARD..." />;
  if (statsReq.error)
    return <ErrorState message={statsReq.error} onRetry={statsReq.run} />;
  if (txReq.error)
    return <ErrorState message={txReq.error} onRetry={txReq.run} />;

  const stats = statsReq.data;
  const recent = (txReq.data || []).slice(0, 6);

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          SYSTEM STATUS
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <StatPill label="USER" value={stats?.username || user.username} />
          <StatPill label="RANK" value={stats?.rank || user.rank || "E-Rank"} />
          <StatPill
            label="XP"
            value={String(stats?.totalXP ?? user.totalXP ?? 0)}
          />
          <StatPill
            label="BALANCE"
            value={fmtMoney(stats?.virtualBalance ?? user.virtualBalance ?? 0)}
          />
          <StatPill
            label="ACHV"
            value={String(stats?.achievementsUnlocked ?? 0)}
          />
        </div>
      </Card>

      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest">RECENT TRADES</div>
        {recent.length === 0 ? (
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-200">
            No trades yet.
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {recent.map((t) => (
              <div
                key={t._id}
                className="rounded-xl border border-light-border dark:border-dark-border px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div className="text-sm">
                  <span className="font-arcade text-[10px] tracking-widest uppercase">
                    {t.type}
                  </span>{" "}
                  <span className="font-semibold">{t.cryptoSymbol}</span>{" "}
                  <span className="text-slate-600 dark:text-slate-300">
                    ({t.cryptoName})
                  </span>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-200">
                  {t.quantity} @ {fmtMoney(t.pricePerCoin)} •{" "}
                  {fmtMoney(t.totalValue)}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
