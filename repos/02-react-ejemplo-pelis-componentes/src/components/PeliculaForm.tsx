import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { Pelicula } from "../tipos.ts";
import { Boton } from "./Boton.tsx";

interface PeliculaFormProps {
  inicial?: Partial<Pelicula>;
//JMM - Nuevo con respecto a 15 — ya sin modo: el padre decide (botón siempre "Guardar")
  //modo: "crear" | "editar";
//JMM - Fin Nuevo con respecto a 15 ------------------------------------------------------
  guardando?: boolean;
  onCancelar: () => void;
  onGuardar: (datos: Omit<Pelicula, "id">) => void;
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

type ErroresForm = Partial<Record<keyof PeliculaFormValores, string>>;

// PeliculaForm controlado con validación — §15.6, §16.1.2 y §16.3
export function PeliculaForm({ inicial = {}, guardando = false, onGuardar, onCancelar }: PeliculaFormProps) {
  const [valores, setValores] = useState<PeliculaFormValores>(() => ({
    titulo: inicial.titulo ?? "",

    //JMM - Nuevo con respecto a 15 — normaliza el género guardado a las opciones del select
   //"búscalo en la lista sin obviando si tiene mayúsculas; si no aparece, déjalo como estaba o ponlo vacío (si no entra nada o vacío)"
    genero: GENEROS.find((g) => g.toLowerCase() === (inicial.genero ?? "").toLowerCase()) ?? (inicial.genero ?? ""),
    //JMM - Fin Nuevo con respecto a 15
    
    anio: String(inicial.anio ?? ""),
    director: inicial.director ?? "",
    puntuacion: String(inicial.puntuacion ?? "0"),
  }));
  const [errores, setErrores] = useState<ErroresForm>({});

  // Un solo handler para todos los campos: el `name` del control identifica el campo
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValores(v => ({ ...v, [name]: value }));
  }

    function validar(v: PeliculaFormValores): ErroresForm {
    const nuevosErrores: ErroresForm = {};
    if (!v.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio";
    if (!v.genero.trim()) nuevosErrores.genero = "No has seleccionado género";
    const anio = Number(v.anio);
    if (!v.anio.trim() || Number.isNaN(anio) || anio < 1888) nuevosErrores.anio = "Año no válido (número>1888)";
    if (!v.director.trim()) nuevosErrores.director = "El director es obligatorio";
    const puntuacion = Number(v.puntuacion);
    if (!v.puntuacion.trim() || puntuacion < 0 || puntuacion > 10) nuevosErrores.puntuacion = "Entre 0 y 10";
    return nuevosErrores;
  }
  
  function enviar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validar(valores);
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    onGuardar({
      titulo: valores.titulo.trim(),
      genero: valores.genero.trim(),
      anio: Number.parseInt(valores.anio, 10),
      director: valores.director.trim(),
      puntuacion: Number.parseFloat(valores.puntuacion),
    });

    //JMM - Nuevo con respecto a 15 — reinicio del formulario al enviar
    setValores({ titulo: "", genero: "", anio: "", director: "", puntuacion: "" });
    setErrores({});
    //JMM - Fin Nuevo con respecto a 15----------------------------------------
  }

  return (
    <form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        Título
        <input name="titulo" value={valores.titulo} onChange={handleChange} />
      </label>
      {errores.titulo && <p style={{ color: "red", margin: 0 }}>{errores.titulo}</p>}
      <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        Género
        <select name="genero" value={valores.genero} onChange={handleChange}>
          
          {/* JMM - Nuevo con respecto a 15 — opción vacía*/}
          <option value="">Selecciona un género...</option>
          {/* JMM - Fin Nuevo con respecto a 15 */}
          
          {GENEROS.map((g) => (
            <option key={g} value={g}>
              {g.toUpperCase()}
            </option>
          ))}
        </select>
      </label>
      {errores.genero && <p style={{ color: "red", margin: 0 }}>{errores.genero}</p>}
      <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        Año
        <input name="anio" type="number" value={valores.anio} onChange={handleChange} />
      </label>
      {errores.anio && <p style={{ color: "red", margin: 0 }}>{errores.anio}</p>}
      <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        Director
        <input name="director" value={valores.director} onChange={handleChange} />
      </label>
      {errores.director && <p style={{ color: "red", margin: 0 }}>{errores.director}</p>}
      <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        Puntuación (0-10)
        <input name="puntuacion" type="number" step="0.1" value={valores.puntuacion} onChange={handleChange} />
      </label>
      {errores.puntuacion && <p style={{ color: "red", margin: 0 }}>{errores.puntuacion}</p>}
      {/* JMM - Inicio Nuevo con respecto a 15 ------------------------------------*/}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
        <Boton type="submit" variante="exito" cargando={guardando}>
          {guardando ? "Guardando…" : "Guardar"}
        </Boton>
        <Boton type="button" variante="secondary" onClick={onCancelar} disabled={guardando}>
          Cancelar
        </Boton>
      </div>
      {/* JMM - Fin Nuevo con respecto a 15 -----------------------------------------*/}
    </form>
  );
}
