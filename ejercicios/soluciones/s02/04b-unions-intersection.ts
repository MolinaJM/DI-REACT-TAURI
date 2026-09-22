// ============================================================
// S02 · Ejercicio 4b · SOLUCIÓN — Union types e intersección
// ============================================================
import assert from "node:assert/strict";

// 1) Union type
export type Id = string | number;

export function obtenerLongitud(id: string | number): string {
  return String(id).length;
}

// 2) Intersección de tipos
export interface Persona {
  nombre: string;
  edad: number;
}

export interface Empleado {
  departamento: string;
  salario: number;
}

export const personaEmpleado: Persona & Empleado = {
  nombre: "Ana",
  edad: 30,
  departamento: "Ingeniería",
  salario: 50000,
};

// 3) Union type: primer elemento
export function primerElemento(valor: string | string[]): string {
  if (Array.isArray(valor)) return valor[0];
  return valor;
}

// ---- Comprobaciones ----
assert.equal(obtenerLongitud("abc"), 3);
assert.equal(obtenerLongitud(123), 3);
assert.equal(personaEmpleado.nombre, "Ana");
assert.equal(personaEmpleado.departamento, "Ingeniería");
assert.equal(primerElemento(["a", "b", "c"]), "a");
assert.equal(primerElemento("hola"), "hola");
console.log("S02 · Ejercicio 4b · ¡OK!");
