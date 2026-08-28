// ============================================================
// S03 · Ejercicio 1 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) Identidad genérica
export function identidad<T>(valor: T): T {
  return valor;
}

// 2) Primer elemento sin lanzar
export function primero<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 3) Filtrar genérico
export function filtrarPor<T>(arr: T[], predicado: (item: T) => boolean): T[] {
  return arr.filter(predicado);
}

// 4) Restricción con extends
export function extraerId<U extends { id: number }>(entidad: U): number {
  return entidad.id;
}

// 5) Clase genérica
export class Cola<T> {
  private items: T[] = [];
  encolar(item: T): void {
    this.items.push(item);
  }
  desencolar(): T | undefined {
    return this.items.shift();
  }
  estaVacia(): boolean {
    return this.items.length === 0;
  }
}

// 6) Acceso indexado con tipo seguro
export function obtenerValor<T, K extends keyof T>(obj: T, k: K): T[K] {
  return obj[k];
}

// ---- Comprobaciones ----
assert.equal(identidad("x"), "x");
assert.equal(identidad(42), 42);
assert.equal(primero([1, 2, 3]), 1);
assert.equal(primero([]), undefined);
assert.deepEqual(filtrarPor([1, 2, 3, 4], (n) => n % 2 === 0), [2, 4]);
assert.equal(extraerId({ id: 7, nombre: "Lu" }), 7);

const c = new Cola<string>();
assert.equal(c.estaVacia(), true);
c.encolar("a");
c.encolar("b");
assert.equal(c.desencolar(), "a");
assert.equal(c.estaVacia(), false);

const o = { nombre: "Ana", edad: 25 };
assert.equal(obtenerValor(o, "nombre"), "Ana");
assert.equal(obtenerValor(o, "edad"), 25);
console.log("S03 · Ejercicio 1 · ¡OK!");