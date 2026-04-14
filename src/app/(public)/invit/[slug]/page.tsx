import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// IMPORTANTE: Importamos las vistas desde sus carpetas demo (nuestro "Molde Maestro")
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

/**
 * SEO DINÁMICO
 */
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
    openGraph: { title: eventTitle, images: [user.eventConfig.heroImage || ""] },
  };
}

/**
 * LÓGICA DE DATOS Y RENDERER
 */
export default async function InvitacionDinamica({ params }: PageProps) {
  const { slug } = await params;
  const lowerSlug = slug.toLowerCase(); 

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

  // 1. Guardias de seguridad
  if (!user) notFound();
  if (!user.eventConfig) return <ConfigIncompleta lowerSlug={lowerSlug} />;

  const dbConfig = user.eventConfig;

  // 2. RENDERER: Aquí es donde ocurre la magia sin repetir código
  switch (user.templateId) {
    case "CHAMPAGNE":
    case "DEMO1":
      return <ChampagneView dbConfig={dbConfig} eventId={user.id} isDemo={false} />;

    case "NEON_PARTY":
    case "DEMO2":
      return <NeonView dbConfig={dbConfig} eventId={user.id} isDemo={false} />;

    case "GRAFFITI_URBANO":
    case "DEMO3":
      return <GoldenBdayView dbConfig={dbConfig} eventId={user.id} isDemo={false} />;

    case "WEDDING_GRAFFITI":
    case "DEMO4":
      return <GraffitiBodaView dbConfig={dbConfig} eventId={user.id} isDemo={false} />;

    case "GOLDEN_NOIR":
    case "DEMO5": 
      return <GoldenNoirView dbConfig={dbConfig} eventId={user.id} isDemo={false} />;

    case "RETRO_VINYL":
    case "DEMO6": 
      return <RetroVinylView dbConfig={dbConfig} eventId={user.id} isDemo={false} />;

    default:
      return <TemplateError templateId={user.templateId} />;
  }
}

/**
 * COMPONENTES DE APOYO (Solo para esta página)
 */
function ConfigIncompleta({ lowerSlug }: { lowerSlug: string }) {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white p-10 text-center">
      <div className="border border-red-900/50 bg-red-950/20 p-10 rounded-3xl max-w-md shadow-2xl">
        <h1 className="text-2xl font-black uppercase italic mb-2 text-red-600">Pase Incompleto</h1>
        <p className="text-zinc-400 text-sm italic">Link reservado para /invit/{lowerSlug}, falta configuración.</p>
      </div>
    </main>
  );
}

function TemplateError({ templateId }: { templateId: string }) {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white p-10 text-center">
      <div className="border border-zinc-800 p-10 rounded-3xl max-w-sm">
        <h1 className="text-xl font-black uppercase mb-4 text-red-600 tracking-tighter">Error de Diseño</h1>
        <p className="text-zinc-500 text-xs">ID: {templateId}</p>
      </div>
    </main>
  );
}