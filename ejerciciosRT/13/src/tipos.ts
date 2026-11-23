export interface Pelicula {
  id: number;
  titulo: string;
  genero: string;
  anio: number;
  director: string;
  puntuacion: number;
}

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio: number;
}

// Ejercicio 2: dominio nuevo (reconstrucción del patrón del apunte 13)
export interface Moto {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  cilindrada: number;
  tipo: string;
  extras: string[];
  notas: string;
}

// §13.3.2: al crear todavía no hay id
export type NuevaMoto = Omit<Moto, "id">;
