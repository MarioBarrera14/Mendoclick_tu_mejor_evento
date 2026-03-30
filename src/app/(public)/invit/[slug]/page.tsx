import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Importamos los templates
import { NightLights, NeonParty, GoldenBday } from "@/components/templates";

// 1. FORZAMOS QUE LA PÁGINA SEA DINÁMICA (Crucial en Next.js 15)
// Esto evita que veas datos viejos después de guardar en el panel
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Búsqueda más robusta para los metadatos
  const user = await prisma.user.findUnique({
    where: { slug },
    include: { eventConfig: true }
  });

  if (!user || !user.eventConfig) return { title: "Invitación no encontrada" };

  return {
    title: `Mis 15 - ${user.eventConfig.eventName || user.nombre}`,
    description: `Te espero el día ${user.eventConfig.eventDate}. ¡No faltes!`,
    openGraph: {
      images: [user.eventConfig.heroImage || ""],
    },
  };
}

export default async function InvitacionDinamica({ params }: PageProps) {
  const { slug } = await params;

  // 2. BUSCAMOS AL USUARIO (Aseguramos traer eventConfig)
  const user = await prisma.user.findUnique({
    where: { slug },
    include: { eventConfig: true },
  });

  // Si no existe el usuario o la configuración, mostramos 404
  if (!user || !user.eventConfig) {
    notFound();
  }

  const config = user.eventConfig;

  // Renderizamos según el templateId guardado en la tabla 'users'
  switch (user.templateId) {
    case "DEMO1":
    case "NIGHT_LIGHTS":
      return (
        <main className="min-h-screen bg-[#0a0a0a]">
          <NightLights.Envelope musicUrl={config.musicUrl}>
            <NightLights.Navbar eventName={config.eventName} />
            
            <NightLights.Hero 
              eventName={config.eventName} 
              heroImage={config.heroImage} 
            />

            <NightLights.Countdown 
              eventDate={config.eventDate} 
              eventTime={config.eventTime} 
            />

            <NightLights.FotoCarousel 
              images={config.carruselImages} 
              videoUrl={config.videoUrl}
            />

            <NightLights.Details 
              dressCode={config.dressCode}
              dressDescription={config.dressDescription}
              alias={config.alias}
              cbu={config.cbu}
              bankName={config.bankName}
              holderName={config.holderName}
            />

            <NightLights.Location 
              venueName={config.venueName}
              venueAddress={config.venueAddress}
              mapLink={config.mapLink}
            />

            <NightLights.MusicSuggestion eventId={config.id} />    
            <NightLights.RSVP />
            <NightLights.Footer />
          </NightLights.Envelope>
        </main>
      );

    case "DEMO2":
    case "NEON_PARTY":
      return (
        <main className="min-h-screen bg-[#0a0a0a]">
          {/* 3. PASAMOS LOS DATOS TAMBIÉN A NEON PARTY */}
          <NeonParty.Navbar eventName={config.eventName} />
          <NeonParty.Hero heroImage={config.heroImage} eventName={config.eventName} />
          <NeonParty.Countdown eventDate={config.eventDate} eventTime={config.eventTime} />
          <NeonParty.FotoCarousel images={config.carruselImages} videoUrl={config.videoUrl} />
          <NeonParty.Location venueName={config.venueName} venueAddress={config.venueAddress} />
          <NeonParty.Details alias={config.alias} cbu={config.cbu} />
          <NeonParty.RSVP />
          <NeonParty.Footer />
        </main>
      );

    case "DEMO3":
    case "GOLDEN_BDAY":
      return (
        <main className="min-h-screen bg-[#0a0a0a]">
          {/* 4. PASAMOS LOS DATOS TAMBIÉN A GOLDEN BDAY */}
          <GoldenBday.Navbar eventName={config.eventName} />
          <GoldenBday.Hero heroImage={config.heroImage} eventName={config.eventName} />
          <GoldenBday.Countdown eventDate={config.eventDate} eventTime={config.eventTime} />
          <GoldenBday.FotoCarousel images={config.carruselImages} videoUrl={config.videoUrl} />
          <GoldenBday.Location venueName={config.venueName} venueAddress={config.venueAddress} />
          <GoldenBday.Details alias={config.alias} cbu={config.cbu} />
          <GoldenBday.RSVP />
          <GoldenBday.Footer />
        </main>
      );

    default:
      return (
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Invitación de {user.nombre}</h1>
            <p className="text-zinc-400">El diseño seleccionado no está disponible.</p>
          </div>
        </main>
      );
  }
}