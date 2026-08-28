import { describe, it, expect } from 'vitest';

function obtenerPais(objeto: Record<string, unknown>): string {
  return (objeto.pais as string) ?? 'No se encuentra';
}

function tienePropiedad(objeto: Record<string, unknown>, clave: string): boolean {
  return Object.hasOwn(objeto, clave);
}

function eliminarClave<T extends Record<string, unknown>>(
  objeto: T,
  clave: keyof T
): Omit<T, typeof clave> {
  const copia = { ...objeto };
  delete copia[clave];
  return copia;
}

function sumarTemperaturas(objeto: Record<string, unknown>): number {
  return Object.values(objeto).reduce<number>((total, valor) => {
    return typeof valor === 'number' ? total + valor : total;
  }, 0);
}

describe('Tests de Objetos', () => {
  it('obtenerPais debe retornar el pais o valor por defecto', () => {
    expect(obtenerPais({ continente: 'Europa', pais: 'España' })).toBe('España');
    expect(obtenerPais({ continente: 'Europa' })).toBe('No se encuentra');
  });

  it('tienePropiedad debe indicar si existe la clave', () => {
    expect(tienePropiedad({ a: 1, b: 2 }, 'b')).toBe(true);
    expect(tienePropiedad({ a: 1 }, 'b')).toBe(false);
  });

  it('eliminarClave debe eliminar la propiedad sin mutar', () => {
    expect(eliminarClave({ a: 1, b: 2, c: 3 }, 'b')).toEqual({ a: 1, c: 3 });
  });

  it('sumarTemperaturas debe sumar solo valores numericos', () => {
    expect(sumarTemperaturas({ enero: 10, febrero: 12, marzo: 'x' })).toBe(22);
  });
});
