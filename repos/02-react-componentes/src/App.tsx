/**
 * App.tsx - Navegación por pestañas
 * Fuente: Sesión 04 - Página principal con ejemplos por separado
 * Cada pestaña muestra una sección de componentes.
 */
import { useState } from 'react';
import Inicio, { type Pagina } from './views/Inicio';
import Basicos from './views/Basicos';
import Controles from './views/Controles';
import Hooks from './views/Hooks';
import Extras from './views/Extras';
import Personalizados from './views/Personalizados';
import Estado from './views/Estado';
import Swapi from './views/Swapi';
import Cards from './views/Cards';

const NAV: { id: Pagina; texto: string }[] = [
    { id: 'inicio', texto: 'Inicio' },
    { id: 'basicos', texto: 'Básicos' },
    { id: 'controles', texto: 'Controles' },
    { id: 'hooks', texto: 'Hooks' },
    { id: 'extras', texto: 'Extras' },
    { id: 'personalizados', texto: 'Personalizados' },
    { id: 'estado', texto: 'Estado' },
    { id: 'swapi', texto: 'SWAPI' },
    { id: 'cards', texto: 'Cards' },
];

/**
 * Desactiva/activa la hoja de estilos de Tailwind.
 * Estrategia: la hoja con más reglas CSS es la de Tailwind (cientos de reglas).
 */
function toggleTailwind() {
    let mejor: CSSStyleSheet | undefined;
    let max = 0;
    for (const hoja of Array.from(document.styleSheets)) {
        try {
            const n = hoja.cssRules.length;
            if (n > max) { max = n; mejor = hoja; }
        } catch { /* cross-origin: ignorar */ }
    }
    if (mejor) mejor.disabled = !mejor.disabled;
}

function App() {
    const [pagina, setPagina] = useState<Pagina>('inicio');
    const [tailwind, setTailwind] = useState(true);

    const alternarTailwind = () => {
        toggleTailwind();
        setTailwind(v => !v);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            <h1 className="text-3xl font-bold text-center mb-6">
                React Componentes — Ejemplos S04–S06
            </h1>

            <div className="flex justify-center mb-4">
                <button
                    onClick={alternarTailwind}
                    className={`px-3 py-1 rounded text-sm border
                        ${tailwind
                            ? 'border-green-400 text-green-700'
                            : 'border-red-400 text-red-700'}`}
                >
                    Tailwind: {tailwind ? 'ON' : 'OFF'}
                </button>
            </div>

            <nav className="flex flex-wrap gap-2 mb-8 justify-center">
                {NAV.map(n => (
                    <button
                        key={n.id}
                        onClick={() => setPagina(n.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition
                            ${pagina === n.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        {n.texto}
                    </button>
                ))}
            </nav>

            <main className="bg-white rounded-xl shadow-md p-6">
                {pagina === 'inicio' && <Inicio ir={setPagina} />}
                {pagina === 'basicos' && <Basicos />}
                {pagina === 'controles' && <Controles />}
                {pagina === 'hooks' && <Hooks />}
                {pagina === 'extras' && <Extras />}
                {pagina === 'personalizados' && <Personalizados />}
                {pagina === 'estado' && <Estado />}
                {pagina === 'swapi' && <Swapi />}
                {pagina === 'cards' && <Cards />}
            </main>
        </div>
    );
}

export default App;
