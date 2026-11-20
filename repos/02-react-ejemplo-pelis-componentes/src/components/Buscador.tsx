//JMM - Inicio Nuevo con respecto a 15
import { useState } from "react";
import type { ChangeEvent } from "react";

interface BuscadorProps {
  onBuscar: (texto: string) => void;
}

// Buscador con input controlado — §16.1.1
export function Buscador({ onBuscar }: BuscadorProps) {
  const [texto, setTexto] = useState("");

  function alEscribir(e: ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    setTexto(valor);
    onBuscar(valor);
  }

  return (
    <label>
      Buscar:
      <input value={texto} onChange={alEscribir} placeholder="Título o género…" />
    </label>
  );
}

//JMM - Fin Nuevo con respecto a 15
