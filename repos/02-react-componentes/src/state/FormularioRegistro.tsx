/**
 * FormularioRegistro.tsx - Formulario Controlado con Tipado
 * Fuente: Sesión 05 - Formulario Controlado con Tipado
 * Ejemplo completo de todos los controles básicos:
 * text, email, number, select+option, radio, checkbox, textarea,
 * button type="submit" y button type="button"
 * Usa el hook useForm (hooks/useForm.ts)
 */
import { useForm } from '../hooks/useForm';

interface FormData {
    nombre: string;
    email: string;
    edad: number | string;
    pais: string;
    plan: "gratuito" | "premium";
    comentarios: string;
    terminos: boolean;
}

type ErroresForm = Partial<Record<keyof FormData, string>>;

const VALORES_INICIALES: FormData = {
    nombre: "",
    email: "",
    edad: "",
    pais: "es",
    plan: "gratuito",
    comentarios: "",
    terminos: false
};

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
        if (!valores.terminos) {
            nuevosErrores.terminos = "Debes aceptar los términos";
        }
        return nuevosErrores;
    };

    const { valores, errores, handleChange, handleSubmit, setValores } = useForm<FormData>({
        valoresIniciales: VALORES_INICIALES,
        validar,
    });

    return (
        <form onSubmit={handleSubmit((datos) => console.log("Formulario enviado:", datos))}
            className="max-w-md mx-auto space-y-4">
            <div>
                <label htmlFor="nombre" className="block font-medium">Nombre</label>
                <input id="nombre" type="text" name="nombre" value={valores.nombre}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block font-medium">Email</label>
                <input id="email" type="email" name="email" value={valores.email}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.email && <p className="text-red-500 text-sm">{errores.email}</p>}
            </div>
            <div>
                <label htmlFor="edad" className="block font-medium">Edad</label>
                <input id="edad" type="number" name="edad" value={valores.edad}
                    onChange={handleChange} className="w-full border rounded p-2" />
                {errores.edad && <p className="text-red-500 text-sm">{errores.edad}</p>}
            </div>
            <div>
                <label htmlFor="pais" className="block font-medium">País</label>
                <select id="pais" name="pais" value={valores.pais}
                    onChange={handleChange} className="w-full border rounded p-2">
                    <option value="es">España</option>
                    <option value="pt">Portugal</option>
                    <option value="fr">Francia</option>
                </select>
            </div>
            <fieldset>
                <legend className="block font-medium">Plan</legend>
                <span className="mr-4">
                    <input id="plan-gratuito" type="radio" name="plan" value="gratuito"
                        checked={valores.plan === "gratuito"} onChange={handleChange} />
                    <label htmlFor="plan-gratuito"> Gratuito</label>
                </span>
                <span>
                    <input id="plan-premium" type="radio" name="plan" value="premium"
                        checked={valores.plan === "premium"} onChange={handleChange} />
                    <label htmlFor="plan-premium"> Premium</label>
                </span>
            </fieldset>
            <div>
                <label htmlFor="comentarios" className="block font-medium">Comentarios (opcional)</label>
                <textarea id="comentarios" name="comentarios" value={valores.comentarios}
                    onChange={handleChange} rows={3} className="w-full border rounded p-2" />
            </div>
            <div>
                <input id="terminos" type="checkbox" name="terminos"
                    checked={valores.terminos} onChange={handleChange} className="mr-2" />
                <label htmlFor="terminos">Acepto los términos</label>
                {errores.terminos && <p className="text-red-500 text-sm">{errores.terminos}</p>}
            </div>
            <div className="flex gap-2">
                <button type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Registrarse
                </button>
                <button type="button" onClick={() => setValores({ ...VALORES_INICIALES })}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300">
                    Limpiar
                </button>
            </div>
        </form>
    );
}

export default FormularioRegistro;
