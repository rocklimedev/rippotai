import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Tailwind is scoped to the admin console and future landing pages ONLY.
 * The public site (src/app/(site), src/components/site, src/components/sections)
 * keeps its hand-written CSS in src/styles/site.css and is deliberately NOT in `content`.
 * Preflight is also limited to the admin root layout, because admin.css is imported
 * only by src/app/(admin)/layout.tsx (a separate root layout).
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/(admin)/**/*.{ts,tsx}",
    "./src/app/(landing)/**/*.{ts,tsx}",
    "./src/components/ui/**/*.{ts,tsx}",
    "./src/components/admin/**/*.{ts,tsx}",
    "./src/components/landing/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1320px" } },
    extend: {
      fontFamily: {
        sans: ["Lato", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        gold: "hsl(var(--gold))",
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [animate],
};

export default config;
