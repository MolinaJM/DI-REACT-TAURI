import type { Pelicula } from "../tipos.ts";
import { colorDeGenero } from "../colorGenero.ts";

interface PeliculaRowProps {
  pelicula: Pelicula;
  indice: number;
  onEditar: (id: number) => void;
  onBorrar: (id: number) => void;
}

export function PeliculaRow({ pelicula, indice, onEditar, onBorrar }: PeliculaRowProps) {
  // El "indice+1" es importante para que la peli 0 no aparezca en el índice como 0, sino 1
  return (
    <tr>
      <td>{indice + 1}</td>
      <td>{pelicula.titulo}</td>
      <td style={{ color: colorDeGenero(pelicula.genero.toLowerCase()), textTransform: "uppercase" }}>{pelicula.genero}</td>
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
