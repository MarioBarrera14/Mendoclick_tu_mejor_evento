import type { Metadata } from "next";
import { Montserrat, Pinyon_Script, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Providers } from "./providers";

// Configuración de fuentes optimizadas
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "¡MendoClick! | Invitación Digital",
  description: "Te invito a celebrar conmigo este momento tan especial.",
  icons: {
    icon: "/logo.webp",
  },
  openGraph: {
    title: "¡MendoClick! | Invitación Digital",
    description: "Te invito a celebrar conmigo mis XV años. ¡No faltes!",
    url: "https://www.mendoclick.com.ar",
    siteName: "MendoClick",
    images: [
      {
        url: "/logo.webp",
        width: 800,
        height: 600,
        alt: "Logo MendoClick",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¡MendoClick! | Invitación Digital",
    description: "Te invito a celebrar conmigo mis XV años",
    images: ["/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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