// ============================================================
// S02 · Ejercicio 4 · Union types, literal types y narrowing
// ============================================================
// Completa. Solución: soluciones/s02/04-unions-narrowing.ts

export type Id = unknown; // TODO: string | number
export type EstadoPedido = unknown; // TODO: "pendiente" | "enviado" | "entregado"

// 1) Narrowing con typeof
export function imprimirId(id: string | number): string {
  return "TODO"; // si string → "ID: " + mayúsculas; si number → "Nº " + toFixed(2)
}

// 2) Narrowing con `in`
export interface Casa {
  jardin: boolean;
}
export interface Piso {
  planta: number;
}
export type Vivienda = Casa | Piso;

export function describir(v: Vivienda): string {
  return "TODO"; // "Casa con jardin" o "Piso en planta X"
}

// 3) Discriminated union
export interface Circulo {
  tipo: "circulo";
  radio: number;
}
export interface Rectangulo {
  tipo: "rectangulo";
  ancho: number;
  alto: number;
}
export type Figura = Circulo | Rectangulo;

export function calcularArea(fig: Figura): number {
  // TODO: usa switch sobre fig.tipo
  return 0;
}

// 4) Nullish: devuelve `valor ?? "Invitado"`
export function nombreOVisitante(nombre?: string): string {
  return "";
}