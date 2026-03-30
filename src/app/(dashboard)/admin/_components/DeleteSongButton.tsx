"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";

interface Props {
  id: string;
  onDelete: (formData: FormData) => Promise<void>;
}

export function DeleteSongButton({ id, onDelete }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "La sugerencia se eliminará permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#18181b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: { popup: 'rounded-[2rem]' }
    });

    if (result.isConfirmed) {
      setLoading(true);
      const formData = new FormData();
      formData.append("id", id);
      
      await onDelete(formData);

      Swal.fire({
        title: "¡Eliminado!",
        text: "La canción fue quitada de la lista.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: { popup: 'rounded-[2rem]' }
      });
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="p-2 text-zinc-200 hover:text-rose-500 transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 size={18} />}
    </button>
  );
}