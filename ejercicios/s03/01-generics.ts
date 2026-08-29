// ============================================================
// S03 · Ejercicio 1 · Genéricos
// ============================================================
// Completa el código donde veas `// TODO`.
// La solución completa está en: soluciones/s03/01-generics.ts

// 1) Identidad genérica: devuelve el valor sin cambiar de tipo
export function identidad<T>(valor: T): T {
  return undefined as unknown as T; // TODO: return valor;
}

// 2) Primer elemento (genérico), sin lanzar si está vacío → T | undefined
export function primero<T>(arr: T[]): T | undefined {
  return undefined; // TODO: return arr[0];
}

// 3) Filtrar con predicado (genérico)
export function filtrarPor<T>(arr: T[], predicado: (item: T) => boolean): T[] {
  return []; // TODO: return arr.filter(predicado);
}

// 4) Restricción: extrae cualquier objeto con `id` y devuelve el id
export function extraerId<U extends { id: number }>(entidad: U): number {
  return 0; // TODO: return entidad.id;
}

// 5) Clase genérica `Cola<T>` con encolar/desencolar/estaVacia
export class Cola<T> {
  private items: T[] = [];
  encolar(item: T): void {
    void item; // TODO: this.items.push(item);
  }
  desencolar(): T | undefined {
    return undefined; // TODO: return this.items.shift();
  }
  estaVacia(): boolean {
    return true; // TODO: return this.items.length === 0;
  }
}

// 6) Acceso indexado: devuelve obj[k] con tipo seguro
export function obtenerValor<T, K extends keyof T>(obj: T, k: K): T[K] {
  return obj[k];
}