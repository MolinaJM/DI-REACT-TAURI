/**
 * ej2.tsx - Bloque 16, Ejercicio 2: Tabla<T> genérica + tabla de motos con render.
 * El mismo componente sirve para cualquier entidad (aquí, Moto).
 *
 * Lo nuevo: tabla genérica <T> con Columna<T>, keyExtractor y render (§16.5).
 */
import type { ReactNode } from "react";
import type { Moto } from "./tipos";
import datos from "./datos/motos.json";

interface Columna<T> {
  key: keyof T | string;
  titulo: string;
  render?: (item: T) => ReactNode;
}

interface TablaProps<T> {
  datos: T[];
  columnas: Columna<T>[];
  keyExtractor: (item: T) => string | number;
}

export function Tabla<T extends Record<string, any>>({
  datos,
  columnas,
  keyExtractor,
}: TablaProps<T>) {
  if (datos.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columnas.map(col => (
            <th key={String(col.key)}>{col.titulo}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datos.map(item => (
          <tr key={keyExtractor(item)}>
            {columnas.map(col => (
              <td key={String(col.key)}>
                {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Badge de tipo (patrón Record + ?? del bloque 13)
const COLORES_TIPO: Record<string, string> = {
  deportiva: "#d9534f",
  trail: "#5bc0de",
  urbana: "#f0ad4e",
  custom: "#6f42c1",
};

function colorDeTipo(tipo: string): string {
  return COLORES_TIPO[tipo] ?? "#6c757d";
}

//Creamos columnas. 4 primeros NO tienen render. Tipo SÍ
const COLUMNAS_MOTOS: Columna<Moto>[] = [
  { key: "marca", titulo: "Marca" },
  { key: "modelo", titulo: "Modelo" },
  { key: "anio", titulo: "Año" },
  { key: "cilindrada", titulo: "Cilindrada" },
  { key: "tipo", titulo: "Tipo", render: m => (
      <span
        style={{
          backgroundColor: colorDeTipo(m.tipo),
          color: "white",
          padding: "2px 8px",
          borderRadius: 8,
        }}
      > {m.tipo}</span>
    ),
  },
];

export function TablaMotos() {
  return (
    <Tabla<Moto> datos={datos.motos} columnas={COLUMNAS_MOTOS} keyExtractor={m => m.id}/>
  );
}
