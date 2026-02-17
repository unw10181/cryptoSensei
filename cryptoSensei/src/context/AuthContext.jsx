import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";

const AuthContext = createContext(null);

function safeJsonParse(v) {
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    safeJsonParse(localStorage.getItem("cs_user")),
  );
  const [token, setToken] = useState(() => localStorage.getItem("cs_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If token exists, try /auth/me to validate session
    const boot = async () => {
      try {
        if (!token) return;
        const res = await api.get(endpoints.auth.me);
        // your backend returns {success, data:user} for /me
        const me = res.data?.data;
        if (me) {
          localStorage.setItem("cs_user", JSON.stringify(me));
          setUser(me);
        }
      } catch {
        // token invalid
        localStorage.removeItem("cs_token");
        localStorage.removeItem("cs_user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    boot();
    if (!token) setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const res = await api.post(endpoints.auth.login, { email, password });
      persist(res.data.token, res.data.user);
      toast.success("SYSTEM: Access Granted.", { id: t });
      return res.data.user;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Login failed", { id: t });
      throw e;
    }
  };

  const register = async (username, email, password) => {
    const t = toast.loading("SYSTEM: Creating account...");
    try {
      const res = await api.post(endpoints.auth.register, {
        username,
        email,
        password,
      });
      persist(res.data.token, res.data.user);
      toast.success("SYSTEM: Account Created.", { id: t });
      return res.data.user;
    } catch (e) {
      toast.error(e?.response?.data?.message || "Register failed", { id: t });
      throw e;
    }
  };

  const logout = async () => {
    // optional call to backend
    try {
      await api.post(endpoints.auth.logout);
    } catch {}
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
