// ============================================================
// S02 · Ejercicio 10 · Conversión de tipos y operadores
// ============================================================
// Completa. Solución: soluciones/s02/10-conversion-operadores.ts
// Catálogo: sesiones/ejerciciosTS.md · Sesión 2 · Bloques 9 y 12

// 1) `==` frente a `===`: comparación estricta
export function sonIguales(a: unknown, b: unknown): boolean {
  return a == b; // TODO: usa `===`
}

// 2) Operador ternario
export function clasificar(nota: number): "aprobado" | "suspenso" {
  return "suspenso"; // TODO: ternario nota >= 5
}

// 3) `??` (nullish) frente a `||`: con `??` el `0` es un valor válido
export function conDefecto(valor: number | null | undefined, porDefecto: number): number {
  return valor || porDefecto; // TODO: usa `??`
}

// 4) Short-circuit `&&`: no ejecuta la llamada si la condición falla
let veces = 0;
export const operacion = (): number => {
  veces += 1;
  return 7;
};
export function correrSi(condicion: boolean): number | false {
  return 0; // TODO: `condicion && operacion()`
}

// 5) `JSON.stringify` / `JSON.parse` tipados
export interface Pedido {
  id: number;
  total: number;
}
export function serializar(pedido: Pedido): string {
  return ""; // TODO: JSON.stringify
}
export function deserializar(guardado: string): Pedido {
  return JSON.parse(guardado) as Pedido;
}