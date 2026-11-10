/**
 * types.ts - Tipos compartidos de los componentes de formulario
 * Fuente: Sesión 04 - Controles de formulario
 */

export interface Opcion {
    valor: string;
    texto: string;
}

/**
 * Una película (los campos opcionales permiten distintas "formas" de mostrarla).
 */
export interface Pelicula {
    id: number;
    titulo: string;
    director?: string;
    anio?: number;
    saga?: string;
    etiquetas?: string[];
}

/**
 * Una película de Star Wars (SWAPI), solo los campos que usamos.
 */
export interface SwapiFilm {
    title: string;
    episode_id: number;
    director: string;
    release_date: string;
    characters: string[];
}

/**
 * Lista paginada de SWAPI.
 */
export interface SwapiList<T> {
    count: number;
    results: T[];
    next: string | null;
    previous: string | null;
}
