// ============================================================
// S02 · Ejercicio 1 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) Declara cada variable con su tipo correcto
const nombre: string = "Ana";
const edad: number = 25;
const activo: boolean = true;
const nulo: null = null;
const sinDefinir: undefined = undefined;
const etiqueta: symbol = Symbol("id");

// 2) Inferencia: `ciudad` se infiere como string, así que `= 123` da error.
let ciudad = "Granada";

// 3) Conversión de tipos a partir de un número
const numero = 42;
const texto = String(numero); // "42"
const booleano = Boolean(numero); // true
const cadena = Number("42"); // 42

// 4) BigInt
const numeroGrande = 9007199254740991n;

// 5) Tuplas y arrays
const coordenada: [number, number] = [10, 20];
const nombres: string[] = ["Ana", "Luis"];

// ---- Comprobaciones ----
assert.equal(nombre, "Ana");
assert.equal(typeof edad, "number");
assert.equal(activo, true);
assert.equal(nulo, null);
assert.equal(sinDefinir, undefined);
assert.equal(typeof etiqueta, "symbol");
assert.equal(texto, "42");
assert.equal(booleano, true);
assert.equal(cadena, 42);
assert.equal(numeroGrande, 9007199254740991n);
assert.deepEqual(coordenada, [10, 20]);
assert.deepEqual(nombres, ["Ana", "Luis"]);
console.log("S02 · Ejercicio 1 · ¡OK!");