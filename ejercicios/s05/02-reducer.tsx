// ============================================================
// S05 · Ejercicio 2 · useReducer: carrito de la compra
// ============================================================
// Solución: soluciones/s05/02-reducer.tsx

import { useReducer } from "react";

export interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

// 1) Define las acciones posibles:
//    { tipo: "anadir"; producto: ProductoCarrito }
//    { tipo: "quitar"; id: number }
//    { tipo: "vaciar" }
//    { tipo: "incrementar"; id: number }   (suma +1 a una línea)
export type AccionCarrito = { tipo: "anadir"; producto: ProductoCarrito } | { tipo: "quitar"; id: number } | { tipo: "vaciar" } | { tipo: "incrementar"; id: number };

// 2) Reducer puro: `reducerCarrito(estado, accion)`.
//    - anadir: si el producto ya existe, suma cantidades; si no, lo añade.
//    - quitar: elimina la línea cuyo id coincide.
//    - vaciar: devuelve [].
//    - incrementar: sube la cantidad de la línea.
export function reducerCarrito(
  estado: ProductoCarrito[],
  accion: AccionCarrito
): ProductoCarrito[] {
  switch (accion.tipo) {
    case "anadir":
      return estado; // TODO
    case "quitar":
      return estado; // TODO
    case "incrementar":
      return estado; // TODO
    case "vaciar":
      return estado; // TODO
  }
}

// 3) Componente: usa useReducer con reducerCarrito e initialState [].
//    Renderiza la lista y un botón "Vaciar".
export function Carrito() {
  const [estado, dispatch] = useReducer(reducerCarrito, [] as ProductoCarrito[]);
  return <div>{estado.length} productos</div>; // TODO
}