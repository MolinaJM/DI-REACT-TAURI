/**
 * RenderCounter.tsx - useRef (DOM + valor persistente)
 * Fuente: Sesión 04 - useRef
 * Demuestra los dos usos canónicos de useRef:
 *   1. Acceder al DOM (focus) sin re-renderizar.
 *   2. Guardar un valor que no afecta a la UI (contador de renders).
 * A diferencia de useState, cambiar ref.current NO re-renderiza el componente.
 */
import { useRef, useState } from 'react';

function RenderCounter() {
    const [valor, setValor] = useState(0);
    const renders = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    renders.current += 1; // no re-renderiza

    return (
        <div className="space-y-2">
            <p>Renders: {renders.current} (la ref no re-renderiza)</p>
            <input
                ref={inputRef}
                type="text"
                placeholder="Escribe aquí"
                className="border p-2 rounded"
            />
            <div className="flex gap-2">
                <button
                    onClick={() => inputRef.current?.focus()}
                    className="border px-3 py-1 rounded"
                >
                    Focar input (useRef DOM)
                </button>
                <button
                    onClick={() => setValor(v => v + 1)}
                    className="border px-3 py-1 rounded"
                >
                    Cambiar estado (re-render)
                </button>
            </div>
            <p>valor: {valor}</p>
        </div>
    );
}

export default RenderCounter;
