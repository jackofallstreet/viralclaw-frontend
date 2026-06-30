import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        barlow: ["var(--font-barlow)", "sans-serif"],
        cond: ["var(--font-barlow-condensed)", "sans-serif"],
      },
      colors: {
        black: "#050505",
        carbon: "#0B0B0D",
        surface: "#121214",
        soft: "#18181B",
        crimson: "#C1121F",
        cyan: "#0891B2",
        "cyan-light": "#06B6D4",
        green: "#22C55E",
        amber: "#F59E0B",
        muted: "#A1A1AA",
        low: "#71717A",
        dim: "#3F3F46",
      },
    },
  },
  plugins: [],
};

export default config;
