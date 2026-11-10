/**
 * RadioGroup.tsx - Grupo de radios (elegir una opción)
 * Fuente: Sesión 04 - Controles de formulario
 * Todos los radios comparten el mismo name; el grupo es un solo componente.
 */
import type { Opcion } from '../types';

interface RadioGroupProps {
    label?: string;
    nombre: string;
    valor: string;
    onChange: (v: string) => void;
    opciones: Opcion[];
}

function RadioGroup({ label, nombre, valor, onChange, opciones }: RadioGroupProps) {
    return (
        <div>
            {label && <span className="block text-sm font-medium text-gray-700">{label}</span>}
            {opciones.map(op => (
                <label key={op.valor} className="flex items-center gap-2">
                    <input
                        type="radio"
                        name={nombre}
                        value={op.valor}
                        checked={valor === op.valor}
                        onChange={() => onChange(op.valor)}
                    />
                    {op.texto}
                </label>
            ))}
        </div>
    );
}

export default RadioGroup;
