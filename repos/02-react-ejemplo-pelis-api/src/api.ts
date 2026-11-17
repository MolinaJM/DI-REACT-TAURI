//JMM: NUEVO respecto a 13
import type { Pelicula, NuevaPelicula } from "./tipos.ts";

const URL_PELICULAS = "http://localhost:3000/peliculas";

// Un único helper genérico <T>: el fetch, los headers y el check de res.ok se escriben una vez
//-los headers indican el formato en el que viajan los datos (ej: JSON)
//-RequestInit se usa para tipar el objeto de configuración
//que se le suele pasar a fetch. Contiene: method (POST, PUT, GET...), headers, body, etc
async function peticion<T>(url: string, opciones?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  if (res.status === 204) return undefined as T; // 204 == No Content
  return (await res.json()) as T;
}

export const api = {
  //Indicamos que se le podría pasar una señal tipo AbortSignal
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

//JMM: FIN de lo nuevo
