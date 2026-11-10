/**
 * CardBordePelicula.tsx - Tarjeta de película con borde (más vistosa)
 * Fuente: Sesión 04 - La misma información que CardPelicula, pero con estilo
 *
 * La misma información que la Card básica, pero con un poco de estilo para que
 * sea más VISTOSA: borde, esquinas redondeadas y sombra.
 *   · El estilo va en Tailwind (clases), no dentro de la lógica del componente.
 *   · El componente sigue siendo el mismo: renderiza solo los campos que existen.
 */
import type { Pelicula } from '../types';

interface CardBordePeliculaProps {
    p: Pelicula;
    onEditar?: (p: Pelicula) => void;
    onEliminar?: (id: number) => void;
}

function CardBordePelicula({ p, onEditar, onEliminar }: CardBordePeliculaProps) {
    return (
        <div className="border-2 border-blue-200 rounded-xl p-4 shadow-md bg-white">
            <h3 className="font-semibold text-blue-800">{p.titulo}</h3>
            {p.director && <p className="text-sm text-gray-600">Director: {p.director}</p>}
            {p.anio && <p className="text-sm text-gray-600">Año: {p.anio}</p>}
            {p.saga && <p className="text-sm text-gray-600">Saga: {p.saga}</p>}
            {p.etiquetas && p.etiquetas.length > 0 && (
                <p className="text-sm text-gray-600">Etiquetas: {p.etiquetas.join(', ')}</p>
            )}
            <button
                onClick={() => alert(p.titulo)}
                className="mt-2 text-sm border px-2 py-1 rounded"
            >
                Ver
            </button>
            {onEditar && (
                <button onClick={() => onEditar(p)} className="ml-2 text-blue-600 text-sm">
                    Editar
                </button>
            )}
            {onEliminar && (
                <button onClick={() => onEliminar(p.id)} className="ml-2 text-red-600 text-sm">
                    Eliminar
                </button>
            )}
        </div>
    );
}

export default CardBordePelicula;
