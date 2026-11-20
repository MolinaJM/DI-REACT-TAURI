//JMM - Inicio Nuevo con respecto a 15
import type { CSSProperties } from "react";
import type { Pelicula } from "../tipos.ts";
import { colorDeGenero } from "../colorGenero.ts";
import { Boton } from "./Boton.tsx";

const CAJA: CSSProperties = {
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  padding: "0.75rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
};

interface PeliculaCardProps {
  pelicula: Pelicula;
  onEditar: (pelicula: Pelicula) => void;
  onBorrar: (id: number) => void;
}

// Tarjeta de película: la misma ficha que la tabla, pero apilada — §16.6
export function PeliculaCard({ pelicula, onEditar, onBorrar }: PeliculaCardProps) {
  return (
    <article style={CAJA}>
      <h3 style={{ margin: 0 }}>{pelicula.titulo}</h3>
      <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{pelicula.anio}</span>
      <span
        style={{
          color: colorDeGenero(pelicula.genero.toLowerCase()),
          textTransform: "uppercase",
          fontWeight: 600,
          fontSize: "0.85rem",
        }}
      >
        {pelicula.genero}
      </span>
      <span>{pelicula.director}</span>
      <span>★ {pelicula.puntuacion.toFixed(1)}</span>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
        <Boton variante="primary" tamano="sm" onClick={() => onEditar(pelicula)}>
          Editar
        </Boton>
        <Boton variante="danger" tamano="sm" onClick={() => onBorrar(pelicula.id)}>
          Borrar
        </Boton>
      </div>
    </article>
  );
}

//JMM - Fin Nuevo con respecto a 15
