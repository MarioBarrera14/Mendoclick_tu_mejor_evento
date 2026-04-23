import type { Metadata, Viewport } from "next";
import { Montserrat, Pinyon_Script, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Providers } from "./providers";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const pinyonScript = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-pinyon", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cormorant", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#33aba1",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MendoClick | Invitaciones Digitales Inteligentes en Mendoza",
  description: "Creamos invitaciones digitales interactivas para bodas, 15 años y eventos. Confirmación RSVP, Google Maps y cuenta regresiva. ¡Hacé tu evento único en Mendoza!",
  keywords: ["invitaciones digitales", "Mendoza", "boda", "15 años", "RSVP online", "tarjetas interactivas", "MendoClick"],
  authors: [{ name: "MendoClick" }],
  metadataBase: new URL("https://www.mendoclick.com.ar"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.webp",
  },
  openGraph: {
    title: "MendoClick | Invitaciones Digitales que Sorprenden",
    description: "Invitaciones interactivas con confirmación de asistencia, ubicación y música. El futuro de tu evento empieza acá.",
    url: "https://www.mendoclick.com.ar",
    siteName: "MendoClick Invitaciones",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "MendoClick Invitaciones Digitales Mendoza",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MendoClick | Invitaciones Digitales",
    description: "Tarjetas interactivas para eventos en Mendoza.",
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "uRgIFXOvPYEe8vFL-5Wlm6vqEE7MkgbrBRzUGpHvC-Y",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${pinyonScript.variable} ${cormorant.variable} antialiased`}>
        <Providers>
          <ClientBody>{children}</ClientBody>
        </Providers>
      </body>
    </html>
  );
}
