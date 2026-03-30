import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CONFIG } from "@/constants";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class GalleryService {
  /**
   * Sube una imagen a Cloudinary
   */
  static async uploadImage(
    file: string, // Base64 o URL
    folder: string = CLOUDINARY_CONFIG.FOLDER
  ): Promise<{ success: boolean; url?: string; publicId?: string; error?: string }> {
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: "auto",
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      console.error("Error en GalleryService.uploadImage:", error);
      return { success: false, error: "Error al subir la imagen." };
    }
  }

  /**
   * Elimina una imagen de Cloudinary
   */
  static async deleteImage(publicId: string): Promise<{ success: boolean }> {
    try {
      await cloudinary.uploader.destroy(publicId);
      return { success: true };
    } catch (error) {
      console.error("Error en GalleryService.deleteImage:", error);
      return { success: false };
    }
  }

  /**
   * Obtiene las imágenes del carrusel de un evento
   */
  static async getCarouselImages(userId: string): Promise<string[]> {
    try {
      const config = await prisma.eventConfig.findUnique({
        where: { userId },
        select: { carruselImages: true },
      });

      if (!config?.carruselImages) return [];

      return JSON.parse(config.carruselImages);
    } catch (error) {
      console.error("Error en GalleryService.getCarouselImages:", error);
      return [];
    }
  }

  /**
   * Actualiza las imágenes del carrusel
   */
  static async updateCarouselImages(userId: string, images: string[]): Promise<{ success: boolean }> {
    try {
      await prisma.eventConfig.update({
        where: { userId },
        data: { carruselImages: JSON.stringify(images) },
      });
      return { success: true };
    } catch (error) {
      console.error("Error en GalleryService.updateCarouselImages:", error);
      return { success: false };
    }
  }

  /**
   * Agrega una imagen al carrusel
   */
  static async addImageToCarousel(userId: string, imageUrl: string): Promise<{ success: boolean }> {
    try {
      const currentImages = await this.getCarouselImages(userId);
      const updatedImages = [...currentImages, imageUrl];
      return await this.updateCarouselImages(userId, updatedImages);
    } catch (error) {
      console.error("Error en GalleryService.addImageToCarousel:", error);
      return { success: false };
    }
  }

  /**
   * Elimina una imagen del carrusel
   */
  static async removeImageFromCarousel(userId: string, imageUrl: string): Promise<{ success: boolean }> {
    try {
      const currentImages = await this.getCarouselImages(userId);
      const updatedImages = currentImages.filter((img) => img !== imageUrl);
      return await this.updateCarouselImages(userId, updatedImages);
    } catch (error) {
      console.error("Error en GalleryService.removeImageFromCarousel:", error);
      return { success: false };
    }
  }
}
