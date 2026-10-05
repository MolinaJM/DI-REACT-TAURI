// ============================================================
// S02 · Ejercicio 12 · Type guards avanzados
// ============================================================
// Completa. Solución: soluciones/s02/12-type-guards.ts

// 1) Predicado de tipo: `esPez(animal)` debe devolver `animal is Pez`
interface Pez {
  tipo: "pez";
  profundidadMaxima: number;
}
interface Ave {
  tipo: "ave";
  envergadura: number;
}
type Animal = Pez | Ave;

function esPez(animal: Animal): boolean {
  return animal.tipo === "pez"; // TODO: `animal is Pez`
}

// 2) Usa el guard: describe cada animal
function describirAnimal(animal: Animal): string {
  return ""; // TODO: si es pez → "Pez que nada hasta Xm"; si no → "Ave con Ycm"
}

// 3) Filtrar con type predicate: `filtrarActivos` devuelve UsuarioActivo[]
interface UsuarioActivo {
  activo: true;
  ultimoAcceso: Date;
}
interface UsuarioInactivo {
  activo: false;
}
type UsuarioEstado = UsuarioActivo | UsuarioInactivo;

function filtrarActivos(usuarios: UsuarioEstado[]): UsuarioActivo[] {
  const activos: UsuarioActivo[] = [];
  for (const u of usuarios) {
    if (u.activo === true) {
      activos.push(u);
    }
  }
  return activos; // TODO: usa un type predicate en el if
  // Más adelante (S03): `return usuarios.filter((u): u is UsuarioActivo => u.activo === true);`
}

// 4) Assertion function: `afirmarString` lanza si `valor` no es string
function afirmarString(valor: unknown): void {
  if (typeof valor !== "string") {
    throw new Error("Se esperaba un string");
  }
}

// 5) Datos externos: `planetas.json` llega como `unknown` desde el "backend".
//    Los datos estáticos se importan como módulo JSON (NO con node:fs ni con
//    fetch sobre el fichero: el import es lo que funciona en Node y en Vite).
import datosCrudos from "../../datos/planetas.json" with { type: "json" };

interface Planeta {
  name: string;
  population: number;
  climate: string;
  films?: string[];
}

// TODO: escribe el type guard que valida que `bruto` es un Planeta
function esPlaneta(bruto: unknown): bruto is Planeta {
  return false;
}

// TODO: carga el JSON, valida cada elemento y devuelve solo los planetas
//       habitados (population > 0). Si el JSON no fuera un array, lanza.
function planetasHabitados(): Planeta[] {
  return [];
}