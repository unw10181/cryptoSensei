import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAsync } from "../../hooks/useAsync";

export default function Achievements() {
  const progReq = useAsync(async () => {
    const res = await api.get(endpoints.achievements.userProgress);
    return res.data?.data || [];
  }, []);

  const runCheck = async () => {
    const t = toast.loading("SYSTEM: Checking achievements...");
    try {
      const res = await api.post(endpoints.achievements.check);
      const count = res.data?.newlyUnlocked ?? 0;
      toast.success(`Unlocked: ${count}`, { id: t });
      await progReq.run();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Check failed", { id: t });
    }
  };

  if (progReq.loading) return <Loading label="LOADING ACHIEVEMENTS..." />;
  if (progReq.error)
    return <ErrorState message={progReq.error} onRetry={progReq.run} />;

  const items = progReq.data || [];

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          ACHIEVEMENTS
        </div>
        <div className="mt-4">
          <Button onClick={runCheck}>MANUAL CHECK</Button>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((a) => (
          <Card
            key={a._id}
            className={[
              "p-5 transition",
              a.isUnlocked ? "shadow-neon border-neon-cyan" : "",
            ].join(" ")}
            data-aos="fade-up"
          >
            <div className="font-semibold">{a.name}</div>
            <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              {a.description}
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
              Tier: {a.tier} • XP: {a.xpReward} •{" "}
              {a.isUnlocked ? "UNLOCKED" : "LOCKED"}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
