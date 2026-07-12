/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Backgrounds ──────────────────────────────────────
        bg:       "#05071A",        // deep navy-black canvas
        sidebar:  "#080C20",        // slightly cooler sidebar
        surface:  "#0E1428",        // card / panel surface
        elevated: "#141930",        // modals, popovers
        // ── Borders ──────────────────────────────────────────
        border:   "#1D2340",        // default border
        "border-subtle": "#13192F", // very faint dividers
        // ── Text ─────────────────────────────────────────────
        muted:    "#64748B",        // secondary text
        subtle:   "#3A4468",        // placeholder / disabled
        // ── Semantic colours ─────────────────────────────────
        accent: {
          DEFAULT: "#4F73FF",       // vivid indigo-blue
          light:   "#6B8BFF",
          soft:    "rgba(79,115,255,0.12)",
          glow:    "rgba(79,115,255,0.25)",
        },
        success:  "#10B981",        // Emerald
        warning:  "#F59E0B",        // Amber
        danger:   "#EF4444",        // Red
        // ── Legacy aliases (keep backward compat) ────────────
        card:     "#0E1428",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs:     "6px",
        sm:     "8px",
        btn:    "10px",
        input:  "10px",
        card:   "14px",
        dialog: "18px",
        xl:     "16px",
        "2xl":  "20px",
      },
      spacing: {
        4.5:  "18px",
        13:   "52px",
        18:   "72px",
      },
      fontSize: {
        "2xs": ["10px", "14px"],
      },
      transitionDuration: {
        250: "250ms",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          "0%":   { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideInRight: {
          "0%":   { opacity: 0, transform: "translateX(-16px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideDown: {
          "0%":   { opacity: 0, transform: "translateY(-8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%":      { opacity: 0.45 },
        },
        progressFill: {
          "0%":   { width: "0%" },
          "100%": { width: "var(--bar-width)" },
        },
        scaleIn: {
          "0%":   { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn:       "fadeIn 200ms ease-out",
        slideUp:      "slideUp 300ms ease-out",
        slideInRight: "slideInRight 250ms ease-out",
        slideDown:    "slideDown 200ms ease-out",
        shimmer:      "shimmer 1.4s linear infinite",
        pulseSoft:    "pulseSoft 2.5s ease-in-out infinite",
        progressFill: "progressFill 800ms ease-out forwards",
        scaleIn:      "scaleIn 200ms ease-out",
      },
      boxShadow: {
        card:        "0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)",
        "card-hover":"0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)",
        glow:        "0 0 24px rgba(79,115,255,0.18)",
        "glow-sm":   "0 0 12px rgba(79,115,255,0.14)",
        elevated:    "0 20px 60px rgba(0,0,0,0.6)",
        modal:       "0 24px 80px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};
