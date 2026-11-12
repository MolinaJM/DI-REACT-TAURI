/**
 * ej2.tsx - Bloque 11, Ejercicio 2: props opcionales y render condicional
 */
import type { Pelicula } from "./tipos";

interface ResumenPeliculaProps {
  pelicula: Pelicula;
  mostrarDirector?: boolean;
}

export function ResumenPelicula({ pelicula, mostrarDirector }: ResumenPeliculaProps) {
  return (
    <p>
      <strong>{pelicula.titulo}</strong> ({pelicula.anio})
      {mostrarDirector && ` · Dirige ${pelicula.director}`}
      {pelicula.puntuacion>= 8 ? " · ⭐ Recomendada" : ""}
    </p>
  );
}
