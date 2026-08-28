/**
 * Saludo.tsx - Componente funcional con FC<Props>
 * Fuente: Sesión 04 - Anatomía de Componentes y Funciones con TypeScript
 * Ejemplo de interfaz con nombre/edad
 */
import { FC } from 'react';

interface SaludoProps {
    nombre: string;
    edad?: number;
}

const Saludo: FC<SaludoProps> = ({ nombre, edad }) => {
    return (
        <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="text-xl font-bold">Hola, {nombre}!</h2>
            {edad && <p className="text-gray-600">Edad: {edad} años</p>}
        </div>
    );
};

export default Saludo;
