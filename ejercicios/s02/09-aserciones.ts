// ============================================================
// S02 · Ejercicio 9 · Type assertions (as, as const, !, typeof arr[number])
// ============================================================
// Completa. Solución: soluciones/s02/09-aserciones.ts
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Sesión 2 · Bloque 10

interface Pelicula {
  id: number;
  titulo: string;
}

// 1) `as`: estrecha un valor `unknown` procedente de una API / JSON
const bruto: unknown = { id: 1, titulo: "Dune" };
const pelicula: Pelicula = bruto as Pelicula; // TODO: `as Pelicula`

// 2) `!` non-null assertion: afirmamos que el puerto siempre existe
interface Servidor {
  puerto?: number | null;
}
function puertoDe(servidor: Servidor): number {
  return servidor.puerto; // TODO: usa `!`
}

// 3) `as const`: valores a tipos literales inmutables
const RUTAS = ["/inicio", "/catalogo"]; // TODO: añade `as const`
const CONFIG = {
  servicio: "api",
  version: 3,
}; // TODO: añade `as const`

// 4) Caso React: estrechar la forma mínima de un evento tipado como `unknown`
function valorDeEvento(evento: { target: { value?: string } }): string {
  return evento.target.value ?? "";
}
function temaSeleccionado(evento: unknown): string {
  return valorDeEvento(evento as { target: { value?: string } }); // TODO: `as` sobre la forma mínima
}

// 5) `typeof arr[number]`: el tipo de un elemento de un array `as const`
const CONTRASTES = ["claro", "oscuro"] as const;
type Contraste = (typeof CONTRASTES)[number];
function pintar(color: Contraste): string {
  return ""; // TODO: `paint-${color}` (pintar("amarillo") no debe compilar)
}
// 6) S2·10.6 Diferencia entre `as` y `<tipo>`: la sintaxis `<tipo>valor` (angle-bracket)
//    NO funciona en ficheros .tsx ni cuando choca con los genéricos de JSX.
//    `as` es la única que siempre compila en React.
function conComo(valor: unknown): string {
  return (valor as string); // TODO: `as`
}
function conAngular(valor: unknown): string {
  // TODO: cambia la línea por `<string>valor` en un .ts normal (falla en .tsx)
  return String(valor);
}
