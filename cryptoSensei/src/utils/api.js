import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "./constants";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER_DATA);
          window.location.href = "/login";
          break;
        case 403:
          console.error("Access forbidden:", data.message);
          break;
        case 404:
          console.error("Resource not found:", data.message);
          break;
        case 500:
          console.error("Server error:", data.message);
          break;
        default:
          console.error("API Error:", data.message);
      }

      return Promise.reject(data);
    } else if (error.request) {
      // Request made but no response
      console.error("Network error - no response received");
      return Promise.reject({
        success: false,
        message: "Network error. Please check your connection.",
      });
    } else {
      // Something else happened
      console.error("Error:", error.message);
      return Promise.reject({
        success: false,
        message: error.message,
      });
    }
  },
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },
};

// User API calls
export const userAPI = {
  getUserProfile: async (userId) => {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  },

  updateUserProfile: async (userId, userData) => {
    const response = await api.put(`/api/users/${userId}`, userData);
    return response.data;
  },

  getUserAchievements: async (userId) => {
    const response = await api.get(`/api/users/${userId}/achievements`);
    return response.data;
  },

  getUserStats: async (userId) => {
    const response = await api.get(`/api/users/${userId}/stats`);
    return response.data;
  },
};

// Portfolio API calls
export const portfolioAPI = {
  getPortfolios: async () => {
    const response = await api.get("/api/portfolios");
    return response.data;
  },

  createPortfolio: async (portfolioData) => {
    const response = await api.post("/api/portfolios", portfolioData);
    return response.data;
  },

  getPortfolio: async (portfolioId) => {
    const response = await api.get(`/api/portfolios/${portfolioId}`);
    return response.data;
  },

  updatePortfolio: async (portfolioId, portfolioData) => {
    const response = await api.put(
      `/api/portfolios/${portfolioId}`,
      portfolioData,
    );
    return response.data;
  },

  deletePortfolio: async (portfolioId) => {
    const response = await api.delete(`/api/portfolios/${portfolioId}`);
    return response.data;
  },

  getPortfolioPerformance: async (portfolioId) => {
    const response = await api.get(
      `/api/portfolios/${portfolioId}/performance`,
    );
    return response.data;
  },
};

// Transaction API calls
export const transactionAPI = {
  getTransactions: async (portfolioId) => {
    const response = await api.get(
      `/api/transactions/portfolio/${portfolioId}`,
    );
    return response.data;
  },

  createTransaction: async (transactionData) => {
    const response = await api.post("/api/transactions", transactionData);
    return response.data;
  },

  getAllUserTransactions: async () => {
    const response = await api.get("/api/transactions/user/all");
    return response.data;
  },

  deleteTransaction: async (transactionId) => {
    const response = await api.delete(`/api/transactions/${transactionId}`);
    return response.data;
  },
};

// Crypto API calls
export const cryptoAPI = {
  getCryptoPrices: async (page = 1, perPage = 20) => {
    const response = await api.get("/api/crypto/prices", {
      params: { page, perPage },
    });
    return response.data;
  },

  searchCrypto: async (query) => {
    const response = await api.get("/api/crypto/search", {
      params: { query },
    });
    return response.data;
  },

  getCoinPrice: async (coinId) => {
    const response = await api.get(`/api/crypto/price/${coinId}`);
    return response.data;
  },

  getCoinHistory: async (coinId, days = 7) => {
    const response = await api.get(`/api/crypto/history/${coinId}`, {
      params: { days },
    });
    return response.data;
  },

  getBatchPrices: async (coinIds) => {
    const response = await api.post("/api/crypto/batch-prices", { coinIds });
    return response.data;
  },
};

// Achievement API calls
export const achievementAPI = {
  getAllAchievements: async () => {
    const response = await api.get("/api/achievements");
    return response.data;
  },

  getAchievement: async (achievementId) => {
    const response = await api.get(`/api/achievements/${achievementId}`);
    return response.data;
  },

  triggerAchievementCheck: async () => {
    const response = await api.post("/api/achievements/check");
    return response.data;
  },

  getUserAchievementProgress: async () => {
    const response = await api.get("/api/achievements/user-progress");
    return response.data;
  },
};

// Helper function to save auth token
export const saveAuthToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

// Helper function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Helper function to remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

export default api;
