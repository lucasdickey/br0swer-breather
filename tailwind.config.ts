import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
    },
  },
  plugins: [],
};

export default config;
