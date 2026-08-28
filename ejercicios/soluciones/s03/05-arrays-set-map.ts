// ============================================================
// S03 · Ejercicio 5 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) reduce → frecuencias
export function contarPalabras(oracion: string): Record<string, number> {
  return oracion.split(" ").reduce<Record<string, number>>((acc, palabra) => {
    acc[palabra] = (acc[palabra] ?? 0) + 1;
    return acc;
  }, {});
}

// 2) reduce → agrupación
export function agruparParesImpares(numeros: number[]): { pares: number[]; impares: number[] } {
  return numeros.reduce(
    (acc, n) => {
      (n % 2 === 0 ? acc.pares : acc.impares).push(n);
      return acc;
    },
    { pares: [], impares: [] } as { pares: number[]; impares: number[] }
  );
}

// 3) flatMap
export const catalogo = [
  { nombre: "A", etiquetas: ["tecnologia", "oferta"] },
  { nombre: "B", etiquetas: ["tecnologia"] },
  { nombre: "C", etiquetas: ["ropa"] },
];
export function todasLasEtiquetas(): string[] {
  return catalogo.flatMap((p) => p.etiquetas);
}

// 4) Set
export function dedupe(arr: number[]): number[] {
  return [...new Set(arr)];
}
export function union(...arrays: number[][]): number[] {
  return dedupe(arrays.flat());
}
export function interseccion(a: number[], b: number[]): number[] {
  const setB = new Set(b);
  return dedupe(a.filter((n) => setB.has(n)));
}

// 5) Map inmutable
export function anadir(
  agenda: Map<string, string>,
  nombre: string,
  telefono: string
): Map<string, string> {
  const copia = new Map(agenda);
  copia.set(nombre, telefono);
  return copia;
}
export function telefonoDe(agenda: Map<string, string>, nombre: string): string | undefined {
  return agenda.get(nombre);
}

// ---- Comprobaciones ----
assert.deepEqual(contarPalabras("hola hola adios"), { hola: 2, adios: 1 });
assert.deepEqual(agruparParesImpares([1, 2, 3, 4]), { pares: [2, 4], impares: [1, 3] });
assert.deepEqual(todasLasEtiquetas(), ["tecnologia", "oferta", "tecnologia", "ropa"]);
assert.deepEqual(dedupe([1, 1, 2, 3, 3]), [1, 2, 3]);
assert.deepEqual(union([1, 2], [2, 3], [4]), [1, 2, 3, 4]);
assert.deepEqual(interseccion([1, 2, 3], [2, 3, 4]), [2, 3]);

const agenda = new Map<string, string>([["Ana", "111"]]);
const nueva = anadir(agenda, "Luis", "222");
assert.equal(agenda.size, 1); // la original no cambia
assert.equal(nueva.size, 2);
assert.equal(telefonoDe(nueva, "Luis"), "222");
assert.equal(telefonoDe(nueva, "Pepe"), undefined);
console.log("S03 · Ejercicio 5 · ¡OK!");