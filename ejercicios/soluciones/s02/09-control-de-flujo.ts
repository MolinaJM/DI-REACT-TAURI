// ============================================================
// S02 · Ejercicio 11 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) if / else if / else
function clasificarNota(nota: number): string {
  if (nota >= 9) return "Sobresaliente";
  if (nota >= 7) return "Notable";
  if (nota >= 5) return "Aprobado";
  return "Suspenso";
}

// 2) switch exhaustivo con `never`
type EstadoFormulario = "pendiente" | "cargando" | "listo" | "error";
function etiquetaEstado(estado: EstadoFormulario): string {
  switch (estado) {
    case "pendiente": return "⏳";
    case "cargando": return "🔄";
    case "listo": return "✅";
    case "error": return "❌";
    default: {
      const exhaustivo: never = estado;
      return exhaustivo;
    }
  }
}

// 3) Bucles
function contarLetras(palabras: string[]): number {
  let total = 0;
  for (const palabra of palabras) total += palabra.length;
  return total;
}

// 4) Generar secuencia hacia atrás (for...of sobre un rango)
function cuentaAtras(hasta: number): number[] {
  const numeros: number[] = [];
  for (const n of Array.from({ length: hasta }, (_, i) => hasta - i)) {
    numeros.push(n);
  }
  return numeros;
}

// ---- Comprobaciones ----
assert.equal(clasificarNota(9), "Sobresaliente");
assert.equal(clasificarNota(7), "Notable");
assert.equal(clasificarNota(6), "Aprobado");
assert.equal(clasificarNota(4), "Suspenso");
assert.equal(etiquetaEstado("pendiente"), "⏳");
assert.equal(etiquetaEstado("error"), "❌");
assert.equal(contarLetras(["hola", "mundo"]), 9);
assert.deepEqual(cuentaAtras(3), [3, 2, 1]);
console.log("S02 · Ejercicio 11 · ¡OK!");