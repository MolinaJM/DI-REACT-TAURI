import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';

function ComponenteIPC() {
    const [mensaje, setMensaje] = useState("");
    const [resultado, setResultado] = useState<number | null>(null);

    const llamarSaludar = async () => {
        try {
            const response: string = await invoke("saludar", { nombre: "Ana" });
            setMensaje(response);
        } catch (error) {
            console.error("Error IPC:", error);
        }
    };

    const llamarSumar = async () => {
        const res: number = await invoke("sumar", { a: 10, b: 20 });
        setResultado(res);
    };

    return (
        <div className="space-y-4">
            <button onClick={llamarSaludar}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Saludar
            </button>
            {mensaje && <p className="text-green-400">{mensaje}</p>}
            <button onClick={llamarSumar}
                className="bg-green-500 text-white px-4 py-2 rounded ml-2">
                Sumar 10 + 20
            </button>
            {resultado !== null && <p>Resultado: {resultado}</p>}
        </div>
    );
}

export default ComponenteIPC;
