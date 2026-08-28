// ============================================================
// S02 · Ejercicio 5 · Interfaces y type aliases
// ============================================================
// Completa. Solución: soluciones/s02/05-interfaces-types.ts

// 1) Define una interfaz `Usuario` con id (number), nombre (string) y email (string)
export interface Usuario {
  // TODO
}

// 2) Define `Configuracion` con url (string) y puerto (number) OPCIONAL
export interface Configuracion {
  url: string;
  // TODO: puerto?: number
}

// 3) Extiende: `Admin` = Usuario + rol ("admin" | "editor")
export interface Admin {
  // TODO: extends Usuario
}

// 4) Type alias: `Punto2D` como objeto { x, y }, `Callback` como función (err: Error | null) => void
export type Punto2D = unknown; // TODO
export type Callback = unknown; // TODO

// 5) Union de primitivos con type
export type Email = unknown; // TODO: string

// 6) Crea un objeto `profe` de tipo Usuario
export const profe: Usuario = {
  // TODO
};