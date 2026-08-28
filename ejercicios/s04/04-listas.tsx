// ============================================================
// S04 · Ejercicio 4 · Renderizado de listas y claves (keys)
// ============================================================
// Solución: soluciones/s04/04-listas.tsx

// 1) `ListaUsuarios`: recibe un array de usuarios y los renderiza en <li>.
//    IMPORTANTE: usa `key` — ¿qué clave es la más estable?
export interface Usuario {
  id: number;
  nombre: string;
  ciudad: string;
}
export function ListaUsuarios({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <ul>
      {/* TODO: <li key={...}>{u.nombre} · {u.ciudad}</li> */}
    </ul>
  );
}

// 2) `ListaTareas`: manten argumentos tipados. Renderiza cada tarea con
//    un checkbox que llama a `onToggle(id)` y el texto tachado si está hecha.
export interface Tarea {
  id: number;
  texto: string;
  hecha: boolean;
}
export function ListaTareas({
  tareas,
  onToggle,
}: {
  tareas: Tarea[];
  onToggle: (id: number) => void;
}) {
  return (
    <ul>
      {/* TODO */}
    </ul>
  );
}

// 3) Renderizado condicional: en ListaTareas usa `hecha` para aplicar el estilo
//    `texto-tachado` (define la clase en tu CSS) y muestra "Vacía" si no hay tareas.