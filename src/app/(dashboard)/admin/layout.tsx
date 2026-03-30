import { AdminSidebar } from "@/components/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // 1. CONFIGURACIÓN DE LOS 3 TEMAS
  const themes: Record<string, { container: string, header: string, dot: string, text: string }> = {
    // TEMA 1: BLANCO Y NEGRO (Minimalist)
    DEMO1: {
      container: "bg-white",
      header: "bg-white/80 border-zinc-100",
      dot: "bg-zinc-900",
      text: "text-zinc-500"
    },
    // TEMA 2: VIOLETA NEÓN (Night Lights)
    NIGHT_LIGHTS: {
      container: "bg-[#050505]",
      header: "bg-black/40 border-purple-500/20",
      dot: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
      text: "text-purple-300/50"
    },
    // TEMA 3: DORADO (Golden Bday)
    GOLDEN_BDAY: {
      container: "bg-[#fcfaf7]", // Un blanco crema muy sutil
      header: "bg-[#fcfaf7]/80 border-amber-200/50",
      dot: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
      text: "text-amber-700/60"
    }
  };

  const currentTemplate = session.user?.templateId || "DEMO1";
  const theme = themes[currentTemplate] || themes.DEMO1;

  return (
    <div className={cn("flex min-h-screen transition-all duration-700", theme.container)}>
      
      {/* SIDEBAR */}
      <AdminSidebar />
      
      {/* MAIN CONTENT */}
      <main className="flex-1 w-full lg:ml-64 flex flex-col transition-all duration-300 min-w-0">
        
        {/* BARRA SUPERIOR DINÁMICA */}
        <div className={cn(
          "h-14 border-b flex items-center justify-between px-4 sm:px-8 backdrop-blur-md sticky top-0 z-30 transition-all duration-500",
          theme.header
        )}>
           <div className="flex items-center gap-2">
              <span className={cn("w-2 h-2 rounded-full animate-pulse", theme.dot)} />
              <span className={cn("text-[10px] uppercase tracking-tighter font-bold", theme.text)}>
                {session.user?.name} — {currentTemplate.replace('_', ' ')}
              </span>
           </div>
           <span className={cn("hidden xs:block text-[10px] uppercase tracking-widest font-medium text-right", theme.text)}>
             MendoClick Admin
           </span>
        </div>

        {/* CONTENEDOR DE CONTENIDO (CHILDREN) */}
        <div className="p-4 md:p-8 lg:p-12 flex-1 overflow-x-hidden">
          <div className="max-w-6xl mx-auto w-full">
              {children}
          </div>
        </div>
        
        {/* FOOTER DINÁMICO */}
        <footer className={cn(
          "p-8 border-t transition-all duration-500 opacity-60",
          currentTemplate === "DEMO1" ? "bg-zinc-50 border-zinc-100" : "bg-black/10 border-white/5"
        )}>
          <p className={cn("text-center text-[9px] uppercase tracking-widest", theme.text)}>
            © 2026 MendoClick — {currentTemplate} Experience
          </p>
        </footer>
      </main>
    </div>
  );
}