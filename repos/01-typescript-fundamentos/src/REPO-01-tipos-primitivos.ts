export {};

/**
 * Fichero 01: Tipos Primitivos en TypeScript
 * -------------------------------------------
 * - Que es TypeScript (comparacion JS vs TS)
 * - Tipos primitivos basicos
 * - Inferencia de tipos (Type Inference)
 */

// ============================================================================
// 1. QUE ES TYPESCRIPT - Problemas que soluciona
// ============================================================================

// JAVASCRIPT: errores silenciosos en tiempo de ejecucion
function sumar(a: any, b: any): any {
    return a + b;
}
console.log(sumar(5, "3"));          // "53" (concatenacion, no suma)
console.log(sumar([], {}));          // "[object Object]" (sin sentido)
// @ts-expect-error demostrando error de JS: falta el segundo argumento
console.log(sumar(5));               // NaN (falta el segundo argumento)

// TYPESCRIPT: detecta estos errores al escribir
function sumarTS(a: number, b: number): number {
    return a + b;
}
// sumarTS(5, "3");  // Error: Argument of type 'string' not assignable to 'number'
// sumarTS(5);       // Error: Expected 2 arguments, but got 1
console.log(sumarTS(5, 3));    // 8 - correcto

// ============================================================================
// 2. TIPOS PRIMITIVOS BASICOS
// ============================================================================

let nombre: string = "Juan Perez";
let edad: number = 30;
let esActivo: boolean = true;
let indefinido: undefined = undefined;
let nulo: null = null;

// SYMBOL (ES6+)
let simbolo: symbol = Symbol("identificador-unico");
const otroSimbolo: unique symbol = Symbol("solo-unico");

// BIGINT (ES2020+)
let numeroGrande: bigint = 9007199254740991n;
let otroBigInt = BigInt(42);

// ============================================================================
// 3. INFERENCIA DE TIPOS (Type Inference)
// ============================================================================

// In basica: TypeScript infiere el tipo a partir del valor
let x = 3;              // inferido: number
let nombreInferido = "Ana";     // inferido: string
let arrInferido = [1, 2, 3];    // inferido: number[]
let esValido = false;            // inferido: boolean

// Inferencia contextual
const numeros = [1, 2, 3];
const dobles = numeros.map((n) => n * 2);  // n es number

// Best common type
let animales = ["perro", "gato", 42];  // (string | number)[]

// Literal types (inferencia exacta)
const constante = "Hola";    // tipo: "Hola" (literal)
let variable = "Hola";       // tipo: "string" (se amplia)

// Inferencia en desestructuracion
function procesar({ nombre, edad }: { nombre: string; edad: number }) {
    return `${nombre} tiene ${edad} anios`;
}
console.log(procesar({ nombre: "Ana", edad: 30 }));
