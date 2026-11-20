//JMM - Inicio Nuevo con respecto a 15
interface SpinnerProps {
  texto?: string;
}

// Renderizado condicional: loading — §12.1.3
export function Spinner({ texto = "Cargando…" }: SpinnerProps) {
  return <p role="status">{texto}</p>;
}

//JMM - Fin Nuevo con respecto a 15
