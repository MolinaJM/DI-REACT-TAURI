// ============================================================
// S05 · Ejercicio 3 · SOLUCIÓN
// ============================================================
import { useState } from "react";
import type { FormEvent } from "react";

export interface DatosFormulario {
  nombre: string;
  email: string;
  password: string;
}
export type ErroresFormulario = Partial<Record<keyof DatosFormulario, string>>;

const inicial: DatosFormulario = { nombre: "", email: "", password: "" };

// 1) Validación (función pura → fácil de testear)
export function validar(datos: DatosFormulario): ErroresFormulario {
  const errores: ErroresFormulario = {};
  if (datos.nombre.trim().length < 2) errores.nombre = "Nombre de al menos 2 letras";
  if (!/^\S+@\S+\.\S+$/.test(datos.email)) errores.email = "Email con formato válido";
  if (datos.password.length < 6) errores.password = "Mínimo 6 caracteres";
  return errores;
}

// 2) Formulario controlado
export function FormularioRegistro({ onEnviar }: { onEnviar: (d: DatosFormulario) => void }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [enviado, setEnviado] = useState(false);

  function actualizar(campo: keyof DatosFormulario, valor: string) {
    setDatos((d) => ({ ...d, [campo]: valor }));
  }

  function manejarSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const nuevos = validar(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      onEnviar(datos);
      setEnviado(true);
    }
  }

  return (
    <form onSubmit={manejarSubmit} noValidate>
      <div>
        <label>Nombre
          <input value={datos.nombre} onChange={(e) => actualizar("nombre", e.target.value)} />
        </label>
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>
      <div>
        <label>Email
          <input type="email" value={datos.email} onChange={(e) => actualizar("email", e.target.value)} />
        </label>
        {errores.email && <span className="error">{errores.email}</span>}
      </div>
      <div>
        <label>Password
          <input type="password" value={datos.password} onChange={(e) => actualizar("password", e.target.value)} />
        </label>
        {errores.password && <span className="error">{errores.password}</span>}
      </div>
      <button type="submit">Enviar</button>
      {enviado && <p>¡Enviado!</p>}
    </form>
  );
}