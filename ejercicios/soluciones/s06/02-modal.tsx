// ============================================================
// S06 · Ejercicio 2 · SOLUCIÓN
// ============================================================
import type { ReactNode } from "react";

export function Modal({
  abierto,
  onCerrar,
  titulo,
  children,
}: {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  children: ReactNode;
}) {
  if (!abierto) return null;
  return (
    <div className="modal-backdrop" onClick={onCerrar}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <h2>{titulo}</h2>
          <button className="modal-cerrar" onClick={onCerrar} aria-label="Cerrar">
            ×
          </button>
        </header>
        <div className="modal-contenido">{children}</div>
        <footer>
          <button onClick={onCerrar}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
}