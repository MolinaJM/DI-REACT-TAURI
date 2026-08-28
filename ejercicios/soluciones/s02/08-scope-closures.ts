// ============================================================
// S02 · Ejercicio 8 · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) Ámbito
let contador = 0;
function incrementar() {
  contador += 1;
}
incrementar();
// → contador vale 1 (la función muta la variable de su ámbito exterior).

const mensaje = "fuera";
function mostrar() {
  const mensaje = "dentro"; // sombrea a la exterior
  void mensaje; // aquí se ve "dentro"
}

// 2) Closure: cada llamada crea un estado independiente
export function crearContador(valorInicial: number): {
  incrementar: () => void;
  decrementar: () => void;
  valor: () => number;
} {
  let valor = valorInicial;
  return {
    incrementar: () => {
      valor += 1;
    },
    decrementar: () => {
      valor -= 1;
    },
    valor: () => valor,
  };
}

// 3) Con `let` cada iteración captura su propio índice
export function hacerSaludos(nombres: string[]): Array<() => string> {
  return nombres.map((nombre) => () => `Hola, ${nombre}`);
}

// 4) Memoización con closure
export function memoizar<T>(fn: (arg: number) => T): (arg: number) => T {
  const cache = new Map<number, T>();
  return (arg) => {
    if (!cache.has(arg)) cache.set(arg, fn(arg));
    return cache.get(arg)!;
  };
}

// 5) `this`: dentro de la función normal de `map`, `this` está undefined
//    (llamada sin receptor). La flecha captura el `this` de `duplicarFlecha`.
export const controlador = {
  factor: 3,
  valores: [1, 2, 3],
  duplicarFlecha: function (): number[] {
    return this.valores.map((v) => v * this.factor);
  },
};

// ---- Comprobaciones ----
const a = crearContador(0);
const b = crearContador(10);
a.incrementar();
a.incrementar();
b.decrementar();
assert.equal(a.valor(), 2);
assert.equal(b.valor(), 9);

const saludos = hacerSaludos(["Ana", "Luis"]);
assert.equal(saludos[0]!(), "Hola, Ana");
assert.equal(saludos[1]!(), "Hola, Luis");

const lentisima = (n: number) => n * 2;
const memo = memoizar(lentisima);
assert.equal(memo(4), 8);
assert.equal(memo(4), 8); // segunda llamada sale de la caché

assert.deepEqual(controlador.duplicarFlecha(), [3, 6, 9]);
console.log("S02 · Ejercicio 8 · ¡OK!");