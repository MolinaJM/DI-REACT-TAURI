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
function crearContador(valorInicial: number): {
  incrementar: () => void;
  decrementar: () => void;
  valor: () => number;
} {
  return { incrementar: () => {}, decrementar: () => {}, valor: () => 0 }; // TODO
}

// 3) Closure con parámetro capturado: `hacerSaludos(nombres)` devuelve
//    un array de funciones que saludan al nombre i-ésimo (cuidado con let).
function hacerSaludos(nombres: string[]): Array<() => string> {
  const resultados: Array<() => string> = [];
  for (let i = 0; i < nombres.length; i++) {
    const nombre = nombres[i];
    resultados.push(() => `Hola, ${nombre}`);
  }
  return resultados;
  // TODO
  // Más adelante (S03): `return nombres.map((nombre) => () => \`Hola, ${nombre}\`);`
}

// 4) Memoización con closure: `memoizar(fn)` devuelve una versión que
//    guarda resultados para argumentos repetidos (objeto plain, clave = String(arg)).
function memoizar<T>(fn: (arg: number) => T): (arg: number) => T {
  const cache: { [key: number]: T } = {};
  return (arg) => {
    if (arg in cache) {
      return cache[arg];
    }
    const resultado = fn(arg);
    cache[arg] = resultado;
    return resultado;
  }; // TODO
}