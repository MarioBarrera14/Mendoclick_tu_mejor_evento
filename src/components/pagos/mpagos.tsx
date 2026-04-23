"use client";

import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface MPButtonProps {
  planName: string;
  price: number;
  userId?: string;
}

export default function MPButton({ planName, price, userId }: MPButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Llamamos a tu API de Next.js
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName, price, userId }),
      });

      const data = await response.json();

      if (data.id) {
        // 2. Redirigimos a Mercado Pago usando el ID de preferencia
        // 'sandbox' para pruebas, 'production' para cobrar real
        const mpUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
        window.location.href = mpUrl;
      } else {
        throw new Error("No se recibió el ID de la preferencia");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al conectar con Mercado Pago. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-[#009EE3] hover:bg-[#0087c2] text-white font-bold py-3 rounded text-xs uppercase tracking-widest mt-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        "Cargando..."
      ) : (
        <>
          Pagar con Mercado Pago <CreditCard size={14} />
        </>
      )}
    </button>
  );
}