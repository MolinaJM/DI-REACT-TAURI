/**
 * Swapi.tsx - Vista: Carga de datos (fetch a la API de Star Wars / SWAPI)
 * Fuente: Sesión 04 - useEffect + fetch con datos reales
 *
 * Ciclo completo con datos REALES:
 *   1. useEffect + fetch → pide la página N de películas a SWAPI.
 *   2. .then(r => r.json()) → parsea la respuesta (tipada con SwapiList).
 *   3. setPeliculas(data.results) → el estado se actualiza y la lista se pinta.
 *   4. Estados de CARGANDO y ERROR → la UI refleja qué está pasando.
 * La limpieza (flag cancelado) evita "fugas" si cambias de página rápido:
 * si la respuesta llega tarde, ya no toca el estado.
 */
import { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import Pagination from '../components/Pagination';
import type { SwapiFilm, SwapiList } from '../types';

const API = 'https://swapi.dev/api/films/';

function Swapi() {
    const [peliculas, setPeliculas] = useState<SwapiFilm[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [pagina, setPagina] = useState(1);
    const [total, setTotal] = useState(0);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        let cancelado = false;
        setCargando(true);
        setError('');
        fetch(`${API}?page=${pagina}`)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data: SwapiList<SwapiFilm>) => {
                if (cancelado) return;
                setPeliculas(data.results);
                setTotal(data.count);
            })
            .catch((e: Error) => {
                if (!cancelado) setError(e.message);
            })
            .finally(() => {
                if (!cancelado) setCargando(false);
            });
        return () => { cancelado = true; };
    }, [pagina]);

    const filtradas = busqueda
        ? peliculas.filter(p => p.title.toLowerCase().includes(busqueda.toLowerCase()))
        : peliculas;

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-bold mb-2">Películas de Star Wars (SWAPI)</h2>
                <p className="text-sm text-gray-500">
                    <code>useEffect</code> + <code>fetch</code> a una API real, con los tres estados
                    (cargando / error / datos) y limpieza para evitar "fugas".
                </p>
            </div>

            <SearchBox placeholder="Filtrar por título…" value={busqueda} onChange={setBusqueda} />

            {cargando && <p className="text-gray-500">Cargando…</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!cargando && !error && (
                <>
                    <ul className="space-y-2">
                        {filtradas.map(p => (
                            <li key={p.episode_id} className="bg-gray-100 p-3 rounded">
                                <strong>{p.title}</strong>
                                <span className="text-gray-600"> — {p.director}</span>
                                <span className="text-gray-400"> ({p.release_date.slice(0, 4)})</span>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        total={total}
                        porPagina={peliculas.length || 1}
                        pagina={pagina}
                        onCambiar={setPagina}
                    />
                </>
            )}
        </div>
    );
}

export default Swapi;
