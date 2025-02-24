import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        breathing: {
          primary: "#2B4570", // Deep blue
          secondary: "#A5D8FF", // Light blue
          accent: "#48CAE4", // Bright blue
          neutral: "#E9ECEF", // Light gray
          dark: "#212529", // Dark gray for text
        },
      },
      animation: {
        "breathe-in": "breathe-in 4s ease-in-out",
        "breathe-out": "breathe-out 4s ease-in-out",
        hold: "hold 4s ease-in-out",
        celebration: "celebration 0.5s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
        ping: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "breathe-in": {
          "0%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },
        "breathe-out": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.5)" },
        },
        hold: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        celebration: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95) translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
