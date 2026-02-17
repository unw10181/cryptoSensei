import { createContext, useContext, useState, useEffect } from "react";
import { STORAGE_KEYS, THEMES } from "../utils/constants";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // Default to dark theme for gaming aesthetic

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);

    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    }
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
  };

  const setLightTheme = () => {
    setTheme("light");
    applyTheme("light");
    localStorage.setItem(STORAGE_KEYS.THEME, "light");
  };

  const setDarkTheme = () => {
    setTheme("dark");
    applyTheme("dark");
    localStorage.setItem(STORAGE_KEYS.THEME, "dark");
  };

  const value = {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    themeConfig: THEMES[theme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
