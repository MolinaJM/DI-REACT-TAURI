/**
 * Reloj.tsx - useEffect con setInterval y cleanup
 * Fuente: Sesión 04 - useEffect
 * useEffect = "hacer algo DESPUÉS de renderizar" (efectos secundarios).
 * La función de limpieza es ESENCIAL: evita "fugas" (timers que siguen corriendo).
 */
import { useEffect, useState } from 'react';

function Reloj() {
    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setHora(new Date()), 1000);
        return () => clearInterval(id); // limpieza al desmontar
    }, []);

    return <p>{hora.toLocaleTimeString()}</p>;
}

export default Reloj;
