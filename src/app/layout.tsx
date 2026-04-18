import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Providers } from "./providers"; // <--- 1. Importa el Provider

export const metadata: Metadata = {
  title: "¡MendoClick! | Invitación Digital",
  description: "Te invito a celebrar conmigo mis XV años",
  // AGREGAMOS ESTA SECCIÓN:
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        {/* 2. Envolvemos ClientBody y children con Providers */}
        <Providers>
          <ClientBody>{children}</ClientBody>
        </Providers>
      </body>
    </html>
  );
}