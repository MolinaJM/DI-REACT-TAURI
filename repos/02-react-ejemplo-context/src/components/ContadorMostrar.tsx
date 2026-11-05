import { useContador } from "../ContadorContext";

// Hermano 1: solo lee el contador (no recibe props)
export function ContadorMostrar() {
  const { contador } = useContador();
  return <p>Contador: {contador}</p>;
}
