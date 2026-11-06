import { useContador } from "../ContadorContext";

// Hermano 2: solo incrementa (no recibe props)
export function ContadorBoton() {
  const { incrementar } = useContador(); //Desestructuramos y cojo lo que me interesa, en este caso el método
  return <button onClick={incrementar}>+1</button>;
}
