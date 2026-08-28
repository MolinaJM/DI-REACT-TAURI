// ============================================================
// S06 · Ejercicio 1 · Botón personalizado
// ============================================================
// Solución: soluciones/s06/01-boton.tsx

import type { ReactNode } from "react";

// 1) `Boton` con variantes y estados.
//    Props: { children: ReactNode; variante?: "primaria"|"secundaria"|"peligro";
//            deshabilitado?: boolean; onClick?: () => void }
//    Renderiza <button className={`boton boton-${variante}`} disabled={deshabilitado}>
export function Boton(props: {
  children: ReactNode;
  variante?: "primaria" | "secundaria" | "peligro";
  deshabilitado?: boolean;
  onClick?: () => void;
}) {
  return <button>{props.children}</button>; // TODO
}

// 2) `BotonContar`: usa Boton y mantiene un contador interno.
//    Deshabilítalo cuando el contador llegue a 10.
export function BotonContar() {
  return <Boton>0</Boton>; // TODO
}