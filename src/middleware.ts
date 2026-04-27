import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // DEBUG: Si el token existe pero no es ADMIN, vamos a ver si nos deja pasar solo con token
    // Cambiamos temporalmente el check para que CUALQUIER logueado entre (solo para probar)
    if ((path.startsWith("/manager") || path.startsWith("/admin")) && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      // Mientras haya un token, NextAuth considera que estás autorizado para pasar el primer muro
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/manager/:path*", "/admin/:path*"],
};
