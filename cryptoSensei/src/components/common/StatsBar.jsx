import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatCurrency, formatPercentage } from "../../utils/formatters";

const StatsCard = ({
  title,
  value,
  change,
  changeType = "percentage", // 'percentage' or 'currency'
  icon: Icon,
  color = "cyan",
  index = 0,
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  const colorClasses = {
    cyan: "from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan",
    purple: "from-neon-purple/20 to-neon-purple/5 border-neon-purple",
    green: "from-neon-green/20 to-neon-green/5 border-neon-green",
    pink: "from-neon-pink/20 to-neon-pink/5 border-neon-pink",
    yellow: "from-neon-yellow/20 to-neon-yellow/5 border-neon-yellow",
  };

  const iconColors = {
    cyan: "text-neon-cyan",
    purple: "text-neon-purple",
    green: "text-neon-green",
    pink: "text-neon-pink",
    yellow: "text-neon-yellow",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-br ${colorClasses[color]}
        border-2 backdrop-blur-sm
        p-6 transition-all duration-300
      `}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-${color} rounded-full blur-3xl`}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-tech text-gray-400 uppercase tracking-wider mb-1">
              {title}
            </p>
            <h3 className="text-3xl font-gaming text-white font-bold">
              {typeof value === "number" ? formatCurrency(value) : value}
            </h3>
          </div>

          {Icon && (
            <div
              className={`
              p-3 rounded-lg bg-dark-elevated/50
              ${iconColors[color]}
            `}
            >
              <Icon className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Change Indicator */}
        {change !== undefined && change !== null && (
          <div className="flex items-center gap-2">
            {isPositive && (
              <>
                <TrendingUp className="w-4 h-4 text-neon-green" />
                <span className="text-sm font-tech text-neon-green">
                  +
                  {changeType === "percentage"
                    ? formatPercentage(change)
                    : formatCurrency(change)}
                </span>
              </>
            )}
            {isNegative && (
              <>
                <TrendingDown className="w-4 h-4 text-neon-pink" />
                <span className="text-sm font-tech text-neon-pink">
                  {changeType === "percentage"
                    ? formatPercentage(change)
                    : formatCurrency(change)}
                </span>
              </>
            )}
            {isNeutral && (
              <>
                <Minus className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-tech text-gray-500">
                  No change
                </span>
              </>
            )}
            <span className="text-xs text-gray-500 ml-auto">24h</span>
          </div>
        )}

        {/* Animated Progress Bar */}
        {change !== undefined && change !== null && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
            className="mt-4 h-1 bg-dark-elevated rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.abs(change), 100)}%` }}
              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
              className={`h-full ${
                isPositive
                  ? "bg-neon-green"
                  : isNegative
                    ? "bg-neon-pink"
                    : "bg-gray-500"
              }`}
            />
          </motion.div>
        )}
      </div>

      {/* Corner Decoration */}
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className={iconColors[color]}>
          <circle cx="70" cy="70" r="30" fill="currentColor" />
        </svg>
      </div>
    </motion.div>
  );
};

export default StatsCard;
