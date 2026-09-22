// ============================================================
// S02 · Ejercicio 7 · Type guards avanzados
// ============================================================
// Completa. Solución: soluciones/s02/07-type-guards.ts

// 1) Predicado de tipo: `esPez(animal)` debe devolver `animal is Pez`
export interface Pez {
  tipo: "pez";
  profundidadMaxima: number;
}
export interface Ave {
  tipo: "ave";
  envergadura: number;
}
export type Animal = Pez | Ave;

export function esPez(animal: Animal): boolean {
  return animal.tipo === "pez"; // TODO: `animal is Pez`
}

// 2) Usa el guard: describe cada animal
export function describirAnimal(animal: Animal): string {
  return ""; // TODO: si es pez → "Pez que nada hasta Xm"; si no → "Ave con Ycm"
}

// 3) Filtrar con type predicate: `filtrarActivos` devuelve UsuarioActivo[]
export interface UsuarioActivo {
  activo: true;
  ultimoAcceso: Date;
}
export interface UsuarioInactivo {
  activo: false;
}
export type UsuarioEstado = UsuarioActivo | UsuarioInactivo;

export function filtrarActivos(usuarios: UsuarioEstado[]): UsuarioActivo[] {
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
export function afirmarString(valor: unknown): void {
  if (typeof valor !== "string") {
    throw new Error("Se esperaba un string");
  }
}