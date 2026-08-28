// ============================================================
// S04 · Ejercicio 3 · SOLUCIÓN
// ============================================================
import type { ReactNode } from "react";

// 1) Tarjeta con children
export function Tarjeta({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

// 2) BotonIcono
export function BotonIcono({ icono, etiqueta, onClick }: { icono: ReactNode; etiqueta: string; onClick: () => void }) {
  return (
    <button onClick={onClick}>
      {icono} {etiqueta}
    </button>
  );
}

// 3) Lista desordenada con key
export function ListaDesordenada({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// Composición
export function PanelCompuesto() {
  return (
    <section>
      <BotonIcono icono="🗑" etiqueta="Borrar" onClick={() => console.log("borrar")} />
      <ListaDesordenada items={["TypeScript", "React", "Tauri"]} />
    </section>
  );
}