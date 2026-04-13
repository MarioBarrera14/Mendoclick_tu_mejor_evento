import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// FORZAMOS la configuración aquí mismo para que no haya duda
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export class GalleryService {
  static async uploadFile(buffer: Buffer, fileName: string, mimeType: string) {
    try {
      // 1. DETERMINAR CARPETA
      let folder = 'boda/fotos';
      if (mimeType.includes('video')) folder = 'boda/videos';
      if (mimeType.includes('audio') || fileName.endsWith('.mp3')) folder = 'boda/musica';

      // 2. CONVERTIR BUFFER A DATA URL (Esto es lo que Cloudinary digiere mejor)
      const base64Image = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64Image}`;

      // 3. SUBIDA (Sin enviar public_id para evitar errores de firma por caracteres raros)
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

  // Mantengo tus otras funciones de carrusel intactas
  static async getCarouselImages(userId: string): Promise<string[]> {
    try {
      const config = await prisma.eventConfig.findUnique({
        where: { userId },
        select: { carruselImages: true },
      });
      return config?.carruselImages ? JSON.parse(config.carruselImages) : [];
    } catch (error) {
      return [];
    }
  }
}