// Rank system based on Solo Leveling
export const RANKS = {
  E: { name: "E-Rank", color: "#8B7355", minXP: 0, icon: "🪨" },
  D: { name: "D-Rank", color: "#7F8C8D", minXP: 100, icon: "⚔️" },
  C: { name: "C-Rank", color: "#52B788", minXP: 500, icon: "🛡️" },
  B: { name: "B-Rank", color: "#3498DB", minXP: 2000, icon: "💎" },
  A: { name: "A-Rank", color: "#9B59B6", minXP: 5000, icon: "⚡" },
  S: { name: "S-Rank", color: "#F39C12", minXP: 10000, icon: "👑" },
  NATIONAL: {
    name: "National-Level",
    color: "#E74C3C",
    minXP: 20000,
    icon: "🔥",
  },
  MONARCH: {
    name: "Shadow Monarch",
    color: "#FFD700",
    minXP: 50000,
    icon: "🌟",
  },
};

// Solo Leveling character avatars
export const AVATARS = [
  {
    id: "sung-jinwoo",
    name: "Sung Jin-Woo",
    image: "/avatars/jinwoo.png",
    rank: "Shadow Monarch",
    description: "The weakest hunter who became the strongest",
  },
  {
    id: "igris",
    name: "Igris",
    image: "/avatars/igris.png",
    rank: "Shadow Soldier",
    description: "The Blood-Red Commander",
  },
  {
    id: "beru",
    name: "Beru",
    image: "/avatars/beru.png",
    rank: "Shadow Ant",
    description: "The loyal ant warrior",
  },
  {
    id: "thomas-andre",
    name: "Thomas Andre",
    image: "/avatars/thomas.png",
    rank: "National-Level",
    description: "The Goliath of America",
  },
  {
    id: "cha-hae-in",
    name: "Cha Hae-In",
    image: "/avatars/cha.png",
    rank: "S-Rank",
    description: "The elegant blade master",
  },
  {
    id: "go-gunhee",
    name: "Go Gun-Hee",
    image: "/avatars/gunhee.png",
    rank: "National-Level",
    description: "The wise guild master",
  },
  {
    id: "antares",
    name: "Antares",
    image: "/avatars/antares.png",
    rank: "Monarch",
    description: "The Dragon King",
  },
  {
    id: "bellion",
    name: "Bellion",
    image: "/avatars/bellion.png",
    rank: "Shadow General",
    description: "The Grand-Marshal of Shadows",
  },
];

// Achievement tiers
export const ACHIEVEMENT_TIERS = {
  bronze: {
    name: "Bronze",
    color: "#CD7F32",
    glow: "rgba(205, 127, 50, 0.3)",
    icon: "🥉",
  },
  silver: {
    name: "Silver",
    color: "#C0C0C0",
    glow: "rgba(192, 192, 192, 0.3)",
    icon: "🥈",
  },
  gold: {
    name: "Gold",
    color: "#FFD700",
    glow: "rgba(255, 215, 0, 0.3)",
    icon: "🥇",
  },
  legendary: {
    name: "Legendary",
    color: "#FF00E5",
    glow: "rgba(255, 0, 229, 0.3)",
    icon: "💫",
  },
};

// Transaction type colors
export const TRANSACTION_TYPES = {
  buy: {
    color: "#00FF85",
    bgColor: "rgba(0, 255, 133, 0.1)",
    label: "BUY",
    icon: "📈",
  },
  sell: {
    color: "#FF00E5",
    bgColor: "rgba(255, 0, 229, 0.1)",
    label: "SELL",
    icon: "📉",
  },
};

// API endpoints
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  LOGOUT: "/api/auth/logout",
  GET_ME: "/api/auth/me",

  // Users
  GET_USER: (id) => `/api/users/${id}`,
  UPDATE_USER: (id) => `/api/users/${id}`,
  GET_USER_ACHIEVEMENTS: (id) => `/api/users/${id}/achievements`,
  GET_USER_STATS: (id) => `/api/users/${id}/stats`,

  // Portfolios
  GET_PORTFOLIOS: "/api/portfolios",
  CREATE_PORTFOLIO: "/api/portfolios",
  GET_PORTFOLIO: (id) => `/api/portfolios/${id}`,
  UPDATE_PORTFOLIO: (id) => `/api/portfolios/${id}`,
  DELETE_PORTFOLIO: (id) => `/api/portfolios/${id}`,
  GET_PORTFOLIO_PERFORMANCE: (id) => `/api/portfolios/${id}/performance`,

  // Transactions
  GET_TRANSACTIONS: (portfolioId) =>
    `/api/transactions/portfolio/${portfolioId}`,
  CREATE_TRANSACTION: "/api/transactions",
  GET_ALL_USER_TRANSACTIONS: "/api/transactions/user/all",
  DELETE_TRANSACTION: (id) => `/api/transactions/${id}`,

  // Crypto
  GET_CRYPTO_PRICES: "/api/crypto/prices",
  SEARCH_CRYPTO: "/api/crypto/search",
  GET_COIN_PRICE: (coinId) => `/api/crypto/price/${coinId}`,
  GET_COIN_HISTORY: (coinId) => `/api/crypto/history/${coinId}`,
  GET_BATCH_PRICES: "/api/crypto/batch-prices",

  // Achievements
  GET_ALL_ACHIEVEMENTS: "/api/achievements",
  GET_ACHIEVEMENT: (id) => `/api/achievements/${id}`,
  TRIGGER_ACHIEVEMENT_CHECK: "/api/achievements/check",
  GET_USER_ACHIEVEMENT_PROGRESS: "/api/achievements/user-progress",
};

// Theme configuration
export const THEMES = {
  light: {
    name: "Light Mode",
    icon: "☀️",
    className: "",
  },
  dark: {
    name: "Dark Mode",
    icon: "🌙",
    className: "dark",
  },
};

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "cryptosensei_token",
  USER_DATA: "cryptosensei_user",
  THEME: "cryptosensei_theme",
};

// Default portfolio starting cash
export const DEFAULT_PORTFOLIO_CASH = 10000;

// Pagination defaults
export const ITEMS_PER_PAGE = 20;

// Chart colors
export const CHART_COLORS = {
  profit: "#00FF85",
  loss: "#FF00E5",
  neutral: "#00F0FF",
  grid: "rgba(255, 255, 255, 0.1)",
};

// Status messages
export const STATUS_MESSAGES = {
  loading: "Loading your data...",
  error: "Something went wrong. Please try again.",
  success: "Operation successful!",
  noData: "No data available yet. Start trading to see results!",
  unauthorized: "Please log in to continue.",
  networkError: "Network error. Check your connection.",
};

// XP rewards
export const XP_REWARDS = {
  TRADE: 10,
  SELL: 15,
  FIRST_PORTFOLIO: 50,
  DAILY_LOGIN: 5,
};
