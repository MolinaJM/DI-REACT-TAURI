//JMM - Inicio Nuevo con respecto a 15
import type { CSSProperties } from "react";
import type { Pelicula } from "../tipos.ts";
import { colorDeGenero } from "../colorGenero.ts";
import { Boton } from "./Boton.tsx";

// Celdas alineadas con la cabecera (y separadas con padding)
const TD: CSSProperties = { textAlign: "left", padding: "0.5rem 0.75rem" };
//JMM - Fin Nuevo con respecto a 15

interface PeliculaRowProps {
  pelicula: Pelicula;
  indice: number;
  onEditar: (id: number) => void;
  onBorrar: (id: number) => void;
}

// Fila de la tabla — §13.8 (con los botones personalizados de §16.3)
export function PeliculaRow({ pelicula, indice, onEditar, onBorrar }: PeliculaRowProps) {
  return (
    <tr>
      <td style={TD}>{indice + 1}</td>
      <td style={TD}>{pelicula.titulo}</td>
      <td style={{ ...TD, color: colorDeGenero(pelicula.genero.toLowerCase()), textTransform: "uppercase" }}>{pelicula.genero}</td>
      <td style={TD}>{pelicula.anio}</td>
      <td style={TD}>{pelicula.director}</td>
      <td style={TD}>{pelicula.puntuacion}</td>
      <td style={TD}>
        {/* JMM - Inicio Nuevo con respecto a 15 */}
        <Boton variante="primary" tamano="sm" onClick={() => onEditar(pelicula.id)}>
          Editar
        </Boton>{" "}
        <Boton variante="danger" tamano="sm" onClick={() => onBorrar(pelicula.id)}>
          Borrar
        </Boton>
        {/* JMM - Fin Nuevo con respecto a 15 */}
      </td>
    </tr>
  );
}
