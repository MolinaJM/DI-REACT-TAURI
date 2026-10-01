// ============================================================
// S02 · Ejercicio 5 · Conversión de tipos — SOLUCIÓN
// ============================================================
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Bloque 7 · Conversión de tipos
import assert from "node:assert/strict";

// 1) JSON
interface Pedido {
  id: number;
  total: number;
}
function serializar(pedido: Pedido): string {
  return JSON.stringify(pedido);
}
function deserializar(guardado: string): Pedido {
  return JSON.parse(guardado) as Pedido;
}


// ---- Comprobaciones ----
const pedido: Pedido = { id: 1, total: 25.5 };
assert.deepEqual(deserializar(serializar(pedido)), pedido);
console.log("S02 · Ejercicio 7 · ¡OK!");
