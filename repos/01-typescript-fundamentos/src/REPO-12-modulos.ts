export {};

/**
 * Fichero 12: Modulos
 * --------------------
 * - Modulos: export, import, default, re-export
 * - import type (modulos type-only)
 * (Declaraciones .d.ts / namespace / ambient modules: optativo, fuera de la ruta React + Tauri)
 */

// ============================================================================
// MODULOS EN TYPESCRIPT
// ============================================================================

// --- archivo: matematica.ts ---
export function sumar(a: number, b: number): number {
    return a + b;
}

export const PI = 3.14159;

export interface Operacion {
    (a: number, b: number): number;
}

// export default: se puede exportar por defecto una funcion o constante
export default function multiplicar(a: number, b: number): number {
    return a * b;
}

// --- archivo: app.ts ---
// import multiplicar, { sumar, PI } from "./matematica";
// import type { Operacion } from "./matematica";

console.log(sumar(5, 3));        // 8
console.log(multiplicar(4, 2));  // 8

// Re-exportar
// export { sumar, restar } from "./matematica";
// export * from "./matematica";

// ============================================================================
// STRICT MODE Y CONFIGURACION (referencia)
// ============================================================================

// strict: true activa:
// - strictNullChecks: no permite null/undefined donde no se espera
// - noImplicitAny: exige tipar parametros
// - strictFunctionTypes: funciones covariantes/contravariantes
// - noImplicitThis: this debe estar tipado
// (strictPropertyInitialization se aplica a clases, fuera de la ruta)

// strictNullChecks
let nombre: string | null = "Juan";
nombre = null;
// nombre.length;  // Error: Object is possibly 'null'

// noImplicitAny
// function procesar(param) {}  // Error: implicit any
