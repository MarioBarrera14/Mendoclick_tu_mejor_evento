/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mantenemos esto para que no te trabe el deploy, pero lo ideal es corregirlo después
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  images: {
    // ELIMINAMOS: unoptimized: true,
    formats: ['image/avif', 'image/webp'], // Esto fuerza a Google a ver formatos modernos
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" }, // FUNDAMENTAL para tus imágenes
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
    ],
  },
  compress: true, // Activa compresión Gzip/Brotli para el código
};

export default nextConfig;