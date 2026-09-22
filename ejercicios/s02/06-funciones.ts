// ============================================================
// S02 · Ejercicio 6 · Funciones en profundidad
// ============================================================
// Completa. Solución: soluciones/s02/06-funciones.ts

// 1) Parámetros obligatorios con tipo de retorno
export function saludar(nombre: string, edad: number): string {
  return ""; // TODO: `Hola, soy ${nombre} y tengo ${edad} anios`
}

// 2) Parámetro opcional y parámetro por defecto
export function configurarURL(base: string, puerto?: number): string {
  return ""; // TODO: si puerto → `${base}:${puerto}`, si no → base
}
export function crearUsuario(nombre: string, activo: boolean = true): { nombre: string; activo: boolean } {
  return { nombre: "", activo: false }; // TODO
}

// 3) Rest parameters: suma todos los números
export function sumarTodo(...numeros: number[]): number {
  return 0;
}

// 4) Callback tipado: ejecuta `operacion` sobre a y b
export function ejecutarOperacion(
  a: number,
  b: number,
  operacion: (x: number, y: number) => number
): number {
  return 0;
}

// 5) Closures: `crearMultiplicador(factor)` devuelve `(valor) => valor * factor`
export function crearMultiplicador(factor: number): (valor: number) => number {
  return (_valor) => 0;
}

// 6) Function overloads: `procesarEntrada(string) -> string[]`, `(number) -> number[]`
export function procesarEntrada(x: string): string[];
export function procesarEntrada(x: number): number[];
export function procesarEntrada(x: string | number): string[] | number[] {
  if (typeof x === "string") return x.split("");
  return Array.from({ length: x }, (_, i) => i + 1);
}