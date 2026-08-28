// ============================================================
// S02 · Ejercicio 2 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) Arrays
const numeros: number[] = [1, 2, 3, 4, 5, 6];
const edades: Array<number> = [25, 30, 35];
const matriz: number[][] = [
  [1, 2],
  [3, 4],
];

// 2) Métodos
const duplicados = numeros.map((n) => n * 2); // [2, 4, 6, 8, 10, 12]
const pares = numeros.filter((n) => n % 2 === 0); // [2, 4, 6]
const total = numeros.reduce((acc, n) => acc + n, 0); // 21

// 3) Tuplas
const coordenada: [number, number] = [10.5, 20.3];
const usuario: [number, string, boolean] = [1, "Ana", true];

// 4) Desestructuración
const [id, nombreUsuario, activo] = usuario;

// 5) Readonly
const inamovible: readonly number[] = [1, 2, 3];

// ---- Comprobaciones ----
assert.deepEqual(duplicados, [2, 4, 6, 8, 10, 12]);
assert.deepEqual(pares, [2, 4, 6]);
assert.equal(total, 21);
assert.deepEqual(coordenada, [10.5, 20.3]);
assert.equal(id, 1);
assert.equal(nombreUsuario, "Ana");
assert.equal(activo, true);
assert.equal(inamovible.length, 3);
console.log("S02 · Ejercicio 2 · ¡OK!");