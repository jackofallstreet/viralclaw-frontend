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
        mono:  ["var(--font-mono)", "monospace"],
        cond:  ["var(--font-barlow-condensed)", "sans-serif"],
        sans:  ["var(--font-barlow)", "sans-serif"],
      },
      colors: {
        // Theme-aware via CSS vars — use these in Tailwind classes
        bg:      "var(--bg)",
        "bg-2":  "var(--bg-2)",
        "bg-3":  "var(--bg-3)",
        "bg-4":  "var(--bg-4)",
        text1:   "var(--text-1)",
        text2:   "var(--text-2)",
        text3:   "var(--text-3)",
        text4:   "var(--text-4)",
        accent:  "var(--accent)",
        teal:    "var(--teal)",
        green:   "var(--green)",
        amber:   "var(--amber)",
        purple:  "var(--purple)",
        border:  "var(--border)",
      },
    },
  },
  plugins: [],
};

export default config;
