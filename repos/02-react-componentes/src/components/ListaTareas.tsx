/**
 * ListaTareas.tsx - useState con TypeScript
 * Fuente: Sesión 04 - useState con TypeScript
 * Lista de tareas completa con agregar/toggle
 */
import { useState } from 'react';

interface Tarea {
    id: number;
    texto: string;
    completada: boolean;
}

function ListaTareas() {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [nuevaTarea, setNuevaTarea] = useState("");

    const agregarTarea = () => {
        if (nuevaTarea.trim() === "") return;
        const tarea: Tarea = {
            id: Date.now(),
            texto: nuevaTarea,
            completada: false
        };
        setTareas([...tareas, tarea]);
        setNuevaTarea("");
    };

    const toggleTarea = (id: number) => {
        setTareas(tareas.map(t =>
            t.id === id ? { ...t, completada: !t.completada } : t
        ));
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="flex gap-2 mb-4">
                <input type="text" value={nuevaTarea}
                    onChange={e => setNuevaTarea(e.target.value)}
                    className="border p-2 flex-1 rounded" />
                <button onClick={agregarTarea}
                    className="bg-green-500 text-white px-4 py-2 rounded">
                    Agregar
                </button>
            </div>
            <ul>
                {tareas.map(tarea => (
                    <li key={tarea.id}
                        onClick={() => toggleTarea(tarea.id)}
                        className={`cursor-pointer p-2 ${tarea.completada ? "line-through text-gray-400" : ""}`}>
                        {tarea.texto}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTareas;
