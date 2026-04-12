"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { AnimatePresence, motion } from "framer-motion";
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  Menu,
  Settings,
  TicketPlus,
  Home,
  Image as ImageIcon,
  Pencil,
  Heart,
  Music,
  Clock,
  Users,
  X,
  MessageSquare,
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userSlug = session?.user?.slug;

  // Generamos el link solo cuando el slug cambia, evitando 404 por timestamps infinitos
  const homeHref = useMemo(() => {
    return userSlug ? `/invit/${userSlug}` : '#';
  }, [userSlug]);

  const menuItems = [
    { title: 'Live Chat', href: '/admin', icon: MessageSquare },
    { title: 'Invitados', href: '/admin/invitados', icon: TicketPlus },
    { title: 'Galería', href: '/admin/galeria', icon: ImageIcon },
    { title: 'Configuración', href: '/admin/count', icon: Settings }, 
    { title: 'Itinerario', href: '/admin/itinerario', icon: Clock },
    { title: 'Testigos', href: '/admin/testigos', icon: Users },
    { title: 'Regalos & Dress', href: '/admin/details', icon: Pencil }, 
    { title: 'Playlist', href: '/admin/sugeridos', icon: Music },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white border-b-2 border-zinc-100 z-50 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-red-600 fill-red-600" />
          <span className="font-black italic uppercase text-lg tracking-tighter text-zinc-950">
            Mendo<span className="text-red-600">Click</span>
          </span>
        </div>
        <button
          className="p-2 bg-zinc-950 text-white rounded-xl shadow-lg active:scale-95 transition-transform"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Principal */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-white border-r-2 border-zinc-100 transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          
          {/* LOGO AREA */}
          <div className="relative h-20 flex items-center px-6 border-b border-zinc-50">
            <Link href="/admin" className="flex items-center gap-3">
              <Heart className={cn("h-7 w-7 text-red-600 fill-red-600 transition-all", collapsed && "mx-auto")} />
              {!collapsed && (
                <span className="font-black italic uppercase text-xl tracking-tighter text-zinc-950">
                  Mendo<span className="text-red-600">Click</span>
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex absolute -right-3 top-7 w-6 h-6 bg-zinc-950 text-white rounded-full items-center justify-center shadow-xl hover:bg-red-600 transition-colors z-50"
            >
              <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
            </button>
          </div>

          {/* BOTÓN VER INVITACIÓN */}
          <div className="px-4 py-6">
            <Link
              href={homeHref}
              target="_blank"
              className={cn(
                "flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-900 hover:border-red-600 hover:bg-white transition-all group shadow-sm",
                collapsed && "justify-center"
              )}
            >
              <Home className="h-5 w-5 text-red-600" />
              {!collapsed && (
                <div className="flex flex-col">
                    <span className="font-black text-[9px] uppercase tracking-widest text-zinc-400 leading-none mb-1 group-hover:text-red-600">Live View</span>
                    <span className="font-bold text-xs uppercase leading-none text-black">Mi Invitación</span>
                </div>
              )}
            </Link>
          </div>

          {/* NAVEGACIÓN PRINCIPAL */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative',
                    isActive
                      ? 'bg-zinc-950 text-white shadow-xl'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950',
                    collapsed && 'justify-center px-0'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 flex-shrink-0 transition-colors',
                      isActive ? 'text-red-600' : 'text-zinc-400 group-hover:text-red-600'
                    )}
                  />
                  {!collapsed && (
                    <span className="font-black text-[10px] uppercase tracking-widest">
                      {item.title}
                    </span>
                  )}
                  {isActive && !collapsed && (
                    <motion.div layoutId="activeNav" className="absolute right-2 w-1.5 h-1.5 bg-red-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* FOOTER: CERRAR SESIÓN */}
          <div className="p-4 bg-zinc-50 border-t border-zinc-200">
            <button
              onClick={() => signOut()}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 group',
                collapsed && 'justify-center px-0'
              )}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && (
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  Cerrar Sesión
                </span>
              )}
            </button>
            
            {!collapsed && (
              <div className="mt-4 flex flex-col items-center">
                <div className="h-1 w-8 bg-zinc-200 rounded-full mb-2" />
                <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest italic text-center">
                    MendoClick <span className="text-red-600 font-black">Management</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d8;
        }
      `}</style>
    </>
  );
}