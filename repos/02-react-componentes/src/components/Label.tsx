/**
 * Label.tsx - label htmlFor tipado
 * Fuente: Sesión 04 - Controles de formulario
 * Liga un texto a un control con htmlFor / id (accesibilidad + UX).
 */
import type { ReactNode } from 'react';

interface LabelProps {
    htmlFor: string;
    children: ReactNode;
}

function Label({ htmlFor, children }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
            {children}
        </label>
    );
}

export default Label;
