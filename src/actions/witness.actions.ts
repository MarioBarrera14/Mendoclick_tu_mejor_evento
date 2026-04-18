"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Obtiene los testigos asociados a la configuración de evento del usuario actual
 */
export async function getWitnesses() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return [];

    const config = await prisma.eventConfig.findFirst({
      where: { user: { email: session.user.email } },
      include: { witnesses: true }
    });

    return config?.witnesses || [];
  } catch (error) {
    console.error("Error en getWitnesses:", error);
    return [];
  }
}

/**
 * Sincroniza la lista de testigos (Borra los anteriores y crea los nuevos)
 */
export async function updateWitnesses(witnesses: any[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No hay sesión activa" };

    const usuario = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { eventConfig: true }
    });

    // Validación de seguridad para evitar errores de null
    const configId = usuario?.eventConfig?.id;
    if (!configId) {
      return { success: false, error: "No se encontró configuración de evento" };
    }

    // Filtramos testigos vacíos
    const cleanWitnesses = witnesses.filter(w => w.nombre && w.nombre.trim() !== "");

    // Transacción para asegurar que no perdamos datos si algo falla
    await prisma.$transaction([
      prisma.witness.deleteMany({ 
        where: { eventConfigId: configId } 
      }),
      prisma.witness.createMany({
        data: cleanWitnesses.map(w => ({
          nombre: w.nombre,
          rol: w.rol,
          imageUrl: w.imageUrl || "",
          eventConfigId: configId
        }))
      })
    ]);

    revalidatePath("/admin/testigos");
    return { success: true };
  } catch (error) {
    console.error("Error en updateWitnesses:", error);
    return { success: false, error: "Error al guardar los testigos" };
  }
}

/**
 * Elimina un testigo individual por su ID
 */
export async function deleteWitnessAction(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No autorizado" };

    await prisma.witness.delete({
      where: { id }
    });

    revalidatePath("/admin/testigos");
    return { success: true };
  } catch (error) {
    console.error("Error en deleteWitnessAction:", error);
    return { success: false, error: "No se pudo eliminar el testigo" };
  }
}