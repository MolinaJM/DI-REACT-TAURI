// ============================================================
// S02 · Ejercicio 11 · Control de flujo (if, switch exhaustivo, bucles)
// ============================================================
// Completa. Solución: soluciones/s02/11-control-de-flujo.ts
// Catálogo: sesiones/ejerciciosTS.md · Sesión 2 · Bloque 16

// 1) if / else if / else que clasifica una nota
export function clasificarNota(nota: number): string {
  return ""; // TODO: >=9 Sobresaliente · >=7 Notable · >=5 Aprobado · resto Suspenso
}

// 2) switch exhaustivo con `never` (patrón reducer de React)
export type EstadoFormulario = "pendiente" | "cargando" | "listo" | "error";
export function etiquetaEstado(estado: EstadoFormulario): string {
  switch (estado) {
    case "pendiente": return "⏳";
    case "cargando": return "🔄";
    case "listo": return "✅";
    case "error": return "❌";
    default: return ""; // TODO: exhaustividad con una variable `never`
  }
}

// 3) Bucles: for...of y for clásico
export function contarLetras(palabras: string[]): number {
  let total = 0;
  // TODO: recorre con `for...of` sumando la longitud
  return total;
}
export function indicesInvertidos(palabras: string[]): number[] {
  const indices: number[] = [];
  // TODO: bucle `for` clásico desde el final al inicio
  return indices;
}

// 4) Bucle `while` (cuenta atrás)
export function cuentaAtras(hasta: number): number[] {
  const numeros: number[] = [];
  // TODO: `while` desde `hasta` bajando hasta 1
  return numeros;
}