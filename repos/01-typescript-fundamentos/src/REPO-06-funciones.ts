export {};

/**
 * Fichero 06: Funciones en TypeScript
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 2 (concepto 13):
 * - Parametros obligatorios, opcionales, por defecto, rest
 * - Arrow functions
 * - Callbacks y closures
 * - Function overloads
 */

// ============================================================================
// FUNCIONES EN PROFUNDIDAD
// ============================================================================

// Parametros obligatorios
function saludar(nombre: string, edad: number): string {
    return `Hola, soy ${nombre} y tengo ${edad} anios`;
}

// Parametros opcionales (?)
function configurarURL(base: string, puerto?: number): string {
    if (puerto) return `${base}:${puerto}`;
    return base;
}

// Parametros por defecto
function crearUsuario(nombre: string, activo: boolean = true): object {
    return { nombre, activo };
}

// Rest parameters
function sumarTodo(...numeros: number[]): number {
    return numeros.reduce((total, n) => total + n, 0);
}
console.log(sumarTodo(1, 2, 3, 4, 5)); // 15

// Arrow functions
const duplicar = (x: number): number => x * 2;

// Callbacks
function ejecutarOperacion(
    a: number, b: number,
    operacion: (x: number, y: number) => number
): number {
    return operacion(a, b);
}

// Closures
function crearMultiplicador(factor: number): (valor: number) => number {
    return (valor: number) => valor * factor;
}
const duplicar2 = crearMultiplicador(2);
console.log(duplicar2(5));  // 10

// ============================================================================
// FUNCTION OVERLOADS
// ============================================================================

function procesarEntrada(x: string): string[];
function procesarEntrada(x: number): number[];
function procesarEntrada(x: string | number): string[] | number[] {
    if (typeof x === "string") return x.split("");
    return Array.from({ length: x }, (_, i) => i + 1);
}

console.log(procesarEntrada("hola")); // ["h","o","l","a"]
console.log(procesarEntrada(5));       // [1,2,3,4,5]

// Ejemplo de uso
console.log(saludar("Juan", 25));
console.log(configurarURL("http://localhost"));
console.log(configurarURL("http://localhost", 3000));
console.log(crearUsuario("Luis"));
console.log(ejecutarOperacion(5, 3, (a, b) => a + b));
