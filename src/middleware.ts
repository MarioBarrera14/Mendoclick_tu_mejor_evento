import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. EXCEPCIÓN PARA INVITADOS (Check-in público)
    if (path.startsWith("/admin/check-in/")) {
      return NextResponse.next();
    }

    // 2. REGLA DE ORO PARA EL MANAGER (ADMIN)
    if (path.startsWith("/manager")) {
      if (!token || token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // 3. REGLA PARA EL PANEL DE CLIENTES
    if (path.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/client-login", req.url));
      }
    }

    // 4. SI YA ESTÁ LOGUEADO Y VA A LOS LOGINS
    if (!!token && (path === "/login" || path === "/client-login")) {
      const dest = token.role === "ADMIN" ? "/manager/dashboard" : "/admin";
      return NextResponse.redirect(new URL(dest, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Rutas que no requieren NINGUNA sesión (Públicas)
        const isPublic = 
          path === "/" ||
          path === "/login" ||
          path === "/client-login" ||
          path.startsWith("/check-in/") ||
          path.startsWith("/api/check-in") ||
          path.startsWith("/api/guests") || // Importante para RSVP
          path.startsWith("/invit") ||
          path.startsWith("/demo") ||
          path.startsWith("/images") ||
          path.startsWith("/img-rock") ||
          path.startsWith("/img_boda") ||
          path.startsWith("/img_demo") || // <--- AGREGADO PARA LAS IMÁGENES HARCODEADAS
          path.startsWith("/audio") ||
          path.startsWith("/assets");

        if (isPublic) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  // Se agregaron las extensiones de imagen comunes para evitar que el middleware las bloquee
  matcher: [
    "/((?!api/auth|api/check-in|_next/static|_next/image|favicon.ico|logo.webp|neobar.webp|assets|images|img_boda|img_demo|img-rock|audio|login|client-login|invit|demo|$).*)",
  ],
};