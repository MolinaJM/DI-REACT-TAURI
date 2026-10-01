// ============================================================
// S02 · Ejercicio 1b · Type Inference
// ============================================================
// Completa. Solución: soluciones/s02/02-type-inference.ts
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Bloque 2 · Type Inference

// 1) Inferencia básica
const numero = 42; // number (inferido)
const texto = "hola"; // string (inferido)
const activo = true; // boolean (inferido)

// 2) Inferencia en arrays y objetos
const numeros = [1, 2, 3]; // number[] (inferido)
const usuario = { nombre: "Ana", edad: 30 }; // { nombre: string; edad: number } (inferido)

// 3) Inferencia en funciones (retorno)
function suma(a: number, b: number) {
  return a + b; // number (inferido)
}

// 4) const vs let
let valorMutable = 10; // number (inferido)
const valorInmutable = 10; // 10 (literal inferido con const)
