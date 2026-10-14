export {};
import type { Planeta } from "./tipos.ts";
import datos from "../datos/planetas2.json" with { type: "json" };
//JMM: ============================================================
//JMM: BLOQUE 15 - Set: conjunto de valores únicos
//JMM: Catálogo de planetas: deduplicar, pertenencia y operaciones
//JMM: ============================================================

//JMM: El JSON llega como un array SUELTO en la raíz (sin envoltorio "planetas");
//JMM: el propio import YA es el array -> lo tipamos como Planeta[]
const planetas: Planeta[] = datos;
//JMM: en el caso de usar wrapper, sería así
// const planetas: Planeta[] = datos.planetas;


//JMM: (a) Climas únicos: map extrae los climas, new Set deduplica
function climasUnicos(planetas: readonly Planeta[]): Set<string> {
  return new Set(planetas.map((p) => p.climate));
}

//JMM: (b) Películas sin repetir: recorremos los arrays de films y añadimos al Set
//JMM: films es opcional -> ?? [] para no perder los planetas sin films
function peliculas(planetas: readonly Planeta[]): Set<string> {
  const resultado = new Set<string>();
  for (const p of planetas) {
    for (const film of p.films ?? []) { //Usamos nullish coalescing
      resultado.add(film);
    }
  }
  return resultado;
}

//JMM: (c) Caché de pertenencia: has() es O(1)
function nombresDe(planetas: readonly Planeta[]): Set<string> {
  return new Set(planetas.map((p) => p.name));
}
function existePlaneta(nombres: Set<string>, name: string): boolean {
  return nombres.has(name);
}

//JMM: --- Demostración ---
console.log("=== Ejercicio: Catálogo de planetas con Set ===");
//JMM: (a) Deduplicar: el Set se queda con un ejemplar de cada clima
const climas = climasUnicos(planetas);
console.log(`\n(a) Climas únicos (${climas.size}): ${[...climas].join(", ")}`);
//JMM: (b) Aplanar y deduplicar en un solo paso
const films = peliculas(planetas);
console.log(`(b) Películas (${films.size}): ${[...films].join(", ")}`);
//JMM: (c) Comprobar existencia en O(1)
const nombres = nombresDe(planetas);
console.log(`\n(c) existePlaneta("Yavin IV"): ${existePlaneta(nombres, "Yavin IV")}`);
console.log(`(c) existePlaneta("Kashyyyk"): ${existePlaneta(nombres, "Kashyyyk")}`);

//JMM: (d) Dos conjuntos derivados de los datos: nombres de poblados y de temperatura
//JMM: Ojo: el === es exacto — "temperate, tropical" (Yavin IV) NO cuenta como "temperate"
const poblados: Set<string> = new Set(
  planetas.filter((p) => p.population > 0).map((p) => p.name)
);
const temperatura: Set<string> = new Set(
  planetas.filter((p) => p.climate === "temperate").map((p) => p.name)
);  

console.log(`\n(d) poblados:   ${[...poblados].join(", ")}`);
console.log(`(d) temperatura: ${[...temperatura].join(", ")}`);

//JMM: Operaciones manuales (pre-ES2025): spread + filter + has
const unionManual = new Set([...poblados, ...temperatura]);
const interseccionManual = new Set([...poblados].filter((x) => temperatura.has(x)));
const diferenciaManual = new Set([...poblados].filter((x) => !temperatura.has(x)));

console.log(`(d) unión (manual):        ${[...unionManual].join(", ")}`);
console.log(`(d) intersección (manual): ${[...interseccionManual].join(", ")}`);
console.log(`(d) diferencia (manual):   ${[...diferenciaManual].join(", ")}`);

//JMM: (e) Nativos ES2025: mismos resultados, sin ruido
const unionES2025 = poblados.union(temperatura);
const interseccionES2025 = poblados.intersection(temperatura);
const diferenciaES2025 = poblados.difference(temperatura);

console.log(`\n(e) union (ES2025):        ${[...unionES2025].join(", ")}`);
console.log(`(e) intersection (ES2025): ${[...interseccionES2025].join(", ")}`);
console.log(`(e) difference (ES2025):  ${[...diferenciaES2025].join(", ")}`);

//JMM: (f) JSON no sabe qué es un Set: se serializa como array y se reconstruye
const json: string = JSON.stringify([...climas]);
console.log(`\n(f) JSON: ${json}`);

//JMM: JSON.parse devuelve any -> tipamos el Set explícitamente (en un caso real
//JMM: validarías lo parseado; el type guard se practica en el bloque 17)
const deVuelta: Set<string> = new Set<string>(JSON.parse(json));
console.log(`(f) deserializado, tiene "temperate": ${deVuelta.has("temperate")}`);
