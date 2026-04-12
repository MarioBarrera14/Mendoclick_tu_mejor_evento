import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Music, Disc, User, Calendar, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import { DeleteSongButton } from "../_components/DeleteSongButton";

export default async function SugeridosPage() {
  const session = await getServerSession(authOptions);
  
  const suggestions = await prisma.songSuggestion.findMany({
    where: { user: { email: session?.user?.email } },
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
    <div className="max-w-6xl mx-auto p-4 lg:p-6 font-sans text-black">
      
      {/* HEADER COMPACTO MENDOCLICK */}
      <header className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">MendoClick Admin</p>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
            Guest <span className="text-red-600">Playlist</span>
          </h1>
        </div>
        <div className="text-right">
          <span className="bg-zinc-100 text-zinc-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
            {suggestions.length} Sugerencias
          </span>
        </div>
      </header>

      {/* GRID DE CANCIONES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-200">
            <Disc className="mx-auto h-10 w-10 text-zinc-300 mb-3 animate-spin" />
            <p className="text-zinc-500 font-black uppercase text-xs tracking-widest text-balance">La pista está vacía. <br/> Esperando sugerencias de tus invitados.</p>
          </div>
        ) : (
          suggestions.map((s) => (
            <div key={s.id} className="group bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-300 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 bg-zinc-950 rounded-xl text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Music size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-zinc-400 uppercase leading-none">Recibido el</p>
                      <p className="text-[10px] font-bold text-black uppercase">{new Date(s.createdAt).toLocaleDateString('es-AR')}</p>
                    </div>
                  </div>

                  {/* BOTÓN DE BORRADO */}
                  <DeleteSongButton id={s.id} onDelete={deleteSong} />
                </div>
                
                {/* TEMAS SUGERIDOS */}
                <div className="space-y-2 mb-6">
                  {[s.tema1, s.tema2, s.tema3].filter(Boolean).map((tema, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-zinc-50 rounded-xl border border-zinc-100">
                      <div className="w-1 h-3 bg-red-600 rounded-full" />
                      <span className="text-xs font-black text-black uppercase truncate">{tema}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER DEL CARD (INVITADO) */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={12} className="text-red-600" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                    Invitado: <span className="text-black">{s.guestName || "Anónimo"}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}