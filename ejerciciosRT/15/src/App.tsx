/**
 * App.tsx - Bloque 15: monta los tres ejercicios (dominio: motos)
 * El ejercicio 1 necesita la API local (json-server) arrancada:
 *   cd bancop && npx json-server ../ejerciciosRT/datos/motos.json --port 3000
 */
import { GestorMotosApi } from "./ej1";
import { BuscadorMotos } from "./ej2";
import { FavoritosMotos } from "./ej3";

export default function App() {
  return (
    <main>
      <h1>Gestor de motos — Bloque 15</h1>

      <section>
        <h2>Ejercicio 1 · Gestor de motos (CRUD con lifting + modal + fetch)</h2>
        <GestorMotosApi />
      </section>

      <section>
        <h2>Ejercicio 2 · Buscador de motos (debounce + filtro + localStorage)</h2>
        <BuscadorMotos />
      </section>

      <section>
        <h2>Ejercicio 3 · Favoritos de motos con localStorage</h2>
        <FavoritosMotos />
      </section>
    </main>
  );
}
