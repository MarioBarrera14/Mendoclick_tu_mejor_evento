import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // <--- Importamos desde la nueva ubicación

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };