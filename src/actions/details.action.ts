"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getEventDetails() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    return await prisma.eventConfig.findFirst({
      where: { user: { email: session.user.email } },
      select: {
        dressCode: true,
        dressDescription: true,
        cbu: true,
        alias: true,
        bankName: true,
        holderName: true,
      }
    });
  } catch (error) {
    console.error("Error al obtener detalles:", error);
    return null;
  }
}

// src/actions/details.action.ts

export async function updateEventDetails(formData: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, error: "No autorizado" };

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser) return { success: false, error: "Usuario no encontrado" };

    // Reparación: Si viene null o undefined, convertimos a "" 
    // para que Prisma no tire el error de "must not be null"
    const detailsData = {
      dressCode: formData.dressCode ?? "", 
      dressDescription: formData.dressDescription ?? "",
      cbu: formData.cbu ?? "",
      alias: formData.alias ?? "",
      bankName: formData.bankName ?? "",
      holderName: formData.holderName ?? "",
    };

    await prisma.eventConfig.upsert({
      where: { userId: dbUser.id },
      update: detailsData,
      create: { 
        ...detailsData,
        user: { connect: { id: dbUser.id } } 
      },
    });

    revalidatePath("/admin/detalles");
    return { success: true };
  } catch (error) {
    console.error("Error en updateEventDetails:", error);
    return { success: false, error: "Error de servidor" };
  }
}