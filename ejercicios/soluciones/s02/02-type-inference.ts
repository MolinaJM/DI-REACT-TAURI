// ============================================================
// S02 · Ejercicio 1b · Type Inference — SOLUCIÓN
// ============================================================
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Bloque 2 · Type Inference
import assert from "node:assert/strict";

// 1) Inferencia básica
const numero = 42; // number
const texto = "hola"; // string
const activo = true; // boolean

// 2) Inferencia en arrays y objetos
const numeros = [1, 2, 3]; // number[]
const usuario = { nombre: "Ana", edad: 30 }; // { nombre: string; edad: number }

// 3) Inferencia en funciones (retorno)
function suma(a: number, b: number) {
  return a + b; // number
}

// 4) const vs let
let valorMutable = 10; // number
const valorInmutable = 10; // 10

// ---- Comprobaciones ----
assert.equal(typeof numero, "number");
assert.equal(typeof texto, "string");
assert.equal(typeof activo, "boolean");
assert(Array.isArray(numeros));
assert.equal(typeof usuario.nombre, "string");
assert.equal(typeof usuario.edad, "number");
assert.equal(suma(1, 2), 3);
assert.equal(typeof valorMutable, "number");
assert.equal(typeof valorInmutable, "number");
console.log("S02 · Ejercicio 2 · ¡OK!");
