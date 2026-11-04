export {};
import type { Usuario, Perro, Gato, Planeta } from "./tipos.ts";
//JMM:// ============================================================
//JMM:// BLOQUE 12 - Type Guards Avanzados
//JMM:// ============================================================

//JMM:// --- Ejercicio 1: Custom type guard esAdmin ---

//JMM: El interface Usuario vive en tipos.ts (modularidad).

//JMM: Un type guard es una función que devuelve boolean pero le dice a TS
//JMM: que el parámetro es de un tipo más específico dentro del bloque if.
//JMM: La clave es la firma: `param is Tipo`
function esAdmin(usuario: Usuario): usuario is "admin" {
  //JMM: La función devuelve boolean, pero la firma le dice a TS
  //JMM: que si devuelve true, entonces el parámetro es de tipo "admin"
  return usuario.rol === "admin";
}

//JMM: Otra forma más práctica:
function esUsuarioAdmin(usuario: Usuario): usuario is Usuario & { rol: "admin" } {
  return usuario.rol === "admin";
}

function probarEsAdmin(): void {
  console.log("=== Ejercicio 1: Custom type guard esAdmin ===");

  const usuarios: Usuario[] = [
    { id: 1, nombre: "Ana", rol: "admin", email: "ana@empresa.com" },
    { id: 2, nombre: "Carlos", rol: "editor", email: "carlos@empresa.com" },
    { id: 3, nombre: "María", rol: "admin", email: "maria@empresa.com" },
    { id: 4, nombre: "Pedro", rol: "lector", email: "pedro@empresa.com" },
  ];

  for (const usuario of usuarios) {
    if (esAdmin(usuario)) {
      //JMM: Dentro del if, TS sabe que usuario.rol es "admin"
      console.log(`${usuario.nombre} (${usuario.email}) es ADMINISTRADOR`);
    } else {
      console.log(`${usuario.nombre} (${usuario.email}) NO es administrador (rol: ${usuario.rol})`);
    }
  }

  console.log();
  console.log("El type guard `esAdmin` le dice a TS: si devuelvo true, el rol es 'admin'.");
  console.log("Dentro del if, TS hace narrowing automático del tipo.");
  console.log();
}

probarEsAdmin();

//JMM:// --- Ejercicio 2: Type predicate en for...of para filtrar uniones ---
//JMM: Los interfaces Perro y Gato viven en tipos.ts (modularidad).

function esPerro(animal: Perro | Gato): animal is Perro {
  return (animal as Perro).tipo === "perro";
}

function filtrarAnimales(): void {
  console.log("=== Ejercicio 2: Type predicate en for...of ===");

  const animales: (Perro | Gato)[] = [
    { tipo: "perro", nombre: "Rex", ladra: () => "¡Guau!" },
    { tipo: "gato", nombre: "Misia", maulla: () => "¡Miau!" },
    { tipo: "perro", nombre: "Luna", ladra: () => "¡Guau guau!" },
    { tipo: "gato", nombre: "Bigotes", maulla: () => "¡Miaaaau!" },
  ];

  //JMM: for...of con type predicate: filtramos solo los perros
  console.log("Perros:");
  for (const animal of animales) {
    if (esPerro(animal)) {
      //JMM: TS sabe que animal es Perro dentro del if
      console.log(`  - ${animal.nombre}: ${animal.ladra()}`);
    }
  }

  //JMM: Y los gatos con un type guard inverso
  console.log("Gatos:");
  for (const animal of animales) {
    if (!esPerro(animal)) {
      //JMM: TS sabe que animal es Gato porque no es Perro
      console.log(`  - ${animal.nombre}: ${animal.maulla()}`);
    }
  }

  console.log();
  console.log("El type predicate en el for...of nos permite filtrar y hacer narrowing a la vez.");
  console.log("Sin el type guard, TS no sabría qué métodos llamar (ladra vs maulla).");
  console.log();
}

filtrarAnimales();

//JMM:// --- Ejercicio 3: Assertion function ---

//JMM: Una assertion function NO devuelve nada. En su lugar, garantiza
//JMM: que el parámetro cumple un tipo, y si no, lanza un error.
//JMM: La firma es: `asserts valor is Tipo`
function asegurarNumero(valor: unknown): asserts valor is number {
  if (typeof valor !== "number" || Number.isNaN(valor)) {
    throw new Error(`Esperaba un número pero recibí: ${valor} (tipo: ${typeof valor})`);
  }
}

function probarAssertionFunction(): void {
  console.log("=== Ejercicio 3: Assertion function asegurarNumero ===");

  const datos: unknown[] = [42, "hola", 3.14, null, 0, true];

  for (const dato of datos) {
    try {
      //JMM: Esta función lanza si el valor no es número
      asegurarNumero(dato);

      //JMM: A partir de aquí, TS sabe que dato es number
      console.log(`"${dato}" es un número  ENTONCES  doble: ${dato * 2}`);
    } catch (error) {
      console.log(`"${dato}" no es un número  ENTONCES  ${error}`);
    }
  }

  console.log();
  console.log("La assertion function no devuelve boolean: o funciona o lanza error.");
  console.log("Si pasa, TS hace narrowing del tipo automáticamente en el código siguiente.");
  console.log("Es como un guard pero más estricto: si no cumple, el programa se para.");
  console.log();
}

probarAssertionFunction();

//JMM:// ============================================================
//JMM:// BLOQUE 12 (extra) - Validar datos de un JSON externo
//JMM:// ============================================================

//JMM:// --- Ejercicio 4: cargar y validar datos/planetas.json ---

//JMM: Los datos estáticos se importan como MÓDULO JSON.
//JMM: Ojo: NO se leen con node:fs ni con fetch sobre el fichero.
//JMM: El import es lo único que funciona igual en Node y en Vite/React
//JMM: (fetch no admite rutas relativas ni el protocolo file://).
import datosCrudos from "../datos/planetas.json" with { type: "json" };

//JMM: El interface Planeta vive en tipos.ts (modularidad).

//JMM: Type guard que valida la FORMA de un solo planeta.
//JMM: Es la regla del curso: lo que viene de fuera se valida, no se castea a ciegas.
function esPlaneta(bruto: unknown): bruto is Planeta {
  if (typeof bruto !== "object" || bruto === null) return false;
  const p = bruto as Record<string, unknown>;
  return (
    typeof p.name === "string" &&
    typeof p.population === "number" &&
    typeof p.climate === "string" &&
    // films es opcional: si viene, tiene que ser un array
    (p.films === undefined || Array.isArray(p.films))
  );
}

//JMM: El import ya viene tipado por TS, pero lo tratamos como `unknown`
//JMM: para no confiar en él: primero comprobamos que sea un array y luego
//JMM: validamos elemento a elemento.
function cargarPlanetas(): Planeta[] {
  const bruto: unknown = datosCrudos;
  if (typeof bruto !== "object" || bruto === null) {
    throw new Error("El JSON no es un objeto");
  }
  const lista = (bruto as { planetas?: unknown }).planetas;
  if (!Array.isArray(lista)) {
    throw new Error("El JSON no contiene un array de planetas");
  }
  const validos: Planeta[] = [];
  for (const elemento of lista) {
    if (esPlaneta(elemento)) {
      validos.push(elemento);
    }
  }
  return validos;
}

function planetasHabitados(): Planeta[] {
  return cargarPlanetas().filter((p) => p.population > 0);
}

console.log("\n=== Ejercicio 4: validar el JSON importado ===");
console.log(`Planetas cargados: ${cargarPlanetas().length}`);
for (const p of cargarPlanetas()) {
  const n = p.films?.length ?? 0;
  console.log(`  ${p.name} · ${p.population} hab. · ${p.climate} · ${n} ${n === 1 ? "película" : "películas"}`);
}

console.log("\nGuards:");
console.log(`  esPlaneta({ name: "Hoth", population: 0, climate: "frozen" }) -> ${esPlaneta({ name: "Hoth", population: 0, climate: "frozen" })}`);
console.log(`  esPlaneta({ name: "Hoth", population: "0", climate: "frozen" }) -> ${esPlaneta({ name: "Hoth", population: "0", climate: "frozen" })}   // population es string, no number`);
console.log(`  esPlaneta({ name: "Hoth", climate: "frozen" }) -> ${esPlaneta({ name: "Hoth", climate: "frozen" })}   // falta population`);
console.log(`  esPlaneta(null) -> ${esPlaneta(null)}`);
console.log(`  esPlaneta("Tatooine") -> ${esPlaneta("Tatooine")}`);

console.log("\nSolo los habitados (population > 0):");
for (const p of planetasHabitados()) {
  console.log(`  ${p.name} · ${p.population}`);
}

console.log();
console.log("Recuerda: el módulo JSON es un ÚNICO objeto compartido por todos los");
console.log("que lo importan. Mutarlo affectaría a todos: trátalo como inmutable.");
console.log();
