// ============================================================
// S03 · Ejercicio 5 · Arrays avanzados, Set y Map
// ============================================================
// Completa. Solución: soluciones/s03/05-arrays-set-map.ts

// 1) reduce: cuenta la frecuencia de cada palabra
export function contarPalabras(oracion: string): Record<string, number> {
  return {};
}

// 2) reduce: agrupa los números en pares e impares
export function agruparParesImpares(numeros: number[]): { pares: number[]; impares: number[] } {
  return { pares: [], impares: [] };
}

// 3) flatMap: aplanar categorías de productos en un array de etiquetas
export const catalogo = [
  { nombre: "A", etiquetas: ["tecnologia", "oferta"] },
  { nombre: "B", etiquetas: ["tecnologia"] },
  { nombre: "C", etiquetas: ["ropa"] },
];
export function todasLasEtiquetas(): string[] {
  return [];
}

// 4) Set: elimina duplicados y calcula unión/ intersección
export function dedupe(arr: number[]): number[] {
  return [];
}
export function union(...arrays: number[][]): number[] {
  return [];
}
export function interseccion(a: number[], b: number[]): number[] {
  return [];
}

// 5) Map: agenda de contactos. `anadir` y `telefonoDe` para no mutar el estado
export function anadir(agenda: Map<string, string>, nombre: string, telefono: string): Map<string, string> {
  return agenda;
}
export function telefonoDe(agenda: Map<string, string>, nombre: string): string | undefined {
  return undefined;
}
// 6) S3·6.1 map duplica / filter pares / reduce suma (a partir de [1,2,3,4,5])
export function duplicar(numeros: readonly number[]): number[] {
  return []; // TODO: map(n => n * 2)
}
export function pares(numeros: readonly number[]): number[] {
  return []; // TODO: filter(n => n % 2 === 0)
}
export function sumar(numeros: readonly number[]): number {
  return 0; // TODO: reduce((acc, n) => acc + n, 0)
}

// 7) S3·6.2 find/findIndex/some/every sobre un array de Producto
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: boolean;
}
export function primerProductoCon(productos: Producto[], precio: number): Producto | undefined {
  return undefined; // TODO: find
}
export function indiceDeProducto(productos: Producto[], id: number): number {
  return -1; // TODO: findIndex
}
export function hayAgotados(productos: Producto[]): boolean {
  return false; // TODO: some
}
export function todoConStock(productos: Producto[]): boolean {
  return false; // TODO: every
}

// 8) S3·6.3 at(-1): último elemento
export function ultimo<T>(arr: readonly T[]): T | undefined {
  return undefined; // TODO: arr.at(-1)
}

// 9) S3·6.4 ES2023 sin mutar: toSorted, toReversed, with
export function ordenadoSinMutacion(nums: readonly number[]): number[] {
  return []; // TODO: [...nums].sort((a, b) => a - b)
}
export function invertidoSinMutacion(nums: readonly number[]): number[] {
  return []; // TODO: toReversed
}
export function reemplazoSinMutacion(nums: readonly number[], idx: number, valor: number): number[] {
  return []; // TODO: with
}

// 10) S3·6.5 Búsqueda binaria tipada (array ordenado)
export function busquedaBinaria(arr: readonly number[], objetivo: number): number {
  return -1; // TODO: implementa búsqueda binaria
}

// 11) S3·7.1 Set de colores: añadir/eliminar/comprobar
export function gestionarColores(accion: "añadir" | "eliminar" | "tiene", color: string): boolean | void {
  const colores = new Set(["rojo", "verde"]);
  return undefined; // TODO: muta o consulta `colores` según accion
}

// 12) S3·7.3 Diferencia de conjuntos (A - B)
export function diferencia(a: number[], b: number[]): number[] {
  return []; // TODO: elementos de a que no estén en b
}

// 13) S3·7.4 Métodos nativos ES2025: union, intersection, difference, isSubsetOf
export function unionNativa(a: Set<number>, b: Set<number>): Set<number> {
  return new Set(); // TODO: a.union(b)
}
export function interseccionNativa(a: Set<number>, b: Set<number>): Set<number> {
  return new Set(); // TODO: a.intersection(b)
}
export function diferenciaNativa(a: Set<number>, b: Set<number>): Set<number> {
  return new Set(); // TODO: a.difference(b)
}
export function esSubconjunto(a: Set<number>, b: Set<number>): boolean {
  return false; // TODO: a.isSubsetOf(b)
}

// 14) S3·8.1 Map<persona, edad> e iteración
export function edadesMedias(edades: Map<string, number>): number {
  return 0; // TODO: itera con for...of sobre values y calcula la media
}

// 15) S3·8.2 Caché simple con timestamp
export interface CacheItem {
  data: unknown;
  timestamp: number;
}
export function enCache(cache: Map<string, CacheItem>, clave: string): boolean {
  return false; // TODO: existe y tiene menos de 5000 ms de antigüedad
}

// 16) S3·8.3 Map.groupBy: agrupar pedidos por cliente
export interface Pedido {
  id: number;
  cliente: string;
  importe: number;
}
export function agruparPorCliente(pedidos: Pedido[]): Map<string, Pedido[]> {
  return new Map(); // TODO: Map.groupBy(pedidos, p => p.cliente)
}

// 17) S3·8.4 WeakMap<object, string>: metadatos sin fuga de memoria
export function anotar(objeto: object, notas: WeakMap<object, string>, texto: string): void {
  void objeto; void notas; void texto; // TODO: notas.set(objeto, texto)
}
export function leerNota(objeto: object, notas: WeakMap<object, string>): string | undefined {
  return undefined; // TODO: notas.get(objeto)
}
