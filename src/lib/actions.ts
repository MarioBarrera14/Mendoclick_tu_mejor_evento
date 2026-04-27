"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * FUNCIÓN AUXILIAR DE SEGURIDAD
 * Verifica si el usuario actual es un Administrador.
 */
async function validateAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("No autorizado: Se requieren permisos de administrador.");
  }
  return session;
}

// ==========================================
// 1. GESTIÓN DE ADMINS
// ==========================================

export async function registerUser(data: any) {
  const { nombre, email, password, masterCode } = data;

  if (masterCode !== "MENDO_2026_PRO") {
    return { error: "Código Maestro inválido." };
  }

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return { error: "El email ya está registrado." };

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        role: "ADMIN",
        slug: `admin-${Math.random().toString(36).substring(7)}`, 
      }
    });

    return { success: true };
  } catch (e) {
    return { error: "Error al crear la cuenta de administrador." };
  }
}

// ==========================================
// 2. GESTIÓN DE CLIENTES (ACCIONES PROTEGIDAS)
// ==========================================

export async function getClients() {
  try {
    await validateAdminSession(); // <--- BLOQUEO DE SEGURIDAD
    
    const clients = await prisma.user.findMany({
      where: { role: "USER" },
      orderBy: { createdAt: "desc" }
    });
    return clients;
  } catch (error) {
    console.error("Intento de acceso no autorizado a getClients");
    return [];
  }
}

export async function registerClient(formData: any) {
  try {
    await validateAdminSession(); // <--- BLOQUEO DE SEGURIDAD
    
    const { email, password, slug, templateId, masterCode } = formData;
    if (masterCode !== "MENDO_2026_PRO") return { error: "Código Maestro inválido." };

    const existing = await prisma.user.findFirst({ 
      where: { OR: [{ email }, { slug }] } 
    });
    if (existing) return { error: "El email o el link (slug) ya están en uso." };

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        nombre: slug.toUpperCase().replace(/-/g, ' '), 
        email,
        password: hashedPassword,
        slug,
        templateId,
        role: "USER",
        eventConfig: { create: { eventName: "", eventDate: "2026-12-19" } }
      }
    });
    
    revalidatePath("/manager/clientes");
    return { success: true };
  } catch (e) {
    return { error: "No autorizado o error de servidor." };
  }
}

export async function updateClientAction(id: string, data: any) {
  try {
    await validateAdminSession(); // <--- BLOQUEO DE SEGURIDAD
    
    await prisma.user.update({
      where: { id },
      data: {
        nombre: data.nombre,
        email: data.email,
        slug: data.slug,
        templateId: data.templateId,
      }
    });

    revalidatePath("/manager/clientes");
    return { success: true };
  } catch (error) {
    return { success: false, error: "No autorizado." };
  }
}

export async function deleteClientAction(id: string) {
  try {
    await validateAdminSession(); // <--- BLOQUEO DE SEGURIDAD
    
    await prisma.user.delete({ where: { id } });
    revalidatePath("/manager/clientes");
    return { success: true };
  } catch (error) {
    return { success: false, error: "No autorizado." };
  }
}

// ==========================================
// 3. MULTIMEDIA (PARA EL CLIENTE LOGUEADO)
// ==========================================

export async function getEventConfig() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    return await prisma.eventConfig.findFirst({
      where: { user: { email: session.user.email } }
    });
  } catch (error) { return null; }
}

export async function updateEventDetails(data: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false };

    const usuario = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!usuario) return { success: false };

    await prisma.eventConfig.upsert({
      where: { userId: usuario.id },
      update: {
        heroImage: data.heroImage,
        videoUrl: data.videoUrl,
        musicUrl: data.musicUrl,
        carruselImages: data.carruselImages,
      },
      create: {
        userId: usuario.id,
        heroImage: data.heroImage || "",
        videoUrl: data.videoUrl || "",
        musicUrl: data.musicUrl || "",
        carruselImages: data.carruselImages || "[]",
      },
    });

    revalidatePath("/admin/galeria");
    if (usuario.slug) revalidatePath(`/inv/${usuario.slug}`);
    
    return { success: true };
  } catch (error) { return { success: false }; }
}
