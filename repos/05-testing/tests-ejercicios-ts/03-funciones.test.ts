import { describe, it, expect } from 'vitest';

function esNumeroValido(valor: unknown): valor is number {
  return typeof valor === 'number' && !Number.isNaN(valor);
}

function normalizarTexto(texto: string): string {
  return texto.trim().toLowerCase();
}

interface TareaConId {
  id: string;
  texto: string;
  completada: boolean;
}

function crearTarea(texto: string): TareaConId {
  return {
    id: crypto.randomUUID(),
    texto: texto.trim(),
    completada: false,
  };
}

describe('Tests de Funciones', () => {
  it('esNumeroValido debe validar numeros correctamente', () => {
    expect(esNumeroValido(42)).toBe(true);
    expect(esNumeroValido(Number.NaN)).toBe(false);
  });

  it('normalizarTexto debe limpiar y convertir a minusculas', () => {
    expect(normalizarTexto('  Hola Mundo  ')).toBe('hola mundo');
  });

  it('crearTarea debe generar tarea con id, texto limpio y completada false', () => {
    const tarea = crearTarea('  Estudiar JavaScript  ');
    expect(tarea.texto).toBe('Estudiar JavaScript');
    expect(tarea.completada).toBe(false);
    expect(typeof tarea.id).toBe('string');
  });
});
