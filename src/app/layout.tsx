import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "¡MendoClick! | Invitación Digital",
  description: "Te invito a celebrar conmigo mis XV años",
  icons: {
    icon: "/logo.webp",
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