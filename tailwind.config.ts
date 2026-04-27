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
        // Mantenemos Montserrat para textos comunes
        sans: ["var(--font-montserrat)", "sans-serif"],
        
        // Esta es la que debes usar para "Luz Jazmín" (Cormorant)
        serif: ["var(--font-cormorant)", "serif"],
        graffiti: ["var(--font-graffiti)", "cursive"], // Agregamos esta línea
        // Puedes quitar 'script' si no quieres usar cursivas en ningún lado
        // o dejarla pero NO usar la clase 'font-script' en el Hero.
        elegante: ['var(--font-elegante)'],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        rose: { 500: "#f43f5e", 600: "#e11d48" },
        gold: { 400: "#f5e1a4", 500: "#b4a178" }
      },
      animation: {
        'marquee-infinite': 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;