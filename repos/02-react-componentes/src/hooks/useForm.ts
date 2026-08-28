/**
 * useForm.ts - Hook de formulario con tipado y validación
 * Fuente: Sesión 05 - Formulario Controlado con Tipado
 * Extraído del patrón de FormularioRegistro con useState<FormData>
 */
import { useState, ChangeEvent, FormEvent } from 'react';

interface UseFormOptions<T> {
    valoresIniciales: T;
    validar: (valores: T) => Partial<Record<keyof T, string>>;
}

interface UseFormReturn<T> {
    valores: T;
    errores: Partial<Record<keyof T, string>>;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (onSubmit: (valores: T) => void) => (e: FormEvent) => void;
    setValores: React.Dispatch<React.SetStateAction<T>>;
    esValido: boolean;
}

export function useForm<T extends Record<string, any>>({
    valoresIniciales,
    validar,
}: UseFormOptions<T>): UseFormReturn<T> {
    const [valores, setValores] = useState<T>(valoresIniciales);
    const [errores, setErrores] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setValores(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (onSubmit: (valores: T) => void) => {
        return (e: FormEvent) => {
            e.preventDefault();
            const nuevosErrores = validar(valores);
            setErrores(nuevosErrores);
            if (Object.keys(nuevosErrores).length === 0) {
                onSubmit(valores);
            }
        };
    };

    const esValido = Object.keys(errores).length === 0;

    return { valores, errores, handleChange, handleSubmit, setValores, esValido };
}
