import { useAuth } from "../../context/AuthContext";
import { useAsync } from "../../hooks/useAsync";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";

import Card from "../../components/ui/Card";
import Loading from "../../components/ui/Loading";
import ErrorState from "../../components/ui/ErrorState";
import Button from "../../components/ui/Button";

function resolveAvatarSrc(avatar) {
  if (!avatar) return "/avatars/default.webp";
  if (avatar.startsWith("http")) return avatar;
  return `/avatars/${avatar}.png`;
}

export default function Profile() {
  const { user } = useAuth();

  // Always call hook (safe)
  const profileReq = useAsync(async () => {
    if (!user?._id) return null;
    const res = await api.get(endpoints.users.getProfile(user._id));
    return res.data?.data;
  }, [user?._id]);

  if (profileReq.loading) {
    return <Loading label="LOADING PROFILE..." />;
  }

  if (profileReq.error) {
    return <ErrorState message={profileReq.error} onRetry={profileReq.run} />;
  }

  const profile = profileReq.data;

  if (!profile) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-slate-600 dark:text-slate-300">
          Profile not found.
        </div>
      </div>
    );
  }

  const avatarSrc = resolveAvatarSrc(profile.avatar);

  return (
    <div className="space-y-6">
      <Card className="p-6" data-aos="fade-up">
        <div className="font-arcade text-xs tracking-widest text-primary-500">
          PROFILE
        </div>

        <div className="mt-6 flex items-center gap-6">
          {/* Avatar */}
          <img
            src={avatarSrc}
            alt="User Avatar"
            className="h-24 w-24 rounded-2xl object-cover border border-light-border dark:border-dark-border shadow-gaming"
            onError={(e) => {
              e.currentTarget.src = "/avatars/default.webp";
            }}
          />

          {/* User Info */}
          <div>
            <div className="text-xl font-semibold">{profile.username}</div>

            <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {profile.email}
            </div>

            {profile.rank && (
              <div className="mt-2 text-xs text-primary-500 font-arcade tracking-widest">
                RANK: {profile.rank}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={profileReq.run} className="hover:shadow-neon">
            REFRESH
          </Button>
        </div>
      </Card>
    </div>
  );
}
