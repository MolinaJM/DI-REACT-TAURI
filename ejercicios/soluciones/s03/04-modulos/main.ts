// ============================================================
// S03 · Ejercicio 4 · SOLUCIÓN · main.ts
// ============================================================
import assert from "node:assert/strict";
import { sumar, restar, esPar } from "./funciones.js";
import descripcion, { NOMBRE_APP, VERSION } from "./constantes.js";
import type { Producto, Estado } from "./tipos.js";

const producto: Producto = { id: 1, nombre: "Ratón", precio: 19.9 };
const estado: Estado = "disponible";

function formatearProducto(p: Producto): string {
  return `${p.nombre}: ${p.precio.toFixed(2)} €`;
}

// ---- Comprobaciones ----
assert.equal(NOMBRE_APP, "DI-RT");
assert.equal(VERSION, "1.0.0");
assert.equal(typeof descripcion, "string");
assert.equal(sumar(2, 3), 5);
assert.equal(restar(5, 2), 3);
assert.equal(esPar(4), true);
assert.equal(estado, "disponible");
assert.equal(formatearProducto(producto), "Ratón: 19.90 €");
console.log("S03 · Ejercicio 4 · ¡OK!");
console.log(NOMBRE_APP, VERSION, "·", formatearProducto(producto));