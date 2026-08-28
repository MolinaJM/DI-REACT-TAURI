// ============================================================
// S03 · Ejercicio 1 · Genéricos
// ============================================================
// Completa. Solución: soluciones/s03/01-generics.ts

// 1) Identidad genérica
export function identidad<T>(valor: T): T {
  return undefined as unknown as T;
}

// 2) Primer elemento (genérico), sin lanzar si está vacío
export function primero<T>(arr: T[]): T | undefined {
  return undefined;
}

// 3) Filtrar con predicado (genérico)
export function filtrarPor<T>(arr: T[], predicado: (item: T) => boolean): T[] {
  return [];
}

// 4) Restricción: extrae cualquier objeto con `id` y devuelve el id
export function extraerId<U extends { id: number }>(entidad: U): number {
  return 0;
}

// 5) Clase genérica `Cola<T>` con encolar/desencolar/estaVacia
export class Cola<T> {
  private items: T[] = [];
  encolar(item: T): void {
    void item;
  }
  desencolar(): T | undefined {
    return undefined;
  }
  estaVacia(): boolean {
    return true;
  }
}

// 6) Acceso indexado: devuelve obj[k] con tipo seguro
export function obtenerValor<T, K extends keyof T>(obj: T, k: K): T[K] {
  return obj[k];
}