"use client";

import React, { useState } from 'react';
import { 
  ChevronDown, 
  Smartphone, 
  Tablet, 
  Laptop, 
  CreditCard, 
  Building2, 
  PlusCircle,
  Mail,
  Heart,
  ExternalLink
} from 'lucide-react';

// --- DATA ESTRUCTURADA ---
const PLANS = {
  classic: {
    id: 'classic',
    name: 'CLASSIC',
    originalPrice: 80000,
    price: 72000,
    cardPrice: 80000,
    discount: '10% OFF',
    features: [
      "Envío ilimitado", "Portada", "Cuenta regresiva", "Galería de hasta 4 fotos",
      "Agenda digital multiplataforma", "Ubicación, mapa e indicaciones",
      "Confirmación de asistencia online (RSVP)", "Código de vestimenta",
      "Regalos", "Panel de administración (todas las respuestas de los invitados en un solo lugar)"
    ]
  },
  premium: {
    id: 'premium',
    name: 'PREMIUM',
    originalPrice: 100000,
    price: 90000,
    cardPrice: 100000,
    discount: '10% OFF',
    features: [
      "Envío ilimitado", "Portada", "Música de fondo", "Cuenta regresiva",
      "Nuestra historia", "Galería de hasta 8 fotos", "Agenda digital multiplataforma",
      "Ubicación, mapa e indicaciones", "Confirmación de asistencia online (RSVP)",
      "Código de vestimenta", "Regalos", "Instagram Wall y hashtag",
      "Sugerencia de canciones", "Panel de administración (todas las respuestas)",
      "¡REGALO! Save The Date - Tarjeta"
    ]
  },
  deluxe: {
    id: 'deluxe',
    name: 'DELUXE',
    originalPrice: 128000,
    price: 115200,
    cardPrice: 128000,
    discount: '10% OFF',
    features: [
      "Envío ilimitado", "Portada", "Música de fondo", "Cuenta regresiva",
      "Nuestra historia", "Álbum de hasta 12 fotos", "Agenda digital multiplataforma",
      "Ubicación, mapa e indicaciones", "Itinerario (línea de tiempo)",
      "Confirmación de asistencia online (RSVP)", "Código de vestimenta + sugerencias de estilos",
      "Hoteles", "Transporte y servicio de Bus", "Opciones de Menú", "Regalos",
      "Instagram Wall y hashtag", "Sugerencia de canciones", "Playlist de Spotify",
      "Testigos/padrinos", "Redes oficiales del evento", "Sección adicional que necesites",
      "Acceso VIP", "Panel de administración", "¡REGALO! Save The Date - Tarjeta"
    ]
  }
};

export default function AmoInvitarStore() {
  const [selectedPlan, setSelectedPlan] = useState('classic');
  const plan = PLANS[selectedPlan as keyof typeof PLANS];

  const format = (num: number) => num.toLocaleString('es-AR');

  return (
    <div className="bg-white min-h-screen text-[#333] font-sans">
      {/* --- HEADER --- */}
      <nav className="bg-[#4e9c87] text-white py-3 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="text-2xl font-light">amo</span>
            <span className="text-2xl font-bold">invitar<span className="text-white">!</span></span>
            <span className="text-[10px] font-black uppercase ml-2 bg-black/10 px-1 rounded">store</span>
          </div>
          <div className="hidden lg:flex gap-5 text-[11px] font-bold tracking-widest">
            {['INICIO', 'BODA', '15 AÑOS', 'BAUTISMO', 'COMUNIÓN', 'TIENDA'].map(m => (
              <a key={m} href="#" className="hover:opacity-70 transition-opacity">{m}</a>
            ))}
            <Mail size={16} className="ml-2 cursor-pointer" />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <p className="text-[11px] text-gray-400 mb-2">Invitaciones &rsaquo; Store &rsaquo; Boda</p>
        <hr className="mb-6" />

        {/* --- SECCIÓN PRODUCTO PRINCIPAL --- */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-9">
            <img src="https://amoinvitar.com/images/banner-garden-store.jpg" alt="Garden" className="w-full rounded-md" />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h1 className="text-2xl font-light uppercase text-gray-700">Invitación web Garden</h1>
            
            <div className="space-y-1">
              <label className="text-[11px] text-gray-400 italic flex items-center gap-1">
                Elegir una opción: <span className="text-[#4e9c87] font-bold not-italic cursor-pointer hover:underline flex items-center gap-1"><PlusCircle size={12}/> INFO</span>
              </label>
              <select 
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full p-2 bg-[#f1fcf9] border border-gray-200 rounded text-sm focus:ring-1 focus:ring-[#4e9c87] outline-none"
              >
                <option value="classic">CLASSIC</option>
                <option value="premium">PREMIUM</option>
                <option value="deluxe">DELUXE</option>
              </select>
            </div>

            {/* Transferencia */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <img src="https://amoinvitar.com/iconos/logo-transferencia.png" alt="Bank" className="h-4" />
                <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 uppercase">
                  <span className="icon-local_offer"></span> {plan.discount} OFF
                </span>
              </div>
              <p className="text-[10px] text-gray-400 line-through">desde ${format(plan.originalPrice)}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-gray-400 uppercase">desde</span>
                <span className="text-3xl font-bold text-gray-700">${format(plan.price)}</span>
              </div>
              <button className="w-full bg-[#4e9c87] hover:bg-[#3d7d6c] text-white font-bold py-3 rounded text-xs uppercase tracking-widest mt-2 transition-all">
                Pagar <Building2 size={14} className="inline ml-1" />
              </button>
            </div>

            {/* Mercado Pago */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-1">
                <img src="https://amoinvitar.com/iconos/logo-mp.svg" alt="MP" className="h-4" />
                <span className="text-[10px] text-gray-400 font-bold border-l pl-2 uppercase tracking-tighter">Tarjeta</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-gray-400 uppercase">desde</span>
                <span className="text-2xl font-bold text-gray-700">${format(plan.cardPrice)}</span>
              </div>
              <button className="w-full bg-[#009EE3] hover:bg-[#0087c2] text-white font-bold py-3 rounded text-xs uppercase tracking-widest mt-2 transition-all">
                Pagar <CreditCard size={14} className="inline ml-1" />
              </button>
              <img src="https://amoinvitar.com/iconos/tarjetasMP.jpg" alt="Cards" className="w-full mt-2" />
            </div>
          </div>
        </div>

        {/* --- VISTA PREVIA BAR --- */}
        <div className="bg-[#f1fcf9] border border-[#4e9c87] rounded-lg p-4 mb-12 flex flex-col md:flex-row items-center gap-4">
          <div className="w-14 shrink-0">
            <img src="https://amoinvitar.com/img/p_garden.png" alt="Movil" className="w-full" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h6 className="text-[#4e9c87] font-bold text-sm uppercase">Vista previa de la invitación</h6>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <a href="#" className="bg-white border border-[#4e9c87] text-[#4e9c87] px-4 py-2 text-[10px] font-bold rounded uppercase hover:bg-[#4e9c87] hover:text-white transition-colors">Ver opción CLASSIC</a>
              <a href="#" className="bg-white border border-[#4e9c87] text-[#4e9c87] px-4 py-2 text-[10px] font-bold rounded uppercase">DELUXE</a>
              <a href="#" className="bg-white border border-[#4e9c87] text-[#4e9c87] px-4 py-2 text-[10px] font-bold rounded uppercase">PREMIUM</a>
            </div>
          </div>
        </div>

        {/* --- CARACTERÍSTICAS DINÁMICAS --- */}
        <section className="mb-16">
          <h4 className="text-lg font-bold mb-1 uppercase">OPCIÓN {plan.name}</h4>
          <p className="text-sm font-bold text-gray-500 mb-4">Características incluidas</p>
          <ul className="grid md:grid-cols-2 gap-y-2 gap-x-12">
            {plan.features.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-600">
                <span className="text-[#4e9c87] shrink-0">👉</span> 
                {item.includes("¡REGALO!") ? (
                  <span><span className="text-[#4e9c87] font-bold uppercase text-[11px]">¡regalo!</span> {item.replace("¡REGALO! ", "")}</span>
                ) : item}
              </li>
            ))}
          </ul>
        </section>

        {/* --- COMPATIBILIDAD --- */}
        <div className="flex flex-col items-center gap-2 py-8 border-t border-gray-100 mb-16">
          <div className="flex gap-4 text-gray-400">
            <Smartphone size={32} /> <Tablet size={32} /> <Laptop size={32} />
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Compatible con todos los dispositivos</p>
        </div>

        {/* --- COMPLEMENTOS --- */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Idioma Adicional", img: "banner-language-store.jpg", price: 19400 },
              { title: "Cambio de paleta y fuente", img: "banner-complemento-cambio-de-colores-y-tipografia-store.jpg", price: 19000 },
              { title: "Lista de invitados", img: "banner-lista-invitados-store.jpg", price: 28000 },
              { title: "Lista de regalos", img: "banner-lista-de-regalos-store.jpg", price: 13300 }
            ].map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <img src={`https://amoinvitar.com/images/${item.img}`} alt={item.title} className="w-full rounded mb-2" />
                <span className="text-[9px] bg-[#4e9c87] text-white px-2 py-0.5 rounded font-bold uppercase">Complemento</span>
                <h5 className="text-[12px] font-bold mt-1 leading-tight group-hover:text-[#4e9c87] transition-colors">{item.title}</h5>
                <p className="text-sm font-bold mt-1">${format(item.price)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- TABLA COMPARATIVA --- */}
        <section className="bg-[#f9f9f9] -mx-4 px-4 py-16 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-8 italic">Esta invitación está disponible también en estas opciones:</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Object.values(PLANS).map((p) => (
              <div key={p.id} className="bg-white border-t-4 border-[#4e9c87] shadow-sm flex flex-col items-center">
                <div className="bg-[#4e9c87] w-full py-6 text-white uppercase italic">
                  <p className="text-[10px] mb-0">Invitación</p>
                  <p className="text-2xl font-bold not-italic tracking-tighter">{p.name}</p>
                </div>
                <div className="p-6 w-full flex flex-col items-center">
                  <p className="text-sm text-gray-300 line-through mb-1">${format(p.originalPrice)}</p>
                  <p className="text-4xl font-black text-gray-700 mb-8 tracking-tighter">
                    <span className="text-xl">$</span>{format(p.price)}
                  </p>
                  <ul className="text-[11px] text-gray-500 space-y-2 mb-10 text-center w-full">
                    {p.features.slice(0, 10).map((f, i) => (
                      <li key={i} className="border-b border-gray-50 pb-1 last:border-0">{f}</li>
                    ))}
                    {p.features.length > 10 && <li className="text-[#4e9c87] font-bold">Y mucho más...</li>}
                  </ul>
                  <button onClick={() => setSelectedPlan(p.id)} className="bg-[#4e9c87] text-white px-10 py-3 rounded-full text-xs font-bold uppercase hover:scale-105 transition-transform shadow-lg">
                    ¡Si, quiero!
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#212121] text-white/50 py-16 px-4 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="text-3xl font-light mb-0">amo<span className="text-[#4e9c87] font-bold">invitar<span className="text-white">!</span></span></div>
            <p className="text-[10px] tracking-[4px] uppercase font-bold text-white mb-6">Invitaciones Digitales</p>
          </div>
          <div>
            <h6 className="text-white text-xs font-bold uppercase mb-4 tracking-widest">Acceso rápido</h6>
            <div className="grid grid-cols-2 text-[11px] gap-2">
              <a href="#">Boda</a><a href="#">15 Años</a><a href="#">Bautismo</a><a href="#">Tienda</a><a href="#">Contacto</a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
             <div className="flex gap-4">
                <span className="icon-instagram h4"></span><span className="icon-facebook h4"></span><span className="icon-youtube h4"></span>
             </div>
             <p className="text-[9px] text-center md:text-right italic">
               Copyright © 2020-2026 Amo Invitar!®<br />
               Hecho con <Heart size={10} className="inline text-red-500" /> por Snow Producciones®
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}