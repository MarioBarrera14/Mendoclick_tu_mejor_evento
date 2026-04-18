/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // ¡Agregué esto! Es obligatorio para que Tailwind funcione
  },
};

export default config;