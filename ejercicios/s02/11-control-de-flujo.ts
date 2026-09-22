// ============================================================
// S02 · Ejercicio 11 · Control de flujo (if, switch exhaustivo, bucles)
// ============================================================
// Completa. Solución: soluciones/s02/11-control-de-flujo.ts
// Catálogo: sesiones/ejerciciosTS.md · Sesión 2 · Bloque 14

// 1) if / else if / else que clasifica una nota
function clasificarNota(nota: number): string {
  return ""; // TODO: >=9 Sobresaliente · >=7 Notable · >=5 Aprobado · resto Suspenso
}

// 2) switch exhaustivo con `never` (patrón reducer de React)
type EstadoFormulario = "pendiente" | "cargando" | "listo" | "error";
function etiquetaEstado(estado: EstadoFormulario): string {
  switch (estado) {
    case "pendiente": return "⏳";
    case "cargando": return "🔄";
    case "listo": return "✅";
    case "error": return "❌";
    default: return ""; // TODO: exhaustividad con una variable `never`
  }
}

// 3) Bucles: for...of
function contarLetras(palabras: string[]): number {
  let total = 0;
  // TODO: recorre con `for...of` sumando la longitud
  return total;
}

// 4) Generar secuencia hacia atrás (for...of sobre un rango)
function cuentaAtras(hasta: number): number[] {
  const numeros: number[] = [];
  // TODO: rellena `numeros` con `hasta`…1 usando `for...of`
  return numeros;
}