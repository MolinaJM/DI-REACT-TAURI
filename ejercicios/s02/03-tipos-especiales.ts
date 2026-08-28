// ============================================================
// S02 · Ejercicio 3 · any, unknown, never y void
// ============================================================
// Completa. Solución: soluciones/s02/03-tipos-especiales.ts

// 1) La función recibe `unknown`. Escribe un type guard manual: si es string,
//    devuelve su longitud en mayúsculas; si es number, su doble; si no, "desconocido"
export function procesar(valor: unknown): string {
  return "TODO";
}

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

// 5) Exhaustiveness: completa el default con never para que TS
//    avise si añaden un caso nuevo al union type
type Forma = "circulo" | "cuadrado";
export function area(forma: Forma): number {
  switch (forma) {
    case "circulo":
      return 3.14;
    case "cuadrado":
      return 4;
  }
  return 0; // TODO: const _exhaustivo: never = forma;
}