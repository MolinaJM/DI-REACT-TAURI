// ============================================================
// S03 · Ejercicio 3 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// 1) keyof:
export type ClavesUsuario = keyof Usuario; // "id" | "nombre" | "email"

// 2) typeof:
export const config = {
  color: "rojo",
  grosor: 2,
  esquinasRedondeadas: true,
};
export type TipoConfig = typeof config;

// 3) satisfies:
export const ajustes = {
  color: "azul",
  zoom: 1.5,
} as const satisfies Record<string, string | number>;
// `as const` conserva los literales; satisfes valida que el objeto cumple el tipo.

// 4) Acceso indexado genérico
export function obtenerCampo<T, K extends keyof T>(obj: T, campo: K): T[K] {
  return obj[campo];
}

// 5) Object.keys tipado con keyof
export function clavesDe<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

// ---- Comprobaciones ----
const u: Usuario = { id: 1, nombre: "Ana", email: "a@x.es" };
const claves: ClavesUsuario = "nombre";
assert.equal(claves, "nombre");

const rojo: TipoConfig = { color: "azul", grosor: 3, esquinasRedondeadas: false };
assert.equal(rojo.grosor, 3);

// `ajustes.color` se conserva como el literal "azul" gracias a `as const`
const colorLiteral: "azul" = ajustes.color;
assert.equal(colorLiteral, "azul");

assert.equal(obtenerCampo(u, "email"), "a@x.es");
assert.deepEqual(clavesDe({ x: 1, y: 2 }), ["x", "y"]);
console.log("S03 · Ejercicio 3 · ¡OK!");