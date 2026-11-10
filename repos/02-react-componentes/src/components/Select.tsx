/**
 * Select.tsx - Desplegable controlado
 * Fuente: Sesión 04 - Controles de formulario
 * Igual que el input: controlado con value + onChange; las opciones se generan con map().
 */
import type { Opcion } from '../types';

interface SelectProps {
    label?: string;
    value: string;
    onChange: (v: string) => void;
    opciones: Opcion[];
}

function Select({ label, value, onChange, opciones }: SelectProps) {
    return (
        <label className="block">
            {label && <span className="block text-sm font-medium text-gray-700">{label}</span>}
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="border p-2 rounded w-full"
            >
                {opciones.map(op => (
                    <option key={op.valor} value={op.valor}>{op.texto}</option>
                ))}
            </select>
        </label>
    );
}

export default Select;
