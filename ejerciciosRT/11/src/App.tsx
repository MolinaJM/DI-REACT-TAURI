/**
 * App.tsx - Bloque 11: monta los tres ejercicios
 */
import datos from "./datos/peliculas.json";
import type { Pelicula } from "./tipos";
import { PeliculaCard } from "./ej1";
import { ResumenPelicula } from "./ej2";
import { VotoCard } from "./ej3";
import { ContadorHermanos } from "./ej4";

const peliculas: Pelicula[] = datos.peliculas;

export default function App() {
  const primera = peliculas[0];

  return (
    <main>
      <h1>AppCine — Bloque 11</h1>

      <section>
        <h2>Ejercicio 1 · Cartelera</h2>
        {peliculas.map((p) => (
          <PeliculaCard key={p.id} pelicula={p} />
        ))}
      </section>

      {primera && (
        <section>
          <h2>Ejercicio 2 · Resumen (con y sin director)</h2>
          <ResumenPelicula pelicula={primera} mostrarDirector={true} />
          <ResumenPelicula pelicula={primera} />
        </section>
      )}

      <section>
        <h2>Ejercicio 3 · Votos</h2>
        {peliculas.map((p) => (
          <VotoCard key={p.id} titulo={p.titulo} />
        ))}
      </section>
    </main>
  );
}

      <section>
        <h2>Ejercicio 4 · Hermanos con useContext</h2>
        <ContadorHermanos />
      </section>
