import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';
import { useEffect, useState } from 'react';

function EventosTauri() {
    const [progreso, setProgreso] = useState(0);
    const [estado, setEstado] = useState("idle");

    useEffect(() => {
        let unlisten: UnlistenFn | undefined;

        // Escucha (desde el frontend) el evento "progreso" que emite Rust
        const setup = async () => {
            unlisten = await listen<number>("progreso", (event) => {
                setProgreso(event.payload);
                setEstado(event.payload >= 100 ? "completado" : "en-proceso");
            });
        };

        void setup();
        return () => {
            if (unlisten) unlisten();
        };
    }, []);

    const iniciar = async () => {
        setProgreso(0);
        setEstado("en-proceso");
        try {
            await invoke("tarea_larga");
        } catch (error) {
            console.error("Error ejecutando tarea:", error);
            setEstado("error");
        }
    };

    return (
        <div className="space-y-4">
            <button onClick={iniciar} disabled={estado === "en-proceso"}
                className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50">
                Iniciar tarea larga
            </button>

            <div className="w-full bg-gray-700 rounded h-4 overflow-hidden">
                <div
                    className={`h-full transition-all ${progreso >= 100 ? "bg-green-500" : "bg-purple-400"}`}
                    style={{ width: `${progreso}%` }}
                />
            </div>

            <p>
                Progreso: {progreso}%{" "}
                {estado === "completado" && <span className="text-green-400">- ¡Finalizada!</span>}
                {estado === "error" && <span className="text-red-400">- Error</span>}
            </p>
        </div>
    );
}

export default EventosTauri;