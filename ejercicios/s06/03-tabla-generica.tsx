// ============================================================
// S06 · Ejercicio 3 · Tabla genérica con TypeScript
// ============================================================
// Solución: soluciones/s06/03-tabla-generica.tsx
// Pista: en ficheros .tsx los genéricos llevan coma: `<T,>`

// 1) Definición de columnas. Una columna sabe cómo leer su celda:
export interface Columna<T> {
  clave: keyof T;
  titulo: string;
}

// 2) `TablaGenerica<T>`: renderiza <table> con <thead> (los títulos de las
//    columnas) y <tbody> (los valores de cada fila: fila[col.clave]).
//    Si `filas` está vacío muestra "Sin datos". Recibe `claveFila` para el key.
export function TablaGenerica<T>(props: { filas: T[]; columnas: Columna<T>[]; claveFila: (fila: T) => string | number }) {
  return <table>Tabla</table>; // TODO
}

// 3) Úsala con un tipo concreto y comprueba que TS infiere las columnas.
//    (Copia el ejemplo descomentándolo al final del fichero.)
/*
export interface Alumno { id: number; nombre: string; nota: number }
export const alumnos: Alumno[] = [{ id: 1, nombre: "Ana", nota: 8 }];
export function TablaAlumnos() {
  return <TablaGenerica filas={alumnos} claveFila={(a) => a.id} columnas={[
    { clave: "nombre", titulo: "Nombre" },
    { clave: "nota", titulo: "Nota" },
  ]} />;
}
*/