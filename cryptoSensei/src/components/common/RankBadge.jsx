import { motion } from "framer-motion";
import { Crown, Zap, Shield, Star } from "lucide-react";
import { RANKS } from "../../utils/constants";

const RankBadge = ({
  rank,
  size = "md",
  showProgress = false,
  currentXP = 0,
  className = "",
}) => {
  // Get rank info
  const rankKeys = Object.keys(RANKS);
  const currentRankIndex = rankKeys.findIndex(
    (key) => RANKS[key].name === rank,
  );
  const currentRankData = RANKS[rankKeys[currentRankIndex]] || RANKS.E;
  const nextRankData = RANKS[rankKeys[currentRankIndex + 1]] || currentRankData;

  // Calculate progress to next rank
  const xpInCurrentRank = currentXP - currentRankData.minXP;
  const xpNeededForNext = nextRankData.minXP - currentRankData.minXP;
  const progress =
    nextRankData === currentRankData
      ? 100
      : (xpInCurrentRank / xpNeededForNext) * 100;

  const sizes = {
    xs: "w-8 h-8 text-xs",
    sm: "w-12 h-12 text-sm",
    md: "w-16 h-16 text-base",
    lg: "w-24 h-24 text-xl",
    xl: "w-32 h-32 text-2xl",
  };

  const getRankIcon = () => {
    if (rank?.includes("Monarch")) return Crown;
    if (rank?.includes("National")) return Star;
    if (rank?.includes("S-Rank")) return Zap;
    return Shield;
  };

  const RankIcon = getRankIcon();

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {/* Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="relative"
      >
        {/* Glow Effect */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 20px ${currentRankData.color}40`,
              `0 0 40px ${currentRankData.color}60`,
              `0 0 20px ${currentRankData.color}40`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`
            ${sizes[size]}
            rounded-full
            flex items-center justify-center
            font-gaming font-bold
            border-4
            relative overflow-hidden
          `}
          style={{
            borderColor: currentRankData.color,
            background: `linear-gradient(135deg, ${currentRankData.color}40, ${currentRankData.color}20)`,
          }}
        >
          {/* Animated Background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20"
            style={{
              background: `conic-gradient(from 0deg, ${currentRankData.color}, transparent, ${currentRankData.color})`,
            }}
          />

          {/* Icon or Text */}
          <div className="relative z-10 flex items-center justify-center">
            {size === "xs" || size === "sm" ? (
              <RankIcon
                className="w-1/2 h-1/2"
                style={{ color: currentRankData.color }}
              />
            ) : (
              <span style={{ color: currentRankData.color }}>
                {rank?.split("-")[0] || "E"}
              </span>
            )}
          </div>

          {/* Shine Effect */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          />
        </motion.div>

        {/* Floating Particles */}
        {(size === "lg" || size === "xl") && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: currentRankData.color,
                  top: "50%",
                  left: `${30 + i * 20}%`,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Rank Name */}
      {(size === "md" || size === "lg" || size === "xl") && (
        <div className="text-center">
          <motion.h4
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-gaming text-sm text-white uppercase tracking-wider"
            style={{ textShadow: `0 0 10px ${currentRankData.color}` }}
          >
            {rank}
          </motion.h4>

          {showProgress && (
            <p className="text-xs text-gray-400 font-tech mt-1">
              {currentXP.toLocaleString()} /{" "}
              {nextRankData.minXP.toLocaleString()} XP
            </p>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {showProgress && nextRankData !== currentRankData && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xs"
        >
          <div className="relative h-2 bg-dark-elevated rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${currentRankData.color}, ${nextRankData.color})`,
                boxShadow: `0 0 10px ${currentRankData.color}`,
              }}
            />
          </div>

          {/* Next Rank Preview */}
          <div className="flex items-center justify-between mt-2 text-xs font-tech">
            <span className="text-gray-400">Next: {nextRankData.name}</span>
            <span style={{ color: nextRankData.color }}>
              {(nextRankData.minXP - currentXP).toLocaleString()} XP to go
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RankBadge;
