/**
 * Extras.tsx - Vista: Toast y Paginación
 * Fuente: Sesión 04/S05 - useEffect con setTimeout, paginación
 */
import { useState } from 'react';
import Toast from '../components/Toast';
import Pagination from '../components/Pagination';

const ITEMS = Array.from({ length: 23 }, (_, i) => `Elemento ${i + 1}`);
const POR_PAGINA = 5;

function Extras() {
    const [toast, setToast] = useState("");
    const [pagina, setPagina] = useState(1);

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-3">Toast (notificación auto-cerrable)</h2>
                <p className="text-sm text-gray-500 mb-2">
                    El padre decide QUÉ mostrar; el toast decide CUÁNDO desaparecer
                    (<code>useEffect</code> + <code>setTimeout</code> + cleanup).
                </p>
                <button
                    onClick={() => setToast("¡Guardado!")}
                    className="border px-3 py-1 rounded"
                >
                    Mostrar toast
                </button>
                <div className="mt-2">
                    <Toast mensaje={toast} onTerminar={() => setToast("")} />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">Paginación</h2>
                <p className="text-sm text-gray-500 mb-2">
                    No renderizamos todos los datos: solo una página.
                    <code> Math.ceil(total / porPagina)</code> → número de páginas.
                </p>
                <Pagination
                    total={ITEMS.length}
                    porPagina={POR_PAGINA}
                    pagina={pagina}
                    onCambiar={setPagina}
                />
                <ul className="mt-3 space-y-1">
                    {ITEMS.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA).map(item => (
                        <li key={item} className="bg-gray-100 p-2 rounded">{item}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Extras;
