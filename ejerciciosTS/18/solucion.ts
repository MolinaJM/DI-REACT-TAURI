export { };
import type { Planeta, EstadoCarga } from "./tipos.ts";
//JMM: ============================================================
//JMM: BLOQUE 18 - Programación asíncrona (swapi: planetas)
//JMM: Todos los ejercicios usan async/await; el 2 añade Promise.all.
//JMM: Se supone que SWAPI siempre está online y responde bien.
//JMM: ============================================================

const API_PLANETAS = "https://swapi.info/api/planets";

//Prueba JSON SERVER: se usa copia EXACTA de API: planetas3.json
const API_PLANETAS_LOCAL = "http://localhost:3000/planetas"; //json-server 

//JMM: (1) cargarPlanetas — fetch real a swapi + validación de `unknown`
//JMM: Forma CRUDA que devuelve la API: population llega como STRING
//JMM: (y "unknown" cuando no consta). El interface Planeta ya la normaliza a number.
interface PlanetaCrudo {
  name: string;
  population: string;
  climate: string;
}

//JMM: Type guard: sin él no podemos pasar de `unknown` a algo usable (regla del curso: nunca `any`).
function esPlanetaCrudo(bruto: unknown): bruto is PlanetaCrudo {
  if (typeof bruto !== "object" || bruto === null) return false;
  const p = bruto as Record<string, unknown>;
  return (
    typeof p.name === "string" &&
    typeof p.population === "string" &&
    typeof p.climate === "string"
  );
}

//JMM: Del Forma crudo al Forma de la app: "unknown" -> 0, resto -> Number(...)
function aPlaneta(crudo: PlanetaCrudo): Planeta {
  return {
    name: crudo.name,
    population: crudo.population === "unknown" ? 0 : Number(crudo.population),
    climate: crudo.climate,
  };
}

//JMM: Carga una LISTA de planetas desde cualquier URL (la reutiliza el ejercicio 3)
async function cargarLista(url: string): Promise<Planeta[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`); //JMM: fetch NO lanza en 4xx/5xx

  const bruto: unknown = await res.json(); //JMM: `unknown`, no `any` a ciegas
  if (!Array.isArray(bruto)) throw new Error("La respuesta no es un array de planetas");

  const planetas: Planeta[] = [];
  for (const elemento of bruto) {
    if (!esPlanetaCrudo(elemento)) continue; //JMM: descartamos lo que no valida
    planetas.push(aPlaneta(elemento));
  }
  return planetas;
}

async function cargarPlanetas(url: string): Promise<Planeta[]> {
  return cargarLista(url);
}



//JMM: (2) Una ficha suelta  + carga de dos fichas en paralelo con Promise.all

async function cargarPlaneta(url: string): Promise<Planeta> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const bruto: unknown = await res.json();
  console.log(bruto);
  //JMM: Aquí la respuesta es UN objeto, no un array: `esPlanetaCrudo` sirve igual.
  if (!esPlanetaCrudo(bruto)) throw new Error(`Respuesta inválida en ${url}`);

  return aPlaneta(bruto);
}

//Carga a partir de json-server LOCAL (implica un cambio y añadir una aserción)
async function cargarPlaneta_local(url: string): Promise<Planeta> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  //const bruto: unknown = await res.json();
  //Aquí se hace una aserción, pero simplemente para que no lance el error
  //en escritura
  const bruto: Planeta[] = await res.json() as Planeta[];
  //const bruto = await res.json(); //Se podría dejar con un any
  console.log(bruto[0]);//El formato es en array, así que extraemos el primer elemento
  if (!esPlanetaCrudo(bruto[0])) throw new Error(`Respuesta inválida en ${url}`);

  return aPlaneta(bruto[0]);
}

async function cargarParalelo(): Promise<[Planeta, Planeta]> {
  //JMM: Promise.all arranca ambas a la vez y tipa el resultado como tupla [Planeta, Planeta]
  const [primero, segundo] = await Promise.all([
    cargarPlaneta(`${API_PLANETAS}/1`),
    cargarPlaneta(`${API_PLANETAS}/2`),
  ]);
  return [primero, segundo];
}

//Carga a partir de json-server LOCAL
async function cargarParalelo_local(): Promise<[Planeta, Planeta]> {
  //JMM: Promise.all arranca ambas a la vez y tipa el resultado como tupla [Planeta, Planeta]
  const [primero, segundo] = await Promise.all([
    cargarPlaneta_local(`${API_PLANETAS_LOCAL}?_start=0&_end=1`),
    cargarPlaneta_local(`${API_PLANETAS_LOCAL}?_start=1&_end=2`),
  ]);
  return [primero, segundo];
}


//JMM: (3) Carga SECUENCIAL: `await` dentro de un bucle (no se puede con .then)
async function cargarSecuencial(urls: readonly string[]): Promise<Planeta[]> {
  const planetas: Planeta[] = [];
  for (const url of urls) {
    //JMM: cada vuelta espera a la anterior: peticiones en serie, NO en paralelo
    const res = await fetch(url);
    if (!res.ok) continue; //JMM: `continue` tras un `await`: con .then habría que recurrir
    const bruto: unknown = await res.json();
    if (!esPlanetaCrudo(bruto)) continue;
    planetas.push(aPlaneta(bruto));
  }
  return planetas;
}

//JMM: (4) Estado de carga: unión discriminada + try/catch que nunca propaga
async function cargarConEstado(url: string): Promise<EstadoCarga> {
  try {
    return { estado: "listo", planetas: await cargarLista(url) };
  } catch (error) {
    //JMM: Nunca propagamos: la pantalla siempre recibe un EstadoCarga
    return {
      estado: "error",
      mensaje: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

function esListo(e: EstadoCarga): e is { estado: "listo"; planetas: Planeta[] } {
  return e.estado === "listo";
}

function describirEstado(e: EstadoCarga): string {
  switch (e.estado) {
    case "cargando":
      return "Cargando planetas...";
    case "error":
      return `Error: ${e.mensaje}`;
    case "listo":
      return `${e.planetas.length} planetas cargados`;
    default: {
      //JMM: Exhaustividad: si mañana añades una variante, `e` deja de ser `never` y TS avisa
      const imposible: never = e;
      throw new Error(`Estado imposible: ${String(imposible)}`);
    }
  }
}

//Se llaman todas dentro de la misma función para que sea secuencial
async function PRUEBAS_resto(): Promise<void> {

  console.log("=== Ejercicio 1: cargarPlanetas ===");
  const planetas = await cargarPlanetas(API_PLANETAS);
  console.log(`  Recibidos ${planetas.length} planetas (primeros 5):`);
  for (const p of planetas.slice(0, 5)) {
    console.log(`    - ${p.name} · ${p.population} hab. · ${p.climate}`);
  }
  console.log("=== Ejercicio 1: cargarPlanetas LOCAL ===");
  const planetas_local = await cargarPlanetas(API_PLANETAS_LOCAL);
  console.log(`  Recibidos ${planetas_local.length} planetas_local (primeros 5):`);
  for (const p of planetas_local.slice(0, 5)) {
    console.log(`    - ${p.name} · ${p.population} hab. · ${p.climate}`);
  }
  console.log("\n=== Ejercicio 2: cargarParalelo ===");
  const [primero, segundo] = await cargarParalelo();
  console.log(`  En paralelo: ${primero.name} y ${segundo.name}`);
  console.log("\n=== Ejercicio 2: cargarParalelo LOCAL===");
  const [primero_local, segundo_local] = await cargarParalelo_local();
  console.log(`  En paralelo: ${primero_local.name} y ${segundo_local.name}`);

  console.log("\n=== Ejercicio 3: cargarSecuencial ===");
  const urls = [`${API_PLANETAS}/3`, `${API_PLANETAS}/4`, `${API_PLANETAS}/5`];
  const enSerie = await cargarSecuencial(urls);
  console.log(`  En serie: ${enSerie.map((p) => p.name).join(", ")}`);


  console.log("\n=== Ejercicio 3: cargarSecuencial ===");
  const urls_local = [`${API_PLANETAS_LOCAL}?_start=2&_end=3`, 
    `${API_PLANETAS_LOCAL}?_start=3&_end=4`,
    `${API_PLANETAS_LOCAL}?_start=4&_end=5`];
  const enSerie_local = await cargarSecuencial(urls);
  console.log(`  En serie: ${enSerie_local.map((p) => p.name).join(", ")}`);

  console.log("\n=== Ejercicio 4: EstadoCarga ===");
  const cargando: EstadoCarga = { estado: "cargando" }; //JMM: estado previo al fetch. 
  //Esto siempre hay que ponerlo porque siempre pasa por este estado 
  console.log(`  ${describirEstado(cargando)}`); //Unión Discriminada
  const estado = await cargarConEstado(API_PLANETAS); //Estado durante carga
  console.log(`  ${describirEstado(estado)}`);

  if (esListo(estado)) {
    console.log(`  Narrowing con esListo: ${estado.planetas.length} planetas disponibles`);
  }
}


void PRUEBAS_resto();
