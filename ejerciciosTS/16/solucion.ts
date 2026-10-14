export {};
import type { Planeta } from "./tipos.ts";
import datos from "../datos/planetas2.json" with { type: "json" };
//JMM: ============================================================
//JMM: BLOQUE 16 - Map: diccionario clave-valor
//JMM: ============================================================

//JMM: (1) Map<string, number> con nombres y edades, iterando sobre él
console.log("=== Ejercicio 1: Map de personas ===");

const edades = new Map<string, number>();
edades.set("Ana", 28);
edades.set("Carlos", 35);
edades.set("Lucía", 22);
edades.set("Miguel", 41);

//JMM: Fijaos que iterar un Map es directo: for...of sobre el propio Map
for (const [nombre, edad] of edades) {
  console.log(`${nombre} tiene ${edad} años`);
}

//JMM: ¿Existe una clave? .has() es vuestro amigo
console.log(`\n¿Existe Carlos? ${edades.has("Carlos")}`);
console.log(`¿Existe Pedro? ${edades.has("Pedro")}`);

//JMM: Actualizar un valor
edades.set("Ana", 29);
console.log(`Ana ahora tiene: ${edades.get("Ana")} años`);

//JMM: Eliminar
edades.delete("Miguel");
console.log(`Después de borrar Miguel, tamaño: ${edades.size}`);


//JMM: ============================================================
//JMM: (2) Índice de planetas: leer el JSON y usar Map para buscar/agrupar
//JMM: ============================================================
console.log("\n=== Ejercicio 2: Índice de planetas ===");

//JMM: El JSON llega como un array SUELTO en la raíz (sin envoltorio "planetas");
//JMM: el propio import YA es el array -> lo tipamos como Planeta[]
const planetas: Planeta[] = datos;

//JMM: (a) Map con el name como clave -> búsqueda en O(1) en vez de recorrer el array
// Esta función es muy usada. A partir de Array construir MAP para búsquedas O(1)
function indicePorNombre(planetas: readonly Planeta[]): Map<string, Planeta> {
  const indice = new Map<string, Planeta>();
  for (const p of planetas) {
    indice.set(p.name, p);
  }
  return indice; 
  //Otra forma mucho más elegante y eficiente
  //return new Map(planetas.map(p => [p.name, p]));
}

//JMM: --- Demostración ---
const indice = indicePorNombre(planetas);
console.log(`\nPlanetas indexados: ${indice.size}`);
console.log("-------------------------------------------");

//JMM: (b) Búsqueda por nombre: O(1). Devuelve undefined si no existe (get() de Map)
function buscarPlaneta(indice: Map<string, Planeta>, name: string): Planeta | undefined {
  return indice.get(name);
}

//JMM: Búsqueda O(1)
const alderaan = buscarPlaneta(indice, "Alderaan");
console.log(`buscarPlaneta("Alderaan") -> ${alderaan?.name}, población ${alderaan?.population}`);
console.log(`buscarPlaneta("Kashyyyk")  -> ${buscarPlaneta(indice, "Kashyyyk")}`); // undefined
console.log("-------------------------------------------");


//JMM: (c) Agrupar por climate: clave = clima, valor = array de planetas con ese clima
function planetasPorClima(planetas: readonly Planeta[]): Map<string, Planeta[]> {
  const porClima = new Map<string, Planeta[]>();
  for (const p of planetas) {
    const lista = porClima.get(p.climate);
    if (lista) {
      lista.push(p); //JMM: ya hay una lista para este clima -> añadir
    } else {
      porClima.set(p.climate, [p]); //JMM: primer planeta con este clima -> crear la lista
    }
  }
  return porClima;
}
//JMM: Agrupación por clima
const porClima = planetasPorClima(planetas);
console.log("\nPlanetas por clima:");
for (const [clima, lista] of porClima) {
  console.log(`  ${clima}: ${lista.map((p) => p.name).join(", ")}`);
}
console.log("-------------------------------------------");

//JMM: (d) Para cada clima, la suma de las poblaciones de sus planetas
function poblacionPorClima(planetas: readonly Planeta[]): Map<string, number> {
  const porClima = new Map<string, number>();
  for (const p of planetas) {
    porClima.set(p.climate, (porClima.get(p.climate) ?? 0) + p.population);
  }
  return porClima;
}

//JMM: Población total por clima
const poblacion = poblacionPorClima(planetas);
console.log("\nPoblación por clima:");
for (const [clima, total] of poblacion) {
  console.log(`  ${clima}: ${total}`);
}

//El siguiente ejercicio es repetir lo de los apuntes, no tiene mayor interés
//JMM: (e) Serializar el índice a JSON y deserializarlo de vuelta a Map
//JMM: JSON no sabe qué es un Map -> Object.fromEntries (salida) / new Map(Object.entries(...)) (entrada)
const json = JSON.stringify(Object.fromEntries(indice));
console.log(`\nJSON (truncado): ${json.slice(0, 60)}...`);

const deVuelta: Map<string, Planeta> = new Map(Object.entries(JSON.parse(json)));
console.log(`Después de deserializar, buscarPlaneta("Yavin IV") -> ${buscarPlaneta(deVuelta, "Yavin IV")?.name}`);
