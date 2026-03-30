import { v2 as cloudinary } from 'cloudinary';

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
  
  const base64File = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  
  // MODIFICACIÓN AQUÍ:
  // Cloudinary usa 'video' tanto para videos como para archivos de audio (mp3, wav, etc.)
  let resourceType = 'image';
  if (mimeType.includes('video') || mimeType.includes('audio')) {
    resourceType = 'video';
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      file: base64File,
      folder: folder,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || 'ml_default', 
      resource_type: resourceType, 
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Detalle error Cloudinary:", result);
    throw new Error(result.error?.message || 'Error en Cloudinary');
  }

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}