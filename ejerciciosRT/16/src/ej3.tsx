/**
 * ej3.tsx - Bloque 16, Ejercicio 3: Modal reutilizable + detalle de moto.
 *
 * Lo nuevo: Modal con overlay + children + useEffect de limpieza del scroll (§16.4),
 * y composición del detalle pasando la ficha por children.
 */

//JMM Este ejercicio se trata de instanciar Modal y TablaMotos
//El esqueleto es similar al de los apuntes. Modal prácticament NO cambia
//Luego 

import { useEffect } from "react";
import type { ReactNode } from "react";
import type { Moto } from "./tipos";

interface ModalProps {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  children: ReactNode;
}

export function Modal({ children, abierto, onCerrar, titulo}: ModalProps) {
  useEffect(() => {
    if (abierto) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const alPulsarEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", alPulsarEscape);
    return () => window.removeEventListener("keydown", alPulsarEscape);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
  <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={onCerrar} />
    <div role="dialog" aria-modal="true" aria-label={titulo} style={{ position: "relative", background: "white", padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", width: "28rem", maxWidth: "90vw" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>{titulo}</h2>
        <button type="button" onClick={onCerrar} aria-label="Cerrar" style={{ fontSize: "1.5rem", lineHeight: 1, cursor: "pointer" }}>×</button>
      </div>
      {children}
    </div>
  </div>
);
}

interface MotoDetalleProps {
  moto: Moto;
  onCerrar: () => void;
}

export function MotoDetalle({ moto, onCerrar }: MotoDetalleProps) {
  //JMM: Creamos el hijo con los datos en un TSX
  const ficha = (
    <div>
      <p> {moto.tipo} - {moto.anio} - {moto.cilindrada} cc </p>
      <p>Extras: {moto.extras.join(", ")}</p>
      <p>{moto.notas}</p>
    </div>
  );

  return (
    <Modal
      abierto={true}
      titulo={`${moto.marca} ${moto.modelo}`}
      onCerrar={onCerrar}
      children={ficha}
    />
  );
}
