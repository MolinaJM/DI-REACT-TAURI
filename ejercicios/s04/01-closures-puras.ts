// ============================================================
// S04 · Ejercicio 1 · Closures, funciones puras y currying
// ============================================================
// Lógica que luego usarás en componentes React. Ejecuta:
//   npx tsx soluciones/s04/01-closures-puras.ts
// Solución: soluciones/s04/01-closures-puras.ts

// 1) Función pura: calcula el subtotal de una línea de pedido
export interface Linea {
  producto: string;
  precio: number;
  cantidad: number;
}
export function subtotal(linea: Linea): number {
  return 0;
}

// 2) Reduce: total del carrito usando subtotal()
export function totalCarrito(carrito: Linea[]): number {
  return 0;
}

// 3) Currying: `aplicarIVA(tasa)` devuelve `(precio) => precio + IVA`
export function aplicarIVA(tasa: number): (precio: number) => number {
  return (_precio) => 0;
}

// 4) Closure para eventos: `manejadorMin(m, max)` devuelve una función
//    que limita un número a [min, max]. Útil para inputs tipo number.
export function manejadorMinMax(min: number, max: number): (valor: number) => number {
  return (_valor) => 0;
}

// 5) Función pura de filtrado que devolverá el `useMemo`: lista de stock bajo
export function reponerStock(carrito: Linea[], umbral: number): Linea[] {
  return [];
}