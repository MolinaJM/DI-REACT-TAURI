// ============================================================
// S04 · Ejercicio 2 · SOLUCIÓN
// ============================================================

// 1) Props con opcional
export function Bienvenida(props: { nombre: string; edad?: number }) {
  return (
    <div>
      Hola, {props.nombre}
      {props.edad !== undefined && ` · ${props.edad} años`}
    </div>
  );
}

// 2) Etiqueta
export interface EtiquetaProps {
  texto: string;
  color?: string;
  onClick?: () => void;
}
export function Etiqueta({ texto, color, onClick }: EtiquetaProps) {
  return (
    <span style={{ backgroundColor: color }} onClick={onClick}>
      {texto}
    </span>
  );
}

// 3) Chip con variante
export type Variante = "exito" | "aviso" | "error";
export function Chip({ variante, texto }: { variante: Variante; texto: string }) {
  return <span className={`chip chip-${variante}`}>{texto}</span>;
}