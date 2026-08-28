// ============================================================
// S05 · Ejercicio 3 · Formulario controlado con validación
// ============================================================
// Solución: soluciones/s05/03-formulario.tsx

import { useState } from "react";

export interface DatosFormulario {
  nombre: string;
  email: string;
  password: string;
}
export type ErroresFormulario = Partial<Record<keyof DatosFormulario, string>>;

const inicial: DatosFormulario = { nombre: "", email: "", password: "" };

// 1) `validar(datos)` devuelve ErroresFormulario:
//    - nombre obligatorio (min 2 letras)
//    - email con formato (regex /^\S+@\S+\.\S+$/)
//    - password de al menos 6 caracteres
export function validar(datos: DatosFormulario): ErroresFormulario {
  return {};
}

// 2) Componente: estado `datos`, estado `errores`. Cada input actualiza su
//    campo; al hacer submit se valida y (si no hay errores) se llama a `onEnviar`.
export function FormularioRegistro({ onEnviar }: { onEnviar: (d: DatosFormulario) => void }) {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState<ErroresFormulario>({});
  const [enviado, setEnviado] = useState(false);

  return (
    <form>
      {/* TODO: tres <input> + <span> de error para cada uno + submit */}
      {enviado && <p>¡Enviado!</p>}
    </form>
  );
}