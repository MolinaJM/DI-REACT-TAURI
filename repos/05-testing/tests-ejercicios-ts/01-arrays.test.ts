import { describe, it, expect } from 'vitest';

function sumarNumeros(numeros: number[]): number {
  return numeros.reduce((total, numero) => total + numero, 0);
}

function filtrarPares(numeros: number[]): number[] {
  return numeros.filter((numero) => numero % 2 === 0);
}

function obtenerNombres<T extends { nombre: string }>(alumnos: T[]): string[] {
  return alumnos.map((alumno) => alumno.nombre);
}

function agruparPorEstado<T extends { estado: string }>(tareas: T[]): Record<string, T[]> {
  return tareas.reduce<Record<string, T[]>>((grupos, tarea) => {
    const estado = tarea.estado;
    return {
      ...grupos,
      [estado]: [...(grupos[estado] ?? []), tarea],
    };
  }, {});
}

describe('Tests de Arrays', () => {
  it('sumarNumeros debe sumar todos los elementos', () => {
    expect(sumarNumeros([1, 2, 3, 4])).toBe(10);
  });

  it('filtrarPares debe retornar solo numeros pares', () => {
    expect(filtrarPares([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
    expect(filtrarPares([1, 3, 5])).toEqual([]);
    expect(filtrarPares([])).toEqual([]);
  });

  it('obtenerNombres debe extraer los nombres', () => {
    expect(
      obtenerNombres([
        { nombre: 'Ana', nota: 8 },
        { nombre: 'Luis', nota: 7 },
      ])
    ).toEqual(['Ana', 'Luis']);
  });

  it('agruparPorEstado debe agrupar por la propiedad estado', () => {
    const agrupadas = agruparPorEstado([
      { id: 1, texto: 'Repasar', estado: 'pendiente' },
      { id: 2, texto: 'Entregar', estado: 'completada' },
    ]);
    expect(agrupadas.pendiente.length).toBe(1);
    expect(agrupadas.completada.length).toBe(1);
  });
});
