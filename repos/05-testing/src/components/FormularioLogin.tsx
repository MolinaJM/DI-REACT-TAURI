import { FormEvent } from 'react';
import useForm from '../hooks/useForm';

interface FormularioLoginProps {
    onSubmit?: (values: { usuario: string; password: string }) => void;
}

export default function FormularioLogin({ onSubmit }: FormularioLoginProps) {
    const { values, errors, handleChange, handleSubmit } = useForm(
        { usuario: '', password: '' },
        (vals) => {
            const errs: Record<string, string> = {};
            if (!vals.usuario) errs.usuario = 'El nombre es obligatorio';
            if (!vals.password) errs.password = 'La contrasenia es obligatoria';
            return errs;
        }
    );

    const onSubmitHandler = (e: FormEvent) => {
        handleSubmit(e, () => {
            onSubmit?.({ usuario: values.usuario, password: values.password });
        });
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="usuario">Usuario</label>
                <input
                    id="usuario"
                    name="usuario"
                    value={values.usuario}
                    onChange={handleChange}
                />
                {errors.usuario && <span>{errors.usuario}</span>}
            </div>
            <div>
                <label htmlFor="password">Contrasenia</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>
            <button type="submit">Iniciar Sesion</button>
        </form>
    );
}
