/**
 * ej1.tsx - Bloque 13, Ejercicio 1: componente genérico Fila<T>
 * El mismo componente sirve para Pelicula y para Libro.
 */
interface FilaProps<T> {
  item: T;
}

export function Fila<T extends { id: number; titulo: string }>({ item }: FilaProps<T>) {
  return <li>{item.titulo}</li>;
}
