/**
 * Cards.tsx - Vista: Tarjetas de película
 * Fuente: Sesión 04 - El mismo componente Card con distintas formas de mostrar
 * una película (renderiza solo los campos que existen).
 */
import { useState } from 'react';
import CardPelicula from '../components/CardPelicula';
import CardBordePelicula from '../components/CardBordePelicula';
import TablaPeliculas from '../components/TablaPeliculas';
import type { Pelicula } from '../types';

const A_NEW_HOPE: Pelicula = {
    id: 4,
    titulo: 'A New Hope',
    director: 'George Lucas',
    anio: 1977,
    saga: 'Original',
    etiquetas: ['clasica', 'culto'],
};

const SAGA_ORIGINAL: Pelicula[] = [
    { id: 4, titulo: 'A New Hope', director: 'George Lucas', anio: 1977, saga: 'Original' },
    { id: 5, titulo: 'The Empire Strikes Back', director: 'Irvin Kershner', anio: 1980, saga: 'Original' },
    { id: 6, titulo: 'Return of the Jedi', director: 'Richard Marquand', anio: 1983, saga: 'Original' },
];

const FILA_BORDE: Pelicula[] = [
    { id: 4, titulo: 'A New Hope', director: 'George Lucas', anio: 1977, saga: 'Original' },
    { id: 5, titulo: 'The Empire Strikes Back', director: 'Irvin Kershner', anio: 1980, saga: 'Original' },
    { id: 6, titulo: 'Return of the Jedi', director: 'Richard Marquand', anio: 1983, saga: 'Original' },
    { id: 7, titulo: 'The Phantom Menace', director: 'George Lucas', anio: 1999, saga: 'Prequel' },
    { id: 8, titulo: 'Revenge of the Sith', director: 'George Lucas', anio: 2005, saga: 'Prequel' },
];

function Cards() {
    const [accion, setAccion] = useState('');

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold mb-2">Tarjetas de película</h2>
                <p className="text-sm text-gray-500">
                    El mismo componente <code>CardPelicula</code> con distintas formas de mostrar
                    una película: solo se pinta cada campo si existe.
                </p>
            </div>

            {accion && (
                <p className="text-sm bg-blue-50 text-blue-700 rounded p-2">
                    Última acción: {accion}
                </p>
            )}

            <section>
                <h3 className="font-semibold mb-2">1 · Básica (solo título)</h3>
                <CardPelicula p={{ id: 1, titulo: 'A New Hope' }} />
            </section>

            <section>
                <h3 className="font-semibold mb-2">2 · Con director</h3>
                <CardPelicula p={{ id: 2, titulo: 'The Empire Strikes Back', director: 'Irvin Kershner' }} />
            </section>

            <section>
                <h3 className="font-semibold mb-2">3 · Con año y saga</h3>
                <CardPelicula p={{ id: 3, titulo: 'Return of the Jedi', anio: 1983, saga: 'Original' }} />
            </section>

            <section>
                <h3 className="font-semibold mb-2">4 · Con etiquetas</h3>
                <CardPelicula
                    p={{ id: 5, titulo: 'The Phantom Menace', director: 'George Lucas', anio: 1999, etiquetas: ['prequel'] }}
                />
            </section>

            <section>
                <h3 className="font-semibold mb-2">5 · Completa con acciones</h3>
                <CardPelicula
                    p={A_NEW_HOPE}
                    onEditar={p => setAccion(`Editar "${p.titulo}"`)}
                    onEliminar={id => setAccion(`Eliminar id=${id}`)}
                />
            </section>

            <section>
                <h3 className="font-semibold mb-2">6 · Con borde (más vistosa) — 5 en fila</h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {FILA_BORDE.map(p => (
                        <CardBordePelicula key={p.id} p={p} />
                    ))}
                </div>
            </section>

            <section>
                <h3 className="font-semibold mb-2">7 · En tabla (muchas películas)</h3>
                <TablaPeliculas peliculas={SAGA_ORIGINAL} />
            </section>
        </div>
    );
}

export default Cards;
