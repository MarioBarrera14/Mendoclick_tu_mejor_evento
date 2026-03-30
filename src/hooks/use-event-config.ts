"use client";

import { useState, useEffect, useCallback } from "react";
import type { EventConfigData } from "@/types";

interface UseEventConfigReturn {
  config: EventConfigData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateConfig: (data: Partial<EventConfigData>) => Promise<boolean>;
}

export function useEventConfig(): UseEventConfigReturn {
  const [config, setConfig] = useState<EventConfigData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/events/config");
      if (!response.ok) {
        throw new Error("Error al cargar la configuración");
      }
      const data = await response.json();
      setConfig(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateConfig = useCallback(async (data: Partial<EventConfigData>): Promise<boolean> => {
    try {
      const response = await fetch("/api/events/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la configuración");
      }

      const updated = await response.json();
      setConfig(updated);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return {
    config,
    isLoading,
    error,
    refetch: fetchConfig,
    updateConfig,
  };
}
