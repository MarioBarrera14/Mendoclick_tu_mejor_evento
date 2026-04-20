import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Mapeo de variables CSS a clases de Tailwind
        sans: ["var(--font-montserrat)", "sans-serif"],
        script: ["var(--font-pinyon)", "cursive"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        rose: { 500: "#f43f5e", 600: "#e11d48" },
        gold: { 400: "#f5e1a4", 500: "#b4a178" }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;