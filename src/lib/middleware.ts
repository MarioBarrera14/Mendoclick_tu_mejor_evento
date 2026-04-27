import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Verificamos si la ruta es de gestión (Manager o Admin)
    const isRestrictedPath = path.startsWith("/manager") || path.startsWith("/admin");

    // 2. Si es una ruta restringida y el usuario NO es ADMIN, lo mandamos al login
    if (isRestrictedPath && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/users/loginManager", req.url));
    }
  },
  {
    callbacks: {
      // Si esta función retorna false, NextAuth redirige automáticamente al login
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/users/loginManager", // Tu página personalizada de login
    },
  }
);

// Configuración de las rutas que el middleware debe "escuchar"
export const config = {
  matcher: ["/manager/:path*", "/admin/:path*"],
};
