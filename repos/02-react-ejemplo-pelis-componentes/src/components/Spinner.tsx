//JMM - Inicio Nuevo con respecto a 15

//role="status" es un rol ARIA (Accessible Rich Internet Applications) que indica a las tecnologías de asistencia 
// (como los lectores de pantalla) que el contenido de ese elemento es una región en vivo (live region) de tipo estado.
interface SpinnerProps {
  texto?: string;
}

// Renderizado condicional: loading — §12.1.3
export function Spinner({ texto = "Cargando..." }: SpinnerProps) {
  return(
  <div role="status">
    <img src="/assets/loading.gif" alt="" aria-hidden="true" width={128} height={96} />
    <span>{texto}</span>
  </div>
  );
}

//JMM - Fin Nuevo con respecto a 15
