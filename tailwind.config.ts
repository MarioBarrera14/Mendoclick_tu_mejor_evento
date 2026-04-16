import type { Config } from "tailwindcss";

const config: Config = {
  // Habilitamos modo oscuro por clase
  darkMode: ["class"],
  
  // Rutas donde Tailwind debe buscar clases
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    // Configuración de contenedores responsivos
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",   // 16px de margen en celulares
        sm: "2rem",
        lg: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      // Fuentes personalizadas para MendoClick
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        script: ['Pinyon Script', 'cursive'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      // Animaciones para efectos de entrada
      animation: {
        'marquee-infinite': 'marquee-infinite 35s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'marquee-infinite': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      // Colores del sistema
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        rose: {
          500: "#f43f5e",
          600: "#e11d48",
        },
        gold: {
          400: "#f5e1a4",
          500: "#b4a178",
        }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;