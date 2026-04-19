import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // Retornamos el objeto con toda la data necesaria para los callbacks
        return {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          role: user.role,
          slug: user.slug,
          templateId: user.templateId, 
        };
      }
    })
  ],

  // =====================================================
  // CONFIGURACIÓN DE COOKIES (Estilo SaaS / Sitrack)
  // =====================================================
  cookies: {
    sessionToken: {
      // Si en el futuro separas por subdominios, aquí puedes cambiar el nombre
      name: process.env.NODE_ENV === "production" ? `__Secure-mendoclick.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/', // Alcance global para que funcione en / y en /invit
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.slug = user.slug;
        token.id = user.id;
        token.templateId = user.templateId;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.slug = token.slug;
        session.user.id = token.id;
        session.user.templateId = token.templateId;
      }
      return session;
    }
  },

  // =====================================================
  // PÁGINAS Y ESTRATEGIA
  // =====================================================
  pages: { 
    signIn: "/login",
    error: "/auth/error", // Es bueno tener una página de error
  },
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días de sesión activa
  },
  secret: process.env.NEXTAUTH_SECRET,
};