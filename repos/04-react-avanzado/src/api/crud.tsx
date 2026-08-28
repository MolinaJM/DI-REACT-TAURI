import { useState, useEffect, type FormEvent, type Dispatch, type SetStateAction } from 'react';

// Tipos compartidos
interface Usuario {
    id?: number;
    nombre: string;
    email: string;
    edad: number;
    createdAt?: string;
}

const API_URL = "http://localhost:3001/api/usuarios";

// Obtener todos los usuarios (READ)
const fetchUsuarios = async (setUsuarios: Dispatch<SetStateAction<Usuario[]>>) => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUsuarios(data);
};

// Crear un nuevo usuario (CREATE)
const addUser = async (newUser: Usuario, recargar: () => void) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });
    if (response.ok) recargar();
};

// Actualizar un usuario (UPDATE)
const updateUser = async (id: number, userData: Partial<Usuario>, recargar: () => void) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (response.ok) recargar();
};

// Eliminar un usuario (DELETE)
const deleteUser = async (id: number, recargar: () => void) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) recargar();
};

function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [form, setForm] = useState({ nombre: "", email: "", edad: 0 });
    const [editando, setEditando] = useState<Usuario | null>(null);

    const recargar = () => fetchUsuarios(setUsuarios);

    useEffect(() => { recargar(); }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (editando) {
            await updateUser(editando.id!, form, recargar);
            setEditando(null);
        } else {
            await addUser(form, recargar);
        }
        setForm({ nombre: "", email: "", edad: 0 });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Gestion de Usuarios</h2>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <input placeholder="Nombre" value={form.nombre}
                        onChange={e => setForm({...form, nombre: e.target.value})}
                        className="border rounded p-2" required />
                    <input placeholder="Email" type="email" value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="border rounded p-2" required />
                    <input placeholder="Edad" type="number" value={form.edad}
                        onChange={e => setForm({...form, edad: Number(e.target.value)})}
                        className="border rounded p-2" required />
                </div>
                <button type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    {editando ? "Actualizar" : "Crear"}
                </button>
            </form>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Nombre</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Edad</th>
                        <th className="p-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id} className="border-t">
                            <td className="p-3">{u.id}</td>
                            <td className="p-3">{u.nombre}</td>
                            <td className="p-3">{u.email}</td>
                            <td className="p-3">{u.edad}</td>
                            <td className="p-3 space-x-2">
                                <button onClick={() => { setEditando(u); setForm(u); }}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                                <button onClick={() => deleteUser(u.id!, recargar)}
                                    className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionUsuarios;
