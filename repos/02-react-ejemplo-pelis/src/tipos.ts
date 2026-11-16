// Tipos compartidos de la app de películas (AppCine) — §13.1 y §13.3.2
export interface Pelicula {
  id?: number; // opcional: en "crear" todavía no existe
  titulo: string;
  genero: string;
  anio: number;
  director: string;
  puntuacion: number; //0-10
}

// Al crear todavía no hay id: lo asigna la app (Date.now()) o la base de datos
export type NuevaPelicula = Omit<Pelicula, "id">;

// Listado corto: solo título y año
// No se usan en este repo!
export type FilaMinima = Pick<Pelicula, "titulo" | "anio">;

// Edición: solo los campos que cambian. Usado en edición
export type Cambios = Partial<Pelicula>;
