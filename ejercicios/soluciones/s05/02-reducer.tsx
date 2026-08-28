// ============================================================
// S05 · Ejercicio 2 · SOLUCIÓN
// ============================================================
import { useReducer } from "react";

export interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export type AccionCarrito =
  | { tipo: "anadir"; producto: ProductoCarrito }
  | { tipo: "quitar"; id: number }
  | { tipo: "incrementar"; id: number }
  | { tipo: "vaciar" };

// Reducer puro: nunca muta `estado`
export function reducerCarrito(
  estado: ProductoCarrito[],
  accion: AccionCarrito
): ProductoCarrito[] {
  switch (accion.tipo) {
    case "anadir": {
      const existe = estado.some((p) => p.id === accion.producto.id);
      if (existe) {
        return estado.map((p) =>
          p.id === accion.producto.id ? { ...p, cantidad: p.cantidad + accion.producto.cantidad } : p
        );
      }
      return [...estado, accion.producto];
    }
    case "quitar":
      return estado.filter((p) => p.id !== accion.id);
    case "incrementar":
      return estado.map((p) => (p.id === accion.id ? { ...p, cantidad: p.cantidad + 1 } : p));
    case "vaciar":
      return [];
  }
}

// Componente
export function Carrito() {
  const [estado, dispatch] = useReducer(reducerCarrito, [] as ProductoCarrito[]);
  return (
    <div>
      <h2>Carrito ({estado.length} líneas)</h2>
      <ul>
        {estado.map((p) => (
          <li key={p.id}>
            {p.nombre} x{p.cantidad} — {p.precio * p.cantidad} €{" "}
            <button onClick={() => dispatch({ tipo: "incrementar", id: p.id })}>+1</button>{" "}
            <button onClick={() => dispatch({ tipo: "quitar", id: p.id })}>borrar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ tipo: "vaciar" })}>Vaciar</button>
      <button
        onClick={() =>
          dispatch({ tipo: "anadir", producto: { id: 1, nombre: "Ratón", precio: 10, cantidad: 1 } })
        }
      >
        Añadir ratón
      </button>
    </div>
  );
}