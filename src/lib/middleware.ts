import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isManagerPath = req.nextUrl.pathname.startsWith("/manager");

    // Solo protegemos el panel si no es ADMIN
    if (isManagerPath && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/users/loginManager", req.url));
    }
  },
  {
    callbacks: {
      // Solo pedimos sesión para las rutas del MATCHER
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/users/loginManager",
    },
  }
);

// IMPORTANTE: Aquí NO debe estar "/invit/:path*" para que sea pública
export const config = {
  matcher: ["/manager/:path*", "/admin/:path*"], 
};