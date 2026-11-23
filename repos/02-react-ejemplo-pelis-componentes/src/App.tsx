import { useEffect, useMemo, useRef, useState } from "react";

//JMM - Inicio Nuevo con respecto a 15--------------------------------------
import { Buscador } from "./components/Buscador.tsx";
import { Boton } from "./components/Boton.tsx";
import { Modal } from "./components/Modal.tsx"; //Incluye cambios
import { PeliculaCard } from "./components/PeliculaCard.tsx";
import { PeliculaForm } from "./components/PeliculaForm.tsx"; //Incluye cambios
import { PeliculaTable } from "./components/PeliculaTable.tsx";
import { Spinner } from "./components/Spinner.tsx";
import { TablaGenerica } from "./components/TablaGenerica.tsx";
import type { Columna } from "./components/TablaGenerica.tsx";
//JMM - Fin Nuevo con respecto a 15--------------------------------------

import { api } from "./api.ts";
import type { Pelicula, NuevaPelicula } from "./tipos.ts";

//JMM - Inicio Nuevo con respecto a 15--------------------------------------
interface ResumenGenero { //Definimos la FILA
  genero: string;
  total: number;
  media: number;
}
const COLUMNAS_RESUMEN: Columna<ResumenGenero>[] = [ //render determina CÓMO se pinta una celda. Probar a cambiar!
  { key: "genero", titulo: "Género", render: (fila) => fila.genero.toUpperCase() },
  { key: "total", titulo: "Núm.Pelis" },
  { key: "media", titulo: "Puntuación media", render: (fila) => fila.media > 9 ? (
        <span style={{ color: "green" , fontWeight: "bold" }}>{fila.media.toFixed(2)}</span>
      ) : (
        fila.media.toFixed(1)
      )}];
  //JMM - Fin Nuevo con respecto a 15--------------------------------------

  function App() {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recargar, setRecargar] = useState(0);

    const [busqueda, setBusqueda] = useState("");
    const [busquedaDebounced, setBusquedaDebounced] = useState<string>(
      () => localStorage.getItem("busquedaPeliculas") ?? ""
    );
    const timerRef = useRef<number | null>(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [enEdicion, setEnEdicion] = useState<Pelicula | null>(null); // null = crear

    //JMM - Inicio Nuevo con respecto a 15--------------------------------------------------
    // Vista del listado: "tabla" (por defecto) o "tarjetas"
    const [vista, setVista] = useState<"tabla" | "tarjetas">("tabla");
    //JMM - Fin Nuevo con respecto a 15--------------------------------------------------


    useEffect(() => {
      const controller = new AbortController();

      async function cargar() {
         //JMM - Inicio Nuevo con respecto a 15--------------------------------------------------
        setCargando(true); //Si comentamos vemos el Spinner. O si reestructuramos esta función, dado que se ha decidido que funcione dando Error si no puede ver los datos
         //JMM - Inicio Nuevo con respecto a 15--------------------------------------------------
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

    useEffect(() => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setBusquedaDebounced(busqueda), 300);
      return () => {
        if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      };
    }, [busqueda]);

    useEffect(() => {
      localStorage.setItem("busquedaPeliculas", busquedaDebounced);
    }, [busquedaDebounced]);

    //JMM - Inicio Nuevo con respecto a 15--------------------------------------------------
    // Estado derivado: filtro por título o género (Buscador avisa con onBuscar)
    // Ahora también busca por Género
    const visibles = useMemo(() =>
        peliculas.filter((p) => {
          const texto = busquedaDebounced.toLowerCase();
          return p.titulo.toLowerCase().includes(texto) || p.genero.toLowerCase().includes(texto);
        }),
      [peliculas, busquedaDebounced]
    );
    //JMM - Fin Nuevo con respecto a 15--------------------------------------------------

    //JMM - Inicio Nuevo con respecto a 15--------------------------------------------------
    // Usamos un Memo para guardar un Map de peliculas por género, y calcular, para cada uno,
    //  el total de películas y la puntuación media 
    const resumen = useMemo<ResumenGenero[]>(() => {
      const porGenero = new Map<string, number[]>();
      for (const p of peliculas) {
        const notas = porGenero.get(p.genero) ?? [];
        notas.push(p.puntuacion);
        porGenero.set(p.genero, notas);
      }
      //Expandimos/Dispersamos/Separamos con spread, y recorremos con map.
      return [...porGenero.entries()].map(([genero, notas]) => ({genero,total: notas.length, 
        media: notas.reduce((a, b) => a + b, 0) / notas.length,
      }));
    }, [peliculas]);
    //JMM - Fin Nuevo con respecto a 15--------------------------------------------------

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
    const guardar = async (datos: NuevaPelicula) => {
      setGuardando(true);
      setError(null);
      try {
        if (enEdicion) {
          await api.actualizar(enEdicion.id, datos);
        } else {
          await api.crear(datos);
        }
        cerrarModal();
        setRecargar((n) => n + 1);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setGuardando(false);
      }
    };

    const borrar = async (id: number) => {
      setError(null);
      try {
        await api.eliminar(id);
        setRecargar((n) => n + 1);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    return (
      <main style={{ fontFamily: "sans-serif", padding: "1rem" }}>
        <h1>AppCine</h1>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
          {/* JMM - Inicio Nuevo con respecto a 15 ------------------------------------------
          Al Buscador se le pasa setBusqueda
          Botones se instancian con tipo, icono y función.
          */}
          <Buscador onBuscar={setBusqueda} />
          <Boton variante="primary" icono="➕" onClick={abrirCrear}>
            Nueva película
          </Boton>
          <Boton variante="secondary" onClick={() => setRecargar((n) => n + 1)} disabled={cargando}>
            Recargar
          </Boton>
          <Boton variante={vista === "tabla" ? "primary" : "ghost"} icono="☰" onClick={() => setVista("tabla")}>
            &nbsp;Tabla
          </Boton>
          <Boton
            variante={vista === "tarjetas" ? "primary" : "ghost"}
            icono="▦"
            onClick={() => setVista("tarjetas")}
          >
            &nbsp;Tarjetas
          </Boton>
          {/* JMM - Fin Nuevo con respecto a 15 ------------------------------------------------*/}
        </div>

        {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

        {/* JMM - Inicio Nuevo con respecto a 15 --------------------------------------------------*/}
        {cargando ? (
          <Spinner />
        ) : visibles.length === 0 ? (
          <p>No hay películas que coincidan con «{busqueda}».</p>
        ) : vista === "tabla" ? (
          <PeliculaTable peliculas={visibles} onEditar={abrirEditar} onBorrar={borrar} />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            {visibles.map((pelicula) => (
              <PeliculaCard
                key={pelicula.id}
                pelicula={pelicula}
                onEditar={abrirEditar}
                onBorrar={borrar}
              />
            ))}
          </div>
        )}
        {/* JMM - Fin Nuevo con respecto a 15 --------------------------------------------------------*/}

        {/* JMM - Inicio Nuevo con respecto a 15 ------------------------------------------------------*/}
        <h2>Resumen por género</h2>
        <TablaGenerica datos={resumen} columnas={COLUMNAS_RESUMEN} keyExtractor={(fila) => fila.genero} />
        {/* JMM - Fin Nuevo con respecto a 15 ----------------------------------------------------------*/}

        <Modal
          abierto={modalAbierto}
          titulo={enEdicion ? "Editar película" : "Nueva película"}
          onCerrar={cerrarModal}
        >
          <PeliculaForm
            // key={enEdicion?.id ?? "nueva"}. Es la versión anterior era vital, 
            // ahora no porque al estar en otro componente sea actualiza de distinta forma
            inicial={enEdicion ?? undefined}
            guardando={guardando}
            onGuardar={guardar}
            onCancelar={cerrarModal}
          />
        </Modal>
      </main>
    );
  }

export default App;
