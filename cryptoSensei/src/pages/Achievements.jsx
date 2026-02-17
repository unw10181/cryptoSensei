import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Lock, Check } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Achievements() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/achievements/user-progress",
      );
      setAchievements(response.data.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier) => {
    const colors = {
      bronze: "from-orange-600 to-yellow-600",
      silver: "from-gray-400 to-gray-600",
      gold: "from-yellow-400 to-yellow-600",
      legendary: "from-purple-500 to-pink-500",
    };
    return colors[tier] || colors.bronze;
  };

  return (
    <div className="min-h-screen bg-grid-pattern pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-gamer text-gradient mb-8 text-center">
          ACHIEVEMENTS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`game-card p-6 rounded-xl ${achievement.isUnlocked ? "border-2 border-gamer-accent" : "opacity-60"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${getTierColor(achievement.tier)}`}
                >
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                {achievement.isUnlocked ? (
                  <Check className="w-6 h-6 text-green-400" />
                ) : (
                  <Lock className="w-6 h-6 text-gray-600" />
                )}
              </div>

              <h3 className="text-xl font-title mb-2">{achievement.name}</h3>
              <p className="text-sm text-gray-400 mb-3">
                {achievement.description}
              </p>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {achievement.animeCharacter}
                </span>
                <span className="text-yellow-400">
                  +{achievement.xpReward} XP
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
