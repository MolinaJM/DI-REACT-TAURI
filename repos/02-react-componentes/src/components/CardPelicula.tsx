/**
 * CardPelicula.tsx - Tarjeta de película
 * Fuente: Sesión 04 - Renderizar solo los campos que existen
 *
 * La clave: renderiza SOLO los campos que existen, así el mismo componente
 * sirve para distintas "formas" de mostrarla:
 *   <CardPelicula p={{ id: 1, titulo: 'A New Hope' }} />            → básica
 *   <CardPelicula p={{ id: 2, titulo: 'Empire', director: 'Lucas' }} />
 *   <CardPelicula p={p} onEditar={...} onEliminar={...} />         → con acciones
 *   · p.director && <p>…</p> → solo se pinta si el campo existe.
 *   · onEditar / onEliminar opcionales → el componente decide si muestra botones.
 */
import type { Pelicula } from '../types';

interface CardPeliculaProps {
    p: Pelicula;
    onEditar?: (p: Pelicula) => void;
    onEliminar?: (id: number) => void;
}

function CardPelicula({ p, onEditar, onEliminar }: CardPeliculaProps) {
    return (
        <div className="border rounded-lg p-4">
            <h3 className="font-semibold">{p.titulo}</h3>
            {p.director && <p className="text-sm text-gray-600">Director: {p.director}</p>}
            {p.anio && <p className="text-sm text-gray-600">Año: {p.anio}</p>}
            {p.saga && <p className="text-sm text-gray-600">Saga: {p.saga}</p>}
            {p.etiquetas && p.etiquetas.length > 0 && (
                <p className="text-sm text-gray-600">Etiquetas: {p.etiquetas.join(', ')}</p>
            )}
            {onEditar && (
                <button onClick={() => onEditar(p)} className="text-blue-600 text-sm">
                    Editar
                </button>
            )}
            {onEliminar && (
                <button onClick={() => onEliminar(p.id)} className="text-red-600 text-sm ml-3">
                    Eliminar
                </button>
            )}
        </div>
    );
}

export default CardPelicula;
