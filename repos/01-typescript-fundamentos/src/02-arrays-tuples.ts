export {};

/**
 * Fichero 02: Arrays y Tuplas en TypeScript
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 2 (concepto 4):
 * - Arrays (ambas sintaxises, multidimensional, union, readonly)
 * - Tuplas (basica, opcional, etiquetas, destructuracion)
 */

// ============================================================================
// ARRAYS
// ============================================================================

// Sintaxis 1: Tipo[]
let numeros: number[] = [1, 2, 3, 4, 5];
let nombres: string[] = ["Ana", "Luis", "Maria"];

// Sintaxis 2: Array<Tipo>
let edades: Array<number> = [25, 30, 35, 40];

// Array multidimensional
let matriz: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Metodos de array preservan el tipo
let numerosDoblados: number[] = numeros.map(n => n * 2);

// Arrays con union
let mixto: (string | number)[] = ["texto", 42, "otro", 100];

// READONLY Array
let inamovible: ReadonlyArray<number> = [1, 2, 3];
// inamovible.push(4);  // Error: Property 'push' does not exist
let inamovible2: readonly number[] = [1, 2, 3];

// ============================================================================
// TUPLAS
// ============================================================================

// Tupla basica
let coordenada: [number, number] = [10.5, 20.3];
let usuario: [number, string, boolean] = [1, "Juan", true];

// Tupla con elementos opcionales
let entrada: [string, number?] = ["solo texto"];
entrada = ["con numero", 42];

// Tuplas con etiquetas (TS 4.0+)
let punto: [x: number, y: number, z: number] = [1, 2, 3];

// Destructuracion de tuplas
const [id, nombreCompleto, activo] = usuario;
console.log(id);            // 1
console.log(nombreCompleto); // "Juan"
console.log(activo);        // true

// Array VS Tupla
let arr: number[] = [1, 2, 3];        // cualquier longitud
let tup: [number, number] = [1, 2];   // exactamente 2 elementos
