export {};

/**
 * Fichero 10: Generics (Genericos)
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 3 (concepto 3):
 * - Funciones genericas (identity, multiples parametros)
 * - Constraint (restricciones con extends)
 * - keyof con genericos
 * - Interfaces y Tipos genericos
 * - Mapped Types (Tipos Mapeados)
 * - Conditional Types
 */

// ============================================================================
// FUNCIONES GENERICAS
// ============================================================================

// Funcion generica basica
function identidad<T>(valor: T): T {
    return valor;
}

const num = identidad(42);        // T: number
const str = identidad("hola");    // T: string

// Multiples parametros genericos
function par<T, U>(primero: T, segundo: U): [T, U] {
    return [primero, segundo];
}

const resultado = par("edad", 30);  // [string, number]

// Generico con array
function primerElemento<T>(arr: T[]): T | undefined {
    return arr[0];
}

// Constraint (restriccion)
interface ConLongitud { length: number; }

function mostrarLongitud<T extends ConLongitud>(item: T): number {
    return item.length;
}

console.log(mostrarLongitud("texto"));    // 5
console.log(mostrarLongitud([1, 2, 3]));  // 3
// console.log(mostrarLongitud(42));      // Error: number no tiene length

// Keyof con genericos
function obtenerPropiedad<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const persona = { nombre: "Ana", edad: 30 };
console.log(obtenerPropiedad(persona, "nombre"));  // "Ana"
// obtenerPropiedad(persona, "pais");  // Error: "pais" no es keyof

// ============================================================================
// INTERFACES Y CLASES GENERICAS
// ============================================================================

// Interface generica
interface Caja<T> {
    contenido: T;
    abrir: () => T;
}

const cajaString: Caja<string> = {
    contenido: "secreto",
    abrir: () => "secreto abierto"
};

// Type generico
type Respuesta<T> = {
    exito: boolean;
    datos: T;
    error?: string;
};

type UsuarioResp = Respuesta<{ id: number; nombre: string }>;

const usuarioResp: UsuarioResp = { exito: true, datos: { id: 1, nombre: "Ana" } };
console.log(usuarioResp.datos.nombre); // "Ana"
// (Las clases genericas quedan fuera de la ruta; los genericos se usan con functions/types)

// ============================================================================
// MAPPED TYPES (Tipos Mapeados)
// ============================================================================

type SoloLectura<T> = {
    readonly [P in keyof T]: T[P];
};

type Opcional<T> = {
    [P in keyof T]?: T[P];
};

interface UsuarioMapped {
    id: number;
    nombre: string;
    email: string;
}

type UsuarioSoloLectura = SoloLectura<UsuarioMapped>;
// { readonly id: number; readonly nombre: string; readonly email: string; }

type UsuarioOpcional = Opcional<UsuarioMapped>;
// { id?: number; nombre?: string; email?: string; }

// Renombrar propiedades (TS 4.1+)
type Prefijar<T, P extends string> = {
    [K in keyof T as `${P}${Capitalize<string & K>}`]: T[K];
};

type UsuarioPrefijado = Prefijar<UsuarioMapped, "usuario">;
// { usuarioId: number; usuarioNombre: string; usuarioEmail: string; }

// ============================================================================
// CONDITIONAL TYPES
// ============================================================================

type EsString<T> = T extends string ? "Si" : "No";
type A = EsString<string>;  // "Si"
type B = EsString<number>;  // "No"

// Infer con condicionales
type ElementoArray<T> = T extends (infer U)[] ? U : never;
type E1 = ElementoArray<string[]>;    // string
type E2 = ElementoArray<number[][]>;   // number[]

type TipoRetorno<T> = T extends (...args: any[]) => infer R ? R : never;
type R1 = TipoRetorno<() => string>;  // string

// Distributive conditional types
type SinNull<T> = T extends null | undefined ? never : T;
type SinNullUnion = SinNull<string | number | null | undefined>;
// Resultado: string | number

// Ejemplos de uso
console.log(num, str);
console.log(resultado);
console.log(primerElemento([10, 20, 30]));
