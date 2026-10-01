// ============================================================
// S02 · Ejercicio 5 · Conversión de tipos
// ============================================================
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Bloque 7 · Conversión de tipos
// Completa. Solución: soluciones/07-conversion-tipos.ts

// 1) `JSON.stringify` / `JSON.parse` tipados
interface Pedido {
  id: number;
  total: number;
}
function serializar(pedido: Pedido): string {
  return ""; // TODO: JSON.stringify
}
function deserializar(guardado: string): Pedido {
  return JSON.parse(guardado) as Pedido;
}
