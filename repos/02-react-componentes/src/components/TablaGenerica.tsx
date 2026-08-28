/**
 * TablaGenerica.tsx - Componente Tabla Genérica
 * Fuente: Sesión 07 - Creación de Componentes Personalizados
 * Tabla<T> con Columna<T>, keyExtractor, render personalizado
 */
import { ReactNode } from 'react';

interface Columna<T> {
    key: keyof T | string;
    titulo: string;
    render?: (item: T) => ReactNode;
}

interface TablaProps<T> {
    datos: T[];
    columnas: Columna<T>[];
    keyExtractor: (item: T) => string | number;
}

function Tabla<T extends Record<string, any>>({
    datos, columnas, keyExtractor }: TablaProps<T>) {
    if (datos.length === 0) {
        return <div className="text-center py-8 text-gray-500">No hay datos disponibles</div>;
    }

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                    {columnas.map(col => (
                        <th key={String(col.key)}
                            className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                            {col.titulo}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {datos.map(item => (
                    <tr key={keyExtractor(item)} className="border-t hover:bg-gray-50 transition">
                        {columnas.map(col => (
                            <td key={String(col.key)} className="px-4 py-3 text-sm">
                                {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabla;
