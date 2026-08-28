// ============================================================
// S04 · Ejercicio 2 · Componentes funcionales con props
// ============================================================
// Copia a repos/02-react-componentes/src/ejercicios/bienvenida/ y
// muéstralo en App.tsx. Solución: soluciones/s04/02-componentes.tsx

// 1) `Bienvenida`: recibe { nombre: string; edad?: number }.
//    Renderiza "Hola, {nombre}" y, si hay edad, " · {edad} años".
export function Bienvenida(props: { nombre: string; edad?: number }) {
  return <div>{props.nombre}</div>; // TODO
}

// 2) `Etiqueta`: componente de presentación genérico.
//    Recibe { texto: string; color?: string } y un onClick opcional.
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

// 3) `Chip`: union type para `variante` ("exito" | "aviso" | "error")
//    y texto. Devuelve un <span> con clase `chip chip-{variante}`.
export type Variante = "exito" | "aviso" | "error";

// TODO: export function Chip(...)  →  <span className={`chip chip-${variante}`}>{texto}</span>