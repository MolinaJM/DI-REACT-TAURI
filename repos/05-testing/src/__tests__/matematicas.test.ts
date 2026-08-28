import { describe, it, expect } from 'vitest';
import { sumar, filtrarPares } from '../utils/matematicas';

describe('Funciones utilitarias', () => {
    it('sumar debe retornar la suma correcta', () => {
        expect(sumar(2, 3)).toBe(5);
        expect(sumar(-1, 1)).toBe(0);
        expect(sumar(0, 0)).toBe(0);
    });

    it('filtrarPares debe retornar solo numeros pares', () => {
        expect(filtrarPares([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
        expect(filtrarPares([1, 3, 5])).toEqual([]);
        expect(filtrarPares([])).toEqual([]);
    });
});
