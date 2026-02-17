/**
 * Format a number as USD currency
 * @param {number} amount - The amount to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, decimals = 2) => {
  if (amount === null || amount === undefined || isNaN(amount)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

/**
 * Format a number with thousand separators
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "0";

  return new Intl.NumberFormat("en-US").format(num);
};

/**
 * Format a percentage with sign
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value)) return "0.00%";

  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Format a large number with abbreviations (K, M, B)
 * @param {number} num - The number to format
 * @returns {string} Abbreviated number string
 */
export const formatLargeNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "0";

  const absNum = Math.abs(num);

  if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  }
  if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  }
  if (absNum >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  }

  return num.toFixed(2);
};

/**
 * Format cryptocurrency amount
 * @param {number} amount - The crypto amount
 * @param {number} decimals - Number of decimal places (default: 8)
 * @returns {string} Formatted crypto amount
 */
export const formatCryptoAmount = (amount, decimals = 8) => {
  if (amount === null || amount === undefined || isNaN(amount)) return "0";

  // For very small amounts, use scientific notation
  if (amount > 0 && amount < 0.00000001) {
    return amount.toExponential(2);
  }

  // Remove trailing zeros
  return parseFloat(amount.toFixed(decimals)).toString();
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {string|Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
};

/**
 * Format date to readable format
 * @param {string|Date} date - The date to format
 * @param {boolean} includeTime - Include time in format (default: false)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) return "";

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return new Date(date).toLocaleDateString("en-US", options);
};

/**
 * Format XP with thousand separators
 * @param {number} xp - The XP amount
 * @returns {string} Formatted XP string
 */
export const formatXP = (xp) => {
  return `${formatNumber(xp)} XP`;
};

/**
 * Calculate profit/loss percentage
 * @param {number} current - Current value
 * @param {number} original - Original value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, original) => {
  if (!original || original === 0) return 0;
  return ((current - original) / original) * 100;
};

/**
 * Get color class based on value (positive/negative)
 * @param {number} value - The value to check
 * @returns {string} Tailwind color class
 */
export const getValueColorClass = (value) => {
  if (value > 0) return "text-neon-green";
  if (value < 0) return "text-neon-pink";
  return "text-gray-500";
};

/**
 * Format market cap
 * @param {number} marketCap - Market cap value
 * @returns {string} Formatted market cap
 */
export const formatMarketCap = (marketCap) => {
  return formatLargeNumber(marketCap);
};

/**
 * Truncate string with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncateString = (str, maxLength = 50) => {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength) + "...";
};

/**
 * Truncate wallet address for display
 * @param {string} address - Wallet address
 * @returns {string} Truncated address
 */
export const truncateAddress = (address) => {
  if (!address) return "";
  if (address.length <= 13) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Format transaction type
 * @param {string} type - Transaction type ('buy' or 'sell')
 * @returns {object} Formatted transaction info
 */
export const formatTransactionType = (type) => {
  const types = {
    buy: {
      label: "BUY",
      color: "text-neon-green",
      bgColor: "bg-green-500/10",
      borderColor: "border-neon-green",
    },
    sell: {
      label: "SELL",
      color: "text-neon-pink",
      bgColor: "bg-pink-500/10",
      borderColor: "border-neon-pink",
    },
  };

  return types[type] || types.buy;
};

/**
 * Get rank display info
 * @param {string} rank - Rank name
 * @returns {object} Rank display information
 */
export const getRankInfo = (rank) => {
  const ranks = {
    "E-Rank": { color: "#8B7355", label: "E", glow: "rgba(139, 115, 85, 0.3)" },
    "D-Rank": {
      color: "#7F8C8D",
      label: "D",
      glow: "rgba(127, 140, 141, 0.3)",
    },
    "C-Rank": { color: "#52B788", label: "C", glow: "rgba(82, 183, 136, 0.3)" },
    "B-Rank": { color: "#3498DB", label: "B", glow: "rgba(52, 152, 219, 0.3)" },
    "A-Rank": { color: "#9B59B6", label: "A", glow: "rgba(155, 89, 182, 0.3)" },
    "S-Rank": { color: "#F39C12", label: "S", glow: "rgba(243, 156, 18, 0.3)" },
    "National-Level": {
      color: "#E74C3C",
      label: "NL",
      glow: "rgba(231, 76, 60, 0.3)",
    },
    Monarch: { color: "#FFD700", label: "M", glow: "rgba(255, 215, 0, 0.5)" },
  };

  return ranks[rank] || ranks["E-Rank"];
};

/**
 * Calculate next rank progress
 * @param {number} currentXP - Current XP
 * @returns {object} Progress information
 */
export const calculateRankProgress = (currentXP) => {
  const thresholds = [
    { rank: "E-Rank", minXP: 0 },
    { rank: "D-Rank", minXP: 100 },
    { rank: "C-Rank", minXP: 500 },
    { rank: "B-Rank", minXP: 2000 },
    { rank: "A-Rank", minXP: 5000 },
    { rank: "S-Rank", minXP: 10000 },
    { rank: "National-Level", minXP: 20000 },
    { rank: "Monarch", minXP: 50000 },
  ];

  let currentRank = thresholds[0];
  let nextRank = thresholds[1];

  for (let i = 0; i < thresholds.length; i++) {
    if (currentXP >= thresholds[i].minXP) {
      currentRank = thresholds[i];
      nextRank = thresholds[i + 1] || thresholds[i]; // Max rank stays same
    }
  }

  const xpInCurrentRank = currentXP - currentRank.minXP;
  const xpNeededForNext = nextRank.minXP - currentRank.minXP;
  const progress =
    nextRank === currentRank ? 100 : (xpInCurrentRank / xpNeededForNext) * 100;

  return {
    currentRank: currentRank.rank,
    nextRank: nextRank.rank,
    currentXP,
    xpInCurrentRank,
    xpNeededForNext,
    xpToNextRank: nextRank.minXP - currentXP,
    progress: Math.min(progress, 100),
  };
};
