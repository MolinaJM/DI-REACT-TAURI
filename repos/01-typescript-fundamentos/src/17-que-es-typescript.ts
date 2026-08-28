export {};

/**
 * Fichero 17: Que es TypeScript
 * -------------------------------------------
 * TypeScript es un superconjunto de JavaScript que anade
 * tipado estatico opcional. Todo codigo JavaScript valido
 * es TypeScript valido, pero TypeScript extiende JS con un
 * sistema de tipos que permite detectar errores en tiempo
 * de compilacion.
 *
 * - JavaScript detecta errores solo en tiempo de ejecucion
 * - TypeScript detecta errores al escribir (compilacion)
 * - TypeScript compila a JavaScript plano (navegador no lo entiende directamente)
 *
 * Ejemplos extraidos de Sesion 2 (concepto 1):
 * - Problemas de JS sin tipos
 * - Solucion con TS tipado
 */

// ========================================
// PROBLEMAS QUE SOLUCIONA TYPESCRIPT
// ========================================

// JavaScript: errores silenciosos en tiempo de ejecucion
function sumarJS(a: any, b: any): any {
    return a + b;
}

console.log("=== JavaScript (con any) ===");
console.log(sumarJS(5, "3"));          // "53" (concatenacion, no suma)
console.log(sumarJS([], {}));          // "[object Object]" (sin sentido)
// @ts-expect-error demostracion: falta el segundo argumento en JS
console.log(sumarJS(5));               // NaN (falta el segundo argumento)

// TypeScript: detecta estos errores al escribir
function sumarTS(a: number, b: number): number {
    return a + b;
}

console.log("\n=== TypeScript (tipado) ===");
console.log(sumarTS(5, 3));            // 8 - correcto
// sumarTS(5, "3");  // Error: Argument of type 'string' not assignable to 'number'
// @ts-expect-error demostracion: faltaba el segundo argumento
sumarTS(5);       // Error: Expected 2 arguments, but got 1

// ========================================
// DIFERENCIAS CLAVE
// ========================================

// JS: el tipo puede cambiar durante la ejecucion
let mutable = 42;
// @ts-expect-error demostracion: JS permite cambiar tipo, TS no
mutable = "ahora soy string";  // OK en JS, problema silencioso

// TS: detecta el conflicto de tipos
let tipado: number = 42;
// tipado = "hola";  // Error: Type 'string' is not assignable to type 'number'

// JS: no sabe que propiedad existe
const usuario = { nombre: "Ana", edad: 25 };
// console.log(usuario.telefono);  // undefined (sin error)

// TS: valida propiedades en tiempo de compilacion
interface Usuario {
    nombre: string;
    edad: number;
}
const usuarioTS: Usuario = { nombre: "Ana", edad: 25 };
// console.log(usuarioTS.telefono);  // Error: Property 'telefono' does not exist

// ========================================
// VENTAJAS DE TYPESCRIPT
// ========================================

// 1. Autocompletado inteligente
// El editor sugiere propiedades y metodos correctos

// 2. Refactor seguro
// Cambiar un nombre de tipo actualiza todas las referencias

// 3. Documentacion viva
// Los tipos documentan que espera cada funcion

// 4. Deteccion temprana de bugs
// Errores antes de ejecutar el codigo

console.log("\n=== Resumen ===");
console.log("TypeScript = JavaScript + Tipos estaticos");
console.log("Detecta errores al escribir, no al ejecutar");
console.log("Compila a JS plano que el navegador entiende");
