import { useState } from "react";

interface FormularioNombreProps {
  onEnviar: (nombre: string) => void;
}

function FormularioNombre({ onEnviar }: FormularioNombreProps) {
  const [texto, setTexto] = useState("");

  const enviar = () => {
    onEnviar(texto);
  };

  return (
    <div>
      <input
        type="text"
        value={texto}
        placeholder="Escribe tu nombre"
        onChange={(e) => setTexto(e.target.value)}
      />
      <button onClick={enviar}>Enviar a Rust</button>
    </div>
  );
}

export default FormularioNombre;
