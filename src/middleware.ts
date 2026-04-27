import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Si hay sesión, lo dejamos pasar
    return NextResponse.next();
  },
  {
    callbacks: {
      // Solo verifica que exista un token (sesión activa)
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
