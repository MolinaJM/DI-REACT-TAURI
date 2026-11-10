/**
 * Toast.tsx - Notificación auto-cerrable
 * Fuente: Sesión 04 - useEffect con setTimeout y cleanup
 * El padre decide QUÉ mostrar; el toast decide CUÁNDO desaparecer.
 */
import { useEffect } from 'react';

interface ToastProps {
    mensaje: string;
    duracion?: number;
    onTerminar: () => void;
}

function Toast({ mensaje, duracion = 2500, onTerminar }: ToastProps) {
    useEffect(() => {
        if (!mensaje) return;
        const t = setTimeout(onTerminar, duracion);
        return () => clearTimeout(t);
    }, [mensaje, duracion, onTerminar]);

    if (!mensaje) return null;
    return (
        <p className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded">
            {mensaje}
        </p>
    );
}

export default Toast;
