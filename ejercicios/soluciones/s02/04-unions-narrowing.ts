// ============================================================
// S02 · Ejercicio 4 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

export type Id = string | number;
export type EstadoPedido = "pendiente" | "enviado" | "entregado";

// 1) Narrowing con typeof
export function imprimirId(id: string | number): string {
  if (typeof id === "string") return "ID: " + id.toUpperCase();
  return "Nº " + id.toFixed(2);
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
  if ("jardin" in v) return "Casa con jardin";
  return `Piso en planta ${v.planta}`;
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
  switch (fig.tipo) {
    case "circulo":
      return Math.PI * fig.radio ** 2;
    case "rectangulo":
      return fig.ancho * fig.alto;
  }
}

// 4) Nullish coalescing
export function nombreOVisitante(nombre?: string): string {
  return nombre ?? "Invitado";
}

// ---- Comprobaciones ----
assert.equal(imprimirId("abc"), "ID: ABC");
assert.equal(imprimirId(5), "Nº 5.00");
assert.equal(describir({ jardin: true }), "Casa con jardin");
assert.equal(describir({ planta: 3 }), "Piso en planta 3");
assert.equal(Number(calcularArea({ tipo: "circulo", radio: 1 }).toFixed(2)), 3.14);
assert.equal(calcularArea({ tipo: "rectangulo", ancho: 2, alto: 3 }), 6);
assert.equal(nombreOVisitante(), "Invitado");
assert.equal(nombreOVisitante("Ana"), "Ana");
console.log("S02 · Ejercicio 4 · ¡OK!");