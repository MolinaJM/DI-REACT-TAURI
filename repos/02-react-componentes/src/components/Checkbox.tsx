/**
 * Checkbox.tsx - Grupo de checkboxes (elegir cero o muchas)
 * Fuente: Sesión 04 - Controles de formulario
 * El estado no es un valor sino un array de valores marcados; onChange alterna.
 */
import type { Opcion } from '../types';

interface CheckboxGroupProps {
    label?: string;
    valor: string[];
    onChange: (v: string[]) => void;
    opciones: Opcion[];
}

function CheckboxGroup({ label, valor, onChange, opciones }: CheckboxGroupProps) {
    const marcado = (v: string) => valor.includes(v);
    const alternar = (v: string) =>
        marcado(v) ? valor.filter(x => x !== v) : [...valor, v];

    return (
        <div>
            {label && <span className="block text-sm font-medium text-gray-700">{label}</span>}
            {opciones.map(op => (
                <label key={op.valor} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={marcado(op.valor)}
                        onChange={() => onChange(alternar(op.valor))}
                    />
                    {op.texto}
                </label>
            ))}
        </div>
    );
}

export default CheckboxGroup;
