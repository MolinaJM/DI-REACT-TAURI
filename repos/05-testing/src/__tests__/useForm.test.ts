import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useForm from '../hooks/useForm';

describe('Hook useForm', () => {
    const initialValues = { email: '', password: '' };
    const validator = (values: { email: string; password: string }) => {
        const errors: Record<string, string> = {};
        if (!values.email.includes('@')) errors.email = 'Email invalido';
        if (values.password.length < 6) errors.password = 'Minimo 6 caracteres';
        return errors;
    };

    it('debe inicializar con valores por defecto', () => {
        const { result } = renderHook(() => useForm(initialValues, validator));
        expect(result.current.values).toEqual(initialValues);
    });

    it('debe actualizar valores al cambiar', () => {
        const { result } = renderHook(() => useForm(initialValues, validator));
        act(() => {
            result.current.handleChange({
                target: { name: 'email', value: 'test@test.com', type: 'text', checked: false }
            } as any);
        });
        expect(result.current.values.email).toBe('test@test.com');
    });

    it('debe validar el formulario correctamente', () => {
        const { result } = renderHook(() => useForm(initialValues, validator));
        act(() => {
            result.current.handleSubmit({ preventDefault: () => {} } as any, () => {});
        });
        expect(result.current.errors.email).toBeDefined();
        expect(result.current.errors.password).toBeDefined();
    });
});
