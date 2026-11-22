import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0b0d13", card: "#13161f", hover: "#1a1e2a" },
        accent: { DEFAULT: "#6366f1", light: "#818cf8", dim: "#4f46e5" },
        success: "#22c55e",
        warn: "#f59e0b",
        danger: "#ef4444",
        txt: { DEFAULT: "#e2e8f0", muted: "#94a3b8", dim: "#64748b" },
      },
    },
  },
  plugins: [],
};
export default config;
