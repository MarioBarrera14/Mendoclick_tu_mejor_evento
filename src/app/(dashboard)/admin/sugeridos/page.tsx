import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Music, Disc, User } from "lucide-react";
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
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-2 border-b border-zinc-100 pb-8">
        <h1 className="text-4xl font-serif italic font-bold text-zinc-900">Playlist de Invitados</h1>
        <p className="text-zinc-500 text-sm font-medium italic">Canciones sugeridas para la fiesta</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {suggestions.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
            <Disc className="mx-auto h-12 w-12 text-zinc-300 mb-4 animate-spin" />
            <p className="text-zinc-400 font-serif italic text-xl">Aún no hay sugerencias...</p>
          </div>
        ) : (
          suggestions.map((s) => (
            <div key={s.id} className="group bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-500 relative">
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-rose-50 rounded-2xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-500">
                      <Music size={22} />
                    </div>
                    <div className="text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 block">
                          {new Date(s.createdAt).toLocaleDateString('es-AR')}
                        </span>
                    </div>
                </div>

                {/* BOTÓN CON NOTIFICACIÓN */}
                <DeleteSongButton id={s.id} onDelete={deleteSong} />
              </div>
              
              <div className="space-y-4 mb-8">
                {[s.tema1, s.tema2, s.tema3].filter(Boolean).map((tema, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl border border-transparent group-hover:border-rose-50 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                    <span className="text-sm font-bold text-zinc-800">{tema}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-50 flex items-center gap-2">
                <User size={14} className="text-rose-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Sugerido por: <span className="text-zinc-900 font-bold">{s.guestName || "Anónimo"}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
