//JMM - Inicio Nuevo con respecto a 15
import type { CSSProperties } from "react";
import type { Pelicula } from "../tipos.ts";
import { PeliculaRow } from "./PeliculaRow.tsx";

// Cabecera alineada con las celdas (th va centrado por defecto: descuadra con td)
const TH: CSSProperties = { textAlign: "left", padding: "0.5rem 0.75rem" };

interface PeliculaTableProps {
  peliculas: Pelicula[];
  onEditar: (pelicula: Pelicula) => void;
  onBorrar: (id: number) => void;
}

// Renderizado de listas con key: PeliculaTable — §13.8
export function PeliculaTable({ peliculas, onEditar, onBorrar }: PeliculaTableProps) {
  return (
    <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={TH}>#</th>
          <th style={TH}>Título</th>
          <th style={TH}>Género</th>
          <th style={TH}>Año</th>
          <th style={TH}>Director</th>
          <th style={TH}>Puntuación</th>
          <th style={TH}></th>
        </tr>
      </thead>
      <tbody>
        {peliculas.map((pelicula, indice) => (
          <PeliculaRow
            key={pelicula.id}
            pelicula={pelicula}
            indice={indice}
            onEditar={() => onEditar(pelicula)}
            onBorrar={onBorrar}
          />
        ))}
      </tbody>
    </table>
  );
}

//JMM - Fin Nuevo con respecto a 15
