export {};

/**
 * Fichero 07: Type Guards Avanzados, Conversion de Tipos y Operadores
 * -------------------------------------------------------------------
 * - Custom Type Guards (funciones predictoras)
 * - Assertion functions
 * - Conversion explícita de tipos
 * - JSON stringify/parse tipados
 * - Truthy/Falsy
 * - Nullish coalescing (??)
 * - Operadores logicos y asignacion
 */

// ============================================================================
// TYPE GUARDS AVANZADOS
// ============================================================================

// Custom Type Guards (funciones predictoras)
interface Pez { tipo: "pez"; profundidadMaxima: number; }
interface Ave { tipo: "ave"; envergadura: number; }
type Animal = Pez | Ave;

function esPez(animal: Animal): animal is Pez {
    return animal.tipo === "pez";
}

function describirAnimal(animal: Animal): string {
    if (esPez(animal)) {
        return `Pez que nada hasta ${animal.profundidadMaxima}m`;
    }
    return `Ave con envergadura de ${animal.envergadura}cm`;
}

// Type predicate con filtros
interface UsuarioActivo { activo: true; ultimoAcceso: Date; }
interface UsuarioInactivo { activo: false; }
type UsuarioEstado = UsuarioActivo | UsuarioInactivo;

function filtrarActivos(usuarios: UsuarioEstado[]): UsuarioActivo[] {
    return usuarios.filter((u): u is UsuarioActivo => u.activo === true);
}

// Assertion functions
function afirmarString(valor: unknown): asserts valor is string {
    if (typeof valor !== "string") {
        throw new Error("Se esperaba un string");
    }
}

function procesarMensaje(mensaje: unknown): void {
    afirmarString(mensaje);
    console.log(mensaje.toUpperCase()); // mensaje es string aqui
}

// ============================================================================
// CONVERSION EXPLICADA DE TIPOS
// ============================================================================

const numero: number = 42;
const texto: string = String(numero);

const cadena: string = "42";
const entero: number = Number(cadena);     // 42
const decimal: number = parseFloat("42.5"); // 42.5

const valor: number = 0;
const booleano: boolean = Boolean(valor); // false

// Trucos rapidos (type coercion controlada)
const xConv: number = +"42";          // string -> number: 42
// @ts-expect-error demostracion: !! sobre string no vacio siempre es true
const yConv: boolean = !!"Hola";      // string -> boolean: true
const zConv: string = `${true}`;      // boolean -> string: "true"

// ============================================================================
// CONVERSION ENTRE OBJETOS Y JSON
// ============================================================================

interface Usuario {
    nombre: string;
    edad: number;
}

const usuario: Usuario = { nombre: "PROFE", edad: 35 };

// Objeto -> string JSON
const json: string = JSON.stringify(usuario);

// string JSON -> objeto (con type assertion)
const recuperado: Usuario = JSON.parse(json) as Usuario;
console.log(recuperado.nombre); // "PROFE"

// ============================================================================
// TRUTHY Y FALSY
// ============================================================================

// Falsy: false, 0, -0, 0n, "", null, undefined, NaN
// Truthy: todo lo demas

function mostrarMensaje(mensaje?: string): void {
    if (mensaje) {
        console.log(mensaje);
    }
}

function procesarValor(valor: number | null | undefined): number {
    return valor ?? 0; // nullish coalescing: solo null/undefined
}

console.log(procesarValor(null));   // 0
console.log(procesarValor(0));      // 0 (no se reemplaza)
console.log(procesarValor(42));     // 42

// ============================================================================
// OPERADORES
// ============================================================================

// Comparacion estricta vs. abstracta
const a: number = 5;
const b: string = "5";
// @ts-expect-error demostracion: number vs string en comparaciones
console.log(a == b);   // true (coercion de tipo)
// @ts-expect-error demostracion: number vs string en comparaciones
console.log(a === b);  // false (tipos diferentes)
// @ts-expect-error demostracion: number vs string en comparaciones
console.log(a !== b);  // true

// Operadores logicos y short-circuit
// @ts-expect-error demostracion: expresiones siempre truthy/falsy en JS
console.log("Hola" && 42);           // 42 (ultimo truthy)
// @ts-expect-error demostracion: expresiones siempre truthy/falsy en JS
console.log(null || "defecto");      // "defecto" (primer truthy)

function obtenerNombre(nombre?: string): string {
    return nombre || "Invitado"; // fallback si es falsy
}

// Nullish Coalescing (??)
const volumen: number = 0;
console.log(volumen || 50);  // 50 (0 es falsy)
console.log(volumen ?? 50);  // 0 (0 no es null/undefined)

interface Config {
    nombre?: string;
    volumen: number;
}

function iniciar(config: Config): Config {
    return {
        nombre: config.nombre ?? "Anonimo",
        volumen: config.volumen ?? 50,
    };
}

// Operadores de asignacion logica (ES2021)
let nombreAsig: string = "";
nombreAsig ||= "Anonimo";                         // "" es falsy -> "Anonimo"
console.log(nombreAsig);

let usuarioAsig: unknown = { id: 1 };
usuarioAsig &&= usuarioAsig;                          // solo si es truthy

let puntuacion: number | null = null;
puntuacion ??= 100;                           // solo si null/undefined
console.log(puntuacion);                      // 100

// Operador ternario
const edad: number = 20;
const puedeVotar: string = edad >= 18 ? "Si" : "No";
console.log(`Puede votar? ${puedeVotar}`);

// Ejemplos de uso
console.log(describirAnimal({ tipo: "pez", profundidadMaxima: 10 }));
console.log(describirAnimal({ tipo: "ave", envergadura: 50 }));
