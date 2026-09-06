export {};

/**
 * Fichero 19: Generics y Utility Types
 * -------------------------------------------
 * - Generics: identidad, primero, filtros, constraints (extends), factorias
 * - Utility Types: Partial, Pick, Omit, Record, Parameters, ReturnType, NonNullable
 *
 * Son la base del TS aplicado a React y Tauri:
 * - `useState<T>`, `useRef<T>`, `invoke<T>`, componentes genericos `<T>`
 * - `Partial<Pelicula>` (formularios), `Omit` (crear sin id), `Record` (tablas de
 *   correspondencias), `ReturnType` (tipar hooks/resultados)
 */

// ============================================================================
// GENERICS: el tipo se decide en la llamada
// ============================================================================

// Funcion identidad: devuelve el valor con SU tipo, sin cambiarlo
function identidad<T>(valor: T): T {
    return valor;
}

const n = identidad(42);        // number
const s = identidad("hola");    // string
console.log(n, s);

// primero<T>: el primer elemento o undefined (noUncheckedIndexedAccess)
function primero<T>(arr: T[]): T | undefined {
    return arr[0];
}

const primeroN = primero([10, 20, 30]); // number | undefined
const primeroS = primero(["a", "b"]);   // string | undefined
console.log(primeroN, primeroS);

// Filtro generico con predicado tipado
function filtrarPor<T>(arr: T[], predicado: (item: T) => boolean): T[] {
    return arr.filter(predicado);
}

const pares = filtrarPor([1, 2, 3, 4, 5], (x) => x % 2 === 0);
console.log(pares); // [2, 4]

// Constraints con extends: solo tipos que tengan .length
function esLargo<T extends { length: number }>(valor: T, max: number): boolean {
    return valor.length <= max;
}

console.log(esLargo("prueba", 10));    // true (string tiene length)
console.log(esLargo([1, 2, 3], 2));    // false (array tiene length)

// Acceso indexado seguro: K queda restringido a las claves reales de T
function obtenerValor<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const usuario = { id: 1, nombre: "Ana", email: "ana@mail.com" };
console.log(obtenerValor(usuario, "nombre"));    // "Ana"
// obtenerValor(usuario, "telefono");             // Error: no existe en Usuario

// Factoria generica sin clases: devuelve un objeto con metodos
function crearCola<T>() {
    const items: T[] = [];

    return {
        encolar(item: T): void {
            items.push(item);
        },
        desencolar(): T | undefined {
            return items.shift();
        },
        estaVacia(): boolean {
            return items.length === 0;
        }
    };
}

const cola = crearCola<string>();
cola.encolar("primero");
cola.encolar("segundo");
console.log(cola.desencolar()); // "primero"
console.log(cola.estaVacia());  // false

// ----------------------------------------------------------------------------
// Generics en React / Tauri (patron que veras a diario)
// ----------------------------------------------------------------------------
// type RespuestaApi<T>      -> invoke<T> tipa lo que devuelve el backend Rust
// useState<Todo[]>([])      -> el estado sabe su tipo desde el inicio
// function TablaGenerica<T>(...) -> un componente sirve para cualquier entidad

// ============================================================================
// UTILITY TYPES: tipos derivados sin escribirlos a mano
// ============================================================================

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string;
}

const productoBase: Producto = { id: 1, nombre: "Teclado", precio: 49.9 };

// Partial<T>: todas las props opcionales (perfecto para "editar")
const edicion: Partial<Producto> = { precio: 35 }; // solo tocas lo que cambia
console.log({ ...productoBase, ...edicion });

// Pick<T, K>: solo las props indicadas
type ResumenProducto = Pick<Producto, "id" | "nombre">;
const resumen: ResumenProducto = { id: 1, nombre: "Teclado" };
console.log(resumen);

// Omit<T, K>: quita props (en React: crear una Pelicula sin el id auto)
type ProductoSinDescripcion = Omit<Producto, "descripcion">;
const sinDesc: ProductoSinDescripcion = { id: 2, nombre: "Raton", precio: 12 };
console.log(sinDesc);

// Record<K, V>: diccionario con claves conocidas (tablas de correspondencias)
type Semana = Record<"lunes" | "martes" | "miercoles", string>;
const horarios: Semana = {
    lunes: "9:00",
    martes: "10:00",
    miercoles: "11:00"
};
console.log(horarios);

// Parameters<T> y ReturnType<T>: extraer tipos de una funcion
function crearProducto(nombre: string, precio: number): Producto {
    return { id: 0, nombre, precio } as Producto;
}

type ParamsCrear = Parameters<typeof crearProducto>;      // [string, number]
type RetornoCrear = ReturnType<typeof crearProducto>;     // Producto

function usarParams(args: ParamsCrear): Producto {
    return crearProducto(...args);
}
console.log(usarParams(["Monitor", 199]));

// NonNullable<T>: elimina null | undefined de una union
type ValorPosible = string | null | undefined;
type ValorLimpio = NonNullable<ValorPosible>;  // string
const limpio: ValorLimpio = "texto seguro";
console.log(limpio);