import { ContadorProvider } from "./ContadorContext";
import { ContadorMostrar } from "./components/ContadorMostrar";
import { ContadorBoton } from "./components/ContadorBoton";

// App envuelve a los dos hermanos con el Provider: comparten estado sin pasar props
export default function App() {
  return (
    <ContadorProvider>
      <ContadorMostrar />
      <ContadorBoton />
    </ContadorProvider>
  );
}
