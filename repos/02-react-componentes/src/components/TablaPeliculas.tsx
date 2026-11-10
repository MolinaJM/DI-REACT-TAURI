/**
 * TablaPeliculas.tsx - Tabla de películas
 * Fuente: Sesión 04 - Para muchas películas, una tabla se lee mejor que tarjetas
 *
 *   · thead = cabecera, tbody = cuerpo (las filas).
 *   · Cada fila se genera con map(); key es el id de la película.
 *   · p.director || '—' → si el campo no existe, muestra un guion.
 */
import type { Pelicula } from '../types';

interface TablaPeliculasProps {
    peliculas: Pelicula[];
}

function TablaPeliculas({ peliculas }: TablaPeliculasProps) {
    return (
        <table className="w-full text-sm border-collapse">
            <thead>
                <tr className="border-b">
                    <th className="text-left py-2 pr-4">Título</th>
                    <th className="text-left py-2 pr-4">Director</th>
                    <th className="text-left py-2 pr-4">Año</th>
                    <th className="text-left py-2 pr-4">Saga</th>
                </tr>
            </thead>
            <tbody>
                {peliculas.map(p => (
                    <tr key={p.id} className="border-b">
                        <td className="py-2 pr-4">{p.titulo}</td>
                        <td className="py-2 pr-4">{p.director || '—'}</td>
                        <td className="py-2 pr-4">{p.anio || '—'}</td>
                        <td className="py-2 pr-4">{p.saga || '—'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaPeliculas;
