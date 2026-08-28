export {};

/**
 * Fichero 03: Tipos Especiales y Aserciones
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 2 (conceptos 6 y 7):
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

// Sintaxis "as" (recomendada)
// const inputElement = document.getElementById("miInput") as HTMLInputElement;
// inputElement.value = "nuevo valor";

// Sintaxis <> (no funciona en JSX)
// const otroInput = <HTMLInputElement>document.getElementById("otroInput");

// NON-NULL ASSERTION (operador !)
function obtenerNombre(nombre?: string | null): string {
    return nombre!;
}

// CONST ASSERTIONS
let config = { api: "http://localhost", port: 3000 } as const;
// config.port = 4000;  // Error: readonly

let colores = ["rojo", "verde", "azul"] as const;
// Tipo: readonly ["rojo", "verde", "azul"]
