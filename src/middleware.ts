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
          path.startsWith("/api/guests") || 
          path.startsWith("/invit") ||
          path.startsWith("/demo") ||
          path.startsWith("/images") ||
          path.startsWith("/img-rock") ||
          path.startsWith("/img_boda") ||
          path.startsWith("/img_demo") || 
          path.startsWith("/audio") ||
          path.startsWith("/assets") ||
          path.endsWith(".webp") || // <--- PERMITIR CUALQUIER WEBP
          path.endsWith(".png") ||  // <--- PERMITIR CUALQUIER PNG
          path.endsWith(".jpg");    // <--- PERMITIR CUALQUIER JPG

        if (isPublic) return true;
        return !!token;
      },
    },
  }
);

// CONFIGURACIÓN DEL MATCHER REPARADA
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth)
     * - api/check-in (Public API)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo.webp, neobar.webp (specific files)
     * - Extensiones: .webp, .jpg, .png, .mp3
     */
    "/((?!api/auth|api/check-in|_next/static|_next/image|favicon.ico|logo.webp|neobar.webp|assets|images|img_boda|img_demo|img-rock|audio|login|client-login|invit|demo|.*\\.(?:webp|jpg|png|mp3)$|$).*)",
  ],
};