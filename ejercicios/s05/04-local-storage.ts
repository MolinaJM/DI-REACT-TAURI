// ============================================================
// S05 · Ejercicio 4 · Persistencia con localStorage
// ============================================================
// Solución: soluciones/s05/04-local-storage.ts

export interface Preferencias {
  tema: "claro" | "oscuro";
  notificaciones: boolean;
}

const CLAVE = "di-rt:preferencias";

// 1) `cargarPreferencias`: lee de localStorage y devuelve el objeto;
//    si no existe, los valores por defecto. Usa try/catch (JSON puede fallar).
export function cargarPreferencias(): Preferencias {
  return { tema: "claro", notificaciones: true };
}

// 2) `guardarPreferencias`: serializa y guarda.
export function guardarPreferencias(pref: Preferencias): void {
  void pref;
}

// 3) Hook: useLocalStorage(clave, inicial) devuelve [valor, setValor]
//    y sincroniza con localStorage tras cada cambio.
export function useLocalStorage<T>(clave: string, inicial: T): [T, (nuevo: T) => void] {
  return [inicial, () => void clave];
}