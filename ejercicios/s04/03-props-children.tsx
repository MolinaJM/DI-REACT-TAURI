// ============================================================
// S04 · Ejercicio 3 · Props, children y composición
// ============================================================
// Solución: soluciones/s04/03-props-children.tsx

import type { ReactNode } from "react";

// 1) `Tarjeta`: { titulo: string; children: ReactNode } con borde y paddings
export function Tarjeta(props: { titulo: string; children: ReactNode }) {
  return <section>{props.titulo}</section>; // TODO: incluye children
}

// 2) `BotonIcono`: { icono: ReactNode; etiqueta: string; onClick: () => void }
//    Renderiza <button>{icono} {etiqueta}</button>
export function BotonIcono(props: { icono: ReactNode; etiqueta: string; onClick: () => void }) {
  return <button>{props.etiqueta}</button>; // TODO
}

// 3) `ListaDesordenada`: { items: string[] } renderiza <ul><li>...
export function ListaDesordenada(props: { items: string[] }) {
  return <ul>{props.items.map((item) => item)}</ul>; // TODO: cada item en <li key={item}>
}

// Composición: usa los tres dentro de un componente contenedor
export function PanelCompuesto() {
  return (
    <section>
      {/* TODO: BotonIcono con un emoji y ListaDesordenada */}
    </section>
  );
}