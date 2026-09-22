// ============================================================
// S02 · Ejercicio 4 · Union types, literal types y narrowing
// ============================================================
// Completa. Solución: soluciones/s02/04-unions-narrowing.ts

type Id = unknown; // TODO: string | number
type EstadoPedido = unknown; // TODO: "pendiente" | "enviado" | "entregado"

// 1) Narrowing con typeof
function imprimirId(id: string | number): string {
  return "TODO"; // si string → "ID: " + mayúsculas; si number → "Nº " + toFixed(2)
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
  return "TODO"; // "Casa con jardin" o "Piso en planta X"
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
  // TODO: usa switch sobre fig.tipo
  return 0;
}

// 4) Nullish: devuelve `valor ?? "Invitado"`
function nombreOVisitante(nombre?: string): string {
  return "";
}

// 5) Narrowing con typeof sobre unknown
function procesar(valor: unknown): string {
  // TODO: si es string, devuelve su longitud en mayúsculas; si es number, su doble como string; si no, "desconocido"
  return "TODO";
}