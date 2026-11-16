import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { Pelicula, NuevaPelicula } from "../tipos.ts";

interface PeliculaFormProps {
  inicial?: Partial<Pelicula>;//Valores iniciales de formulario
  modo: "crear" | "editar"; //Influye en botones mostrados
  onGuardar: (datos: NuevaPelicula) => void;
  onCancelar: () => void;
}

// El estado del formulario es un objeto, copia de Pelicula "modificada": 
// los campos numéricos se guardan como string (para poder escribir en el input) 
// y se convierten al enviar.
type PeliculaFormValores = {
  titulo: string;
  genero: string;
  anio: string;
  director: string;
  puntuacion: string;
};

const GENEROS = ["Accion", "Comedia", "Drama", "Terror", "CienciaFiccion", "Romantica"];

// Formulario crear/editar — §13.4, §13.6.2 y §13.7
export function PeliculaForm({ inicial, modo, onGuardar, onCancelar }: PeliculaFormProps) {
  const [valores, setValores] = useState<PeliculaFormValores>(() => ({ //INICIALIZAMOS
    //Al ser un Partial hay que utilizar optional chaining
    //Si tiene valor lo carga, si no, lo inicializa por defecto
    titulo: inicial?.titulo ?? "",
    genero: inicial?.genero ?? "Drama",
    anio: inicial?.anio?.toString() ?? "",
    director: inicial?.director ?? "",
    puntuacion: inicial?.puntuacion?.toString() ?? "",
  }));

  // Un solo handler para todos los campos: el `name` del control identifica el campo
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValores(v => ({ ...v, [name]: value }));
  }

  //A la hora de guardar, ya tengo todo en "valores"
  function guardar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos: NuevaPelicula = { //Contruimos con conversiones
      titulo: valores.titulo.trim(),
      genero: valores.genero,
      anio: Number.parseInt(valores.anio, 10),
      director: valores.director.trim(),
      puntuacion: Number.parseFloat(valores.puntuacion),
    };
    onGuardar(datos);//Llamamos al closuer del padre
    setValores({ titulo: "", genero: "Drama", anio: "", director: "", puntuacion: "" });//Limpiamos
  }

  return (
    <form onSubmit={guardar} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
      <input name="titulo" value={valores.titulo} onChange={handleChange} placeholder="Título" />
      <select name="genero" value={valores.genero} onChange={handleChange}>
        {GENEROS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <input name="anio" value={valores.anio} onChange={handleChange} placeholder="Año" style={{ width: "5rem" }} />
      <input name="director" value={valores.director} onChange={handleChange} placeholder="Director" />
      <input name="puntuacion" value={valores.puntuacion} onChange={handleChange} placeholder="Puntuación" style={{ width: "6rem" }} />
      
      <button type="submit">
      {modo === "crear" ? "Añadir" : "Guardar"}</button>  
      
      {modo === "editar" && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}
