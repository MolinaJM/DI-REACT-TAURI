import { useContador } from "../ContadorContext";

// Hermano 2: solo incrementa (no recibe props)
export function ContadorBoton() {
  const { incrementar } = useContador(); //Desestructuramos y cojo lo que me interesa
  return <button onClick={incrementar}>+1</button>;
}
