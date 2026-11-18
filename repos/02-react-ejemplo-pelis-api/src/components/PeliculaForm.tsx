import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { Pelicula, NuevaPelicula } from "../tipos.ts";

interface PeliculaFormProps {
  inicial?: Partial<Pelicula>;
  modo: "crear" | "editar";
  //JMM: NUEVO respecto a 13
  guardando?: boolean; //Controla la aparición de los botones mientras se guarda info en el servidor
  //Así evitamos errores devirados de tocar los botones por error.
  //JMM: FIN de lo nuevo
  onGuardar: (datos: NuevaPelicula) => void;
  onCancelar: () => void;
}

// El estado del formulario es un objeto: los campos numéricos se guardan como
// string (para poder escribir en el input) y se convierten al enviar.
type PeliculaFormValores = {
  titulo: string;
  genero: string;
  anio: string;
  director: string;
  puntuacion: string;
};

const GENEROS = ["Acción", "Comedia", "Drama", "Terror", "Ciencia-ficción", "Romántica"];

//JMM: NUEVO respecto a 13
type ErroresForm = Partial<Record<keyof PeliculaFormValores, string>>;
//JMM: FIN de lo nuevo

// Formulario crear/editar con validación — §13.4, §13.6.2, §13.7 y §15.6
export function PeliculaForm({ inicial, modo, guardando = false, onGuardar, onCancelar }: PeliculaFormProps) {
  const [valores, setValores] = useState<PeliculaFormValores>(() => ({
    titulo: inicial?.titulo ?? "",
    genero: inicial?.genero ?? "", //JMM: NUEVO respecto a 13 — arranca vacío: el select muestra «Selecciona un género…»
    anio: inicial?.anio?.toString() ?? "",
    director: inicial?.director ?? "",
    puntuacion: inicial?.puntuacion?.toString() ?? "",
  }));
  //JMM: NUEVO respecto a 13
  const [errores, setErrores] = useState<ErroresForm>({});
  //JMM: FIN de lo nuevo

  // Un solo handler para todos los campos: el `name` del control identifica el campo
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValores(v => ({ ...v, [name]: value }));
  }

  //JMM: NUEVO respecto a 13
  function validar(v: PeliculaFormValores): ErroresForm {
    const nuevosErrores: ErroresForm = {};
    if (!v.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
    if (!v.genero.trim()) nuevosErrores.genero = "No has seleccionado género";
    const anio = Number(v.anio);
    if (!v.anio.trim() || Number.isNaN(anio) || anio < 1888) nuevosErrores.anio = "Año no válido (número>1888)";
    if (!v.director.trim()) nuevosErrores.director = "El director es obligatorio";
    const puntuacion = Number(v.puntuacion);
    const nonumero = isNaN(Number(v.puntuacion))
    if (!v.puntuacion.trim() || puntuacion < 0 || puntuacion > 10 || nonumero ) nuevosErrores.puntuacion = "Valores váidos: Entre 0 y 10";
    return nuevosErrores;
  }
  //JMM: FIN de lo nuevo

  function guardar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    
    //JMM: Nuevo respecto a 13 - Validación
    const errs = validar(valores);
    setErrores(errs);
    if (Object.keys(errs).length > 0) return; //Aborta envío si hay algún error
    //JMM: FIN DE LO NUEVO
    
    const datos: NuevaPelicula = {
      titulo: valores.titulo.trim(),
      genero: valores.genero,
      anio: Number.parseInt(valores.anio, 10),
      director: valores.director.trim(),
      puntuacion: Number.parseFloat(valores.puntuacion),
    };
    onGuardar(datos);
    //Un detalle: en la anterior versión limpiábamos Formulario. Aquí no es necesario dado 
    //que el Form ya estará cerrado.
  }

  return (
    <form onSubmit={guardar} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      
      <input name="titulo" value={valores.titulo} onChange={handleChange} placeholder="Título" />
      {/* JMM: NUEVO respecto a 13 */}
      {errores.titulo && <p style={{ color: "red", margin: 0 }}>{errores.titulo}</p>}
      {/* JMM: Fin de lo nuevo. Este patrón de errores se repite en cada campo... */}

      <select name="genero" value={valores.genero} onChange={handleChange}>
        {/* JMM: NUEVO respecto a 13 — opción vacía: sin ella el navegador pinta la 1ª opción y el estado sigue vacío */}
        <option value="">Selecciona un género…</option>
        {GENEROS.map((g) => (
          <option key={g} value={g}>
            {g.toUpperCase()}
          </option>
        ))}
      </select>
      {errores.genero && <p style={{ color: "red", margin: 0 }}>{errores.genero}</p>}
      <input name="anio" value={valores.anio} onChange={handleChange} placeholder="Año" />
      {errores.anio && <p style={{ color: "red", margin: 0 }}>{errores.anio}</p>}
      <input name="director" value={valores.director} onChange={handleChange} placeholder="Director" />
      {errores.director && <p style={{ color: "red", margin: 0 }}>{errores.director}</p>}
      <input name="puntuacion" value={valores.puntuacion} onChange={handleChange} placeholder="Puntuación (0-10)" />
      {errores.puntuacion && <p style={{ color: "red", margin: 0 }}>{errores.puntuacion}</p>}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancelar} disabled={guardando}>
          Cancelar
        </button>
        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando…" : modo === "crear" ? "Añadir" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
