import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mpService } from '@/services/mp.service';

export async function POST(req: Request) {
  try {
    const { planName, price, userId } = await req.json();

    console.log("🚀 Iniciando checkout para el plan:", planName);

    // 1. Validar el userId antes de insertar. 
    // Si viene un string vacío ("") o undefined, lo convertimos a null.
    // Esto evita el error de Foreign Key Constraint.
    const validUserId = (userId && typeof userId === 'string' && userId.trim() !== "") 
      ? userId 
      : null;

const order = await prisma.order.create({
  data: {
    planName: planName,
    amount: Number(price),
    // CAMBIO ACÁ: Ignoramos lo que venga y ponemos null para testear
    userId: null, 
    status: 'PENDING'
  }
});
    // 3. Crear la preferencia en Mercado Pago
    console.log("URL DE RETORNO:", process.env.NEXT_PUBLIC_URL);
    // Pasamos el order.id como external_reference para el Webhook posterior
    const preference = await mpService.createPlanPreference(
      { name: planName, price: Number(price) }, 
      order.id 
    );

    // 4. Validar respuesta de MP
    if (!preference || !preference.id) {
      console.error("❌ Error: Mercado Pago no devolvió un ID");
      throw new Error("Mercado Pago no generó el ID de preferencia");
    }

    // 5. Vincular el ID de MP con nuestra orden de base de datos
    await prisma.order.update({
      where: { id: order.id },
      data: { mpPreferenceId: preference.id }
    });

    console.log("✅ Preferencia generada con éxito:", preference.id);

    // 6. Devolver el ID al frontend para la redirección
    return NextResponse.json({ id: preference.id });

  } catch (error: any) {
    // Si el error es de Prisma (P2003 es Foreign Key), damos un mensaje más claro
    if (error.code === 'P2003') {
      console.error("[CHECKOUT_ERROR]: El userId proporcionado no existe en la tabla users.");
      return NextResponse.json({ error: "Usuario no válido para la compra." }, { status: 400 });
    }

    console.error("[CHECKOUT_ERROR]:", error.message || error);
    return NextResponse.json({ error: "Error al procesar el pago", details: error.message }, { status: 500 });
  }
}