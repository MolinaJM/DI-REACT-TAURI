/**
 * FormularioRegistro.tsx - Formulario Controlado con Tipado
 * Fuente: Sesión 05 - Formulario Controlado con Tipado
 * Validación para nombre, email, edad
 * Usa el hook useForm (hooks/useForm.ts)
 */
import { useForm } from '../hooks/useForm';

interface FormData {
    nombre: string;
    email: string;
    edad: number | string;
    pais: string;
    terminos: boolean;
}

type ErroresForm = Partial<Record<keyof FormData, string>>;

function FormularioRegistro() {
    const validar = (valores: FormData): ErroresForm => {
        const nuevosErrores: ErroresForm = {};
        if (!valores.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio";
        }
        if (!valores.email.includes("@")) {
            nuevosErrores.email = "Email inválido";
        }
        if (Number(valores.edad) < 18) {
            nuevosErrores.edad = "Debes ser mayor de 18 años";
        }
        return nuevosErrores;
    };

    const { valores, errores, handleChange, handleSubmit } = useForm<FormData>({
        valoresIniciales: {
            nombre: "",
            email: "",
            edad: "",
            pais: "es",
            terminos: false
        },
        validar,
    });

    return (
        <form onSubmit={handleSubmit((datos) => console.log("Formulario enviado:", datos))}
            className="max-w-md mx-auto space-y-4">
            <div>
                <label className="block font-medium">Nombre</label>
                <input type="text" name="nombre" value={valores.nombre}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
            </div>
            <div>
                <label className="block font-medium">Email</label>
                <input type="email" name="email" value={valores.email}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.email && <p className="text-red-500 text-sm">{errores.email}</p>}
            </div>
            <div>
                <label className="block font-medium">Edad</label>
                <input type="number" name="edad" value={valores.edad}
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