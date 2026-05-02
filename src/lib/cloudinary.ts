import { v2 as cloudinary } from 'cloudinary';

// Configuración con limpieza de espacios en blanco
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

/**
 * Sube un archivo a Cloudinary
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer, 
  fileName: string, 
  folder: string,
  mimeType: string 
): Promise<{ url: string; publicId: string }> {
  try {
    const base64File = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(base64File, {
      folder: folder,
      resource_type: "auto", // Para subir, "auto" funciona perfecto
      public_id: fileName.split('.')[0], 
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error: any) {
    console.error("Detalle error Cloudinary SDK:", error);
    throw new Error(error.message || 'Error en la subida a Cloudinary');
  }
}

/**
 * Borra un archivo físicamente de Cloudinary
 * CORRECCIÓN: Se eliminó 'auto' y se agregó 'invalidate'
 */
export async function deleteFromCloudinary(publicId: string) {
  try {
    // 1. Intentamos borrar como imagen (cubre jpg, png, webp, etc.)
    let result = await cloudinary.uploader.destroy(publicId, { 
      resource_type: "image", 
      invalidate: true // Esto limpia el link de internet inmediatamente
    });

    // 2. Si no se encontró como imagen (ej: era un mp3 o mp4), intentamos como video
    if (result.result === 'not found') {
      result = await cloudinary.uploader.destroy(publicId, { 
        resource_type: "video", 
        invalidate: true 
      });
    }

    console.log(`Resultado borrado para ${publicId}:`, result);
    return result;
  } catch (error) {
    console.error("Error al eliminar en Cloudinary:", error);
    return null;
  }
}