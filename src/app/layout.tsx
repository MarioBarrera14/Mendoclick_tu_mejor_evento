import type { Metadata, Viewport } from "next"; // Agregamos Viewport
import { Montserrat, Pinyon_Script, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Providers } from "./providers";

// 1. Montserrat es tu fuente de LCP (el título). 
// Al estar definida fuera del componente y con preload: true (default), Next.js la inyecta rápido.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap", // Mantiene el texto visible con fuente de sistema hasta que cargue
  adjustFontFallback: true,
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
  preload: false, // Las fuentes cursivas suelen usarse más abajo, podemos no precargarlas para ahorrar ancho de banda inicial
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"], // Reducimos pesos innecesarios para que el archivo sea más liviano
  variable: "--font-cormorant",
  display: "swap",
});

// Ayuda a Lighthouse con el tamaño de pantalla inicial
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Evita saltos de accesibilidad
};

export const metadata: Metadata = {
  // ... tu metadata actual está perfecta
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Agregamos la clase de la fuente principal al body directamente para evitar el "Flash of Unstyled Text" */}
      <body className={`${montserrat.variable} ${pinyonScript.variable} ${cormorant.variable} font-sans antialiased`}>
        <Providers>
          <ClientBody>{children}</ClientBody>
        </Providers>
      </body>
    </html>
  );
}