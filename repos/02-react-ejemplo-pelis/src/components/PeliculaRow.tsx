import type { Pelicula } from "../tipos.ts";
import { colorDeGenero } from "../colorGenero.ts";

interface PeliculaRowProps {
  pelicula: Pelicula;
  indice: number;
  onEditar: (id: number) => void;
  onBorrar: (id: number) => void;
}

// Componente PeliculaRow — §13.2 y §13.3.1
export function PeliculaRow({ pelicula, indice, onEditar, onBorrar }: PeliculaRowProps) {
  // El "indice+1" es importante para que la peli 0 no aparezca en el índice como 0, sino 1
  // No confundir id con indice
  return (
    <tr>
      <td>{indice + 1}</td>
      <td>{pelicula.titulo}</td>
      <td style={{ color: colorDeGenero(pelicula.genero.toLowerCase()) }}>{pelicula.genero}</td>
      <td>{pelicula.anio}</td>
      <td>{pelicula.director}</td>
      <td>{pelicula.puntuacion}</td>
      <td>
        <button onClick={() => onEditar(pelicula.id)}>Editar</button>{" "}
        <button onClick={() => onBorrar(pelicula.id)}>Borrar</button>
      </td>
    </tr>
  );
}
