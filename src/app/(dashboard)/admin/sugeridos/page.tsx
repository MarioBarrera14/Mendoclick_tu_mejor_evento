import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Music, Disc, User } from "lucide-react";
import { revalidatePath } from "next/cache";
import { DeleteSongButton } from "../_components/DeleteSongButton";
import { redirect } from "next/navigation";

export default async function SugeridosPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/login");
  }

  const suggestions = await prisma.songSuggestion.findMany({
    where: { 
      user: { 
        email: session.user.email 
      } 
    },
    orderBy: { createdAt: "desc" }
  });

  async function deleteSong(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.songSuggestion.delete({
      where: { id }
    });
    revalidatePath("/admin/sugeridos");
  }

  return (
    <div className="max-w-6xl mx-auto p-3 md:p-6 font-sans text-black pb-20">
      
      {/* HEADER ADAPTABLE */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[9px] md:text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">
            Guest <span className="text-red-600">Playlist</span>
          </h1>
        </div>
        <div className="w-full sm:w-auto">
          <span className="inline-block bg-zinc-950 text-white px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-zinc-200">
            {suggestions.length} Sugerencias
          </span>
        </div>
      </header>

      {/* GRID DE CANCIONES: 1 col en mobile, 2 en tablet, 3 en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {suggestions.length === 0 ? (
          <div className="col-span-full py-16 md:py-20 text-center bg-zinc-50 rounded-[2rem] md:rounded-[2.5rem] border-2 border-dashed border-zinc-200 px-6">
            <Disc className="mx-auto h-10 w-10 md:h-12 md:w-12 text-zinc-300 mb-4 animate-spin" />
            <p className="text-zinc-400 font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] italic leading-relaxed">
              La pista está vacía. <br className="hidden md:block"/> Esperando sugerencias de tus invitados.
            </p>
          </div>
        ) : (
          suggestions.map((s) => (
            <div key={s.id} className="group bg-white p-5 md:p-6 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-zinc-950 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-md">
                      <Music size={18} />
                    </div>
                    <div>
                      <p className="text-[7px] md:text-[8px] font-black text-zinc-400 uppercase tracking-tighter">Recibido</p>
                      <p className="text-[9px] md:text-[10px] font-black text-black uppercase italic">
                        {new Date(s.createdAt).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                  </div>
                  {/* Botón de borrar con área táctil mejorada en el componente */}
                  <DeleteSongButton id={s.id} onDelete={deleteSong} />
                </div>
                
                <div className="space-y-2 mb-6">
                  {[s.tema1, s.tema2, s.tema3].filter(Boolean).map((tema, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100 group-hover:bg-white group-hover:border-red-100 transition-colors">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                      <span className="text-[10px] md:text-[11px] font-black text-black uppercase truncate italic tracking-tight">{tema}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center gap-2">
                <div className="p-1.5 bg-zinc-100 rounded-full">
                  <User size={10} className="text-red-600" />
                </div>
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  Invitado: <span className="text-zinc-950 italic">{s.guestName || "Anónimo"}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="mt-10 flex items-center justify-center opacity-20 gap-2">
        <Disc size={12} />
        <p className="text-[7px] font-black uppercase tracking-[0.4em]">MendoClick Music Archive Engine</p>
      </footer>
    </div>
  );
}