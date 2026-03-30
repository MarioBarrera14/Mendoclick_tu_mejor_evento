"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Asegúrate de que la ruta sea correcta

// 1. OBTENER CONFIGURACIÓN DEL EVENTO DEL USUARIO LOGUEADO
export async function getEventConfig() {
  try {
    const session = await getServerSession(authOptions);
    
    // Si no hay sesión o no hay email, no podemos buscar
    if (!session?.user?.email) return null;

    const config = await prisma.eventConfig.findFirst({
      where: {
        user: { email: session.user.email }
      }
    });

    return config;
  } catch (error) {
    console.error("Error al obtener config:", error);
    return null;
  }
}

// 2. ACTUALIZAR DETALLES DE MULTIMEDIA
export async function updateEventDetails(data: any) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    // Buscamos al usuario para obtener su ID real
    const usuario = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!usuario) return { success: false, error: "Usuario no encontrado" };

    // Usamos upsert basado en el userId (que es único)
    // Esto asegura que si el cliente no tiene config, la cree, y si tiene, la actualice.
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

    // Refrescamos tanto el panel como la invitación pública
    revalidatePath("/admin/galeria");
    if (usuario.slug) {
      revalidatePath(`/inv/${usuario.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error en updateEventDetails:", error);
    return { success: false, error: "Error de conexión con la base de datos" };
  }
}