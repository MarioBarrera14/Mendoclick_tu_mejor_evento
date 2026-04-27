import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Si intenta entrar a /manager o /admin y NO es ADMIN, lo mandamos al login
    const isRestrictedPath = path.startsWith("/manager") || path.startsWith("/admin");
    
    if (isRestrictedPath && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      // authorized debe devolver true si hay un token válido
      authorized: ({ token }) => !!token,
    },
    pages: {
      // ESTA ES LA RUTA A LA QUE REDIRIGE AUTOMÁTICAMENTE
      signIn: "/login", 
    },
  }
);

export const config = {
  matcher: ["/manager/:path*", "/admin/:path*"],
};
