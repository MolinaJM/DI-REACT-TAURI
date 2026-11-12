/**
 * ej3.tsx - Bloque 11, Ejercicio 3: contador de votos con useState
 */
import { useState } from "react";
interface VotoCardProps {
  titulo: string;
}

export function VotoCard({ titulo }: VotoCardProps) {
  const [votos, setVotos] = useState<number>(0);

  return (
    <p>
      {titulo} - <button onClick={() => setVotos((v) => v + 1)}>❤ HAY {votos}</button>
    </p>
  );
}
