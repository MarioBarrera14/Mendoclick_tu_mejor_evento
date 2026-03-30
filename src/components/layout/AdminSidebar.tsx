"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  Menu,
  Settings,
  TicketPlus,
  Home,
  Image,
  Pencil,
  Heart,
  Music,
} from 'lucide-react';
import { useState } from 'react';

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const userSlug = session?.user?.slug;
  const homeHref = userSlug ? `/invit/${userSlug}` : '#';

  const menuItems = [
    { title: 'Ver mi Invitación', href: homeHref, icon: Home },
    { title: 'Muro', href: '/admin', icon: LayoutDashboard },
    { title: 'Gestión Invitados', href: '/admin/invitados', icon: TicketPlus },
    { title: 'Galería', href: '/admin/galeria', icon: Image },
    { title: 'Configuración', href: '/admin/count', icon: Settings }, 
    { title: 'Editar detalles', href: '/admin/details', icon: Pencil }, 
    { title: 'Muro Musical', href: '/admin/sugeridos', icon: Music },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-sm text-gray-600 dark:text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-white dark:bg-slate-950 border-r border-gray-100 dark:border-slate-900 transition-all duration-300 shadow-xl',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-50 dark:border-slate-900">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-black fill-black dark:text-white dark:fill-white" />
                <span className="font-serif italic font-bold text-xl">MendoClick</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-full transition-colors text-gray-400"
            >
              <ChevronLeft
                className={cn(
                  'h-5 w-5 transition-transform',
                  collapsed && 'rotate-180'
                )}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  /* Eliminado el atributo target para que siempre navegue en la misma pestaña */
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group',
                    isActive
                      ? 'bg-zinc-900 text-white shadow-lg dark:bg-white dark:text-black'
                      : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900',
                    collapsed && 'justify-center'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 flex-shrink-0',
                      isActive
                        ? 'text-inherit'
                        : 'text-gray-400 group-hover:text-zinc-900 dark:group-hover:text-white'
                    )}
                  />
                  {!collapsed && (
                    <span className="font-medium text-sm tracking-tight">
                      {item.title}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-50 dark:border-slate-900">
            <button
              className={cn(
                'flex items-center space-x-3 px-4 py-3 w-full rounded-2xl text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all',
                collapsed && 'justify-center'
              )}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && (
                <span className="text-xs font-bold uppercase tracking-widest">
                  Salir
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}