import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("cs_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rawUser = localStorage.getItem("cs_user");
    if (rawUser) setUser(JSON.parse(rawUser));
    setLoading(false);
  }, []);

  const persist = (nextToken, nextUser) => {
    localStorage.setItem("cs_token", nextToken);
    localStorage.setItem("cs_user", JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const login = async (email, password) => {
    const t = toast.loading("SYSTEM: Authenticating...");
    try {
      const res = await api.post("/auth/login", { email, password });
      persist(res.data.token, res.data.user);
      toast.success("SYSTEM: Access granted.", { id: t });
      return res.data.user;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed", { id: t });
      throw err;
    }
  };

  const register = async (username, email, password) => {
    const t = toast.loading("SYSTEM: Creating account...");
    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });
      persist(res.data.token, res.data.user);
      toast.success("SYSTEM: Account created.", { id: t });
      return res.data.user;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Register failed", { id: t });
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("cs_token");
    localStorage.removeItem("cs_user");
    setToken(null);
    setUser(null);
    toast("Logged out.");
  };

  const updateUser = (nextUser) => {
    localStorage.setItem("cs_user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout, updateUser }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
