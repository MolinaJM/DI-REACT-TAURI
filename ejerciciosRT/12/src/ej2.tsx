/**
 * ej2.tsx - Bloque 12, Ejercicio 2: buscador sobre los alumnos ya cargados
 * Requiere la API local: http://localhost:3000/alumnos (ver FAKEAPI en ejerciciosRT.md)
 */
import { useEffect, useState } from "react";
import type { Alumno } from "./tipos";

export function BuscadorAlumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargar(): Promise<void> {
      setCargando(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3000/alumnos", { signal: controller.signal });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setAlumnos((await res.json()) as Alumno[]);
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

  const filtro = busqueda.trim().toLowerCase();
  const visibles = alumnos.filter(
    (a) =>
      a.nombre.toLowerCase().includes(filtro) || a.curso.toLowerCase().includes(filtro)
  );

  if (cargando) return <p>Cargando…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por nombre o curso…"
      />
      {visibles.length === 0 ? (
        <p>Sin resultados</p>
      ) : (
        <ul>
          {visibles.map((a) => (
            <li key={a.id}>
              {a.nombre} — {a.curso}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
