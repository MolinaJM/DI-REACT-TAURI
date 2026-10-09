//JMM: Bloque 10 - Interfaces y types de objeto (modularidad: fichero aparte)
//JMM: Se cargan desde solucion.ts con `import type`.

export interface EstadoCargando {
  estado: "cargando";
  progreso: number;
}

export interface EstadoExito {
  estado: "exito";
  datos: string;
}

export interface EstadoError {
  estado: "error";
  mensaje: string;
  codigo: number;
}

export interface EstadoCancelado {
  estado: "cancelado";
  razon: string;
}

export type Estado = EstadoCargando | EstadoExito | EstadoError | EstadoCancelado;