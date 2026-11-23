//JMM - Inicio Nuevo con respecto a 15
import type { CSSProperties, ReactNode } from "react";

// Cabecera y celdas alineadas a la izquierda (th va centrado por defecto: descuadra con td)
const TH: CSSProperties = { textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "2px solid #d1d5db" };
const TD: CSSProperties = { textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "1px solid #e5e7eb" };

export interface Columna<T> {
  key: keyof T | string;
  titulo: string;
  render?: (item: T) => ReactNode;//render determina CÓMO se pinta una columna.
    /* el render es modificable  
    render: (fila) => fila.genero.toUpperCase()

    La tabla también es ampliable:
    p. ej. align?: 'left' | 'center' | 'right'; className?: string; 
         
    */
}

interface TablaProps<T> {
  datos: T[];
  columnas: Columna<T>[];
  keyExtractor: (item: T) => string | number; //Extractor de propiedades
      /* modificable: p. ejempls 
    mensajeVacio?: ReactNode; 
    onFilaClick?: (item: T) => void; 
    */
}

// Tabla genérica: componentes <T> — §16.5
export function TablaGenerica<T extends Record<string, any>>({datos,columnas, keyExtractor}: TablaProps<T>) {
  if (datos.length === 0) {
    return <div >No hay datos disponibles</div>; {/*DIV modificable mediante CSS o con TSX*/}
  }

  /*Cualquier etiqueta es Modificable en la tabla genérica, mediante style directo/ClassName o TSX*/
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
