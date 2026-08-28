/**
 * AdvancedFunctions.ts - Patrones avanzados de funciones
 * Fuente: Sesión 04 - Patrones avanzados de funciones
 * IIFE, recursión, closures, composición de funciones
 */

// --- Declaraciones, expresiones y arrow functions ---
// Declaración de función (hoisting)
function sumar(a: number, b: number): number {
  return a + b;
}

// Expresión de función
const multiplicar = function (a: number, b: number): number {
  return a * b;
};

// Arrow function
const dividir = (a: number, b: number): number => a / b;

// Arrow multilínea
const procesar = (items: number[]): number[] =>
  items
    .filter((n) => n > 0)
    .map((n) => n * 2)
    .sort((a, b) => a - b);

// --- Parámetros por defecto, rest y spread ---
// Parámetros por defecto
function saludar(nombre: string, saludo: string = "Hola"): string {
  return `${saludo}, ${nombre}`;
}

// Rest parameters
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}

// --- IIFE (Immediately Invoked Function Expression) ---
// IIFE clásica
(function () {
  const privado = "solo aquí";
  console.log(privado);
})();

// IIFE con arrow
(() => {
  const mensaje: string = "Ejecutada al instante";
  console.log(mensaje);
})();

// IIFE con parámetros
((nombre: string) => {
  console.log(`Hola, ${nombre}`);
})("TypeScript");

// --- Recursión tipada ---
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function fibonacci(n: number, memoria: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memoria.has(n)) return memoria.get(n)!;

  const resultado = fibonacci(n - 1, memoria) + fibonacci(n - 2, memoria);
  memoria.set(n, resultado);
  return resultado;
}

// --- Clausuras (closures) para factories ---
type Operacion = (x: number) => number;

function crearMultiplicador(factor: number): Operacion {
  return (x: number) => x * factor;
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

// --- Composición de funciones ---
function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (x: T) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const agregarIVA = (precio: number): number => precio * 1.21;
const redondear = (precio: number): number => Math.round(precio * 100) / 100;
const formatear = (precio: number): string => `${precio.toFixed(2)}€`;

const calcularPrecioFinal = compose(redondear, agregarIVA);

export {
  sumar,
  multiplicar,
  dividir,
  procesar,
  saludar,
  sumarTodos,
  factorial,
  fibonacci,
  crearMultiplicador,
  duplicar,
  triplicar,
  compose,
  agregarIVA,
  redondear,
  formatear,
  calcularPrecioFinal,
};

export type { Operacion };
