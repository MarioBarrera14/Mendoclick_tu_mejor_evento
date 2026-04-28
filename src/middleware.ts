import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 1. PROTECCIÓN INMEDIATA PARA MANAGER (MARIO)
    if (path.startsWith("/manager")) {
      // Si no hay token, al login de manager de una
      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      // Si hay token pero NO es ADMIN, lo sacamos al home
      if (token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // 2. PROTECCIÓN PARA PANEL DE CLIENTES
    if (path.startsWith("/admin")) {
      // Si no hay token, al login de clientes
      if (!token) {
        return NextResponse.redirect(new URL("/client-login", req.url));
      }
      // Aquí entran ADMIN y CLIENT, así que no filtramos por rol
    }

    // 3. REDIRECCIÓN SI YA ESTÁ LOGUEADO (Para no ver el formulario de login otra vez)
    if (!!token) {
      if (path === "/login" || path === "/client-login") {
        const destination = token.role === "ADMIN" ? "/manager/dashboard" : "/admin";
        return NextResponse.redirect(new URL(destination, req.url));
      }
    }

    return NextResponse.next();
  },
 {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

const isPublic = 
  path === "/" ||
  path === "/login" ||
  path === "/client-login" ||
  path.startsWith("/invit") ||
  path.startsWith("/demo") ||
  path.startsWith("/images") || // Carpeta public/images
  path.startsWith("/img_boda") || // Carpeta public/img_boda
  path.startsWith("/img_demo") || // Carpeta public/img_demo
  path.startsWith("/audio") ||    // Carpeta public/audio
  path.startsWith("/assets");

        if (isPublic) return true;

        // Solo pide token para lo que NO sea público (manager, admin, etc.)
        return !!token;
      },
    },
    pages: {
      signIn: "/client-login",
    },
  }
);

// middleware.ts
export const config = {
  matcher: [
   "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.webp|assets|images|img_boda|img_demo|audio|login|client-login|invit|demo|$).*)",
  ],
};