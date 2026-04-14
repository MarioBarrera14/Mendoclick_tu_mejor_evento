import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export class GalleryService {
  /**
   * Sube un archivo a Cloudinary
   */
  static async uploadFile(buffer: Buffer, fileName: string, mimeType: string) {
    try {
      let folder = 'boda/fotos';
      if (mimeType.includes('video')) folder = 'boda/videos';
      if (mimeType.includes('audio') || fileName.endsWith('.mp3')) folder = 'boda/musica';

      const base64Image = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64Image}`;

      const result = await cloudinary.uploader.upload(dataUrl, {
        folder: folder,
        resource_type: "auto",
      });

      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      console.error("Error REAL de Cloudinary:", error);
      throw error; 
    }
  }

  /**
   * Obtiene las imágenes del carrusel (Maneja tipo Json)
   */
  static async getCarouselImages(userId: string): Promise<string[]> {
    try {
      const config = await prisma.eventConfig.findUnique({
        where: { userId },
        select: { carruselImages: true },
      });

      if (!config?.carruselImages) return [];

      // Si por alguna razón quedó como string, lo parseamos; sino va directo
      return typeof config.carruselImages === "string" 
        ? JSON.parse(config.carruselImages) 
        : (config.carruselImages as string[]);
    } catch (error) {
      console.error("Error en getCarouselImages:", error);
      return [];
    }
  }
}