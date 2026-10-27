/**
 * App.tsx - BANCO DE PRUEBAS
 */

import {Saludo } from "./components/Saludo.tsx"
import Lista from "./components/Lista.tsx"

export default function App() {


  //const n="Tronco"
  const lista:string[]=["lunes","martes","miércoles"] //no es necesario construir un objeto para pasárselo al hijo
  return (
      //<h1>Banco de Pruebas</h1>
      //  <Saludo nombre={n}></Saludo>
      <Lista nombres={lista}></Lista>
  );
}
