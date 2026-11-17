import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ModalProps {
  abierto: boolean;
  titulo: string;
  onCerrar: () => void;
  children: ReactNode;
}

export function Modal({ abierto, titulo, onCerrar, children }: ModalProps) {
  //Crea una referencia (overlayRef) para apuntar a un div del DOM.
  //El valor se asocia al hacer: ref={overlayRef} 
  const overlayRef = useRef<HTMLDivElement | null>(null);

  //Bloquea el scroll del documento cuando el modal está abierto y lo restaura al cerrarse.
  //Se ve claramente si hacemos mucho zoom sobre la ventana --> aparece scroll
  //Cleanup: restaura el scroll (overflow) del body al cerrar o desmontar
  useEffect(() => {
    if (!abierto) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {//cleanup
      document.body.style.overflow = overflowAnterior;
    };
  }, [abierto]);

  // Escape: cierra el modal; el listener se limpia al desmontar
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
    //Div exterior - capa fija (fixed), situada por encima de todo (zIndex)
  <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
    {/* Fondo semitransparente: cierra el modal solo si el clic cae directamente en el overlay */}
    <div ref={overlayRef} onClick={(e) => e.target === overlayRef.current && onCerrar()} 
    style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.5)" }} />
    {/* Caja o panel principal del contenido */}
    <div style={{ position: "relative", background: "white", padding: "1.5rem", borderRadius: "0.5rem", minWidth: "22rem", maxWidth: "90vw" }}>
      <h2 style={{ marginTop: 0 }}>{titulo}</h2>
      {children}
    </div>
  </div>
);
}
//JMM: FIN de lo nuevo
