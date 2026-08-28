export {};

/**
 * Fichero 08: Control de Flujo, Scope y This
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 2 (conceptos 17 y 18):
 * - Condicionales (if/else, switch exhaustivo)
 * - Bucles (for, for...of, while, do...while)
 * - break y continue
 * - var vs let/const
 * - Hoisting y Temporal Dead Zone
 * - Clausuras (Closures)
 * - La palabra clave this
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

// for clasico
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}

// for...of (iterables)
for (const fruta of frutas) {
    console.log(fruta);
}

// for...of con strings
for (const letra of "TypeScript") {
    console.log(letra);
}

// while
let contador: number = 0;
while (contador < 3) {
    console.log(contador);
    contador++;
}

// do...while
let x: number = 5;
do {
    console.log(x);
    x--;
} while (x > 0);

// break y continue
for (let i: number = 0; i < 5; i++) {
    if (i === 2) continue; // salta iteracion
    if (i === 4) break;    // sale del bucle
    console.log(i);        // 0, 1, 3
}

// ============================================================================
// AMBITO (SCOPE) Y HOISTING
// ============================================================================

// var: ambito de funcion, hoisting con undefined
function ejemploVar(): void {
    // @ts-expect-error demostracion: var hoisting (variable usada antes de asignar)
    console.log("var hoisting:", typeof xVar); // undefined (hoisting)
    var xVar: number = 5;
}

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

// ============================================================================
// LA PALABRA CLAVE 'THIS'
// ============================================================================

// this en metodos tradicionales vs arrow functions
interface UsuarioThis {
    nombre: string;
    asignaturas: string[];
    mostrarFlecha: () => void;
    mostrarTradicional: () => void;
}

const usuarioThis: UsuarioThis = {
    nombre: "PROFE",
    asignaturas: ["DWEC", "DIW"],
    mostrarFlecha(): void {
        this.asignaturas.forEach((asig) => {
            console.log(this.nombre, asig); // this = usuarioThis
        });
    },
    mostrarTradicional(): void {
        this.asignaturas.forEach(function (asig) {
            // this = undefined (strict mode) o window
            // @ts-expect-error demostracion: this pierde contexto en function callback
            console.log(this?.nombre, asig);
        });
    },
};

// Perdida de this y soluciones (sin clases: metodos de objeto)
const saludador = {
    nombre: "Ana",
    saludar(): void {
        console.log(`Hola, soy ${this.nombre}`);
    },
};

// Se pierde el this
setTimeout(saludador.saludar, 100); // "Hola, soy undefined"

// Arrow wrapper
setTimeout(() => saludador.saludar(), 100); // "Hola, soy Ana"

// bind
setTimeout(saludador.saludar.bind(saludador), 100); // "Hola, soy Ana"

// Ejecutar ejemplos
ejemploVar();
ejemploLet();
console.log(actividad("Lunes"));
usuarioThis.mostrarFlecha();
