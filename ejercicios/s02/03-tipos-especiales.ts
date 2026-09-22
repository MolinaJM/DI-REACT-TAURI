// ============================================================
// S02 · Ejercicio 3 · any, unknown, never y void
// ============================================================
// Completa. Solución: soluciones/s02/03-tipos-especiales.ts

// 2) `any` por debajo del capó: la siguiente función NO usa any, pero dado `unknown`
//    tras validarlo. Completa la versión segura equivalente sin usar any.
export const cualquierCosa: any = "texto"; // TODO: cambia `any` por `unknown`

// 3) void: completa la función que solo imprime
export function logMensaje(mensaje: string): number {
  return 42; // TODO: debe devolver void
}

// 4) never: completa `errorFatal` que siempre lanza
export function errorFatal(mensaje: string): string {
  return mensaje; // TODO: tipo never + throw
}