// ============================================================
// S04 · Ejercicio 4 · SOLUCIÓN
// ============================================================

export interface Usuario {
  id: number;
  nombre: string;
  ciudad: string;
}

// 1) La clave más estable es el `id` (único, no cambia con el nombre)
export function ListaUsuarios({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>
          {u.nombre} · {u.ciudad}
        </li>
      ))}
    </ul>
  );
}

export interface Tarea {
  id: number;
  texto: string;
  hecha: boolean;
}

// 2) y 3) Toggle + renderizado condicional
export function ListaTareas({
  tareas,
  onToggle,
}: {
  tareas: Tarea[];
  onToggle: (id: number) => void;
}) {
  if (tareas.length === 0) return <p>Vacía</p>;
  return (
    <ul>
      {tareas.map((t) => (
        <li key={t.id}>
          <input type="checkbox" checked={t.hecha} onChange={() => onToggle(t.id)} />
          <span className={t.hecha ? "texto-tachado" : undefined}>{t.texto}</span>
        </li>
      ))}
    </ul>
  );
}