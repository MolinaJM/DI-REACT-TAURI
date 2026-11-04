//JMM: Bloque 14 - Interfaces y types de objeto (modularidad: fichero aparte)
//JMM: Se cargan desde solucion.ts con `import type`.

export interface Planeta {
  name: string;
  population: number;
  climate: string;
  films: string[];
}