import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. PROTECCIÓN PARA RUTAS DE MANAGER (Mario)
    if (path.startsWith("/manager")) {
      // Si no hay token, al login de administrador de una
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // Si hay token pero NO es ADMIN, lo sacamos al home
      if (token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // 2. PROTECCIÓN PARA PANEL DE CLIENTES (Admin de Invitados)
    if (path.startsWith("/admin")) {
      // Si no hay token, al login de clientes
      if (!token) {
        return NextResponse.redirect(new URL("/client-login", req.url));
      }
      // Aquí permitimos ADMIN y CLIENT (por si vos querés entrar a ver sus paneles)
    }

    // 3. REDIRECCIÓN SI YA ESTÁN LOGUEADOS
    if (!!token) {
      if (path === "/login" || path === "/client-login") {
        const destination = token.role === "ADMIN" ? "/manager/dashboard" : "/admin";
        return NextResponse.redirect(new URL(destination, req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // DEFINIMOS RUTAS PÚBLICAS (No disparan redirección automática)
        const isPublic = 
          path === "/" ||
          path === "/login" ||
          path === "/client-login" ||
          path.startsWith("/invit") ||
          path.startsWith("/demo") ||
          path.startsWith("/images") ||
          path.startsWith("/img_boda") ||
          path.startsWith("/img_demo") ||
          path.startsWith("/audio") ||
          path.startsWith("/assets") ||
          path === "/logo.webp" ||
          path === "/favicon.ico";

        // Si es pública, permitimos. Si no, la función middleware de arriba decide.
        if (isPublic) return true;
        
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Por defecto, el sistema apunta a tu login
    },
  }
);

export const config = {
  matcher: [
    /*
     * MATCH DE EXCLUSIÓN: 
     * No tocar estáticos ni rutas públicas.
     * Agregamos tus carpetas de imágenes y audios para que se vean sin login.
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.webp|assets|images|img_boda|img_demo|audio|login|client-login|invit|demo|$).*)",
  ],
};