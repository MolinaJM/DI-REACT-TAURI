/**
 * Inicio.tsx - Página principal: índice de secciones
 * Fuente: Sesión 04 - Navegación por pestañas
 * Desde aquí se va a cada sección de ejemplos.
 */
import { useState } from 'react';

export type Pagina =
    | 'inicio'
    | 'basicos'
    | 'controles'
    | 'hooks'
    | 'extras'
    | 'personalizados'
    | 'estado'
    | 'swapi'
    | 'cards';

interface InicioProps {
    ir: (p: Pagina) => void;
}

const SECCIONES: { id: Pagina; titulo: string; desc: string }[] = [
    { id: 'basicos', titulo: 'Componentes básicos', desc: 'Saludo · Card · Lista de tareas · Lista de usuarios (fetch)' },
    { id: 'controles', titulo: 'Controles de formulario', desc: 'TextInput · Label · Select · Radio · Checkbox · Buscador' },
    { id: 'hooks', titulo: 'useRef, useContext y patrones', desc: 'useRef · useContext · Stale closure · useEffect + setInterval' },
    { id: 'extras', titulo: 'Toast y Paginación', desc: 'Notificación auto-cerrable · Paginación' },
    { id: 'personalizados', titulo: 'Componentes personalizados', desc: 'Botón (ButtonHTMLAttributes) · Modal · Tabla genérica <T>' },
    { id: 'estado', titulo: 'Gestión de estado', desc: 'useReducer · Formulario controlado con validación' },
    { id: 'swapi', titulo: 'Carga de datos (SWAPI)', desc: 'useEffect + fetch a una API real · estados cargando/error/datos' },
    { id: 'cards', titulo: 'Tarjetas de película', desc: 'Card con distintos campos · Card con borde · Tabla de películas' },
];

function Inicio({ ir }: InicioProps) {
    const [idea, setIdea] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Índice de ejemplos</h2>
                <p className="text-gray-600">
                    Elige una sección. Cada una muestra sus componentes con la demo para probarlos.
                </p>
            </div>

            <div className="grid gap-4">
                {SECCIONES.map(s => (
                    <button
                        key={s.id}
                        onClick={() => ir(s.id)}
                        className="text-left border rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                        <span className="font-semibold">→ {s.titulo}</span>
                        <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                    </button>
                ))}
            </div>

            <details open={idea} className="border rounded-lg p-4">
                <summary className="font-medium cursor-pointer">💡 La idea central (léela una vez)</summary>
                <pre className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
{`Todo en React gira en torno a ESTADO + EVENTOS:

1. El ESTADO (useState) guarda el dato (texto escrito, saga elegida…).
2. El COMPONENTE lo muestra.
3. Un EVENTO (onChange, onClick) devuelve el nuevo valor al estado.

Ese ciclo — estado → pantalla → evento → estado — es el 90% de
cualquier app. Cada ejemplo es una variación de ese ciclo.`}
                </pre>
            </details>
        </div>
    );
}

export default Inicio;
