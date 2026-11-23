/**
 * App.tsx - Bloque 13: monta los dos ejercicios
 */
import librosDatos from "./datos/libros.json";
import peliculasDatos from "./datos/peliculas.json";
import motosDatos from "./datos/motos.json";
import type { Libro, Moto, Pelicula } from "./tipos";
import { Fila } from "./ej1";
import { GestorMotos } from "./ej2";

const peliculas: Pelicula[] = peliculasDatos.peliculas;
const libros: Libro[] = librosDatos.libros;
const motos: Moto[] = motosDatos.motos;

export default function App() {
  return (
    <main>
      <h1>AppCine — Bloque 13</h1>

      <section>
        <h2>Ejercicio 1 · Fila genérica para dos entidades</h2>
        <h3>Películas</h3>
        <ul>
          {peliculas.map((p) => (
            <Fila key={p.id} item={p} />
          ))}
        </ul>
        <h3>Libros</h3>
        <ul>
          {libros.map((l) => (
            <Fila key={l.id} item={l} />
          ))}
        </ul>
      </section>

      <section>
        <h2>Ejercicio 2 · CRUD de motos (reconstrucción del patrón)</h2>
        <GestorMotos iniciales={motos} />
      </section>
    </main>
  );
}
