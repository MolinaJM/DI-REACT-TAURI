/**
 * LikeCounter.tsx - Stale closure vs actualización funcional
 * Fuente: Sesión 04 - Closures
 * Un manejador de eventos creado en el render N "ve" el estado del render N.
 * Si usas setTimeout, el manejador puede usar un valor VIEJO (stale closure).
 * La solución: actualización funcional — siempre usa el valor actual.
 */
import { useState } from 'react';

function LikeCounter() {
    const [likes, setLikes] = useState(0);

    // Correcto: actualización funcional, siempre usa el valor actual.
    const like = () => setLikes(l => l + 1);

    // Incorrecto (stale closure): captura el likes de ESTE render.
    // Si lo pulsas dos veces seguidas, el segundo "ve" el valor viejo.
    const likeConRetraso = () => {
        setTimeout(() => setLikes(likes + 1), 800);
    };

    return (
        <div className="space-y-2">
            <p>{likes} likes</p>
            <div className="flex gap-2">
                <button onClick={like} className="border px-3 py-1 rounded">
                    +1 like (correcto)
                </button>
                <button onClick={likeConRetraso} className="border px-3 py-1 rounded">
                    +1 like (con retardo, stale closure)
                </button>
            </div>
        </div>
    );
}

export default LikeCounter;
