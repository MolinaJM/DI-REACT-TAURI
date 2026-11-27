/**
 * ej1.tsx - Bloque 15, Ejercicio 1: CRUD de motos con lifting + modal + crear/editar.
 * Carga las motos de la API local (http://localhost:3000/motos) con fetch + AbortController.
 * Importante!! El CRUD es en memoria (la lista se actualiza sin mutar; no se hacen POST/PUT/DELETE).
 *
 * Lo nuevo que hay con respecto al bloque 13: fetch + AbortController (§15.2.1), lifting state up
 * (§15.3), patrón modal (§15.5) y formulario crear/editar (§13.8).
 */
import { useEffect, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { Moto, NuevaMoto } from "./tipos";

const TIPOS = ["deportiva", "trail", "urbana", "custom"];
const EXTRAS = ["ABS", "Cruise control", "Maletas", "GPS"];

// §15.4: la fila avisa al padre con callbacks (eventos por props)
interface MotoFilaProps {
  moto: Moto;
  onEditar: (moto: Moto) => void;
  onBorrar: (id: number) => void;
}

function MotoFila({ moto, onEditar, onBorrar }: MotoFilaProps) {
  return (
    <li>
      {moto.marca} {moto.modelo} ({moto.anio}) — {moto.tipo}{" "}
      <button onClick={() => onEditar(moto)}>Editar</button>{" "}
      <button onClick={() => onBorrar(moto.id)}>Borrar</button>
    </li>
  );
}

// §13.8: el mismo formulario sirve para crear y editar
interface MotoFormProps {
  inicial?: Partial<Moto>;
  modo: "crear" | "editar";
  onGuardar: (datos: NuevaMoto) => void;
  onCancelar: () => void;
}

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

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValores(v => ({ ...v, [name]: value }));
  }

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setValores(v => ({
      ...v,
      extras: checked ? [...v.extras, name] : v.extras.filter(x => x !== name),
    }));
  }

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
  }

  return (
    <form onSubmit={guardar}>
      <label htmlFor="f-marca">Marca</label>
      <input id="f-marca" name="marca" value={valores.marca} onChange={handleChange} />

      <label htmlFor="f-modelo">Modelo</label>
      <input id="f-modelo" name="modelo" value={valores.modelo} onChange={handleChange} />

      <label htmlFor="f-anio">Año</label>
      <input id="f-anio" name="anio" type="number" value={valores.anio} onChange={handleChange} />

      <label htmlFor="f-cilindrada">Cilindrada</label>
      <input id="f-cilindrada" name="cilindrada" type="number" value={valores.cilindrada} onChange={handleChange} />

      <label htmlFor="f-tipo">Tipo</label>
      <select id="f-tipo" name="tipo" value={valores.tipo} onChange={handleChange}>
        {TIPOS.map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div>
        <strong>Extras</strong>
        {EXTRAS.map(x => (
          <label key={x}>
            <input type="checkbox" name={x} checked={valores.extras.includes(x)} onChange={handleCheck} />
            {x}
          </label>
        ))}
      </div>

      <label htmlFor="f-notas">Notas</label>
      <textarea id="f-notas" name="notas" value={valores.notas} onChange={handleChange} rows={2} />

      <button type="submit">{modo === "crear" ? "Añadir" : "Guardar"}</button>
      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  );
}

// §15.5: patrón modal (overlay + panel), se abre/cierra con `abierto`
interface MotoModalProps {
  abierto: boolean;
  inicial: Moto | null;
  onCerrar: () => void;
  onGuardar: (datos: NuevaMoto) => void;
}

function MotoModal({ abierto, inicial, onCerrar, onGuardar }: MotoModalProps) {
  if (!abierto) return null;

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <div
        onClick={onCerrar}
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />
      <section
        style={{
          position: "relative",
          margin: "10% auto",
          maxWidth: 420,
          background: "white",
          borderRadius: 12,
          padding: 24,
        }}
      >
        <h2>{inicial ? "Editar moto" : "Nueva moto"}</h2>
        <MotoForm
          inicial={inicial ?? undefined}
          modo={inicial ? "editar" : "crear"}
          onGuardar={onGuardar}
          onCancelar={onCerrar}
        />
      </section>
    </div>
  );
}

// §15.3: App como fuente de la verdad (peliculas -> motos)
export function GestorMotosApi() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<Moto | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // §15.2.1: carga inicial con fetch + AbortController
  useEffect(() => {
    const controller = new AbortController();

    async function cargar(): Promise<void> {
      setCargando(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3000/motos", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setMotos((await res.json()) as Moto[]);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setCargando(false);
      }
    }

    void cargar();
    return () => controller.abort();
  }, []);

  function abrirNueva(): void {
    setEditando(null);
    setModalAbierto(true);
  }

  function abrirEditar(moto: Moto): void {
    setEditando(moto);
    setModalAbierto(true);
  }

  function guardar(datos: NuevaMoto): void {
    if (editando) {
      setMotos(motos.map(m => (m.id === editando.id ? { ...m, ...datos } : m)));
    } else {
      setMotos([...motos, { id: Date.now(), ...datos }]);
    }
    setModalAbierto(false);
    setEditando(null);
  }

  function borrar(id: number): void {
    setMotos(motos.filter(m => m.id !== id));
  }

  if (cargando) return <p>Cargando…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Gestor de motos (API)</h2>
      <button onClick={abrirNueva}>Nueva moto</button>
      <ul>
        {motos.map(m => (
          <MotoFila key={m.id} moto={m} onEditar={abrirEditar} onBorrar={borrar} />
        ))}
      </ul>
      <MotoModal
        abierto={modalAbierto}
        inicial={editando}
        onCerrar={() => setModalAbierto(false)}
        onGuardar={guardar}
      />
    </div>
  );
}
