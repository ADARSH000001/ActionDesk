/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#020617",       // Slate 950 - background
        sidebar: "#0F172A",  // Slate 900 - sidebar
        card: "#1E293B",     // Slate 800 - cards
        border: "#334155",   // Slate 700 - borders
        accent: {
          DEFAULT: "#3B82F6", // Blue - primary accent
          soft: "rgba(59,130,246,0.12)",
        },
        success: "#10B981", // Emerald
        warning: "#F59E0B", // Amber
        danger: "#EF4444",  // Red
        muted: "#94A3B8",   // Slate 400 for secondary text
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
        input: "12px",
        dialog: "20px",
      },
      spacing: {
        4.5: "18px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out",
        slideUp: "slideUp 300ms ease-out",
        shimmer: "shimmer 1.4s linear infinite",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
        progressFill: "progressFill 800ms ease-out forwards",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
