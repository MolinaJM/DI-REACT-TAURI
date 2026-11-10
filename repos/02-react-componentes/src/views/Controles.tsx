/**
 * Controles.tsx - Vista: Controles de formulario
 * Fuente: Sesión 04 - Controles de formulario
 * Los controles son "dumb": el contenedor guarda el estado (lifting state up).
 */
import ControlesFormulario from '../components/ControlesFormulario';

function Controles() {
    return (
        <div>
            <h2 className="text-xl font-bold mb-3">Controles de formulario</h2>
            <p className="text-sm text-gray-500 mb-4">
                Cada control es un componente "dumb" (sin estado propio). El contenedor
                <code> ControlesFormulario</code> guarda el estado y lo pasa por props.
            </p>
            <ControlesFormulario />
        </div>
    );
}

export default Controles;
