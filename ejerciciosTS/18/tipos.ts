//JMM: Bloque 18 - Interfaces y types de objeto (modularidad: fichero aparte)
//JMM: Se cargan desde solucion.ts con `import type`.

export interface Planeta {
  name: string;
  population: number;
  climate: string;
}

export type EstadoCarga =
  | { estado: "cargando" }
  | { estado: "error"; mensaje: string }
  | { estado: "listo"; planetas: Planeta[] };