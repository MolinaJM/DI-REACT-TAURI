// Dominio del bloque 16: motos (misma base que el bloque 13)
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
