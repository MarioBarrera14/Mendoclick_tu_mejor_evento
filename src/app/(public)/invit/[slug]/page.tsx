import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// IMPORTANTE: Importamos las vistas
import ChampagneView from "../../demo/cumple_quince/champagne/page";
import NeonView from "../../demo/cumple_quince/neon-party/page";
import GoldenBdayView from "../../demo/cumple_quince/golden-grafitis/page";
import GraffitiBodaView from "../../demo/bodas/bodas-grafitis/page";
import GoldenNoirView from "../../demo/bodas/golden_noir/page";
import RetroVinylView from "../../demo/bodas/bodas-rockeras/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const user = await prisma.user.findUnique({
    where: { slug: slug.toLowerCase() },
    include: { eventConfig: true }
  });

  if (!user?.eventConfig) return { title: "Invitación - MendoClick" };
  const eventTitle = user.eventConfig.eventName || user.nombre;
  
  return {
    title: `${eventTitle} | MendoClick`,
    description: `Te invito a mi evento: ${eventTitle}. ¡No faltes!`,
    openGraph: { 
      title: eventTitle, 
      images: [user.eventConfig.heroImage || "/logo.webp"],
      type: "website",
    },
  };
}

export default async function InvitacionDinamica({ params }: PageProps) {
  const { slug } = await params;
  const lowerSlug = slug.toLowerCase(); 
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { slug: lowerSlug },
    include: { 
      eventConfig: {
        include: {
          itinerary: { orderBy: { order: 'asc' } },
          witnesses: true
        }
      } 
    },
  });

  if (!user) notFound();

  /**
   * INYECCIÓN DE PLAN (CRÍTICO):
   * Las vistas esperan el planLevel dentro del objeto dbConfig.
   * Si no lo pasamos aquí, la vista asume que es "CLASSIC" por defecto.
   */
  const dbConfig = user.eventConfig ? {
    ...user.eventConfig,
    planLevel: user.planLevel // <--- Pasamos el nivel real (PREMIUM/DELUXE) a la vista
  } : null;

  const esAdmin = session?.user?.role === "ADMIN";
  const esDuenio = session?.user?.id === user.id;

  const renderTemplate = () => {
    /**
     * Si dbConfig es null (no hay config en DB), es una DEMO pura.
     * Si dbConfig existe, isDemoMode es FALSE (habilita Navbar y funciones reales).
     */
    const isDemoMode = !dbConfig;

    switch (user.templateId) {
      case "CHAMPAGNE":
      case "DEMO1":
        return <ChampagneView dbConfig={dbConfig} eventId={user.id} isDemo={isDemoMode} />;

      case "NEON_PARTY":
      case "DEMO2":
        return <NeonView dbConfig={dbConfig} eventId={user.id} isDemo={isDemoMode} />;

      case "GRAFFITI_URBANO":
      case "DEMO3":
        return <GoldenBdayView dbConfig={dbConfig} eventId={user.id} isDemo={isDemoMode} />;

      case "WEDDING_GRAFFITI":
      case "DEMO4":
        return <GraffitiBodaView dbConfig={dbConfig} eventId={user.id} isDemo={isDemoMode} />;

      case "GOLDEN_NOIR":
      case "DEMO5": 
        return <GoldenNoirView dbConfig={dbConfig} eventId={user.id} isDemo={isDemoMode} />;

      case "RETRO_VINYL":
      case "DEMO6": 
        return <RetroVinylView dbConfig={dbConfig} eventId={user.id} isDemo={isDemoMode} />;

      default:
        return <TemplateError templateId={user.templateId} />;
    }
  };

  return (
    <>
      {/* Barra de aviso para Administradores */}
      {esAdmin && !esDuenio && (
        <div className="bg-blue-600 text-white text-[10px] py-1 px-4 text-center fixed top-0 w-full z-[9999] uppercase font-bold tracking-tighter shadow-md">
          Modo Administrador — Visualizando a: {user.nombre} | Plan: {user.planLevel}
        </div>
      )}
      {renderTemplate()}
    </>
  );
}

function TemplateError({ templateId }: { templateId: string }) {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white p-10 text-center">
      <div className="space-y-4">
        <h1 className="text-xl font-black uppercase text-red-600">Error de Configuración</h1>
        <p className="text-zinc-400 text-sm font-mono">El ID de plantilla "{templateId}" no es válido o no está asignado.</p>
      </div>
    </main>
  );
}