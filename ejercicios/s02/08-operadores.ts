// ============================================================
// S02 · Ejercicio 6 · Operadores
// ============================================================
// Catálogo: sesiones/EjerciciosPropuestos/ejerciciosTS.md · Bloque 8 · Operadores
// Completa. Solución: soluciones/08-operadores.ts

// 1) `==` frente a `===`: comparación estricta
function sonIguales(a: unknown, b: unknown): boolean {
  return a == b; // TODO: usa `===`
}


// 2) Operador ternario
function clasificar(nota: number): "aprobado" | "suspenso" {
  return "suspenso"; // TODO: ternario nota >= 5
}


// 3) `??` (nullish) frente a `||`: con `??` el `0` es un valor válido
function conDefecto(valor: number | null | undefined, porDefecto: number): number {
  return valor || porDefecto; // TODO: usa `??`
}


// 4) Short-circuit `&&`: no ejecuta la llamada si la condición falla
let veces = 0;
const operacion = (): number => {
  veces += 1;
  return 7;
};
function correrSi(condicion: boolean): number | false {
  return 0; // TODO: `condicion && operacion()`
}
