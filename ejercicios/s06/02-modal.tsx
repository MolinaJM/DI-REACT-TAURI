// ============================================================
// S06 · Ejercicio 2 · Modal accesible
// ============================================================
// Solución: soluciones/s06/02-modal.tsx

import type { ReactNode } from "react";

// `Modal`: { abierto: boolean; onCerrar: () => void; titulo: string; children: ReactNode }
// Comportamiento:
//  - si `abierto` es false → devuelve null.
//  - fondo oscuro (backdrop) que NO cierra al hacer clic dentro del panel.
//  - botón "Cerrar" y X que llaman a onCerrar.
//  - aria-modal="true" y role="dialog" para accesibilidad.
export function Modal({
  abierto,
  onCerrar,
  titulo,
  children,
}: {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  children: ReactNode;
}) {
  return <div>Modal</div>; // TODO
}