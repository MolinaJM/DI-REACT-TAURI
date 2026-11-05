import { useState } from "react";

interface FormularioNombreProps {
  onEnviar: (nombre: string) => void;
}

//Se le pasa una función de tipo FormularioNombreProps
function FormularioNombre({ onEnviar }: FormularioNombreProps) {
  const [texto, setTexto] = useState("NOMBRE POR DEFECTO");

  //Otra closure
  const enviar = () => {
    onEnviar(texto); //Usa el primer closure
    setTexto(""); 
    //Probar a: 
    //A) mantener value={texto} ¿Qué ocurre? => variables atadas (input controlado) : OK
    //B) comentar value={texto}. ¿Qué ocurre? => variables independientes (input NO controlado) : NO OK
    //Efecto 1: No engancha (relaciona) las variables (y por tanto, no actualiza bien la caja)
    //Efecto 2: Si se envía el mismo texto varias veces NO renderiza porque NO ha actualizado 
    // y no detecta cambio (no hay onChange). Pero si cambiamos algo, sí que envía.
  };

  return (
    <div>
      <input type="text" placeholder="Escribe tu nombre" 
       //value={texto} //Controla HTML desde REACT
        onChange={(e) => setTexto(e.target.value)} //Aplica setter conforme vamos escribiendo
      />
      <button onClick={enviar}>Saludar</button>
      <h4>{texto}</h4>
    </div>
  );
}

export default FormularioNombre;