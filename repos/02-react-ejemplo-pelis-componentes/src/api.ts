// Cliente api: GET, POST, PUT y DELETE — §15.1.1
import type { Pelicula, NuevaPelicula } from "./tipos.ts";

const URL_PELICULAS = "http://localhost:3000/peliculas";

async function peticion<T>(url: string, opciones?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  listar: (signal?: AbortSignal) => peticion<Pelicula[]>(URL_PELICULAS, { signal }),

  crear: (datos: NuevaPelicula) =>
    peticion<Pelicula>(URL_PELICULAS, {
      method: "POST",
      body: JSON.stringify(datos),
    }),

  actualizar: (id: number, datos: NuevaPelicula) =>
    peticion<Pelicula>(`${URL_PELICULAS}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...datos, id }),
    }),

  eliminar: (id: number) =>
    peticion<unknown>(`${URL_PELICULAS}/${id}`, { method: "DELETE" }),
};

