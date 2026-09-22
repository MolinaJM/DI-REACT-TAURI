// ============================================================
// S02 · Ejercicio 10 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) `===`
function sonIguales(a: unknown, b: unknown): boolean {
  return a === b;
}

// 2) Ternario
function clasificar(nota: number): "aprobado" | "suspenso" {
  return nota >= 5 ? "aprobado" : "suspenso";
}

// 3) `??` respeta el 0
function conDefecto(valor: number | null | undefined, porDefecto: number): number {
  return valor ?? porDefecto;
}

// 4) Short-circuit `&&`
let veces = 0;
const operacion = (): number => {
  veces += 1;
  return 7;
};
function correrSi(condicion: boolean): number | false {
  return condicion && operacion();
}

// 5) JSON
interface Pedido {
  id: number;
  total: number;
}
function serializar(pedido: Pedido): string {
  return JSON.stringify(pedido);
}
function deserializar(guardado: string): Pedido {
  return JSON.parse(guardado) as Pedido;
}

// ---- Comprobaciones ----
assert.equal(sonIguales(5, 5), true);
assert.equal(sonIguales(5, "5"), false);
assert.equal(sonIguales(0, false), false);
assert.equal(clasificar(6), "aprobado");
assert.equal(clasificar(4), "suspenso");
assert.equal(conDefecto(0, 99), 0);
assert.equal(conDefecto(null, 99), 99);
assert.equal(conDefecto(undefined, 99), 99);

assert.equal(correrSi(false), false);
assert.equal(veces, 0);
assert.equal(correrSi(true), 7);
assert.equal(veces, 1);

const pedido: Pedido = { id: 1, total: 25.5 };
assert.deepEqual(deserializar(serializar(pedido)), pedido);
console.log("S02 · Ejercicio 10 · ¡OK!");