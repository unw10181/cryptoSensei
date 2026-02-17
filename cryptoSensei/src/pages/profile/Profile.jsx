import Card from "../../components/ui/Card";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useAsync } from "../../hooks/useAsync";

export default function Profile() {
  const { user } = useAuth();

  const profileReq = useAsync(async () => {
    const res = await api.get(endpoints.users.getProfile(user._id));
    return res.data?.data;
  }, [user._id]);

  const achReq = useAsync(async () => {
    const res = await api.get(endpoints.users.achievements(user._id));
    return res.data?.data || [];
  }, [user._id]);

  if (profileReq.loading || achReq.loading)
    return <Loading label="LOADING PROFILE..." />;
  if (profileReq.error)
    return <ErrorState message={profileReq.error} onRetry={profileReq.run} />;
  if (achReq.error)
    return <ErrorState message={achReq.error} onRetry={achReq.run} />;

  const p = profileReq.data;
  const ach = achReq.data;

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          PROFILE
        </div>
        <div className="mt-3 text-sm text-slate-700 dark:text-slate-200">
          Username: <span className="font-semibold">{p.username}</span>
        </div>
        <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
          Email: <span className="font-semibold">{p.email}</span>
        </div>
        <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">
          Avatar: <span className="font-semibold">{p.avatar || "None"}</span>
        </div>
      </Card>

      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest">
          UNLOCKED ACHIEVEMENTS
        </div>
        {ach.length === 0 ? (
          <div className="mt-3 text-sm text-slate-700 dark:text-slate-200">
            None yet.
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {ach.map((ua) => (
              <div
                key={ua._id}
                className="rounded-xl border border-light-border dark:border-dark-border px-4 py-2"
              >
                <div className="font-semibold">{ua.achievementId?.name}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Unlocked: {new Date(ua.unlockedAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
