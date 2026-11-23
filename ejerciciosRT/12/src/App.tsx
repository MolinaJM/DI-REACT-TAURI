/**
 * App.tsx - Bloque 12: monta los cuatro ejercicios
 * Los ejercicios 1, 2, 3 y 4 necesitan la API local (json-server) arrancada.
 */
import { ListaAlumnos } from "./ej1";
import { BuscadorAlumnos } from "./ej2";
import { MediaNotas } from "./ej3";
import { FichaAlumno } from "./ej4";

export default function App() {
  return (
    <main>
      <h1>Bloque 12 — useState y useEffect</h1>

      <section>
        <h2>Ejercicio 1 · Lista de alumnos (API)</h2>
        <ListaAlumnos />
      </section>

      <section>
        <h2>Ejercicio 2 · Buscador de alumnos</h2>
        <BuscadorAlumnos />
      </section>

      <section>
        <h2>Ejercicio 3 · Media de notas</h2>
        <MediaNotas />
      </section>

      <section>
        <h2>Ejercicio 4 · Ficha de alumno</h2>
        <FichaAlumno />
      </section>
    </main>
  );
}
