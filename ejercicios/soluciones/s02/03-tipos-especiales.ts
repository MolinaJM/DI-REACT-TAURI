// ============================================================
// S02 · Ejercicio 3 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) unknown → narrowing manual
export function procesar(valor: unknown): string {
  if (typeof valor === "string") return valor.toUpperCase();
  if (typeof valor === "number") return String(valor * 2);
  return "desconocido";
}

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

// 5) Exhaustiveness check con never
type Forma = "circulo" | "cuadrado";

export function area(forma: Forma): number {
  switch (forma) {
    case "circulo":
      return 3.14;
    case "cuadrado":
      return 4;
    default: {
      const _exhaustivo: never = forma;
      return _exhaustivo;
    }
  }
}

// ---- Comprobaciones ----
assert.equal(procesar("hola"), "HOLA");
assert.equal(procesar(21), "42");
assert.equal(procesar(true), "desconocido");
assert.equal(area("circulo"), 3.14);
assert.equal(area("cuadrado"), 4);
assert.throws(() => errorFatal("boom"));
console.log("S02 · Ejercicio 3 · ¡OK!");