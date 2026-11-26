import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

//JMM - Inicio Nuevo con respecto a 15----------------------------------------
type Tamano = "sm" | "md" | "lg";
//JMM - Fin Nuevo con respecto a 15-------------------------------------------

interface ModalProps {
  abierto: boolean;
  titulo: string;
  onCerrar: () => void;
  children: ReactNode;
  //JMM - Inicio Nuevo con respecto a 15-----------------------------------------
  tamano?: Tamano;
  //JMM - Fin Nuevo con respecto a 15---------------------------------------------
}

//JMM - Inicio Nuevo con respecto a 15----------------------------------------------
const ANCHOS: Record<Tamano, string> = { sm: "20rem", md: "28rem", lg: "40rem",};
//JMM - Fin Nuevo con respecto a 15-------------------------------------------------

//JMM - Inicio Nuevo con respecto a 15----------------------------------------------
export function Modal({ abierto, titulo, onCerrar, children, tamano = "md" }: ModalProps) {
//JMM - Fin Nuevo con respecto a 15------------------------------------------------
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Cleanup: restaura el scroll del body al cerrar o desmontar
  useEffect(() => {
    if (!abierto) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, [abierto]);

  // Escape (§15.5): cierra el modal; el listener se limpia al desmontar
  useEffect(() => {
    if (!abierto) return;
    function teclaEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onCerrar();
    }
    window.addEventListener("keydown", teclaEsc);
    return () => window.removeEventListener("keydown", teclaEsc);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* overlayRef (§15.5): solo se cierra si el clic cae sobre el overlay, no sobre el panel */}
      <div
        ref={overlayRef}
        onClick={(e) => {
          if (e.target === overlayRef.current) onCerrar();
        }}
        style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.5)" }}
      />
      <div
        style={{
          position: "relative",
          background: "white",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          //Cambio con respecto a 15
          width: ANCHOS[tamano],
          //Cambio con respecto a 15
          maxWidth: "90vw",
        }}
      >
        {/* JMM - Inicio Nuevo con respecto a 15 ------------------------------------------------*/}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ marginTop: 0 }}>{titulo}</h2>
          <button type="button" onClick={onCerrar} aria-label="Cerrar">
            X
          </button>
        </div>
        {/* JMM - Fin Nuevo con respecto a 15 ----------------------------------------------------*/}
        {children}
      </div>
    </div>
  );
}
