export {};

/**
 * Fichero 03: Tipos Especiales y Aserciones
 * -------------------------------------------
 * - any, unknown, void, never
 * - Type Assertions (aserciones de tipo)
 * (Enums: optativo, fuera de la ruta React + Tauri)
 */

// ============================================================================
// TIPOS ESPECIALES: any, unknown, never, void
// ============================================================================

// any: desactiva el chequeo de tipos (EVITAR)
let cualquierCosa: any = "texto";
cualquierCosa = 42;
// ⚠️ ATENCIÓN: el script SE CORTA AQUÍ a propósito.
// En compilación `any` no avisa (ese era el objetivo), pero en ejecución
// esto lanza un TypeError (metodoInexistente no existe) y detiene el fichero.
// Comenta esta línea si quieres ver el resto de ejemplos (unknown, never, aserciones).
cualquierCosa.metodoInexistente(); // sin error en compilacion

// unknown: tipo seguro para valores desconocidos
let valorDesconocido: unknown = "Hola";
// valorDesconocido.toUpperCase();  // Error: Object is of type 'unknown'
if (typeof valorDesconocido === "string") {
    console.log(valorDesconocido.toUpperCase()); // seguro
}

// void: ausencia de valor de retorno
function logMensaje(mensaje: string): void {
    console.log(mensaje);
}

// never: NUNCA ocurre un retorno
function errorFatal(mensaje: string): never {
    throw new Error(mensaje);
}

// never en exhaustiveness checking
type Forma = "circulo" | "cuadrado";
function area(forma: Forma): number {
    switch (forma) {
        case "circulo": return 3.14;
        case "cuadrado": return 4;
        default:
            const _exhaustivo: never = forma;
            return _exhaustivo;
    }
}

// ============================================================================
// TYPE ASSERTIONS (Aserciones de Tipo)
// ============================================================================

// Sintaxis "as" (recomendada). Sin DOM: los datos vienen de JSON.parse o del
// resultado de `invoke` (Tauri), no de peticiones manuales al HTML.
const json = '{"id": 1, "nombre": "Ana"}';
const recuperado = JSON.parse(json) as { id: number; nombre: string };
console.log(recuperado.nombre); // "Ana"

// Sintaxis <> (no funciona en JSX). Equivalente al `as` anterior:
const recuperado2 = <{ id: number; nombre: string }>JSON.parse(json);

// NON-NULL ASSERTION (operador !)
function obtenerNombre(nombre?: string | null): string {
    return nombre!;
}

// CONST ASSERTIONS
let config = { api: "http://localhost", port: 3000 } as const;
// config.port = 4000;  // Error: readonly

let colores = ["rojo", "verde", "azul"] as const;
// Tipo: readonly ["rojo", "verde", "azul"]
