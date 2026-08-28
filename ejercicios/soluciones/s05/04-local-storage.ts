// ============================================================
// S05 · Ejercicio 4 · SOLUCIÓN
// ============================================================
import { useCallback, useEffect, useState } from "react";

export interface Preferencias {
  tema: "claro" | "oscuro";
  notificaciones: boolean;
}

const CLAVE = "di-rt:preferencias";

// 1) Carga con try/catch y valores por defecto
export function cargarPreferencias(): Preferencias {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (crudo === null) return { tema: "claro", notificaciones: true };
    return JSON.parse(crudo) as Preferencias;
  } catch {
    return { tema: "claro", notificaciones: true };
  }
}

// 2) Guardado
export function guardarPreferencias(pref: Preferencias): void {
  localStorage.setItem(CLAVE, JSON.stringify(pref));
}

// 3) Hook genérico
export function useLocalStorage<T>(clave: string, inicial: T): [T, (nuevo: T) => void] {
  const [valor, setValor] = useState<T>(() => {
    try {
      const crudo = localStorage.getItem(clave);
      return crudo === null ? inicial : (JSON.parse(crudo) as T);
    } catch {
      return inicial;
    }
  });

  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor));
  }, [clave, valor]);

  return [valor, useCallback((nuevo: T) => setValor(nuevo), [])];
}