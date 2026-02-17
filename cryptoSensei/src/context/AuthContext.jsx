import { createContext, useContext, useState, useEffect } from "react";
import {
  authAPI,
  saveAuthToken,
  removeAuthToken,
  getAuthToken,
} from "../utils/api";
import { STORAGE_KEYS } from "../utils/constants";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = getAuthToken();

      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token and get user data
      const response = await authAPI.getMe();

      if (response.success) {
        setUser(response.data);
        localStorage.setItem(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.data),
        );
      } else {
        removeAuthToken();
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      removeAuthToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authAPI.register(userData);

      if (response.success) {
        saveAuthToken(response.token);
        setUser(response.user);
        localStorage.setItem(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.user),
        );
        return { success: true, user: response.user };
      }

      return { success: false, message: response.message };
    } catch (err) {
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authAPI.login(credentials);

      if (response.success) {
        saveAuthToken(response.token);
        setUser(response.user);
        localStorage.setItem(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.user),
        );
        return { success: true, user: response.user };
      }

      return { success: false, message: response.message };
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      removeAuthToken();
      setUser(null);
      setError(null);
    }
  };

  const updateUser = (userData) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...userData };
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.success) {
        setUser(response.data);
        localStorage.setItem(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.data),
        );
      }
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    refreshUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
