import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. EXCEPCIÓN PARA INVITADOS (Check-in público)
    // Permitimos que accedan a /admin/check-in/[id] sin estar logueados
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
      // Aquí permitimos ADMIN y CLIENT
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
        
        // Rutas que no requieren NINGUNA sesión
        const isPublic = 
          path === "/" ||
          path === "/login" ||
          path === "/client-login" ||
          path.startsWith("/admin/check-in/") || // Permitir la página de check-in
          path.startsWith("/api/check-in") ||    // Permitir la llamada a la API
          path.startsWith("/invit") ||
          path.startsWith("/demo") ||
          path.startsWith("/images") ||
          path.startsWith("/img_boda") ||
          path.startsWith("/img_demo") ||
          path.startsWith("/audio") ||
          path.startsWith("/assets");

        if (isPublic) return true;
        
        // Forzamos que exista un token para cualquier otra ruta (protegidas)
        return !!token;
      },
    },
  }
);

export const config = {
  // El matcher define qué rutas procesa este middleware.
  // Se excluyen archivos estáticos, logos y las rutas públicas críticas.
  matcher: [
    "/((?!api/auth|api/check-in|_next/static|_next/image|favicon.ico|logo.webp|assets|images|img_boda|img_demo|audio|login|client-login|invit|demo|$).*)",
  ],
};