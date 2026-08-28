// ============================================================
// S03 · Ejercicio 3 · keyof, typeof y satisfies
// ============================================================
// Completa. Solución: soluciones/s03/03-keyof-typeof-satisfies.ts

// 1) keyof: escribe `ClavesUsuario`
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}
export type ClavesUsuario = unknown; // TODO: keyof Usuario

// 2) typeof: deriva `TipoConfig` desde la constante
export const config = {
  color: "rojo",
  grosor: 2,
  esquinasRedondeadas: true,
};
export type TipoConfig = unknown; // TODO: typeof config

// 3) satisfes + as const: `ajustes` debe cumplir Record<string, string | number>
//    y conservar el tipo literal de `color`.
export const ajustes = {
  color: "azul",
  zoom: 1.5,
}; // TODO: anota con `as const satisfies Record<string, string | number>`

// 4) Función genérica con keyof que devuelve `obj[k]` y además
//    una versión que itera sobre Object.keys con tipado seguro.
export function obtenerCampo<T, K extends keyof T>(obj: T, campo: K): T[K] {
  return obj[campo];
}

// 5) Object.keys con keyof: devuelve las claves como array chekeable
export function clavesDe<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}