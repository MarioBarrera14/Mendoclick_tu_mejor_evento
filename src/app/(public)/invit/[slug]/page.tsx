import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// Importamos los templates desde el index central
import { 
  Champagne, 
  NeonParty, 
  Graffiti_Urbano, 
  Graffiti_Urbano_boda, 
  Golden_Noir, 
  Retro_Vinyl 
} from "@/components/templates";
import { globalBodaConfig, globalQuinceConfig } from "@/data/event-config-bodas";

// ESTO MATA EL CACHÉ DE RAIZ - Datos siempre frescos
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * METADATOS DINÁMICOS (SEO)
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const user = await prisma.user.findUnique({
    where: { slug: slug.toLowerCase() },
    include: { eventConfig: true }
  });

  if (!user || !user.eventConfig) return { title: "Invitación - MendoClick" };

  const eventTitle = user.eventConfig.eventName || user.nombre;
  
  return {
    title: `${eventTitle} | MendoClick`,
    description: `¡Estás invitado! Fecha: ${user.eventConfig.eventDate}.`,
    openGraph: {
      title: eventTitle,
      images: [user.eventConfig.heroImage || ""],
    },
  };
}

/**
 * PÁGINA PRINCIPAL DE INVITACIÓN (Server Component)
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

  // --- GUARDIA 1: El usuario no existe ---
  if (!user) {
    notFound();
  }

  // --- GUARDIA 2: Existe el usuario pero no su configuración ---
  if (!user.eventConfig) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white p-10 font-sans">
        <div className="text-center border border-red-900/50 bg-red-950/20 p-10 rounded-3xl max-w-md shadow-2xl">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-600/50">
            <span className="text-red-600 font-black text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-black uppercase italic mb-2 text-white tracking-tighter text-center">Pase Incompleto</h1>
          <p className="text-zinc-400 text-sm mb-4 leading-relaxed text-center">
            El link <span className="text-red-500 font-bold">/invit/{lowerSlug}</span> ya está reservado por MendoClick, pero el agasajado aún no ha cargado los detalles.
          </p>
          <div className="h-[1px] w-full bg-white/10 mb-4"></div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black italic text-center">A la espera de configuración...</p>
        </div>
      </main>
    );
  }

  const dbConfig = user.eventConfig as any;

  // RENDERING POR TEMPLATE ID
  switch (user.templateId) {
    case "CHAMPAGNE":
    case "DEMO1":
      return (
        <main className="min-h-screen bg-white">
          <Champagne.Envelope musicUrl={dbConfig.musicUrl || globalQuinceConfig.imagenes.musicaUrl.champagne}>
            <Champagne.Navbar eventName={dbConfig.eventName} />
            <Champagne.Hero config={{ ...dbConfig, heroImage: dbConfig.heroImage || globalQuinceConfig.imagenes.hero.champagne }} />
            <Champagne.FotoCarousel images={dbConfig.carruselImages} videoUrl={dbConfig.videoUrl || globalQuinceConfig.imagenes.videoUrl.champagne} />
            <Champagne.Itinerary items={dbConfig.itinerary} />
            <Champagne.Details config={dbConfig} />
            <Champagne.RSVP config={{ heroImage: dbConfig.heroImage || globalQuinceConfig.imagenes.hero.champagne, eventDate: dbConfig.eventDate, confirmDate: dbConfig.eventDate } as any} />
            <Champagne.Location config={dbConfig} />
            <Champagne.MusicSuggestion eventId={user.id} />    
            <Champagne.Footer />
          </Champagne.Envelope>
        </main>
      );

    case "NEON_PARTY":
    case "DEMO2":
      return (
        <main className="min-h-screen bg-[#0a0a0a]">
          <NeonParty.Envelope musicUrl={dbConfig.musicUrl || globalQuinceConfig.imagenes.musicaUrl.neon}>
            <NeonParty.Navbar eventName={dbConfig.eventName} />
            <NeonParty.Hero config={{ ...dbConfig, heroImage: dbConfig.heroImage || globalQuinceConfig.imagenes.hero.neon }} />
            <NeonParty.FotoCarousel images={dbConfig.carruselImages} videoUrl={dbConfig.videoUrl || globalQuinceConfig.imagenes.videoUrl.neon} />
            <NeonParty.Itinerary items={dbConfig.itinerary} />
            <NeonParty.Location config={dbConfig} />
            <NeonParty.Details config={dbConfig} />
            <NeonParty.MusicSuggestion eventId={user.id} />    
            <NeonParty.RSVP config={{ heroImage: dbConfig.heroImage || globalQuinceConfig.imagenes.hero.neon, eventDate: dbConfig.eventDate, confirmDate: dbConfig.eventDate } as any} />
            <NeonParty.Footer />
          </NeonParty.Envelope>
        </main>
      );
      
    case "GRAFFITI_URBANO":
    case "DEMO3":
      return (
        <main className="min-h-screen bg-[#0a0a0a]">
          <Graffiti_Urbano.Envelope musicUrl={dbConfig.musicUrl || globalQuinceConfig.imagenes.musicaUrl.graffiti}>
            <Graffiti_Urbano.Navbar eventName={dbConfig.eventName} />
            <Graffiti_Urbano.Hero config={{ ...dbConfig, heroImage: dbConfig.heroImage || globalQuinceConfig.imagenes.hero.graffiti }} />
            <Graffiti_Urbano.FotoCarousel images={dbConfig.carruselImages} videoUrl={dbConfig.videoUrl || globalQuinceConfig.imagenes.videoUrl.graffiti} />
            <Graffiti_Urbano.EventDetails config={dbConfig} />
            <Graffiti_Urbano.DetailModal config={dbConfig} />
            <Graffiti_Urbano.Itinerary items={dbConfig.itinerary} />
            {dbConfig.witnesses && dbConfig.witnesses.length > 0 && (
              <Graffiti_Urbano.Witnesses items={dbConfig.witnesses} />
            )}
            <Graffiti_Urbano.MusicSuggestion eventId={user.id} /> 
            <Graffiti_Urbano.RSVP config={{ heroImage: dbConfig.heroImage || globalQuinceConfig.imagenes.hero.graffiti, eventDate: dbConfig.eventDate, confirmDate: dbConfig.eventDate } as any} />
            <Graffiti_Urbano.Footer />
          </Graffiti_Urbano.Envelope>
        </main>
      );

    case "WEDDING_GRAFFITI":
    case "DEMO4":
      return (
        <main className="min-h-screen bg-[#0a0a0a]">
          <Graffiti_Urbano_boda.Envelope musicUrl={dbConfig.musicUrl || globalBodaConfig.imagenes.musicaUrl.graffiti}>
            <Graffiti_Urbano_boda.Navbar eventName={dbConfig.eventName} />
            <Graffiti_Urbano_boda.Hero config={{ ...dbConfig, heroImage: dbConfig.heroImage || globalBodaConfig.imagenes.hero.graffiti } as any} />
            <Graffiti_Urbano_boda.FotoCarousel images={dbConfig.carruselImages} videoUrl={dbConfig.videoUrl || globalBodaConfig.imagenes.videoUrl.graffiti} />
            <Graffiti_Urbano_boda.EventDetails config={dbConfig} />
            <Graffiti_Urbano_boda.RSVP config={{ heroImage: dbConfig.heroImage || globalBodaConfig.imagenes.hero.graffiti, eventDate: dbConfig.eventDate, confirmDate: dbConfig.eventDate } as any} />
            <Graffiti_Urbano_boda.DetailModal config={dbConfig} />
            <Graffiti_Urbano_boda.Itinerary items={dbConfig.itinerary} />
            <Graffiti_Urbano_boda.Witnesses items={dbConfig.witnesses} />
            <Graffiti_Urbano_boda.MusicSuggestion eventId={user.id} />
            <Graffiti_Urbano_boda.Footer />
          </Graffiti_Urbano_boda.Envelope>
        </main>
      );

    case "GOLDEN_NOIR":
    case "DEMO5": 
      return (
        <main className="min-h-screen bg-[#050505]">
          <Golden_Noir.Envelope musicUrl={dbConfig.musicUrl || globalBodaConfig.imagenes.musicaUrl.noir}>
            <Golden_Noir.Navbar eventName={dbConfig.eventName} />
            <Golden_Noir.HeroSection heroImage={dbConfig.heroImage || globalBodaConfig.imagenes.hero.noir} eventName={dbConfig.eventName} eventDate={dbConfig.eventDate} />
            <Golden_Noir.PhotoGallerySection config={{ carruselImages: dbConfig.carruselImages, videoUrl: dbConfig.videoUrl || globalBodaConfig.imagenes.videoUrl.noir } as any} />
            <Golden_Noir.Itinerary items={dbConfig.itinerary} />
            <Golden_Noir.DetailModal config={dbConfig} />
            <Golden_Noir.LocationsSection config={dbConfig} />
            {dbConfig.witnesses && dbConfig.witnesses.length > 0 && (
              <Golden_Noir.Witnesses items={dbConfig.witnesses} />
            )}
            <Golden_Noir.MusicSuggestion eventId={user.id} />
            <Golden_Noir.RSVP config={{ heroImage: dbConfig.heroImage || globalBodaConfig.imagenes.hero.noir, eventDate: dbConfig.eventDate, confirmDate: dbConfig.eventDate } as any} />
            <Golden_Noir.Footer />
          </Golden_Noir.Envelope>
        </main>
      );

case "RETRO_VINYL":
    case "DEMO6": 
      return (
        <main className="min-h-screen bg-[#111]">
          <Retro_Vinyl.Envelope musicUrl={dbConfig.musicUrl || globalBodaConfig.imagenes.musicaUrl.rock}>
            <Retro_Vinyl.Navbar eventName={dbConfig.eventName} />
            
            <Retro_Vinyl.Hero config={{ 
                  heroImage: dbConfig.heroImage || globalBodaConfig.imagenes.hero.rock, 
                  eventName: dbConfig.eventName, 
                  eventDate: dbConfig.eventDate, 
                  eventTime: dbConfig.eventTime 
                }} />

            <Retro_Vinyl.FotoCarouselRetro images={dbConfig.carruselImages} videoUrl={dbConfig.videoUrl || globalBodaConfig.imagenes.videoUrl.rock} />
            
      

            <Retro_Vinyl.EventDetails config={dbConfig} />
            
      
            <Retro_Vinyl.Itinerary items={dbConfig.itinerary || []} />
            
        

            {dbConfig.witnesses && dbConfig.witnesses.length > 0 && (
              <>
                <Retro_Vinyl.SeccionTestigos items={dbConfig.witnesses} />
               
              </>
            )}
            
            <Retro_Vinyl.WeddingDetailsSection config={{
              dressCode: dbConfig.dressCode,
              dressDescription: dbConfig.dressDescription,
              cbu: dbConfig.cbu,
              alias: dbConfig.alias,
              bankName: dbConfig.bankName,
              holderName: dbConfig.holderName
            }} />


            <Retro_Vinyl.MusicSuggestion eventId={user.id} />
        

            <Retro_Vinyl.RSVP config={{ heroImage: dbConfig.heroImage || globalBodaConfig.imagenes.hero.rock, eventDate: dbConfig.eventDate, confirmDate: dbConfig.eventDate } as any} />
           

            <Retro_Vinyl.Footer />
          </Retro_Vinyl.Envelope>
        </main>
      );

    default:
      return (
        <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-white p-10 font-sans text-center">
          <div className="text-center border border-zinc-800 p-10 rounded-3xl max-w-sm">
            <h1 className="text-xl font-black uppercase mb-4 tracking-widest text-red-600">Template Error</h1>
            <p className="text-zinc-400 text-xs">ID de Diseño: <span className="text-white font-mono bg-zinc-800 px-2 py-1 rounded">{user.templateId}</span></p>
          </div>
        </main>
      );
  }
}