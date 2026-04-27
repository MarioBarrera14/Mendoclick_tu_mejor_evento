import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Si intenta entrar a /manager o /admin y NO es ADMIN, lo mandamos al login
    if ((path.startsWith("/manager") || path.startsWith("/admin")) && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      // 2. CAMBIO CLAVE: Aquí es donde definimos la redirección automática
      signIn: "/login", 
    },
  }
);

export const config = {
  // 3. Rutas que el middleware va a vigilar
  matcher: ["/manager/:path*", "/admin/:path*"],
};
