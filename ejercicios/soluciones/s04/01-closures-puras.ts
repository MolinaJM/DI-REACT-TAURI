// ============================================================
// S04 · Ejercicio 1 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

export interface Linea {
  producto: string;
  precio: number;
  cantidad: number;
}

// 1) Pura: mismo input → mismo output, sin efectos
export function subtotal(linea: Linea): number {
  return linea.precio * linea.cantidad;
}

// 2) Total con reduce
export function totalCarrito(carrito: Linea[]): number {
  return carrito.reduce((acc, linea) => acc + subtotal(linea), 0);
}

// 3) Currying
export function aplicarIVA(tasa: number): (precio: number) => number {
  return (precio) => precio * (1 + tasa);
}

// 4) Closure de límites (se usará en el onChange de inputs)
export function manejadorMinMax(min: number, max: number): (valor: number) => number {
  return (valor) => Math.min(max, Math.max(min, valor));
}

// 5) Stock bajo
export function reponerStock(carrito: Linea[], umbral: number): Linea[] {
  return carrito.filter((linea) => linea.cantidad < umbral);
}

// ---- Comprobaciones ----
const carrito: Linea[] = [
  { producto: "raton", precio: 10, cantidad: 2 },
  { producto: "teclado", precio: 50, cantidad: 1 },
];
assert.equal(subtotal(carrito[0]!), 20);
assert.equal(totalCarrito(carrito), 70);
const iva21 = aplicarIVA(0.21);
assert.equal(iva21(100), 121);
assert.equal(manejadorMinMax(0, 10)(15), 10);
assert.equal(manejadorMinMax(0, 10)(-5), 0);
assert.deepEqual(reponerStock(carrito, 2), [carrito[1]]);
console.log("S04 · Ejercicio 1 · ¡OK!");