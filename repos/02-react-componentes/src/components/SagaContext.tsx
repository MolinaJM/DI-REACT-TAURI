/**
 * SagaContext.tsx - useContext (provider + hook custom + consumidores)
 * Fuente: Sesión 04 - useContext
 * Context = pasar datos "abajo por el árbol" SIN pasar props en cada nivel.
 *   1. Creas el contexto con un valor por defecto.
 *   2. Un PROVIDER envuelve el árbol y pasa el valor.
 *   3. Cualquier descendiente lo CONSUME con useContext.
 */
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SagaContextValue {
    saga: string;
    setSaga: (s: string) => void;
}

const SagaContext = createContext<SagaContextValue>({
    saga: "original",
    setSaga: () => {},
});

// PROVIDER: guarda el estado y lo expone al árbol.
export function SagaProvider({ children }: { children: ReactNode }) {
    const [saga, setSaga] = useState("original");
    return (
        <SagaContext.Provider value={{ saga, setSaga }}>
            {children}
        </SagaContext.Provider>
    );
}

// HOOK para consumir el contexto (más limpio que useContext a secas).
export function useSaga() {
    return useContext(SagaContext);
}

// CONSUMIDOR: lee la saga sin que se la pasen como prop.
export function SagaBadge() {
    const { saga } = useSaga();
    return <p>Saga activa: <b>{saga}</b></p>;
}

// CONSUMIDOR: cambia la saga; el badge se actualiza solo.
export function SagaSelector() {
    const { setSaga } = useSaga();
    return (
        <span className="flex gap-2">
            <button onClick={() => setSaga("original")} className="border px-3 py-1 rounded">Original</button>
            <button onClick={() => setSaga("prequel")} className="border px-3 py-1 rounded">Prequel</button>
            <button onClick={() => setSaga("secuela")} className="border px-3 py-1 rounded">Secuela</button>
        </span>
    );
}
