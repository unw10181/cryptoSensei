/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Light
        "light-bg": "#F7F7FB",
        "light-surface": "#FFFFFF",
        "light-elevated": "#F1F2F8",
        "light-border": "#E3E5EF",

        // Dark
        "dark-bg": "#070A12",
        "dark-surface": "#0C1221",
        "dark-elevated": "#121A2E",
        "dark-border": "#22304F",

        // Neon accents
        primary: {
          500: "#00F0FF",
          600: "#00CFE0",
          700: "#00A9B6",
        },
        neon: {
          cyan: "#00F0FF",
          purple: "#C471FF",
          pink: "#FF00E5",
          yellow: "#FFE66D",
        },
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(0,240,255,0.55), 0 0 24px rgba(0,240,255,0.25)",
        gaming: "0 16px 40px rgba(0,0,0,0.25)",
      },
      fontFamily: {
        // Swap these later for a dafont font via @font-face in index.css
        gaming: ["'Press Start 2P'", "system-ui"],
        tech: ["Orbitron", "system-ui"],
        body: ["Rajdhani", "system-ui"],
      },
      backgroundImage: {
        "gradient-neon":
          "linear-gradient(90deg, rgba(0,240,255,1) 0%, rgba(196,113,255,1) 50%, rgba(255,0,229,1) 100%)",
      },
    },
  },
  plugins: [],
};
