"use client";

import React, { useState, useEffect } from 'react';
import {
    Smartphone,
    Tablet,
    Laptop,
    CreditCard,
    Building2,
    PlusCircle,
} from 'lucide-react';
import MPButton from '@/components/pagos/mpagos';
// --- INTERFACES ---
interface Plan {
    id: string;
    name: string;
    originalPrice: number;
    price: number;
    cardPrice: number;
    discount: string;
    features: string[];
}

// --- DATA ESTRUCTURADA ---
const PLANS: Record<string, Plan> = {
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
            "Regalos", "Panel de administración (todas las respuestas)"
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
            "Sugerencia de canciones", "Panel de administración",
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
            "Confirmación de asistencia online (RSVP)", "Código de vestimenta + sugerencias",
            "Hoteles", "Transporte y servicio de Bus", "Opciones de Menú", "Regalos",
            "Instagram Wall y hashtag", "Sugerencia de canciones", "Playlist de Spotify",
            "Testigos/padrinos", "Redes oficiales", "Sección adicional",
            "Acceso VIP", "Panel de administración", "¡REGALO! Save The Date - Tarjeta"
        ]
    }
};

export default function AmoInvitarStore() {
    const [selectedPlanKey, setSelectedPlanKey] = useState<string>('classic');
    const [selectedPlanModal, setSelectedPlanModal] = useState<Plan | null>(null);

    // BLOQUEO DE SCROLL GLOBAL
    useEffect(() => {
        if (selectedPlanModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Limpieza al desmontar el componente
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedPlanModal]);

    const plan = PLANS[selectedPlanKey];
    const format = (num: number) => num.toLocaleString('es-AR');

    return (
        <div className="bg-white min-h-screen text-[#333] font-sans">
            <main className="max-w-6xl mx-auto px-4 py-6">
                <p className="text-[11px] text-gray-400 mb-2">Invitaciones &rsaquo; Store &rsaquo; Boda</p>
                <hr className="mb-6" />

                {/* --- SECCIÓN PRODUCTO PRINCIPAL --- */}
                <div className="grid lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-9">
                        <img
                            src="https://amoinvitar.com/images/banner-garden-store.jpg"
                            alt="Garden"
                            className="w-full rounded-md shadow-sm"
                        />
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <h1 className="text-2xl font-light uppercase text-gray-700 tracking-tight">Invitación web Garden</h1>

                        <div className="space-y-1">
                            <label className="text-[11px] text-gray-400 italic flex items-center gap-1">
                                Elegir una opción:
                                <span className="text-[#4e9c87] font-bold not-italic cursor-pointer hover:underline flex items-center gap-1">
                                    <PlusCircle size={12} /> INFO
                                </span>
                            </label>
                            <select
                                value={selectedPlanKey}
                                onChange={(e) => setSelectedPlanKey(e.target.value)}
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
                                <span className="text-[10px] font-bold text-green-600 uppercase">
                                    {plan.discount} OFF
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400 line-through">desde ${format(plan.originalPrice)}</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-[10px] text-gray-400 uppercase">desde</span>
                                <span className="text-3xl font-bold text-gray-700">${format(plan.price)}</span>
                            </div>
                            <button className="w-full bg-[#4e9c87] hover:bg-[#3d7d6c] text-white font-bold py-3 rounded text-xs uppercase tracking-widest mt-2 transition-all flex items-center justify-center gap-2">
                                Pagar <Building2 size={14} />
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
    
    {/* EL BOTÓN DINÁMICO */}
    <MPButton 
        planName={plan.name} 
        price={plan.cardPrice} 
       
        // Aquí deberías pasar el ID si el usuario está logueado
    />

    <img src="https://amoinvitar.com/iconos/tarjetasMP.jpg" alt="Cards" className="w-full mt-2" />
</div>
                    </div>
                </div>

                {/* --- CARACTERÍSTICAS DINÁMICAS --- */}
                <section className="mb-16 bg-[#fcfdfd] p-6 rounded-xl border border-gray-100">
                    <h4 className="text-lg font-bold mb-1 uppercase">OPCIÓN {plan.name}</h4>
                    <p className="text-sm font-bold text-gray-400 mb-4">Características incluidas en este plan:</p>
                    <ul className="grid md:grid-cols-2 gap-y-2 gap-x-12">
                        {plan.features.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[13px] text-gray-600 border-b border-gray-50 pb-1">
                                <span className="text-[#4e9c87] shrink-0">✓</span>
                                {item.includes("¡REGALO!") ? (
                                    <span><span className="text-[#4e9c87] font-bold uppercase text-[11px]">¡regalo!</span> {item.replace("¡REGALO! ", "")}</span>
                                ) : item}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="mt-20 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {Object.values(PLANS).map((p) => {
                            const isSelected = selectedPlanKey === p.id;
                            const isPremium = p.id === 'premium'; // Marcamos el del medio como sugerido

                            return (
                                <div
                                    key={p.id}
                                    className={`relative flex flex-col h-full transition-all duration-300 rounded-3xl overflow-hidden
                        ${isSelected
                                            ? 'ring-2 ring-[#4e9c87] shadow-2xl scale-[1.02] bg-white z-10'
                                            : 'border border-gray-100 shadow-lg bg-white/80 hover:shadow-xl'
                                        }`}
                                >
                                    {/* Etiqueta de Popularidad */}
                                    {isPremium && (
                                        <div className="absolute top-0 right-0 bg-[#4e9c87] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                                            Más Popular
                                        </div>
                                    )}

                                    {/* Header de la Card */}
                                    <div className={`p-8 text-center ${isSelected ? 'bg-[#f0f9f6]' : 'bg-transparent'}`}>
                                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4e9c87] mb-2">
                                            Invitación
                                        </p>
                                        <h3 className="text-3xl font-black text-gray-800 tracking-tighter">{p.name}</h3>

                                        <div className="mt-6 flex flex-col items-center">
                                            <span className="text-gray-400 line-through text-sm font-light">
                                                ${format(p.originalPrice)}
                                            </span>
                                            <div className="flex items-baseline gap-1 text-[#333]">
                                                <span className="text-xl font-medium">$</span>
                                                <span className="text-5xl font-extrabold tracking-tight">
                                                    {format(p.price).split(',')[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lista de Features */}
                                    <div className="px-8 pb-8 flex-1">
                                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />

                                        <ul className="space-y-4 mb-8">
                                            {p.features.slice(0, 7).map((f, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e8f5f1] flex items-center justify-center">
                                                        <span className="text-[#4e9c87] text-[10px]">●</span>
                                                    </div>
                                                    <span className="line-clamp-1">{f}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={() => setSelectedPlanModal(p)}
                                            className="w-full text-center text-[#4e9c87] text-xs font-semibold hover:text-[#3d7d6c] transition-colors mb-8 block"
                                        >
                                            + Explorar todos los beneficios
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedPlanKey(p.id);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className={`w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all
                                ${isSelected
                                                    ? 'bg-[#4e9c87] text-white shadow-lg shadow-[#4e9c87]/30 hover:bg-[#3d7d6c]'
                                                    : 'bg-gray-800 text-white hover:bg-black'
                                                }`}
                                        >
                                            Seleccionar Plan
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>

            {/* --- MODAL DE CARACTERÍSTICAS (SIN SCROLL INTERNO NI EXTERNO) --- */}
            {selectedPlanModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setSelectedPlanModal(null)}
                >
                    <div
                        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-[#4e9c87] p-6 text-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold">{selectedPlanModal.name}</h3>
                                    <p className="text-[10px] uppercase tracking-widest opacity-80">Detalle completo de funciones</p>
                                </div>
                                <button onClick={() => setSelectedPlanModal(null)} className="text-2xl leading-none">&times;</button>
                            </div>
                        </div>

                        {/* Contenedor sin scroll (ajustado para que quepa todo el contenido Deluxe) */}
                        <div className="p-6 bg-[#f8fdfb]">
                            <ul className="grid grid-cols-1 gap-y-1.5">
                                {selectedPlanModal.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 border-b border-gray-100 pb-1 last:border-0">
                                        <span className="text-[#4e9c87] text-xs mt-1">✔</span>
                                        <span className="text-[11px] text-gray-600 leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => setSelectedPlanModal(null)}
                                className="w-full py-3 bg-white border border-gray-200 text-gray-500 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-gray-100 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}