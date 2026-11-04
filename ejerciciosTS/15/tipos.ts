//JMM: Bloque 15 - Set: interface del planeta (modularidad: fichero aparte)
//JMM: Se carga desde solucion.ts con `import type`.

export interface Planeta {
  name: string;
  population: number;
  climate: string;
  films?: string[]; //JMM: opcional: hay planetas sin películas
}
