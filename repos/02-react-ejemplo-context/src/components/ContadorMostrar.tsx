import { useContador } from "../ContadorContext";

// Hermano 1: solo lee el contador (no recibe props)
export function ContadorMostrar() {
  const { contador } = useContador();//Desestructuramos y cojo lo que me interesa, en este caso el contador
  return <p>Contador: {contador}</p>;
}
