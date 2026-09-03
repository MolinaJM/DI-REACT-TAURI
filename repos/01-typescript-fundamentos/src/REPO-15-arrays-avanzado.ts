export {};

/**
 * Fichero 15: Arrays Avanzado, Set, Map y Objetos
 * ------------------------------------------------
 * - Arrays: push/pop, map/filter/reduce, toSorted/toReversed
 * - Arrays: sort/reverse, destructuring, busqueda binaria
 * - Set: creacion, operaciones, ES2025 nativas
 * - Map: creacion, iteracion
 * - Objetos: Object.keys/values/entries, freeze, hasOwn
 * - Objetos: destructuring avanzado, JSON tipado, structuredClone, Object.groupBy
 *
 * (Las APIs ES2023+ —toSorted/toReversed, las operaciones nativas de Set y
 *  Map, `structuredClone`, `Object.groupBy`— y la busqueda binaria son
 *  optativos: APLICAN a un TS generalista, fuera de la ruta React + Tauri.)
 */

// ============================================================================
// ARRAYS: METODOS DE MUTACION
// ============================================================================

const numeros: number[] = [1, 2, 3];

// Anadir/eliminar al final
numeros.push(4);     // [1, 2, 3, 4]
const ultimo = numeros.pop();   // 4

// ============================================================================
// ARRAYS: METODOS DE ITERACION (inmutables)
// ============================================================================

const nums: number[] = [1, 2, 3, 4, 5];

// map: transforma cada elemento
const duplicados: number[] = nums.map((n) => n * 2); // [2, 4, 6, 8, 10]

// filter: selecciona elementos
const pares: number[] = nums.filter((n) => n % 2 === 0); // [2, 4]

// reduce: acumula valores
const suma: number = nums.reduce((acc, n) => acc + n, 0); // 15

// forEach: efecto secundario
nums.forEach((n) => console.log(n));

// find / findIndex
const mayor3: number | undefined = nums.find((n) => n > 3);
const idx: number = nums.findIndex((n) => n > 3);

// some / every
const hayPares: boolean = nums.some((n) => n % 2 === 0);
const todosPositivos: boolean = nums.every((n) => n > 0);

// ============================================================================
// METODOS INMUTABLES ES2023
// ============================================================================

const original: number[] = [3, 1, 2];

// toSorted - copia ordenada
const ordenado: number[] = original.toSorted(); // [1, 2, 3]
console.log(original); // [3, 1, 2] (intacto)

// toReversed - copia invertida
const invertido: number[] = original.toReversed(); // [2, 1, 3]

// toSpliced - copia con splice
const modificado: number[] = original.toSpliced(0, 1, 99); // [99, 1, 2]

// with - reemplaza en una posicion
const cambiado: number[] = original.with(1, 42); // [3, 42, 2]

// ============================================================================
// ORDENACION
// ============================================================================

const desordenados: number[] = [4, 2, 9, 1, 5];

// sort MUTA el original (pasar copia con spread o toSorted)
const copiaOrdenada = [...desordenados].sort((a, b) => a - b);
console.log(copiaOrdenada);  // [1, 2, 4, 5, 9]

// reverse
const descendente = [...copiaOrdenada].reverse();
// [9, 5, 4, 2, 1]

// ============================================================================
// DESTRUCTURING DE ARRAYS
// ============================================================================

const [a, b] = ["Manzana", "Banana"];
console.log(a); // "Manzana"

// Valores por defecto
const [x, y, z = "Naranja"] = ["Manzana", "Banana"];
console.log(z); // "Naranja"

// Rest operator
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];
console.log(resto); // [3, 4, 5]

// Nested
const [usuarioArr, [hobby]] = ["Alice", ["Pintura"]];
console.log(hobby); // "Pintura"

// ============================================================================
// BUSQUEDA BINARIA TIPADA
// ============================================================================

function busquedaBinaria(array: number[], elemento: number): number {
    let inicio: number = 0;
    let fin: number = array.length - 1;

    while (inicio <= fin) {
        const medio = Math.floor((inicio + fin) / 2);
        const valor = array[medio];
        if (valor === undefined) break;
        if (valor === elemento) return medio;
        if (valor < elemento) inicio = medio + 1;
        else fin = medio - 1;
    }
    return -1;
}

const numsBusqueda: number[] = [1, 3, 5, 7, 9, 11, 13];
console.log(busquedaBinaria(numsBusqueda, 7)); // 3

// ============================================================================
// SET: CONJUNTO DE VALORES UNICOS
// ============================================================================

// Creacion
const animales: Set<string> = new Set(["perro", "gato", "canario"]);

// Operaciones basicas
animales.add("conejo");
animales.delete("gato");
console.log(animales.has("perro")); // true
console.log(animales.size);          // 2

// Iteracion
for (const animal of animales) {
    console.log(animal);
}

// Convertir a array
const arrayAnimales: string[] = Array.from(animales);
const arrayAnimales2: string[] = [...animales];

// Eliminar duplicados de un array
const conDuplicados: number[] = [1, 2, 2, 3, 4, 4, 5];
const sinDuplicados: number[] = [...new Set(conDuplicados)];
console.log(sinDuplicados); // [1, 2, 3, 4, 5]

// Operaciones entre conjuntos
const A: Set<number> = new Set([1, 2, 3, 4]);
const B: Set<number> = new Set([3, 4, 5, 6]);

// Union
const union: Set<number> = new Set([...A, ...B]);

// Interseccion
const interseccion: Set<number> = new Set(
    [...A].filter((x) => B.has(x))
);

// Diferencia (A - B)
const diferencia: Set<number> = new Set(
    [...A].filter((x) => !B.has(x))
);

console.log(union);         // Set {1, 2, 3, 4, 5, 6}
console.log(interseccion);  // Set {3, 4}
console.log(diferencia);    // Set {1, 2}

// Metodos nativos ES2025
console.log(A.union(B));              // Set {1, 2, 3, 4, 5, 6}
console.log(A.intersection(B));       // Set {3, 4}
console.log(A.difference(B));         // Set {1, 2}
console.log(A.symmetricDifference(B)); // Set {1, 2, 5, 6}
console.log(A.isSubsetOf(B));         // false
console.log(A.isSupersetOf(B));       // false
console.log(A.isDisjointFrom(B));     // false

// ============================================================================
// MAP: DICCIONARIO CLAVE-VALOR
// ============================================================================

// Creacion
const miMapa: Map<string, number> = new Map();

// Operaciones
miMapa.set("uno", 1);
miMapa.set("dos", 2);
console.log(miMapa.get("uno"));    // 1
console.log(miMapa.has("tres"));   // false
console.log(miMapa.size);          // 2
miMapa.delete("dos");
miMapa.clear();

// Inicializar con pares
const config: Map<string, string | number> = new Map<string, string | number>([
    ["color", "azul"],
    ["idioma", "espanol"],
    ["volumen", 80],
] as [string, string | number][]);

// Iteracion
for (const [clave, valor] of config) {
    console.log(`${clave}: ${valor}`);
}

// keys(), values(), entries()
for (const key of config.keys()) console.log(key);
for (const val of config.values()) console.log(val);
for (const [k, v] of config.entries()) console.log(k, v);

// forEach
config.forEach((valor, clave) => console.log(clave, valor));

// Casos de uso reales
// Cache de datos
const cache: Map<string, { data: unknown; timestamp: number }> = new Map();

async function obtenerDatos(id: string): Promise<unknown> {
    if (cache.has(id)) {
        return cache.get(id)!.data;
    }
    const response = await fetch(`https://api.com/data/${id}`);
    const data: unknown = await response.json();
    cache.set(id, { data, timestamp: Date.now() });
    return data;
}

// Enrutado SPA
type Componente = () => string;
const rutas: Map<string, Componente> = new Map([
    ["/inicio", () => "<h1>Inicio</h1>"],
    ["/perfil", () => "<h1>Perfil</h1>"],
]);

// ============================================================================
// OBJETOS EN PROFUNDIDAD
// ============================================================================

// Metodos estaticos de Object
interface PersonaObj {
    nombre: string;
    edad: number;
    profesion: string;
}

const persona: PersonaObj = {
    nombre: "Juan",
    edad: 30,
    profesion: "Desarrollador",
};

// keys, values, entries
const claves: string[] = Object.keys(persona);
const valores: unknown[] = Object.values(persona);
const entradas: [string, unknown][] = Object.entries(persona);

// assign: copia propiedades
const destino: Partial<PersonaObj> = {};
Object.assign(destino, persona);

// freeze: objeto inmutable (en runtime)
const congelado: Readonly<PersonaObj> = Object.freeze({ ...persona });

// hasOwn (ES2022)
console.log(Object.hasOwn(persona, "nombre")); // true

// ============================================================================
// DESTRUCTURING AVANZADO DE OBJETOS
// ============================================================================

const libro = {
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafon",
    anio: 2001,
} as const;

// Destructuring con alias
const { titulo: nombreLibro, autor: nombreAutor, anio: publicadoEn } = libro;

// Destructuring anidado
interface Producto {
    nombre: string;
    detalles: { peso: string; precio: number };
}

const producto: Producto = {
    nombre: "Portatil",
    detalles: { peso: "1.5 kg", precio: 950 },
};

const {
    nombre: prodNombre,
    detalles: { peso, precio },
} = producto;

// Parametros con destructuring
function mostrarInfo({ nombre, edad }: { nombre: string; edad: number }): string {
    return `${nombre} tiene ${edad} anios`;
}

// ============================================================================
// JSON: stringify y parse tipados
// ============================================================================

const usuarioJson = {
    nombre: "Ana",
    edad: 28,
    isAdmin: true,
} as const;

// Con formato
const jsonStr: string = JSON.stringify(usuarioJson, null, 2);
console.log(jsonStr);

// Reviver: transformar durante el parse
const cadenaJSON = '{"fechaNacimiento": "1990-05-15"}';
const conFecha = JSON.parse(cadenaJSON, (clave: string, valor: unknown) => {
    return clave === "fechaNacimiento" ? new Date(valor as string) : valor;
}) as { fechaNacimiento: Date };
console.log(conFecha.fechaNacimiento.getFullYear()); // 1990

// ============================================================================
// STRUCTUREDCLONE (ES2022+)
// ============================================================================

const originalClon: Record<string, unknown> = {
    nombre: "PROFE",
    fecha: new Date(),
    datos: new Map([["clave", "valor"]]),
    numeros: new Set([1, 2, 3]),
};

const copiaClon = structuredClone(originalClon);
// A diferencia de JSON.parse(JSON.stringify(x)):
// - Preserva Date, Map, Set, RegExp, ArrayBuffer
// - Es clon profundo real (no comparte referencias)

console.log(copiaClon.fecha instanceof Date);   // true
console.log(originalClon.datos === copiaClon.datos); // false

// ============================================================================
// OBJECT.GROUPBY() (ES2024)
// ============================================================================

interface ProductoGroupBy {
    nombre: string;
    categoria: string;
}

const productos: ProductoGroupBy[] = [
    { nombre: "Laptop", categoria: "electronica" },
    { nombre: "Raton", categoria: "electronica" },
    { nombre: "Mesa", categoria: "muebles" },
];

const agrupado: Record<string, ProductoGroupBy[]> = Object.groupBy(
    productos,
    (p: ProductoGroupBy) => p.categoria
) as Record<string, ProductoGroupBy[]>;
// {
//   electronica: [ProductoGroupBy, ProductoGroupBy],
//   muebles: [ProductoGroupBy]
// }

// Ejemplos de uso
console.log(mostrarInfo({ nombre: "Carlos", edad: 35 }));
console.log(agrupado);
