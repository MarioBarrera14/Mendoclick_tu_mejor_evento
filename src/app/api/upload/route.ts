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

    // 1. DETERMINAMOS LA CARPETA (Tu lógica original)
    let folder = 'boda/fotos'; 

    if (file.type.includes('video')) {
      folder = 'boda/videos';
    } else if (file.type.includes('audio') || file.name.endsWith('.mp3')) {
      folder = 'boda/musica';
    }

    // 2. SUBIMOS A CLOUDINARY
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
  } catch (error: any) {
    console.error('Error en API Upload:', error);
    // Cambié el retorno para que veas el error real de Cloudinary en el cliente
    return NextResponse.json({ error: error.message || 'Error al procesar subida' }, { status: 500 });
  }
}