//JMM: Bloque 12 - Interfaces y types de objeto (modularidad: fichero aparte)
//JMM: Se cargan desde solucion.ts con `import type`.

export interface Usuario {
  id: number;
  nombre: string;
  rol: "admin" | "editor" | "lector";
  email: string;
}

export interface Perro {
  tipo: "perro";
  nombre: string;
  ladra(): string;
}

export interface Gato {
  tipo: "gato";
  nombre: string;
  maulla(): string;
}

export interface Planeta {
  name: string;
  population: number;
  climate: string;
  films?: string[];
}