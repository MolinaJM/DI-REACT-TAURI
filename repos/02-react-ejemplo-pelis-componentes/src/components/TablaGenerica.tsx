//JMM - Inicio Nuevo con respecto a 15
import type { CSSProperties, ReactNode } from "react";

// Cabecera y celdas alineadas a la izquierda (th va centrado por defecto: descuadra con td)
const TH: CSSProperties = { textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "2px solid #d1d5db" };
const TD: CSSProperties = { textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "1px solid #e5e7eb" };

export interface Columna<T> {
  key: keyof T | string;
  titulo: string;
  render?: (item: T) => ReactNode;
}

interface TablaGenericaProps<T> {
  datos: T[];
  columnas: Columna<T>[];
  keyExtractor: (item: T) => string | number;
}

// Tabla genérica: componentes <T> — §16.5
export function TablaGenerica<T extends Record<string, any>>({datos,columnas, keyExtractor}: TablaGenericaProps<T>) {
  if (datos.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columnas.map((col) => ( 
            <th key={String(col.key)} style={TH}>{col.titulo}</th> 
          ))}{ /*CABECERAS*/}
        </tr>
      </thead>
      <tbody>
        {datos.map((item) => (
          <tr key={keyExtractor(item)}>
            {columnas.map((col) => (
              <td key={String(col.key)} style={TD}> 
                {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")} {/*CELDA*/}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//JMM - Fin Nuevo con respecto a 15
