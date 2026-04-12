import { NextResponse } from "next/server";
import { EventService } from "@/services/event.service";
import { revalidatePath } from "next/cache"; // <--- IMPORTANTE

export async function POST(req: Request) {
  try {
    const { userId, witnesses } = await req.json();
    if (!userId || !witnesses) return NextResponse.json({ error: "Faltan datos" }, { status: 400 });

    const result = await EventService.updateWitnesses(userId, witnesses);

    if (result.success) {
      // Revalidamos las rutas para que el dashboard y la invitación se actualicen
      revalidatePath("/admin/testigos"); 
      revalidatePath("/admin/dashboard");
      // Si tienes el slug, podrías revalidar la invitación pública aquí también
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}