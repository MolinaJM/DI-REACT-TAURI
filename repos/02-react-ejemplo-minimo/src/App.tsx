import { useState } from "react";
import FormularioNombre from "./components/FormularioNombre";
import Saludo from "./components/Saludo";

//La notación lambda es equivatente: const App = () => {
function App() {
  const [nombre, setNombre] = useState(""); //Padre necesita guardar estado(memoria/variable) para comunicar hermanos
  //Se crea un State, devolviendo un getter y un setter (un Closure)

  //onEnviar es el PROP con valor igual a un enlace al setter (puntero a función). Ese setter es un Closure
  //Cuando le damos al botón de enviar en el form, sube el nombre, se setea, y baja al componente Saludo
  return (
    <div>
      <h1>React mínimo: caja de texto y botón</h1>
      <FormularioNombre onEnviar={setNombre} /> 
      <Saludo nombreAlumno={nombre} /> 
    </div>
  );
}

export default App;