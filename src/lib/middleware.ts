import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Si intenta entrar a gestión y no es ADMIN, rebote al login
    if ((path.startsWith("/manager") || path.startsWith("/admin")) && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/users/loginManager", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      // ESTA ES LA CLAVE: Aquí defines tu ruta de login personalizada
      signIn: "/users/loginManager", 
    },
  }
);

export const config = {
  matcher: ["/manager/:path*", "/admin/:path*"],
};
