/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Gaming-inspired color palette
        dark: {
          bg: "#0A0E27",
          surface: "#141B34",
          elevated: "#1E2749",
          border: "#2D3561",
        },
        light: {
          bg: "#F5F7FA",
          surface: "#FFFFFF",
          elevated: "#F0F2F5",
          border: "#E1E4E8",
        },
        primary: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
        neon: {
          cyan: "#00F0FF",
          purple: "#C471FF",
          pink: "#FF00E5",
          yellow: "#FFE600",
          green: "#00FF85",
        },
        rank: {
          e: "#8B7355",
          d: "#7F8C8D",
          c: "#52B788",
          b: "#3498DB",
          a: "#9B59B6",
          s: "#F39C12",
          national: "#E74C3C",
          monarch: "#FFD700",
        },
      },
      fontFamily: {
        gaming: ["Orbitron", "sans-serif"],
        pixel: ["Press Start 2P", "cursive"],
        tech: ["Rajdhani", "sans-serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        "slide-in": "slideIn 0.3s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            boxShadow:
              "0 0 5px rgba(0, 240, 255, 0.5), 0 0 10px rgba(0, 240, 255, 0.3)",
          },
          "100%": {
            boxShadow:
              "0 0 20px rgba(0, 240, 255, 0.8), 0 0 30px rgba(0, 240, 255, 0.5)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gaming": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-neon": "linear-gradient(135deg, #00F0FF 0%, #C471FF 100%)",
      },
      boxShadow: {
        neon: '0 0 5px theme("colors.neon.cyan"), 0 0 20px theme("colors.neon.cyan")',
        "neon-purple":
          '0 0 5px theme("colors.neon.purple"), 0 0 20px theme("colors.neon.purple")',
        gaming: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
    },
  },
  plugins: [],
};
