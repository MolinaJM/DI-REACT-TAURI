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