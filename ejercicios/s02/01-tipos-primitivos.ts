// ============================================================
// S02 · Ejercicio 1 · Tipos primitivos, inferencia y conversión
// ============================================================
// Completa el código donde veas `// TODO`.
// La solución completa está en: soluciones/s02/01-tipos-primitivos.ts
// Para comprobarla:  npx tsx soluciones/s02/01-tipos-primitivos.ts

// 1) Declara cada variable con su tipo correcto
export const nombre = 123; // TODO: string
export const edad = "veinticinco"; // TODO: number
export const activo = "si"; // TODO: boolean
export const nulo = 0; // TODO: null
export const sinDefinir = 1; // TODO: undefined

// 2) Inferencia: ¿por qué la línea siguiente daría error si se descomenta?
// let ciudad = "Granada";  ciudad = 123;

// 3) Conversión de tipos a partir de un número
export const numero = 42;
const texto: string = numero; // TODO: usa String(numero)
const booleano: boolean = numero; // TODO: usa Boolean(numero) o !!
const cadena: number = numero; // TODO: usa Number("42") u otro valor

// 4) Tuplas y arrays
export const coordenada: number[] = [10, 20, "No"]; // TODO: tupla [number, number]
export const nombres: (number | string)[] = ["Ana", 1]; // TODO: solo strings


