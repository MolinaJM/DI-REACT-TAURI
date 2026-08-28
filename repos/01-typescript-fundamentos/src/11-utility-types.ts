export {};

/**
 * Fichero 11: Utility Types
 * --------------------------
 * Ejemplos extraidos de Sesion 3 (concepto 5):
 * - Utility Types: Partial, Required, Readonly, Pick, Omit, Record
 * - Utility Types: Extract, Exclude, NonNullable
 * - Utility Types: Parameters, ReturnType, Awaited
 * (Template Literal Types: optativo, fuera de la ruta React + Tauri)
 */

// ============================================================================
// UTILITY TYPES (Tipos Utiles)
// ============================================================================

interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    completada: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

// Partial<T>: todas las propiedades opcionales
function actualizarTarea(id: number, cambios: Partial<Tarea>): void {
    console.log(cambios);
}
actualizarTarea(1, { titulo: "Nuevo titulo" });

// Required<T>: todas obligatorias
type TareaCompleta = Required<Tarea>;

// Readonly<T>: solo lectura
type TareaSoloLectura = Readonly<Tarea>;

// Pick<T, K>: selecciona propiedades
type TareaResumen = Pick<Tarea, "id" | "titulo" | "completada">;

// Omit<T, K>: omite propiedades
type TareaSinFechas = Omit<Tarea, "createdAt" | "updatedAt">;

// Record<K, V>: objeto con claves K y valores V
type Pagina = "inicio" | "productos" | "contacto";
type Rutas = Record<Pagina, string>;
const rutas: Rutas = {
    inicio: "/",
    productos: "/productos",
    contacto: "/contacto"
};

// Extract<T, U> y Exclude<T, U>
type T1 = "a" | "b" | "c";
type T2 = "a" | "c";
type Extraido = Extract<T1, T2>;   // "a" | "c"
type Excluido = Exclude<T1, T2>;   // "b"

// NonNullable<T>: elimina null y undefined
type SinNulos = NonNullable<string | number | null | undefined>;
// string | number

// Parameters<T> y ReturnType<T>
function ejemplo(a: string, b: number): boolean {
    return a.length > b;
}
type Params = Parameters<typeof ejemplo>;    // [string, number]
type Retorno = ReturnType<typeof ejemplo>;  // boolean

// Awaited<T> (TS 4.5+)
type PromesaStr = Promise<string>;
type Desempaquetado = Awaited<PromesaStr>;  // string

// Ejemplos de uso
console.log(rutas);
