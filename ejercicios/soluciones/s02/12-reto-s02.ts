// ============================================================
// S02 · RETO FINAL · SOLUCIÓN
// ============================================================
import assert from "node:assert/strict";

// 1) Estado de la máquina (unión de literales) + switch exhaustivo
export type EstadoMaquina = "apagada" | "encendida" | "averiada";
export function panelEstado(estado: EstadoMaquina): string {
  switch (estado) {
    case "apagada": return "APAGADA";
    case "encendida": return "ENCENDIDA";
    case "averiada": return "AVERIADA";
    default: {
      const exhaustivo: never = estado;
      return exhaustivo;
    }
  }
}

// 2) Type guard
export type Moneda = 1 | 2 | 5 | 10;
export function esMoneda(valor: number): valor is Moneda {
  return valor === 1 || valor === 2 || valor === 5 || valor === 10;
}

// 3) Total con descuento
export function calcularTotal(precios: number[], descuentoCentimos = 0): number {
  let total = 0;
  for (const precio of precios) total += precio;
  const conDescuento = total - descuentoCentimos;
  return conDescuento > 0 ? conDescuento : 0;
}

// 4) Buscar un producto y devolver su precio
export interface Producto {
  nombre: string;
  precio: number;
  stock: number;
}
export function precioDe(productos: Producto[], nombre: string): number {
  return productos.find((p) => p.nombre === nombre)?.precio ?? 0;
}

// 5) Formato de precios
export function formatoPrecio(centimos: number): string {
  const euros = Math.trunc(centimos / 100);
  const resto = Math.abs(centimos % 100);
  return `${euros},${String(resto).padStart(2, "0")} €`;
}

// 6) Cambio (for...of sobre las monedas de mayor a menor)
export function darCambio(centimos: number): Moneda[] {
  const monedas = [10, 5, 2, 1] as const;
  const resultado: Moneda[] = [];
  let restante = centimos;
  for (const moneda of monedas) {
    const cuantas = Math.floor(restante / moneda);
    for (const _ of Array.from({ length: cuantas })) {
      resultado.push(moneda);
    }
    restante %= moneda;
  }
  return resultado;
}

// 7) Closure: la máquina
export type Maquina = {
  vender: (nombre: string, pagadoCentimos?: number) => { cambio: Moneda[] } | null;
  reabastecer: (nombre: string, cantidad: number) => void;
  totalVentas: () => number;
  inventario: () => string;
};

export function crearMaquina(productos: Producto[]): Maquina {
  const catalogo = [...productos];
  let ventas = 0;

  return {
    vender: (nombre, pagadoCentimos = 0) => {
      const producto = catalogo.find((p) => p.nombre === nombre);
      if (producto === undefined || producto.stock <= 0 || pagadoCentimos < producto.precio) {
        return null;
      }
      producto.stock -= 1;
      ventas += 1;
      return { cambio: darCambio(pagadoCentimos - producto.precio) };
    },
    reabastecer: (nombre, cantidad) => {
      const producto = catalogo.find((p) => p.nombre === nombre);
      if (producto !== undefined) producto.stock += cantidad;
    },
    totalVentas: () => ventas,
    inventario: () => catalogo.map((p) => `${p.nombre}: ${p.stock}u`).join(" · "),
  };
}

// ---- Comprobaciones ----
assert.equal(panelEstado("encendida"), "ENCENDIDA");

assert.equal(esMoneda(5), true);
assert.equal(esMoneda(3), false);

assert.equal(calcularTotal([100, 200, 300], 150), 450);
assert.equal(calcularTotal([10, 20]), 30);
assert.equal(calcularTotal([100], 250), 0);

const tiendaProductos: Producto[] = [
  { nombre: "cafe", precio: 120, stock: 3 },
  { nombre: "chocolate", precio: 200, stock: 0 },
];
assert.equal(precioDe(tiendaProductos, "cafe"), 120);
assert.equal(precioDe(tiendaProductos, "agua"), 0); // no existe → 0 (??)

assert.equal(formatoPrecio(125), "1,25 €");
assert.equal(formatoPrecio(5), "0,05 €");

assert.deepEqual(darCambio(7), [5, 2]);
assert.deepEqual(darCambio(14), [10, 2, 2]);

const maquina = crearMaquina(tiendaProductos);
const venta = maquina.vender("cafe", 200); // 120 cts → cambio 80 = 8×10
assert.notEqual(venta, null);
assert.deepEqual(venta?.cambio, [10, 10, 10, 10, 10, 10, 10, 10]);
assert.equal(maquina.vender("chocolate", 200), null);        // agotado
assert.equal(maquina.vender("agua", 500), null);             // no existe
assert.equal(maquina.totalVentas(), 1);
maquina.reabastecer("chocolate", 2);
assert.deepEqual(maquina.inventario(), "cafe: 2u · chocolate: 2u");

console.log("S02 · RETO FINAL · ¡OK!");