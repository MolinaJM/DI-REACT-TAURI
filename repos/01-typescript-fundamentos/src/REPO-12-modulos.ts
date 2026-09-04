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
