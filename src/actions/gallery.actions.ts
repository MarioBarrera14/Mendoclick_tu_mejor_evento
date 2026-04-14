"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getGalleryConfig() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    return await prisma.eventConfig.findFirst({
      where: { user: { email: session.user.email } },
      select: {
        heroImage: true,
        videoUrl: true,
        musicUrl: true,
        carruselImages: true,
      }
    });
  } catch (error) {
    console.error("Error al obtener galería:", error);
    return null;
  }
}

export async function updateGalleryConfig(data: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No autorizado" };

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser) return { success: false, error: "Usuario no encontrado" };

    const result = await prisma.eventConfig.update({
      where: { userId: dbUser.id },
      data: {
        heroImage: data.heroImage,
        videoUrl: data.videoUrl,
        musicUrl: data.musicUrl,
        // Mandamos el array directo al campo Json
        carruselImages: data.carruselImages, 
      },
    });

    revalidatePath("/admin/galeria");
    if (dbUser.slug) {
      revalidatePath(`/invit/${dbUser.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error al guardar galería:", error);
    return { success: false, error: "Fallo en la base de datos." };
  }
}