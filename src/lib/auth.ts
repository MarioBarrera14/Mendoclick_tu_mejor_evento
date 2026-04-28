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

        return {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          role: user.role, // ADMIN o CLIENT
          slug: user.slug,
          templateId: user.templateId, 
        };
      }
    })
  ],
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
  pages: { 
    signIn: "/login",
    error: "/login", 
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};