import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Award, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { SOLO_LEVELING_AVATARS } from "../components/auth/AvatarSelector";

function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);

  const currentAvatar = SOLO_LEVELING_AVATARS.find(
    (a) => a.id === user?.avatar,
  );

  return (
    <div className="min-h-screen bg-grid-pattern pb-20">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-gamer text-gradient mb-8 text-center">
          PROFILE
        </h1>

        <div className="game-card p-8 rounded-xl">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{currentAvatar?.icon || "👤"}</div>
            <h2 className="text-3xl font-title mb-2">{user?.username}</h2>
            <p className="text-gamer-accent font-title">{user?.rank}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gamer-bg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-title">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-gamer-bg">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Total XP</p>
                <p className="font-title text-yellow-400">
                  {user?.totalXP || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-gamer-bg">
              <Award className="w-5 h-5 text-purple-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Hunter Avatar</p>
                <p className="font-title">{currentAvatar?.name || "Unknown"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
