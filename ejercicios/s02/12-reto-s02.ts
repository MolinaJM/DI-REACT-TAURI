// ============================================================
// S02 · RETO FINAL · La máquina expendedora de PROFE
// ============================================================
// Programa pequeño que integra TODO lo visto en S02:
//   - uniones de literales y narrowing
//   - type guards (predicados de tipo)
//   - parámetros por defecto, ternario, `??`, bucles
//   - switch exhaustivo con `never`
//   - ámbito y closures
//   - aserciones y manejo de `undefined` / `null`
// Completa. Solución: soluciones/s02/12-reto-s02.ts

// 1) Estado de la máquina (unión de literales) + switch exhaustivo
export type EstadoMaquina = "apagada" | "encendida" | "averiada";
export function panelEstado(estado: EstadoMaquina): string {
  // TODO: switch con 3 cases y el default de exhaustividad con `never`
  // apagada → "APAGADA" · encendida → "ENCENDIDA" · averiada → "AVERIADA"
  return "";
}

// 2) Type guard: ¿el dinero es una moneda válida?
export type Moneda = 1 | 2 | 5 | 10;
export function esMoneda(valor: number): valor is Moneda {
  // TODO: true solo para 1, 2, 5 o 10
  return false;
}

// 3) Total con descuento: parámetro por defecto, `for...of`, ternario
export function calcularTotal(precios: number[], descuentoCentimos = 0): number {
  // TODO: suma con `for...of`; resta el descuento; si queda negativo → 0
  return 0;
}

// 4) Buscar un producto y devolver su precio («??» + narrowing de undefined)
export interface Producto {
  nombre: string;
  precio: number;
  stock: number;
}
export function precioDe(productos: Producto[], nombre: string): number {
  // TODO: busca con .find(); si NO existe devuelve 0 (usa `??`)
  return 0;
}

// 5) Formato de precios (conversión a string con padStart)
export function formatoPrecio(centimos: number): string {
  // TODO: 125 → "1,25 €" (Number, Math.trunc, %, String, padStart)
  return "";
}

// 6) Cambio: descomponer centimos en monedas (for...of + as const)
export function darCambio(centimos: number): Moneda[] {
  const monedas = [10, 5, 2, 1] as const; // mayor a menor
  const resultado: Moneda[] = [];
  // TODO: con `for...of` sobre `monedas`: cuántas veces cabe la moneda
  //       (Math.floor(restante / moneda)), añádelas y deja el resto (restante %= moneda)
  return resultado;
}

// 7) Closure: la máquina guarda su catálogo y sus ventas privadas
export type Maquina = {
  vender: (nombre: string, pagadoCentimos?: number) => { cambio: Moneda[] } | null;
  reabastecer: (nombre: string, cantidad: number) => void;
  totalVentas: () => number;
  inventario: () => string;
};

export function crearMaquina(productos: Producto[]): Maquina {
  // TODO: copia el catálogo, guarda un contador privado de ventas, y devuelve:
  //   - vender(): busca el producto (si no existe → null); si pagado < precio o
  //     stock <= 0 → null; si no, decrementa stock, suma una venta y
  //     devuelve el cambio con darCambio(pagado - precio)
  //   - reabastecer(): suma `cantidad` al stock si el producto existe
  //   - totalVentas(): el contador privado
  //   - inventario(): "nombre: Xu · nombre2: Yu" (map + join)
  return {
    vender: (nombre, pagadoCentimos) => null,
    reabastecer: (nombre, cantidad) => {},
    totalVentas: () => 0,
    inventario: () => "",
  };
}