// ============================================================
// S02 · Ejercicio 8 · Ámbito, closures y funciones flecha
// ============================================================
// Completa. Solución: soluciones/s02/08-scope-closures.ts

// 1) ¿Qué imprime cada console.log? Razona sin ejecutar.
let contador = 0;
function incrementar() {
  contador += 1;
}
incrementar();
// TODO: ¿contador vale?  ___

const mensaje = "fuera";
function mostrar() {
  const mensaje = "dentro";
  // TODO: aquí, ¿qué mensaje se ve?  ___
}

// 2) Closure: `crearContador` devuelve un objeto con incrementar(),
//    decrementar() y valor(). Cada llamada a crearContador genera su propio estado.
export function crearContador(valorInicial: number): {
  incrementar: () => void;
  decrementar: () => void;
  valor: () => number;
} {
  return { incrementar: () => {}, decrementar: () => {}, valor: () => 0 }; // TODO
}

// 3) Closure con parámetro capturado: `hacerSaludos(nombres)` devuelve
//    un array de funciones que saludan al nombre i-ésimo (cuidado con let).
export function hacerSaludos(nombres: string[]): Array<() => string> {
  return []; // TODO
}

// 4) Memoización con closure: `memoizar(fn)` devuelve una versión que
//    guarda resultados para argumentos repetidos (Map<string, R>, clave = String(arg)).
export function memoizar<T>(fn: (arg: number) => T): (arg: number) => T {
  return (arg) => fn(arg); // TODO
}

// 5) `this` en flecha vs normal: completa `objeto.duplicarFlecha()`
export const controlador = {
  factor: 3,
  valores: [1, 2, 3],
  duplicarNormal: function (): number[] {
    return this.valores.map(function (v) {
      return (v * this.factor) / 1; // TODO: esto falla; explica por qué
    });
  },
  duplicarFlecha: function (): number[] {
    return []; // TODO: usa arrow function dentro de map para capturar `this` léxicamente
  },
};