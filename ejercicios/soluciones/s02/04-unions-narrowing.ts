// ============================================================
// S02 · Ejercicio 4 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

type Id = string | number;
type EstadoPedido = "pendiente" | "enviado" | "entregado";

// 1) Narrowing con typeof
function imprimirId(id: string | number): string {
  if (typeof id === "string") return "ID: " + id.toUpperCase();
  return "Nº " + id.toFixed(2);
}

// 2) Narrowing con `in`
interface Casa {
  jardin: boolean;
}
interface Piso {
  planta: number;
}
type Vivienda = Casa | Piso;

function describir(v: Vivienda): string {
  if ("jardin" in v) return "Casa con jardin";
  return `Piso en planta ${v.planta}`;
}

// 3) Discriminated union
interface Circulo {
  tipo: "circulo";
  radio: number;
}
interface Rectangulo {
  tipo: "rectangulo";
  ancho: number;
  alto: number;
}
type Figura = Circulo | Rectangulo;

function calcularArea(fig: Figura): number {
  switch (fig.tipo) {
    case "circulo":
      return Math.PI * fig.radio ** 2;
    case "rectangulo":
      return fig.ancho * fig.alto;
  }
}

// 4) Nullish coalescing
function nombreOVisitante(nombre?: string): string {
  return nombre ?? "Invitado";
}

// 5) Narrowing con typeof sobre unknown
function procesar(valor: unknown): string {
  if (typeof valor === "string") return valor.toUpperCase();
  if (typeof valor === "number") return String(valor * 2);
  return "desconocido";
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
assert.equal(procesar("hola"), "HOLA");
assert.equal(procesar(21), "42");
assert.equal(procesar(true), "desconocido");
console.log("S02 · Ejercicio 4 · ¡OK!");