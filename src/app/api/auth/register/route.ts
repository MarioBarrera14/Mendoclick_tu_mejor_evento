import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { nombre, email, password } = await req.json();

    if (!email || !password || !nombre) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generar slug único obligatorio para el modelo User
    const slug = `${nombre.toLowerCase().trim().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 6)}`;

    const user = await prisma.user.create({
      data: { 
        nombre, 
        email, 
        password: hashedPassword,
        slug: slug
      },
    });

    return NextResponse.json({ message: "Usuario creado con éxito" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}