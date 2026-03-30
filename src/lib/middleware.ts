import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isManagerPath = req.nextUrl.pathname.startsWith("/manager");

    // Si intenta entrar a /manager (tu panel) pero NO es ADMIN, lo mandamos al inicio
    if (isManagerPath && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/users/loginManager",
    },
  }
);

// Protegemos tanto tu panel de Manager como el Admin del Cliente
export const config = {
  matcher: ["/manager/:path*", "/admin/:path*"], 
};