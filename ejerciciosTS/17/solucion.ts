export {};
import type { Config, PlanetaJSON } from "./tipos.ts";
//JMM: ============================================================
//JMM: BLOQUE 17 - Objetos en profundidad
//JMM: ============================================================

//JMM: (1) Object.keys, Object.values, Object.entries
console.log("=== Ejercicio 1: Explorar propiedades de un objeto ===");

//JMM: telefono?/notas? son OPCIONALES: no están en el objeto, pero el tipo los
//JMM: admite -> así el destructuring del ejercicio 2 puede darles un valor por defecto
type PersonaCompleta = {
  nombre: string;
  edad: number;
  ciudad: string;
  email: string;
  activo: boolean;
  telefono?: string;
  notas?: string[];
};

const persona: PersonaCompleta = {
  nombre: "Ana García",
  edad: 32,
  ciudad: "Madrid",
  email: "ana@ejemplo.com",
  activo: true,
};

//JMM: Object.keys -> array de las claves (strings)
const claves = Object.keys(persona);
console.log("Claves:", claves);
//JMM: Fijaos que el tipo es string[] — no sabéis que son "nombre", "edad"... a nivel de tipo

//JMM: Object.values -> array de los valores (unknown[] si el objeto tiene tipos mezclados)
const valores = Object.values(persona);
console.log("Valores:", valores);

//JMM: Object.entries -> array de [clave, valor] — el más potente de los tres
console.log("\nEntradas (entries):");
for (const [clave, valor] of Object.entries(persona)) {
  console.log(`  ${clave}: ${valor} (tipo: ${typeof valor})`);
}

//JMM: Truco: filtrar solo las claves que nos interesan
const soloInfoBasica = Object.entries(persona)
  .filter(([clave]) => ["nombre", "edad", "ciudad"].includes(clave));
console.log("\nSolo info básica:", Object.fromEntries(soloInfoBasica));


//JMM: ============================================================
//JMM: (2) Destructuring básico: aliasing y valores por defecto
//JMM: ============================================================
console.log("\n=== Ejercicio 2: Destructuring ===");

//JMM: Aliasing: renombrar una variable al desestructurar
const { nombre: nombreCompleto, edad, ciudad } = persona;
console.log(`Nombre (alias): ${nombreCompleto}`);
console.log(`Edad: ${edad}`);
console.log(`Ciudad: ${ciudad}`);

//JMM: Valores por defecto: si la propiedad no existe (o vale undefined), usa el default.
//JMM: Ojo TS: para desestructurar una propiedad, tiene que existir en el tipo, aunque
//JMM: sea opcional -> por eso PersonaCompleta declara telefono? y notas?, que el objeto
//JMM: no tiene: sobre esas claves sí se aplica el default
const { telefono = "No proporcionado", activo = false, notas: comentarios = [] } = persona;
console.log(`Teléfono (default): ${telefono}`);
console.log(`Activo (default): ${activo}`);
console.log(`Notas/Comentarios (default):`, comentarios);

//JMM: El ?? (nullish coalescing) es lo mismo pero para expresiones sueltas:
//JMM: persona no tiene 'notas' -> undefined ?? [] = []
const conNullish: string[] = persona.notas ?? [];
console.log(`Notas con ?? (undefined ?? [] = []):`, conNullish);


//JMM: ============================================================
//JMM: (3) Copia superficial (Object.assign) vs copia profunda (JSON)
//JMM: ============================================================
console.log("\n=== Ejercicio 3: copia superficial vs profunda ===");

const objetoComplejo = {
  nombre: "Producto A",
  fechaCreacion: new Date("2024-06-15"),
  tags: new Set(["nuevo", "destacado"]),
  metadatos: new Map<string, number | boolean>([["version", 2], ["activo", true]]),
  subObjeto: {
    precio: 29.99,
    disponible: true,
  },
};

//JMM: Copia PROFUNDA con JSON.parse(JSON.stringify(...)): clona todo el árbol,
//JMM: pero PIERDE los tipos que JSON no sabe representar
console.log("Copia profunda con JSON.parse/stringify:");
const clonJSON = JSON.parse(JSON.stringify(objetoComplejo));
console.log(`  fechaCreacion es Date? ${clonJSON.fechaCreacion instanceof Date}`);
console.log(`  fechaCreacion es string? ${typeof clonJSON.fechaCreacion === "string"}`);
console.log(`  tags es Set? ${clonJSON.tags instanceof Set}`);
console.log(`  tags es? ${typeof clonJSON.tags}`);
console.log(`  metadatos es? ${typeof clonJSON.metadatos}`);

//JMM: Copia SUPERFICIAL con Object.assign (§7.5.4): solo copia la primera capa;
//JMM: los objetos anidados siguen COMPARTIDOS (mutar la copia toca el original)
const copiaSuperficial = Object.assign({}, objetoComplejo);
console.log("\nCopia superficial con Object.assign:");
copiaSuperficial.subObjeto.precio = 99.99;
console.log(`  precio en la copia: ${copiaSuperficial.subObjeto.precio}`);
console.log(`  precio en el original (¡cambió!): ${objetoComplejo.subObjeto.precio}`);

//JMM: Recuerda: JSON.stringify ignora undefined, functions y symbols


//JMM: ============================================================
//JMM: (4) Object.freeze — readonly en runtime
//JMM: ============================================================
console.log("\n=== Ejercicio 4: Object.freeze ===");
//JMM: El interface Config vive en tipos.ts (modularidad).

const config: Config = Object.freeze({
  url: "https://JMM://api.ejemplo.com",
  port: 3000,
  debug: false,
});

console.log("Config inicial:");
console.log(`  url: ${config.url}`);
console.log(`  port: ${config.port}`);
console.log(`  debug: ${config.debug}`);

//JMM: Intentar modificar — en runtime no se puede (lanza TypeError en ESM/strict; se silencia en sloppy mode)
console.log("\nIntentando modificar config.port = 8080...");
try {
  //JMM: TypeScript ya nos lo prohíbe en compile time (Config es readonly en tipos.ts)
  // @ts-expect-error
  config.port = 8080;
  console.log(`  port ahora es: ${config.port}`);
} catch (e) {
  console.log(`  Error: ${e}`);
}

//JMM: Fijaos: en runtime, Object.freeze hace que las propiedades sean realmente inmutables
//JMM: TypeScript nos avisa en compile time, Object.freeze nos protege en runtime
console.log(`\n¿Se pudo modificar? No — el valor sigue siendo ${config.port}`);

//JMM: Cuidado: Object.freeze es shallow, solo congela la primera capa
const configConObjeto = Object.freeze({
  nombre: "App",
  detalles: { version: 1, autor: "Yo" },
});

//JMM: Esto NO está congelado (segunda capa)
configConObjeto.detalles.version = 2;
console.log(`\nSegunda capa no congelada — detalles.version ahora es: ${configConObjeto.detalles.version}`);

//JMM: Para congelar en profundidad, un freeze recursivo con Object.values (§7.5.2)
function congelarEnProfundidad(obj: object): void {
  Object.freeze(obj);
  for (const valor of Object.values(obj)) {
    if (valor && typeof valor === "object") {
      congelarEnProfundidad(valor); // congela también objetos y arrays anidados
    }
  }
}

//JMM: Partimos de un objeto literal nuevo y lo congelamos en profundidad;
//JMM: el freeze lo protege en runtime (TS no detecta mutaciones anidadas)
const configProfunda = {
  nombre: "App",
  detalles: { version: 1, autor: "Yo" },
};
congelarEnProfundidad(configProfunda);

console.log("\nIntentando modificar configProfunda.detalles.version...");
try {
  //JMM: Ojo: TS NO detecta esta mutación (Readonly<T> es shallow, solo la primera
  //JMM: capa); la para el freeze en profundidad, que revienta en runtime:
  configProfunda.detalles.version = 3;
  console.log(`  version ahora es: ${configProfunda.detalles.version}`);
} catch (e) {
  console.log(`  Error (como esperaba): ${e}`);
}

//JMM:// ============================================================
//JMM:// BLOQUE 17 (extra) - Consumir el JSON importado SIN mutarlo
//JMM:// ============================================================

//JMM: --- El import JSON es SÍNCRONO, así que es válido en este bloque ---
//JMM: (solo el `fetch` necesita esperar al bloque 18 de asincronía)
import datosPlanetas from "../datos/planetas2.json" with { type: "json" };

//JMM: El interface PlanetaJSON vive en tipos.ts (modularidad).

function esPlaneta(bruto: unknown): bruto is PlanetaJSON {
  if (typeof bruto !== "object" || bruto === null) return false;
  //JMM: estrechamos a un objeto con las propiedades que esperamos (como unknown,
  //JMM: aún sin validar) y las comprobamos una a una
  const p = bruto as { name?: unknown; population?: unknown; climate?: unknown; films?: unknown };
  return (
    typeof p.name === "string" &&
    typeof p.population === "number" &&
    typeof p.climate === "string" &&
    (p.films === undefined || Array.isArray(p.films))
  );
}

//JMM: Este JSON va SUELTO en la raíz (sin envoltorio "planetas"): el import
//JMM: YA es el array -> basta comprobar que es un array y filtrar
function cargarPlanetas(): PlanetaJSON[] {
  const bruto: unknown = datosPlanetas;
  if (!Array.isArray(bruto)) throw new Error("El JSON no es un array de planetas");
  return bruto.filter(esPlaneta);
}

//JMM: Este array es un SINGLETON: todas las importaciones del módulo
//JMM: comparten el mismo objeto. Igual que el estado de un componente
//JMM: en React, hay que consumirlo sin mutarlo.
//JMM: (lo llamamos `planetasDelJson` para dejar claro que viene del JSON importado)
const planetasDelJson: PlanetaJSON[] = cargarPlanetas();

console.log("\n=== Datos importados (singleton compartido) ===");
for (const p of planetasDelJson) {
  console.log(`  ${p.name} · ${p.climate} · ${p.population} hab.`);
}

//JMM: --- Destructuring + ?? sobre el array opcional `films` ---
function resumenPlaneta(p: PlanetaJSON): string {
  const { name, population, films } = p;
  const peliculas = films?.length ?? 0;
  return `${name} · ${population} hab. · ${peliculas} ${peliculas === 1 ? "película" : "películas"}`;
}

//JMM: --- Actualización INMUTABLE: array y elemento nuevos, original intacto ---
function actualizarPoblacion(planetas: readonly PlanetaJSON[], name: string, population: number): PlanetaJSON[] {
  return planetas.map((p) => (p.name === name ? { ...p, population } : p));
}

//JMM: --- Freeze en profundidad: si intentas mutar, revienta (en ESM es strict) ---
//JMM: Localizar por nombre con filter (§6.4 iv; find no se usa en el curso):
//JMM: filter devuelve todos los que cumplen -> el primero es [0]
function buscarPorNombre(planetas: readonly PlanetaJSON[], name: string): PlanetaJSON | undefined {
  return planetas.filter((p) => p.name === name)[0];
}

function planetaInmutable(name: string): PlanetaJSON {
  const planeta = buscarPorNombre(planetasDelJson, name);
  if (!planeta) throw new Error(`No existe el planeta ${name}`);
  if (planeta.films) Object.freeze(planeta.films);
  return Object.freeze(planeta);
}

console.log("\n=== Resumen con ?? sobre el opcional ===");
for (const p of planetasDelJson) {
  console.log(`  ${resumenPlaneta(p)}`);
}

console.log("\n=== Actualización inmutable ===");
const actualizados = actualizarPoblacion(planetasDelJson, "Hoth", 1234);
console.log(`  copia:    Hoth -> ${buscarPorNombre(actualizados, "Hoth")?.population}`);
console.log(`  original: Hoth -> ${buscarPorNombre(planetasDelJson, "Hoth")?.population}  (intacto)`);
console.log(`  ¿mismo array? ${actualizados === planetasDelJson}  (false = array nuevo)`);

console.log("\n=== Congelado en profundidad ===");
const hoth = planetaInmutable("Hoth");
console.log(`  Object.isFrozen(hoth)      -> ${Object.isFrozen(hoth)}`);
console.log(`  Object.isFrozen(hoth.films) -> ${Object.isFrozen(hoth.films)}`);
console.log("  Intentando mutar hoth.population...");
try {
  //JMM: TS NO lo prohíbe (PlanetaJSON es mutable); lo para el Object.freeze en runtime
  hoth.population = 999;
  console.log(`  Sin error, ahora es: ${hoth.population}  (esto NO debería pasar)`);
} catch (e) {
  console.log(`  Error (como esperaba): ${e}`);
}
console.log();
