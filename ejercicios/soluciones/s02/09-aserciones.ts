// ============================================================
// S02 · Ejercicio 9 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

export interface Pelicula {
  id: number;
  titulo: string;
}

// 1) `as`
const bruto: unknown = '{"id": 1, "titulo": "Dune"}';
export const pelicula: Pelicula = JSON.parse(bruto as string) as Pelicula;

// 2) `!`
export interface Servidor {
  puerto?: number | null;
}
export function puertoDe(servidor: Servidor): number {
  return servidor.puerto!;
}

// 3) `as const`
export const RUTAS = ["/inicio", "/catalogo"] as const;
export const CONFIG = {
  servicio: "api",
  version: 3,
} as const;

// 4) React: estrechar la forma mínima de un evento
export function valorDeEvento(evento: { target: { value?: string } }): string {
  return evento.target.value ?? "";
}
export function temaSeleccionado(evento: unknown): string {
  return valorDeEvento(evento as { target: { value?: string } });
}

// 5) typeof arr[number]
export const CONTRASTES = ["claro", "oscuro"] as const;
export type Contraste = (typeof CONTRASTES)[number];
export function pintar(color: Contraste): string {
  return `paint-${color}`;
}


// 6) `as` vs `<tipo>`: el cast angular solo vale en .ts puro (no en .tsx);
//    `conAngular` se implementa con `as` para que compile en cualquier context
export function conComo(valor: unknown): string {
  return valor as string;
}
export function conAngular(valor: unknown): string {
  return String(valor); // en JSX nunca uses <string>valor → usar `as` o String()
}

// ---- Comprobaciones 09 extra ----
assert.equal(conComo("hola"), "hola");
assert.equal(conAngular(123), "123");
// ---- Comprobaciones ----
assert.deepEqual(pelicula, { id: 1, titulo: "Dune" });
assert.equal(puertoDe({ puerto: 8080 }), 8080);
assert.deepEqual(RUTAS, ["/inicio", "/catalogo"]);
assert.equal(CONFIG.version, 3);
assert.equal(temaSeleccionado({ target: { value: "oscuro" } }), "oscuro");
assert.equal(temaSeleccionado({ target: {} }), "");
assert.equal(pintar("claro"), "paint-claro");
console.log("S02 · Ejercicio 9 · ¡OK!");