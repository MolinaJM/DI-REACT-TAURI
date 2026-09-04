import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import FormularioNombre from "./components/FormularioNombre";

function App() {
  const [nombre, setNombre] = useState("");
  const [saludo, setSaludo] = useState("");

  // A diferencia del ejemplo en React puro (2-react-ejemplo-minimo), aquí el
  // nombre viaja a Rust mediante invoke() y el saludo vuelve del backend.
  const enviar = async (valor: string) => {
    setNombre(valor);
    if (!valor.trim()) {
      setSaludo("");
      return;
    }
    try {
      const respuesta: string = await invoke("saludar", { nombre: valor });
      setSaludo(respuesta);
    } catch (error) {
      setSaludo(`Error: ${error as string}`);
    }
  };

  return (
    <div>
      <h1>Tauri mínimo: caja de texto y botón</h1>
      <FormularioNombre onEnviar={enviar} />
      {saludo && <Saludo nombreAlumno={nombre} saludo={saludo} />}
      <p style={{ opacity: 0.6, marginTop: "1rem" }}>{nombre && `(enviado a Rust: ${nombre})`}</p>
    </div>
  );
}

function Saludo({ nombreAlumno, saludo }: { nombreAlumno: string; saludo: string }) {
  if (!nombreAlumno) {
    return null;
  }
  return <h2>{saludo}</h2>;
}

export default App;
