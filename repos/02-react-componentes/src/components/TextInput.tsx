/**
 * TextInput.tsx - Input controlado básico
 * Fuente: Sesión 04 - Controles de formulario
 * El valor vive en el estado del padre; el input solo lo pinta y lo devuelve.
 */
interface TextInputProps {
    label?: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}

function TextInput({ label, value, onChange, type = "text", placeholder, disabled }: TextInputProps) {
    return (
        <label className="block">
            {label && <span className="block text-sm font-medium text-gray-700">{label}</span>}
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={e => onChange(e.target.value)}
                className="border p-2 rounded w-full"
            />
        </label>
    );
}

export default TextInput;
