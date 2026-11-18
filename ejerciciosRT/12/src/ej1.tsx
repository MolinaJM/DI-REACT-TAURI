/**
 * ej1.tsx - Bloque 12, Ejercicio 1: cargar alumnos de la API con useEffect + fetch
 * Requiere la API local: http://localhost:3000/alumnos (ver FAKEAPI en ejerciciosRT.md)
 */
import { useEffect, useState } from "react";
import type { Alumno } from "./tipos";

export function ListaAlumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (cargando) return <p>Cargando…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {alumnos.map((a) => (
        <li key={a.id}>
          {a.nombre} — {a.curso}
        </li>
      ))}
    </ul>
  );
}
