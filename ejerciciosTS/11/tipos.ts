//JMM: Bloque 11 - Interfaces y types de objeto (modularidad: fichero aparte)
//JMM: Se cargan desde solucion.ts con `import type`.

export interface Triangulo {
  tipo: "triangulo"; //Literal para discriminación
  base: number;
  altura: number;
}

export interface Cuadrado {
  tipo: "cuadrado"; //Literal para discriminación
  lado: number;
}

export type Figura = Triangulo | Cuadrado;

export interface ConEmail {
  nombre: string;
  email: string;
}

export interface ConTelefono {
  nombre: string;
  telefono: number;
}

export type Contacto = ConEmail | ConTelefono;