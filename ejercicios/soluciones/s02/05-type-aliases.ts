// ============================================================
// S02 · Ejercicio 3 · Type Aliases — SOLUCIÓN
// ============================================================
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Bloque 5 · Type Aliases
import assert from "node:assert/strict";

// 1) Type aliases
type Punto2D = { x: number; y: number };
type Callback = (error: Error | null) => void;


// 2) Alias de primitivo
type Email = string;


// ---- Comprobaciones ----
const punto: Punto2D = { x: 1, y: 2 };
const emailOk: Email = "a@b.com";
assert.deepEqual(punto, { x: 1, y: 2 });
assert.equal(typeof emailOk, "string");
console.log("S02 · Ejercicio 5 · ¡OK!");
