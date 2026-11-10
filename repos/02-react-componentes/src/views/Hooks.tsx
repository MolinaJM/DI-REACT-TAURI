/**
 * Hooks.tsx - Vista: useRef, useContext y patrones de estado
 * Fuente: Sesión 04 - useRef, useContext, closures, useEffect
 */
import RenderCounter from '../components/RenderCounter';
import { SagaProvider, SagaBadge, SagaSelector } from '../components/SagaContext';
import LikeCounter from '../components/LikeCounter';
import Reloj from '../components/Reloj';

function Hooks() {
    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-3">useRef (DOM + valor persistente)</h2>
                <p className="text-sm text-gray-500 mb-2">
                    Cambiar <code>ref.current</code> NO re-renderiza el componente.
                </p>
                <RenderCounter />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">useContext (provider + hook custom)</h2>
                <p className="text-sm text-gray-500 mb-2">
                    Pasar datos "abajo por el árbol" sin props en cada nivel.
                </p>
                <SagaProvider>
                    <div className="space-y-2">
                        <SagaBadge />
                        <SagaSelector />
                    </div>
                </SagaProvider>
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">Stale closure vs actualización funcional</h2>
                <p className="text-sm text-gray-500 mb-2">
                    Un manejador creado en el render N "ve" el estado del render N.
                    La solución: <code>setLikes(l =&gt; l + 1)</code>.
                </p>
                <LikeCounter />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-3">useEffect + setInterval + cleanup</h2>
                <p className="text-sm text-gray-500 mb-2">
                    La función de limpieza evita "fugas" (timers que siguen corriendo).
                </p>
                <Reloj />
            </section>
        </div>
    );
}

export default Hooks;
