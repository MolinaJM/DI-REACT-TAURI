//JMM: Bloque 17 - Interfaces y types de objeto (modularidad: fichero aparte)
//JMM: Se cargan desde solucion.ts con `import type`.

export interface Planeta {
  name: string;
  population: number;
  climate: string;
}

export interface Config {
  readonly url: string;
  readonly port: number;
  readonly debug: boolean;
}

export interface PlanetaJSON {
  name: string;
  population: number;
  climate: string;
  films?: string[];
}