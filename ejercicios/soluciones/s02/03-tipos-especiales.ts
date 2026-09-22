// ============================================================
// S02 · Ejercicio 3 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 2) Equivalente seguro a `any`: usar unknown y estrechar antes de usar.
export const cualquierCosa: unknown = "texto";

// 3) void: la función no devuelve nada
export function logMensaje(mensaje: string): void {
  console.log("[log]", mensaje);
}

// 4) never: siempre lanza
export function errorFatal(mensaje: string): never {
  throw new Error(mensaje);
}

// ---- Comprobaciones ----
assert.throws(() => errorFatal("boom"));
console.log("S02 · Ejercicio 3 · ¡OK!");