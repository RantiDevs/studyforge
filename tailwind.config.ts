import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#06080f", card: "#0f1219", hover: "#161b27", elevated: "#1c2235" },
        accent: { DEFAULT: "#7c3aed", light: "#a78bfa", dim: "#6d28d9", glow: "#8b5cf6" },
        cyber: { DEFAULT: "#06b6d4", light: "#22d3ee", dim: "#0891b2" },
        neon: { DEFAULT: "#f472b6", light: "#f9a8d4", hot: "#ec4899" },
        success: { DEFAULT: "#10b981", light: "#34d399", dim: "#059669" },
        warn: { DEFAULT: "#f59e0b", light: "#fbbf24", dim: "#d97706" },
        danger: { DEFAULT: "#ef4444", light: "#f87171" },
        txt: { DEFAULT: "#e2e8f0", muted: "#94a3b8", dim: "#475569" },
        gold: "#fbbf24",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-1": "radial-gradient(at 20% 80%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(6,182,212,0.1) 0%, transparent 50%)",
        "mesh-2": "radial-gradient(at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 60%), radial-gradient(at 100% 100%, rgba(244,114,182,0.12) 0%, transparent 50%)",
      },
      boxShadow: {
        "glow-sm": "0 0 15px -3px rgba(124,58,237,0.3)",
        "glow-md": "0 0 30px -5px rgba(124,58,237,0.4)",
        "glow-cyber": "0 0 20px -3px rgba(6,182,212,0.3)",
        "glow-neon": "0 0 20px -3px rgba(244,114,182,0.3)",
        "3d": "0 20px 40px -15px rgba(0,0,0,0.5), 0 8px 16px -8px rgba(0,0,0,0.3)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16,1,0.3,1)",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "flip-in": "flipIn 0.5s cubic-bezier(0.16,1,0.3,1)",
        "xp-fly": "xpFly 1.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "badge-pop": "badgePop 0.6s cubic-bezier(0.34,1.56,0.64,1)",
        "spin-slow": "spin 8s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "orbit": "orbit 20s linear infinite",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0", transform: "translateY(12px) scale(0.98)" }, to: { opacity: "1", transform: "translateY(0) scale(1)" } },
        slideUp: { from: { opacity: "0", transform: "translateY(30px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseGlow: { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "1" } },
        shimmer: { from: { backgroundPosition: "-200% center" }, to: { backgroundPosition: "200% center" } },
        flipIn: { from: { transform: "rotateY(90deg) scale(0.9)", opacity: "0" }, to: { transform: "rotateY(0) scale(1)", opacity: "1" } },
        xpFly: { "0%": { opacity: "1", transform: "translateY(0) scale(1)" }, "50%": { opacity: "1", transform: "translateY(-20px) scale(1.3)" }, "100%": { opacity: "0", transform: "translateY(-50px) scale(0.8)" } },
        badgePop: { "0%": { transform: "scale(0) rotate(-12deg)" }, "60%": { transform: "scale(1.2) rotate(3deg)" }, "100%": { transform: "scale(1) rotate(0)" } },
        gradientShift: { "0%, 100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        orbit: { from: { transform: "rotate(0deg) translateX(150px) rotate(0deg)" }, to: { transform: "rotate(360deg) translateX(150px) rotate(-360deg)" } },
      },
      perspective: {
        "1000": "1000px",
      },
    },
  },
  plugins: [],
};
export default config;
