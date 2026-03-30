import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { RegisterUserInput, RegisterClientInput, UpdateClientInput, User } from "@/types";
import { DEFAULT_EVENT_CONFIG, SYSTEM_CONFIG } from "@/constants";

export class UserService {
  /**
   * Valida el código maestro
   */
  static validateMasterCode(code: string): boolean {
    return code === SYSTEM_CONFIG.MASTER_CODE;
  }

  /**
   * Registra un nuevo administrador
   */
  static async registerAdmin(input: RegisterUserInput): Promise<{ success: boolean; error?: string }> {
    if (!this.validateMasterCode(input.masterCode)) {
      return { success: false, error: "Código Maestro inválido. No tienes permiso." };
    }

    try {
      const userExists = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (userExists) {
        return { success: false, error: "El email ya está registrado." };
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      await prisma.user.create({
        data: {
          nombre: input.nombre,
          email: input.email,
          password: hashedPassword,
          role: "ADMIN",
          slug: `admin-${Math.random().toString(36).substring(7)}`,
        },
      });

      return { success: true };
    } catch (error) {
      console.error("Error en UserService.registerAdmin:", error);
      return { success: false, error: "Error al crear la cuenta de administrador." };
    }
  }

  /**
   * Registra un nuevo cliente (usuario)
   */
  static async registerClient(input: RegisterClientInput): Promise<{ success: boolean; error?: string }> {
    if (!this.validateMasterCode(input.masterCode)) {
      return { success: false, error: "Código Maestro inválido." };
    }

    try {
      const existing = await prisma.user.findFirst({
        where: {
          OR: [{ email: input.email }, { slug: input.slug }],
        },
      });

      if (existing) {
        return { success: false, error: "El email o el link (slug) ya están en uso." };
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      await prisma.user.create({
        data: {
          nombre: input.slug.toUpperCase().replace(/-/g, " "),
          email: input.email,
          password: hashedPassword,
          slug: input.slug,
          templateId: input.templateId,
          role: "USER",
          eventConfig: {
            create: {
              eventName: DEFAULT_EVENT_CONFIG.eventName,
              eventDate: DEFAULT_EVENT_CONFIG.eventDate,
            },
          },
        },
      });

      return { success: true };
    } catch (error) {
      console.error("Error en UserService.registerClient:", error);
      return { success: false, error: "Error al crear la cuenta del cliente." };
    }
  }

  /**
   * Obtiene todos los clientes (usuarios con role USER)
   */
  static async getClients(): Promise<User[]> {
    try {
      const clients = await prisma.user.findMany({
        where: { role: "USER" },
        orderBy: { createdAt: "desc" },
      });
      return clients as User[];
    } catch (error) {
      console.error("Error en UserService.getClients:", error);
      return [];
    }
  }

  /**
   * Actualiza un cliente
   */
  static async updateClient(
    id: string,
    input: UpdateClientInput
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await prisma.user.update({
        where: { id },
        data: {
          nombre: input.nombre,
          email: input.email,
          slug: input.slug,
          templateId: input.templateId,
        },
      });

      return { success: true };
    } catch (error) {
      console.error("Error en UserService.updateClient:", error);
      return { success: false, error: "No se pudieron guardar los cambios." };
    }
  }

  /**
   * Elimina un cliente
   */
  static async deleteClient(id: string): Promise<{ success: boolean }> {
    try {
      await prisma.user.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      console.error("Error en UserService.deleteClient:", error);
      return { success: false };
    }
  }

  /**
   * Busca un usuario por email
   */
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user as User | null;
    } catch (error) {
      console.error("Error en UserService.findByEmail:", error);
      return null;
    }
  }

  /**
   * Busca un usuario por slug
   */
  static async findBySlug(slug: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { slug },
      });
      return user as User | null;
    } catch (error) {
      console.error("Error en UserService.findBySlug:", error);
      return null;
    }
  }
}
