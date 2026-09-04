export {};

/**
 * Fichero 08: Control de Flujo y Scope
 * -------------------------------------------
 * - Condicionales (if/else, switch exhaustivo)
 * - Bucles (for...of)
 * - Hoisting y Temporal Dead Zone
 * - Clausuras (Closures)
 */

// ============================================================================
// CONDICIONALES
// ============================================================================

const puntuacion: number = 85;

if (puntuacion >= 90) {
    console.log("Excelente");
} else if (puntuacion >= 70) {
    console.log("Aprobado");
} else {
    console.log("Reprobado");
}

// Switch exhaustivo con tipos
type DiaSemana = "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes";

function actividad(dia: DiaSemana): string {
    switch (dia) {
        case "Lunes":     return "Reunion semanal";
        case "Martes":    return "Desarrollo";
        case "Miercoles": return "Code review";
        case "Jueves":    return "Desarrollo";
        case "Viernes":   return "Deploy";
        default:
            // Exhaustiveness check
            const _exhaustivo: never = dia;
            return _exhaustivo;
    }
}

// ============================================================================
// BUCLES
// ============================================================================

const frutas: string[] = ["manzana", "pera", "uva"];


// for...of (iterables)
for (const fruta of frutas) {
    console.log(fruta);
}

// for...of con strings
for (const letra of "TypeScript") {
    console.log(letra);
}



// ============================================================================
// AMBITO (SCOPE) Y HOISTING
// ============================================================================


// let/const: ambito de bloque, Temporal Dead Zone (TDZ)
function ejemploLet(): void {
    // console.log(y); // ReferenceError: TDZ
    let y: number = 10;
    const z: number = 15;
}

// Block scope con let
if (true) {
    let blockVar: string = "Solo aqui";
    console.log(blockVar); // OK
}
// console.log(blockVar); // Error: no definida fuera

// ============================================================================
// CLAUSURAS (CLOSURES)
// ============================================================================

function crearContador(inicial: number = 0): {
    incrementar: () => number;
    decrementar: () => number;
    valor: () => number;
} {
    let contador: number = inicial;

    return {
        incrementar: () => ++contador,
        decrementar: () => --contador,
        valor: () => contador,
    };
}

const c = crearContador(10);
console.log(c.incrementar()); // 11
console.log(c.incrementar()); // 12
console.log(c.decrementar()); // 11
console.log(c.valor());       // 11


// Ejecutar ejemplos
ejemploLet();
console.log(actividad("Lunes"));
