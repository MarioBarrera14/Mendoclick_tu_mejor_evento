"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GalleryService, UserService } from "@/services";
import { revalidatePath } from "next/cache";

// ===========================================
// ACCIONES DE GALERÍA
// ===========================================

/**
 * Sube una imagen a la galería
 */
export async function uploadImage(file: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const result = await GalleryService.uploadImage(file);

    if (result.success) {
      revalidatePath("/admin/galeria");
    }

    return result;
  } catch (error) {
    console.error("Error en uploadImage:", error);
    return { success: false, error: "Error al subir la imagen" };
  }
}

/**
 * Elimina una imagen de la galería
 */
export async function deleteImage(publicId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const result = await GalleryService.deleteImage(publicId);

    if (result.success) {
      revalidatePath("/admin/galeria");
    }

    return result;
  } catch (error) {
    console.error("Error en deleteImage:", error);
    return { success: false, error: "Error al eliminar la imagen" };
  }
}

/**
 * Obtiene las imágenes del carrusel
 */
export async function getCarouselImages() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return [];

    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) return [];

    return await GalleryService.getCarouselImages(usuario.id);
  } catch (error) {
    console.error("Error en getCarouselImages:", error);
    return [];
  }
}

/**
 * Actualiza las imágenes del carrusel
 */
export async function updateCarouselImages(images: string[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const result = await GalleryService.updateCarouselImages(usuario.id, images);

    if (result.success) {
      revalidatePath("/admin/galeria");
      if (usuario.slug) {
        revalidatePath(`/invit/${usuario.slug}`);
      }
    }

    return result;
  } catch (error) {
    console.error("Error en updateCarouselImages:", error);
    return { success: false, error: "Error al actualizar el carrusel" };
  }
}

/**
 * Agrega una imagen al carrusel
 */
export async function addImageToCarousel(imageUrl: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const usuario = await UserService.findByEmail(session.user.email);
    if (!usuario) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const result = await GalleryService.addImageToCarousel(usuario.id, imageUrl);

    if (result.success) {
      revalidatePath("/admin/galeria");
      if (usuario.slug) {
        revalidatePath(`/invit/${usuario.slug}`);
      }
    }

    return result;
  } catch (error) {
    console.error("Error en addImageToCarousel:", error);
    return { success: false, error: "Error al agregar imagen" };
  }
}
