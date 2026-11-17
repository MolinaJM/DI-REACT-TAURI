// Tipos compartidos de la app de películas (AppCine) — §13.1 y §13.3.2
export interface Pelicula {
  id: number; 
  titulo: string;
  genero: string;
  anio: number;
  director: string;
  puntuacion: number; // 0-10
}

// Al crear todavía no hay id: lo asigna json-server.
// Por eso la api trabaja con Pelicula sin id (NuevaPelicula), no con Pelicula
export type NuevaPelicula = Omit<Pelicula, "id">;

// Listado corto: solo título y año
export type FilaMinima = Pick<Pelicula, "titulo" | "anio">;

// Edición: solo los campos que cambian
export type Cambios = Partial<Pelicula>;
