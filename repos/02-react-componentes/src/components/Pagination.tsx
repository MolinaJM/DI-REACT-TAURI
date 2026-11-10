/**
 * Pagination.tsx - Paginación
 * Fuente: Sesión 04 - Controles de formulario
 * No renderizamos todos los datos: solo una página. El padre le dice cuántos hay,
 * cuántos por página y en qué página estamos.
 */
interface PaginationProps {
    total: number;
    porPagina: number;
    pagina: number;
    onCambiar: (p: number) => void;
}

function Pagination({ total, porPagina, pagina, onCambiar }: PaginationProps) {
    const paginas = Math.max(1, Math.ceil(total / porPagina));
    return (
        <p className="flex items-center gap-2">
            <button
                disabled={pagina <= 1}
                onClick={() => onCambiar(pagina - 1)}
                className="border px-3 py-1 rounded disabled:opacity-40"
            >
                ← Anterior
            </button>
            <span>Página {pagina} de {paginas}</span>
            <button
                disabled={pagina >= paginas}
                onClick={() => onCambiar(pagina + 1)}
                className="border px-3 py-1 rounded disabled:opacity-40"
            >
                Siguiente →
            </button>
        </p>
    );
}

export default Pagination;
