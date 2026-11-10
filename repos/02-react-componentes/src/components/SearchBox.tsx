/**
 * SearchBox.tsx - Buscador con botón limpiar
 * Fuente: Sesión 04 - Controles de formulario
 * Input con extras: el botón limpiar solo aparece si hay texto.
 */
interface SearchBoxProps {
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
}

function SearchBox({ placeholder, value, onChange }: SearchBoxProps) {
    return (
        <span className="inline-flex items-center gap-2">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="border p-2 rounded"
            />
            {value && (
                <button onClick={() => onChange("")} title="Limpiar"
                    className="text-gray-500 hover:text-gray-800">
                    ✕
                </button>
            )}
        </span>
    );
}

export default SearchBox;
