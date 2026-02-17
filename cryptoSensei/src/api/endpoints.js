export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  users: {
    getProfile: (id) => `/users/${id}`,
    updateProfile: (id) => `/users/${id}`,
    achievements: (id) => `/users/${id}/achievements`,
    stats: (id) => `/users/${id}/stats`,
  },
  portfolios: {
    list: "/portfolios",
    one: (id) => `/portfolios/${id}`,
    performance: (id) => `/portfolios/${id}/performance`,
    create: "/portfolios",
  },
  transactions: {
    create: "/transactions",
    one: (id) => `/transactions/${id}`,
    byPortfolio: (portfolioId) => `/transactions/portfolio/${portfolioId}`,
    userAll: "/transactions/user/all",
  },
  crypto: {
    prices: "/crypto/prices",
    search: "/crypto/search",
    coinPrice: (coinId) => `/crypto/price/${coinId}`,
    history: (coinId) => `/crypto/history/${coinId}`,
    batch: "/crypto/batch-prices",
  },
  achievements: {
    all: "/achievements",
    one: (id) => `/achievements/${id}`,
    check: "/achievements/check",
    userProgress: "/achievements/user-progress",
  },
};
