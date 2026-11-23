/**
 * ej2.tsx - Bloque 13, Ejercicio 2: reconstruir el patrón del apunte 13 en otro dominio.
 * CRUD completo de motos (modelo + buscador + formulario + tabla + añadir/editar/borrar).
 *
 * Controles del formulario:
 *  - texto / número  -> handleChange por `name` (usa `value`)
 *  - radio (tipo)    -> handleChange por `name` (usa `value`)
 *  - checkbox (extras)-> handleCheck por `name` (usa `checked`, alterna en el array)
 *  - textarea (notas)-> handleChange por `name` (usa `value`)
 *
 * Para el patrón de radio/checkbox/buscador, ver repos/02-react-componentes:
 * RadioGroup.tsx, Checkbox.tsx y SearchBox.tsx.
 */
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { Moto, NuevaMoto } from "./tipos";

// §13.3.1: Record<string, string> + color neutro por defecto (??)
const COLORES_TIPO: Record<string, string> = {
  deportiva: "#d9534f",
  trail: "#5bc0de",
  urbana: "#f0ad4e",
  custom: "#6f42c1",
};

function colorDeTipo(tipo: string): string {
  return COLORES_TIPO[tipo] ?? "#6c757d";
}

const TIPOS = ["deportiva", "trail", "urbana", "custom"];
const EXTRAS = ["ABS", "Cruise control", "Maletas", "GPS"];

// §13.2: props tipadas para las callbacks por id
interface MotoRowProps {
  moto: Moto;
  indice: number;
  onEditar: (id: number) => void;
  onBorrar: (id: number) => void;
}

function MotoRow({ moto, indice, onEditar, onBorrar }: MotoRowProps) {
  return (
    <tr>
      <td>{indice + 1}</td>
      <td>
        {moto.marca} {moto.modelo}
      </td>
      <td style={{ color: colorDeTipo(moto.tipo) }}>{moto.tipo}</td>
      <td>{moto.anio}</td>
      <td>{moto.cilindrada}</td>
      <td>{moto.extras.join(", ")}</td>
      <td>
        <button onClick={() => onEditar(moto.id)}>Editar</button>{" "}
        <button onClick={() => onBorrar(moto.id)}>Borrar</button>
      </td>
    </tr>
  );
}

// §13.4: props opcionales (inicial) + modo + onGuardar/onCancelar
interface MotoFormProps {
  inicial?: Partial<Moto>;
  modo: "crear" | "editar";
  onGuardar: (datos: NuevaMoto) => void;
  onCancelar: () => void;
}

// El estado del formulario es un objeto: los numéricos se guardan como string
// (para poder escribir en el input) y se convierten al enviar. `extras` es string[].
type MotoFormValores = {
  marca: string;
  modelo: string;
  anio: string;
  cilindrada: string;
  tipo: string;
  extras: string[];
  notas: string;
};

function MotoForm({ inicial, modo, onGuardar, onCancelar }: MotoFormProps) {
  const [valores, setValores] = useState<MotoFormValores>(() => ({
    marca: inicial?.marca ?? "",
    modelo: inicial?.modelo ?? "",
    anio: inicial?.anio?.toString() ?? "",
    cilindrada: inicial?.cilindrada?.toString() ?? "",
    tipo: inicial?.tipo ?? "deportiva",
    extras: inicial?.extras ?? [],
    notas: inicial?.notas ?? "",
  }));

  // §13.7.2: un solo handler para todos los controles de valor (input/select/textarea).
  // El `name` del control identifica el campo; `value` es string.
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValores(v => ({ ...v, [name]: value }));
  }

  // Checkbox: el estado no es un valor sino un array de valores marcados.
  // Se usa `checked` (no `value`) y se alterna el elemento en `extras`.
  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setValores(v => ({
      ...v,  /* Si está check, lo guarda. Si no, se queda con el resto (al filtrar) */
      extras: checked ? [...v.extras, name] : v.extras.filter(x => x !== name),
    }));
  }

  // §13.7.1 + §13.6.2: SubmitEvent + preventDefault + Number.parseInt al enviar
  function guardar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valores.marca.trim() || !valores.modelo.trim()) return;
    if (valores.anio === "" || valores.cilindrada === "") return;

    onGuardar({
      marca: valores.marca.trim(),
      modelo: valores.modelo.trim(),
      anio: Number.parseInt(valores.anio, 10),
      cilindrada: Number.parseInt(valores.cilindrada, 10),
      tipo: valores.tipo,
      extras: valores.extras,
      notas: valores.notas.trim(),
    });
    setValores({ marca: "", modelo: "", anio: "", cilindrada: "", tipo: "deportiva", extras: [], notas: "" });
  }

  return (
    <form onSubmit={guardar} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <input name="marca" value={valores.marca} onChange={handleChange} placeholder="Marca" />
        <input name="modelo" value={valores.modelo} onChange={handleChange} placeholder="Modelo" />
        <input name="anio" type="number" value={valores.anio} onChange={handleChange} placeholder="Año" style={{ width: "6rem" }} />
        <input name="cilindrada" type="number" value={valores.cilindrada} onChange={handleChange} placeholder="Cilindrada" style={{ width: "8rem" }} />
      </div>

      <div>
        <strong>Tipo</strong>
        {TIPOS.map(t => (
          <label key={t} style={{ marginRight: "1rem" }}>
            <input type="radio" name="tipo" value={t} checked={valores.tipo === t} onChange={handleChange} />
            {t}
          </label>
        ))}
      </div>

      <div>
        <strong>Extras</strong>
        {EXTRAS.map(x => (
          <label key={x} style={{ marginRight: "1rem" }}>
            <input type="checkbox" name={x} checked={valores.extras.includes(x)} onChange={handleCheck} />
            {x}
          </label>
        ))}
      </div>

      <textarea name="notas" value={valores.notas} onChange={handleChange} placeholder="Notas" rows={2} />

      <div>
        <button type="submit">{modo === "crear" ? "Añadir" : "Guardar"}</button>{" "}
        {modo === "editar" && <button type="button" onClick={onCancelar}>Cancelar</button>}
      </div>
    </form>
  );
}

// §13.5.1 + §13.8: estado de la lista, enEdicion, buscador y handlers CRUD inmutables
interface GestorMotosProps {
  iniciales: Moto[];
}

export function GestorMotos({ iniciales }: GestorMotosProps) {
  const [motos, setMotos] = useState<Moto[]>(iniciales);
  const [enEdicion, setEnEdicion] = useState<number | null>(null);
  const [busqueda, setBusqueda] = useState("");

  // Estado derivado: la moto en edición (no se guarda en useState)
  const motoEnEdicion = enEdicion !== null ? motos.find(m => m.id === enEdicion) : undefined;

  // Estado derivado: buscador (bloque 12) — filtra por marca o modelo
  const motosFiltradas =
    busqueda.trim() === ""
      ? motos
      : motos.filter(
          m =>
            m.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
            m.modelo.toLowerCase().includes(busqueda.toLowerCase()),
        );

  function anadir(datos: NuevaMoto) {
    const nueva: Moto = { ...datos, id: Date.now() };
    setMotos([...motos, nueva]);
  }

  function editar(id: number, cambios: Partial<Moto>) {
    setMotos(motos.map(m => (m.id === id ? { ...m, ...cambios } : m)));
    setEnEdicion(null);
  }

  function borrar(id: number) {
    setMotos(motos.filter(m => m.id !== id));
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h2>Gestor de motos</h2>
      <img src="/motos.png" alt="Moto de ejemplo" style={{ maxWidth: "240px", display: "block", marginBottom: "1rem" }} />

      {/* Buscador: input controlado, handler inline (React infiere el evento) */}
      <input
        type="text"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        placeholder="Buscar por marca o modelo…"
        style={{ marginBottom: "1rem" }}
      />

      {/* key fuerza a re-montar el formulario al cambiar de moto en edición */}
      <MotoForm
        key={enEdicion ?? "nueva"}
        inicial={motoEnEdicion}
        modo={enEdicion !== null ? "editar" : "crear"}
        onGuardar={datos => (enEdicion !== null ? editar(enEdicion, datos) : anadir(datos))}
        onCancelar={() => setEnEdicion(null)}
      />

      <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Moto</th>
            <th>Tipo</th>
            <th>Año</th>
            <th>Cilindrada</th>
            <th>Extras</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {motosFiltradas.map((moto, indice) => (
            <MotoRow
              key={moto.id}
              moto={moto}
              indice={indice}
              onEditar={id => setEnEdicion(id)}
              onBorrar={borrar}
            />
          ))}
        </tbody>
      </table>
      {motosFiltradas.length === 0 && <p>Sin resultados</p>}
    </div>
  );
}
