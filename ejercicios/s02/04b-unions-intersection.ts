// ============================================================
// S02 · Ejercicio 4b · Union types e intersección (sin narrowing)
// ============================================================
// Completa. Solución: soluciones/s02/04b-unions-intersection.ts

// 1) Union type: define `ID` como `string | number`
export type Id = unknown; // TODO: string | number

// Función que acepta ID y devuelve su longitud como string
export function obtenerLongitud(id: string | number): string {
  return "TODO";
}

// 2) Intersección de tipos: crea interfaces `Persona` y `Empleado`
export interface Persona {
  nombre: string;
  edad: number;
}

export interface Empleado {
  departamento: string;
  salario: number;
}

// Crea un objeto que cumpla ambas interfaces
export const personaEmpleado: Persona & Empleado = {
  // TODO: completa con nombre, edad, departamento y salario
};

// 3) Union type: función que acepta `string | string[]` y devuelve el primer elemento
export function primerElemento(valor: string | string[]): string {
  return "TODO";
}
