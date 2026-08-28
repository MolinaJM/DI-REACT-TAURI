// ============================================================
// S05 · Ejercicio 1 · useState: contadores y control de inputs
// ============================================================
// Solución: soluciones/s05/01-use-state.tsx
// Recuerda: NUNCA mutar el estado; siempre usar el setter con valor nuevo.

import { useState } from "react";

// 1) `Contador`: muestras el contador y 3 botones (+1, −1, reiniciar).
//    Un botón "sumando el doble" debe hacer dos actualizaciones → usa updater f(x).
export function Contador() {
  return <div>0</div>; // TODO
}

// 2) `TextoEnVivo`: input controlado que muestra en vivo lo que se escribe.
export function TextoEnVivo() {
  return <input />; // TODO
}

// 3) `Alternar`: checkbox que muestra "ON"/"OFF".
export function Alternar() {
  return <label>OFF</label>; // TODO
}

// 4) `Seleccion`: <select> con 3 opciones; muestra la opción elegida.
export function Seleccion() {
  return <select>{["cafe", "te", "te-chai"].map((o) => <option key={o} value={o}>{o}</option>)}</select>; // TODO: estado + mostrar selección
}