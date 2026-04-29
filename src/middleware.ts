import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. REGLA DE ORO PARA EL MANAGER (MARIO)
    if (path.startsWith("/manager")) {
      // Si no hay token o el rol NO es ADMIN, lo mandamos al login de manager
      if (!token || token.role !== "ADMIN") {
        const url = new URL("/login", req.url);
        // Opcional: limpiar la sesión si no es admin para evitar bucles
        return NextResponse.redirect(url);
      }
    }

    // 2. REGLA PARA EL PANEL DE CLIENTES
    if (path.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/client-login", req.url));
      }
      // Aquí permitimos ADMIN y CLIENT
    }

    // 3. SI YA ESTÁ LOGUEADO Y VA A LOS LOGINS
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
        
        // Rutas públicas
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
          path.startsWith("/assets");

        if (isPublic) return true;
        
        // Forzamos que exista un token para cualquier otra ruta
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.webp|assets|images|img_boda|img_demo|audio|login|client-login|invit|demo|$).*)",
  ],
};