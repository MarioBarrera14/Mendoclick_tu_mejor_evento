"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";

/**
 * Función auxiliar optimizada para extraer el public_id completo.
 * Si la URL es: .../upload/v1777691608/boda/fotos/al.jpg
 * Retorna: "boda/fotos/al"
 */
function extractPublicId(url: string) {
  try {
    // Dividimos la URL por '/'
    const parts = url.split('/');
    // Buscamos dónde empieza 'upload'
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Cloudinary tiene la estructura: /upload/vXXXXXXXX/public_id
    // Saltamos 'upload' (index) y la versión (index + 1)
    // El resto es el Public ID con carpetas y extensión
    const remainder = parts.slice(uploadIndex + 2).join('/');
    
    // Quitamos la extensión (.jpg, .png, etc.) pero mantenemos las carpetas
    return remainder.split('.')[0];
  } catch (error) {
    console.error("Error al extraer publicId:", error);
    return null;
  }
}

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

    // ===========================================================
    // LÓGICA DE BORRADO FÍSICO EN CLOUDINARY
    // ===========================================================
    if (data.deletePhysicalFiles && data.previousFiles) {
      const urlsToDelete = data.previousFiles.filter((url: any) => typeof url === 'string');
      
      // Ejecutamos el borrado. Usamos map sin async/await interno para disparar todas
      const deleteResults = await Promise.all(urlsToDelete.map(async (url: string) => {
        const publicId = extractPublicId(url);
        if (publicId) {
          // Llamamos a la función que ya tiene el 'invalidate: true'
          return await deleteFromCloudinary(publicId);
        }
        return null;
      }));
      
      // Log para debug en Vercel
      console.log("Resultados de borrado en Cloudinary:", deleteResults);
    }

    // ===========================================================
    // ACTUALIZACIÓN EN BASE DE DATOS
    // ===========================================================
    const result = await prisma.eventConfig.update({
      where: { userId: dbUser.id },
      data: {
        heroImage: data.heroImage,
        videoUrl: data.videoUrl,
        musicUrl: data.musicUrl,
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