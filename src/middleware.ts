

export const config = {
  matcher: ["/manager/:path*", "/admin/:path*"],
};
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Si llegamos acá, es porque authorized devolvió true (hay sesión)
    return NextResponse.next();
  },
  {
    callbacks: {
      // ESTO ES LO IMPORTANTE: Si hay cualquier token (sesión), lo deja pasar
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
