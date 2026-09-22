// ============================================================
// S02 · Ejercicio 6 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) Parámetros obligatorios
function saludar(nombre: string, edad: number): string {
  return `Hola, soy ${nombre} y tengo ${edad} anios`;
}

// 2) Opcional + por defecto
function configurarURL(base: string, puerto?: number): string {
  return puerto ? `${base}:${puerto}` : base;
}

function crearUsuario(
  nombre: string,
  activo: boolean = true
): { nombre: string; activo: boolean } {
  return { nombre, activo };
}

// 3) Rest parameters
function sumarTodo(...numeros: number[]): number {
  let total = 0;
  for (const n of numeros) {
    total += n;
  }
  return total;
}

// 4) Callback tipado
function ejecutarOperacion(
  a: number,
  b: number,
  operacion: (x: number, y: number) => number
): number {
  return operacion(a, b);
}

// 5) Closure
function crearMultiplicador(factor: number): (valor: number) => number {
  return (valor) => valor * factor;
}

// 6) Overloads
function procesarEntrada(x: string): string[];
function procesarEntrada(x: number): number[];
function procesarEntrada(x: string | number): string[] | number[] {
  if (typeof x === "string") return x.split("");
  return Array.from({ length: x }, (_, i) => i + 1);
}

// ---- Comprobaciones ----
assert.equal(saludar("Ana", 25), "Hola, soy Ana y tengo 25 anios");
assert.equal(configurarURL("http://x"), "http://x");
assert.equal(configurarURL("http://x", 3000), "http://x:3000");
assert.deepEqual(crearUsuario("Luis"), { nombre: "Luis", activo: true });
assert.equal(sumarTodo(1, 2, 3, 4, 5), 15);
assert.equal(ejecutarOperacion(4, 5, (a, b) => a * b), 20);
const duplicar = crearMultiplicador(2);
assert.equal(duplicar(5), 10);
assert.deepEqual(procesarEntrada("hola"), ["h", "o", "l", "a"]);
assert.deepEqual(procesarEntrada(5), [1, 2, 3, 4, 5]);
console.log("S02 · Ejercicio 6 · ¡OK!");