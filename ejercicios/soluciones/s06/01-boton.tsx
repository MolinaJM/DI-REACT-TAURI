// ============================================================
// S06 · Ejercicio 1 · SOLUCIÓN
// ============================================================
import { useState } from "react";
import type { ReactNode } from "react";

// 1) Botón con variante
export function Boton({
  children,
  variante = "primaria",
  deshabilitado = false,
  onClick,
}: {
  children: ReactNode;
  variante?: "primaria" | "secundaria" | "peligro";
  deshabilitado?: boolean;
  onClick?: () => void;
}) {
  return (
    <button className={`boton boton-${variante}`} disabled={deshabilitado} onClick={onClick}>
      {children}
    </button>
  );
}

// 2) Botón contador que se deshabilita al llegar a 10
export function BotonContar() {
  const [contador, setContador] = useState(0);
  return (
    <Boton deshabilitado={contador >= 10} onClick={() => setContador((c) => c + 1)}>
      Clics: {contador}
    </Boton>
  );
}