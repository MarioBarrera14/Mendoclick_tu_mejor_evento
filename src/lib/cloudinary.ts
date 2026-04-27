import { v2 as cloudinary } from 'cloudinary';

// Configuración con limpieza de espacios en blanco
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export async function uploadToCloudinary(
  fileBuffer: Buffer, 
  fileName: string, 
  folder: string,
  mimeType: string 
): Promise<{ url: string; publicId: string }> {
  
  try {
    // Convertimos el buffer a un formato que el SDK de Cloudinary entiende (Data URI)
    const base64File = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;

    // Usamos el uploader del SDK directamente
    const result = await cloudinary.uploader.upload(base64File, {
      folder: folder,
      // 'auto' detecta automáticamente si es imagen, video, audio o raw (PDF, etc.)
      resource_type: "auto", 
      // Opcional: puedes usar el fileName original si lo deseas
      public_id: fileName.split('.')[0], 
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };

  } catch (error: any) {
    // Esto imprimirá el error real en tu terminal de VS Code para debuguear
    console.error("Detalle error Cloudinary SDK:", error);
    
    throw new Error(
      error.message || 'Error en la subida a Cloudinary'
    );
  }
}