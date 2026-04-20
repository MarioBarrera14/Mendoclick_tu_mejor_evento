import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "¡MendoClick! | Invitación Digital",
  description: "Te invito a celebrar conmigo este momento tan especial.",
  icons: {
    icon: "/logo.webp",
  },
  // Configuración para que el link se vea pro en WhatsApp y Redes Sociales
  openGraph: {
    title: "¡MendoClick! | Invitación Digital",
    description: "Te invito a celebrar conmigo mis XV años. ¡No faltes!",
    url: "https://www.mendoclick.com.ar",
    siteName: "MendoClick",
    images: [
      {
        url: "/logo.webp", // Asegurate de que esta imagen esté en la carpeta /public
        width: 800,
        height: 600,
        alt: "Logo MendoClick",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  // Opcional: Configuración para Twitter/X
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
      <body className="antialiased">
        <Providers>
          <ClientBody>{children}</ClientBody>
        </Providers>
      </body>
    </html>
  );
}