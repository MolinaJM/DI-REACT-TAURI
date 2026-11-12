/**
 * ej1.tsx - Bloque 11, Ejercicio 1: cartelera con PeliculaCard
 */
import type { Pelicula } from "./tipos";

interface PeliculaCardProps {
  pelicula: Pelicula;
}

export function PeliculaCard({ pelicula }: PeliculaCardProps) {
  return (
    <article>
      <h3>{pelicula.titulo}</h3>
      <p>
        {pelicula.genero} -- {pelicula.anio}
      </p>
      <p>Dirige {pelicula.director}</p>
      <p>{pelicula.puntuacion} / 10</p>
    </article>
  );
}
