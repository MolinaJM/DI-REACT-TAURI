// ============================================================
// S03 · Ejercicio 4 · Módulos ES · tipos.ts
// ============================================================
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
export type Estado = ""; // TODO: "disponible" | "agotado" | "prepedido"