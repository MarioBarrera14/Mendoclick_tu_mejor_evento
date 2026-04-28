import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirección si ya está logueado e intenta ir al login
    if (path === "/login" && !!token) {
      return NextResponse.redirect(new URL("/manager/dashboard", req.url));
    }

    // Protección de rutas de gestión por ROL (Solo ADMIN entra a /manager o /admin)
    if ((path.startsWith("/manager") || path.startsWith("/admin")) && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        // La página de login debe ser pública para que puedan loguearse
        if (path === "/login") return true;
        // El resto de las rutas capturadas por el matcher requieren sesión
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Matcher definitivo para MendoClick:
     * Excluye de la protección (son públicos):
     * - api/auth, státicos de Next, favicon, logo, assets, login e invitaciones.
     * - La raíz (/) mediante el símbolo $
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.webp|assets|login|invit|$).*)",
  ],
};