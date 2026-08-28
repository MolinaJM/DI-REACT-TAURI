/**
 * ListaUsuarios.tsx - useEffect con TypeScript
 * Fuente: Sesión 04 - useEffect con TypeScript
 * Fetch de usuarios desde jsonplaceholder
 */
import { useState, useEffect } from 'react';

interface Usuario {
    id: number;
    name: string;
    email: string;
}

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/users");
                if (!res.ok) throw new Error("Error en la petición");
                const data: Usuario[] = await res.json();
                setUsuarios(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setCargando(false);
            }
        };
        fetchUsuarios();
    }, []);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <ul className="space-y-2">
            {usuarios.map(u => (
                <li key={u.id} className="bg-gray-100 p-3 rounded">
                    <strong>{u.name}</strong> - {u.email}
                </li>
            ))}
        </ul>
    );
}

export default ListaUsuarios;
