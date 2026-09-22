// ============================================================
// S02 · Ejercicio 9 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

interface Pelicula {
  id: number;
  titulo: string;
}

// 1) `as`
const bruto: unknown = { id: 1, titulo: "Dune" };
const pelicula: Pelicula = bruto as Pelicula;

// 2) `!`
interface Servidor {
  puerto?: number | null;
}
function puertoDe(servidor: Servidor): number {
  return servidor.puerto!;
}

// 3) `as const`
const RUTAS = ["/inicio", "/catalogo"] as const;
const CONFIG = {
  servicio: "api",
  version: 3,
} as const;

// 4) React: estrechar la forma mínima de un evento
function valorDeEvento(evento: { target: { value?: string } }): string {
  return evento.target.value ?? "";
}
function temaSeleccionado(evento: unknown): string {
  return valorDeEvento(evento as { target: { value?: string } });
}

// 5) typeof arr[number]
const CONTRASTES = ["claro", "oscuro"] as const;
type Contraste = (typeof CONTRASTES)[number];
function pintar(color: Contraste): string {
  return `paint-${color}`;
}


// 6) `as` vs `<tipo>`: el cast angular solo vale en .ts puro (no en .tsx);
//    `conAngular` se implementa con `as` para que compile en cualquier context
function conComo(valor: unknown): string {
  return valor as string;
}
function conAngular(valor: unknown): string {
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