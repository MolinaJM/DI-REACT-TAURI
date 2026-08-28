// ============================================================
// S02 · Ejercicio 7 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

export interface Pez {
  tipo: "pez";
  profundidadMaxima: number;
}
export interface Ave {
  tipo: "ave";
  envergadura: number;
}
export type Animal = Pez | Ave;

// 1) Predicado de tipo
export function esPez(animal: Animal): animal is Pez {
  return animal.tipo === "pez";
}

// 2) Uso del guard (tras `esPez`, TS estrecha a Pez)
export function describirAnimal(animal: Animal): string {
  if (esPez(animal)) return `Pez que nada hasta ${animal.profundidadMaxima}m`;
  return `Ave con envergadura de ${animal.envergadura}cm`;
}

// 3) Filtrado con type predicate
export interface UsuarioActivo {
  activo: true;
  ultimoAcceso: Date;
}
export interface UsuarioInactivo {
  activo: false;
}
export type UsuarioEstado = UsuarioActivo | UsuarioInactivo;

export function filtrarActivos(usuarios: UsuarioEstado[]): UsuarioActivo[] {
  return usuarios.filter((u): u is UsuarioActivo => u.activo === true);
}

// 4) Assertion function
export function afirmarString(valor: unknown): asserts valor is string {
  if (typeof valor !== "string") {
    throw new Error("Se esperaba un string");
  }
}

export function procesarMensaje(mensaje: unknown): string {
  afirmarString(mensaje); // desde aquí `mensaje` es string
  return mensaje.toUpperCase();
}

// ---- Comprobaciones ----
assert.equal(esPez({ tipo: "pez", profundidadMaxima: 100 }), true);
assert.equal(describirAnimal({ tipo: "pez", profundidadMaxima: 100 }), "Pez que nada hasta 100m");
assert.equal(describirAnimal({ tipo: "ave", envergadura: 50 }), "Ave con envergadura de 50cm");

const usuarios: UsuarioEstado[] = [
  { activo: true, ultimoAcceso: new Date() },
  { activo: false },
  { activo: true, ultimoAcceso: new Date() },
];
assert.equal(filtrarActivos(usuarios).length, 2);

assert.equal(procesarMensaje("hola"), "HOLA");
assert.throws(() => procesarMensaje(42));
console.log("S02 · Ejercicio 7 · ¡OK!");