import { useState } from "react";

interface FormularioNombreProps {
  onEnviar: (nombre: string) => void;
}

//Se le pasa una función de tipo FormularioNombreProps
function FormularioNombre({ onEnviar }: FormularioNombreProps) {
  const [texto, setTexto] = useState("");

  //Otra closure
  const enviar = () => {
    onEnviar(texto); //Usa el primer closure
    //setTexto(""); //Descomentar y probar: 
    //A) mantener value={texto} ¿Qué ocurre? => variables atadas (input controlado)
    //B) comentando value={texto}. ¿Qué ocurre? => variables independientes (input NO controlado)
    //Es muy importante MANTENER value=>{texto} DESCOMENTADA si queremos controlar HTML desde REACT.
  };

  return (
    <div>
      <input type="text" placeholder="Escribe tu nombre" 
        value={texto} //Controla HTML desde REACT
        onChange={(e) => setTexto(e.target.value)} //Aplica setter conforme vamos escribiendo
      />
      <button onClick={enviar}>Saludar</button>
    </div>
  );
}

export default FormularioNombre;