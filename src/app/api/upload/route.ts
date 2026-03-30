import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No hay archivo' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. DETERMINAMOS LA CARPETA SEGÚN EL TIPO MIME
    let folder = 'boda/fotos'; // Por defecto fotos

    if (file.type.includes('video')) {
      folder = 'boda/videos';
    } else if (file.type.includes('audio') || file.name.endsWith('.mp3')) {
      folder = 'boda/musica'; // Nueva carpeta para los audios de la invitación
    }

    // 2. SUBIMOS A CLOUDINARY
    // Nota: Cloudinary maneja internamente si es 'image', 'video' o 'raw' (audio)
    const result = await uploadToCloudinary(
      buffer,
      file.name,
      folder,
      file.type 
    );

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error('Error en API Upload:', error);
    return NextResponse.json({ error: 'Error al procesar subida' }, { status: 500 });
  }
}