// Dominio del bloque 15: motos (misma base que el bloque 13, ahora con API)
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

// Al crear todavía no hay id: lo asigna la base de datos (json-server)
export type NuevaMoto = Omit<Moto, "id">;
