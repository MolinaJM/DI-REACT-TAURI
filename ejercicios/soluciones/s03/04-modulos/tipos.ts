// ============================================================
// S03 · Ejercicio 4 · SOLUCIÓN
// ============================================================
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
export type Estado = "disponible" | "agotado" | "prepedido";