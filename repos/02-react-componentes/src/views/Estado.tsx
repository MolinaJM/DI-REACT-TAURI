/**
 * Estado.tsx - Vista: Gestión de estado
 * Fuente: Sesión 05 - useReducer, formulario controlado con validación
 */
import Contador from '../state/useReducerEjemplo';
import FormularioRegistro from '../state/FormularioRegistro';

function Estado() {
    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-3">useReducer (contador)</h2>
                <p className="text-sm text-gray-500 mb-2">
                    Acciones tipadas como unión discriminada; el reducer es puro.
                </p>
                <Contador />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">Formulario controlado con validación</h2>
                <p className="text-sm text-gray-500 mb-2">
                    Usa el hook <code>useForm</code> (genérico) con <code>SubmitEvent</code> y <code>ChangeEvent</code>.
                </p>
                <FormularioRegistro />
            </section>
        </div>
    );
}

export default Estado;
