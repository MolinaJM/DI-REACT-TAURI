import { useEffect, useMemo, useRef, useState } from "react";
import { PeliculaRow } from "./components/PeliculaRow.tsx";
import { PeliculaForm } from "./components/PeliculaForm.tsx";
import { Modal } from "./components/Modal.tsx";
import { api } from "./api.ts";
import type { Pelicula, NuevaPelicula } from "./tipos.ts";

function App() {
  
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [enEdicion, setEnEdicion] = useState<Pelicula | null>(null); // null = crear

  //JMM: NUEVO respecto a 13
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recargar, setRecargar] = useState(0);
  //JMM: FIN de lo nuevo

  //JMM: NUEVO respecto a 13  
  //busqueda controla el texto de la caja de búsqueda
  const [busqueda, setBusqueda] = useState<string>("");
  //Se hace una búsqueda retardada, además, se inicia con el valor guardado en el navegador
  const [busquedaDebounced, setBusquedaDebounced] = useState<string>(
    () => localStorage.getItem("busquedaPeliculas") ?? "");
  //JMM: FIN de lo nuevo
  const timerRef = useRef<number | null>(null);

  //JMM: NUEVO respecto a 13
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  //JMM: FIN de lo nuevo


  //JMM: NUEVO respecto a 13
  //API --> LISTAR
  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const datos = await api.listar(controller.signal);
        setPeliculas(datos);
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
  }, [recargar]);
  //JMM: FIN de lo nuevo

  //JMM: NUEVO respecto a 13
  //TEMPORIZADOR
  useEffect(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setBusquedaDebounced(busqueda), 1000);//a 1segundo para que se note el efecto
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [busqueda]);
  //JMM: FIN de lo nuevo

  //JMM: NUEVO respecto a 13
  //LOCAL STORAGE --> GUARDAR
  useEffect(() => {
    localStorage.setItem("busquedaPeliculas", busquedaDebounced);
  }, [busquedaDebounced]);
  //JMM: FIN de lo nuevo

  //JMM: NUEVO respecto a 13
  //MEMO (FILTRADAS)
  const filtradas = useMemo(
    () => peliculas.filter((p) => p.titulo.toLowerCase().includes(busquedaDebounced.toLowerCase())),
    [peliculas, busquedaDebounced]
  );
  //JMM: FIN de lo nuevo


  //JMM: NUEVO respecto a 13
  //CALLBACKs MODAL 

  const abrirCrear = () => {
    setEnEdicion(null);
    setModalAbierto(true);
  };

  const abrirEditar = (pelicula: Pelicula) => {
    setEnEdicion(pelicula);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEnEdicion(null);
  };
  //JMM: FIN de lo nuevo

  //JMM: NUEVO respecto a 13
  //API --> POST/PUT
  const guardar = async (datos: NuevaPelicula) => {
      setGuardando(true);//DESACTIVA BOTONES Aceptar/Cancelar de Form (Previene errores)
      setError(null);
      try {
        if (enEdicion) {
          await api.actualizar(enEdicion.id, datos);
        } else {
          await api.crear(datos);
        }
        cerrarModal();
        setRecargar((n) => n + 1); // recarga tras mutar (§15.2.1)
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setGuardando(false);//ACTIVA BOTONES
      }
  };

  //API --> DELETE
  const borrar = async (id: number) => {
    setError(null);
    try {
      await api.eliminar(id);
      setRecargar((n) => n + 1);
    } catch (err) {
      setError((err as Error).message);
    }
  };
  //JMM: FIN de lo nuevo

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Gestor de películas (con API)</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {/* JMM: NUEVO respecto a 13 */}
        Última búsqueda: <strong>{localStorage.getItem("busquedaPeliculas")}</strong>
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por título…"
        />
        <button onClick={abrirCrear}>Nueva película</button>
        <button onClick={() => setRecargar((n) => n + 1)} disabled={cargando}>
          Recargar {/*Este botón no tiene mayor utilidad que ver el efecto de Recarga. Ya está automatizado.*/}
        </button>
      </div>

      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {cargando ? (
        <p>Cargando…</p>
      ) : filtradas.length === 0 ? (
        <p>No hay películas que coincidan con «{busquedaDebounced}».</p>
      ) : (
        <table style={{ width: "100%", border: "1px solid black", borderCollapse: "collapse" }}>
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
            {filtradas.map((pelicula, indice) => (
              <PeliculaRow
                key={pelicula.id}
                pelicula={pelicula}
                indice={indice}
                onEditar={() => abrirEditar(pelicula)}
                onBorrar={borrar}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* JMM: NUEVO respecto a 13 
      Le paso PeliculaForm como children del Modal*/}
      <Modal
        abierto={modalAbierto}
        titulo={enEdicion ? "Editar película" : "Nueva película"}
        onCerrar={cerrarModal}
      >
        <PeliculaForm
          key={enEdicion?.id ?? "nueva"}
          inicial={enEdicion ?? undefined}
          modo={enEdicion ? "editar" : "crear"}
          guardando={guardando}
          onGuardar={guardar}
          onCancelar={cerrarModal}
        />
      </Modal>
    </div>
  );
}

export default App;
