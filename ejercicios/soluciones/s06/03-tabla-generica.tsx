// ============================================================
// S06 · Ejercicio 3 · SOLUCIÓN
// ============================================================
import type { ReactNode } from "react";

export interface Columna<T> {
  clave: keyof T;
  titulo: string;
}

function celdaSegura<T>(fila: T, clave: keyof T): ReactNode {
  return fila[clave] as ReactNode;
}

// En .tsx los genéricos necesitan la coma para no confundirse con JSX
export function TablaGenerica<T>({
  filas,
  columnas,
  claveFila,
}: {
  filas: T[];
  columnas: Columna<T>[];
  claveFila: (fila: T) => string | number;
}) {
  if (filas.length === 0) return <p>Sin datos</p>;
  return (
    <table>
      <thead>
        <tr>
          {columnas.map((c) => (
            <th key={String(c.clave)}>{c.titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filas.map((fila) => (
          <tr key={claveFila(fila)}>
            {columnas.map((c) => (
              <td key={String(c.clave)}>{celdaSegura(fila, c.clave)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export interface Alumno {
  id: number;
  nombre: string;
  nota: number;
}
export const alumnos: Alumno[] = [{ id: 1, nombre: "Ana", nota: 8 }];

export function TablaAlumnos() {
  return (
    <TablaGenerica
      filas={alumnos}
      claveFila={(a) => a.id}
      columnas={[
        { clave: "nombre", titulo: "Nombre" },
        { clave: "nota", titulo: "Nota" },
      ]}
    />
  );
}