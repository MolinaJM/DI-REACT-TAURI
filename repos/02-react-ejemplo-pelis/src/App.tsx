import { useState } from "react";
import { PeliculaRow } from "./components/PeliculaRow.tsx";
import { PeliculaForm } from "./components/PeliculaForm.tsx";
import type { Pelicula, NuevaPelicula } from "./tipos.ts";

const LISTA_PELICULAS: Pelicula[] = [
  { id: 1, titulo: "El Padrino", genero: "Drama", anio: 1972, director: "Coppola", puntuacion: 9.2 },
  { id: 2, titulo: "El Padrino II", genero: "Drama", anio: 1974, director: "Coppola", puntuacion: 9.0 },
  { id: 3, titulo: "Alien", genero: "Terror", anio: 1979, director: "Scott", puntuacion: 8.4 },
];

function App() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>(LISTA_PELICULAS);
  //enEdicion controla: 1) lo que estamos haciendo y 2) lo que estamos viendo
  const [enEdicion, setEnEdicion] = useState<number | null>(null);

  //Estado "derivado"
  const peliculaEnEdicion =
    enEdicion !== null ? peliculas.find((p) => p.id === enEdicion) : undefined;
  console.log("En edición vale..."+enEdicion)

  function añadir(datos: NuevaPelicula) {
    const nueva: Pelicula = { ...datos, id: Date.now() };
    console.log("Creando "+JSON.stringify(nueva))
    setPeliculas([...peliculas, nueva]);
  }

  function editar(id: number, cambios: Partial<Pelicula>) {
    setPeliculas(peliculas.map((p) => (p.id === id ? { ...p, ...cambios } : p)));
    setEnEdicion(null);
  }

  function borrar(id: number) {
    setPeliculas(peliculas.filter((p) => p.id !== id));
  }

  //el key del formulario es fundamental. Al editar, cambia su estado y key pasa a ser de "nueva" a un id válido
  //lo que fuerza el desmontaje/montaje y por tanto, el repintado.
  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Gestor de películas - 2DAM</h1>

      <PeliculaForm
        key={enEdicion ?? "nueva"}
        inicial={peliculaEnEdicion}
        modo={enEdicion !== null ? "editar" : "crear"}
        onGuardar={(datos) => (enEdicion !== null ? editar(enEdicion, datos) : añadir(datos))}
        onCancelar={() => setEnEdicion(null)}
      />

      <table style={{ width: "50%", border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Género</th>
            <th>Año</th>
            <th>Director</th>
            <th>Puntuación</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((pelicula, indice) => (
            <PeliculaRow
              key={pelicula.id}
              pelicula={pelicula}
              indice={indice}
              onEditar={(id) => setEnEdicion(id)}
              onBorrar={borrar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
