import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Si llegamos acá es porque tiene sesión.
    // Simplemente dejamos que continúe a la ruta pedida.
    return NextResponse.next();
  },
  {
    callbacks: {
      // Mientras exista un token (sesión activa), lo deja pasar.
      // Quitamos el check de ADMIN momentáneamente para que puedas entrar.
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
