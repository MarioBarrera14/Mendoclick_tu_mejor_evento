import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. Si ya tiene sesión y trata de entrar a los logins, sacarlo de ahí
    if ((path === "/login" || path === "/client-login") && !!token) {
      const target = token.role === "ADMIN" ? "/manager/dashboard" : "/admin";
      return NextResponse.redirect(new URL(target, req.url));
    }

    // 2. Proteger /manager (Solo ADMIN)
    if (path.startsWith("/manager") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 3. Proteger /admin (ADMIN y CLIENT entran)
    if (path.startsWith("/admin") && !token) {
       return NextResponse.redirect(new URL("/client-login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Rutas que no requieren nada
        if (
          path === "/" ||
          path === "/login" ||
          path === "/client-login" ||
          path.startsWith("/invit") ||
          path.startsWith("/images") ||
          path.startsWith("/audio") ||
          path.startsWith("/assets")
        ) return true;

        // Rutas que requieren sesión (cualquiera)
        return !!token;
      },
    },
    pages: {
      signIn: "/client-login", // <--- IGUAL AL AUTH OPTIONS
    },
  }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.webp|assets|images|audio|login|client-login|invit|$).*)",
  ],
};