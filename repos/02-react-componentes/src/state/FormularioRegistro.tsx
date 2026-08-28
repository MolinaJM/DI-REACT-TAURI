/**
 * FormularioRegistro.tsx - Formulario Controlado con Tipado
 * Fuente: Sesión 05 - Formulario Controlado con Tipado
 * Validación para nombre, email, edad
 */
import { useState } from 'react';

interface FormData {
    nombre: string;
    email: string;
    edad: number | string;
    pais: string;
    terminos: boolean;
}

interface ErroresForm {
    nombre?: string;
    email?: string;
    edad?: string;
}

function FormularioRegistro() {
    const [form, setForm] = useState<FormData>({
        nombre: "",
        email: "",
        edad: "",
        pais: "es",
        terminos: false
    });

    const [errores, setErrores] = useState<ErroresForm>({});

    const validar = (): boolean => {
        const nuevosErrores: ErroresForm = {};
        if (!form.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio";
        }
        if (!form.email.includes("@")) {
            nuevosErrores.email = "Email inválido";
        }
        if (Number(form.edad) < 18) {
            nuevosErrores.edad = "Debes ser mayor de 18 años";
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validar()) {
            console.log("Formulario enviado:", form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
                <label className="block font-medium">Nombre</label>
                <input type="text" name="nombre" value={form.nombre}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
            </div>
            <div>
                <label className="block font-medium">Email</label>
                <input type="email" name="email" value={form.email}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.email && <p className="text-red-500 text-sm">{errores.email}</p>}
            </div>
            <div>
                <label className="block font-medium">Edad</label>
                <input type="number" name="edad" value={form.edad}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.edad && <p className="text-red-500 text-sm">{errores.edad}</p>}
            </div>
            <button type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Registrarse
            </button>
        </form>
    );
}

export default FormularioRegistro;
