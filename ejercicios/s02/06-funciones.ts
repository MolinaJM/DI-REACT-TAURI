// ============================================================
// S02 · Ejercicio 6 · Funciones en profundidad
// ============================================================
// Completa. Solución: soluciones/s02/06-funciones.ts

// 1) Parámetros obligatorios con tipo de retorno
function saludar(nombre: string, edad: number): string {
  return ""; // TODO: `Hola, soy ${nombre} y tengo ${edad} anios`
}

// 2) Parámetro opcional y parámetro por defecto
function configurarURL(base: string, puerto?: number): string {
  return ""; // TODO: si puerto → `${base}:${puerto}`, si no → base
}
function crearUsuario(nombre: string, activo: boolean = true): { nombre: string; activo: boolean } {
  return { nombre: "", activo: false }; // TODO
}

// 3) Rest parameters: suma todos los números
function sumarTodo(...numeros: number[]): number {
  return 0;
}

// 4) Callback tipado: ejecuta `operacion` sobre a y b
function ejecutarOperacion(
  a: number,
  b: number,
  operacion: (x: number, y: number) => number
): number {
  return 0;
}

// 5) Closures: `crearMultiplicador(factor)` devuelve `(valor) => valor * factor`
function crearMultiplicador(factor: number): (valor: number) => number {
  return (_valor) => 0;
}

// 6) Function overloads: `procesarEntrada(string) -> string[]`, `(number) -> number[]`
function procesarEntrada(x: string): string[];
function procesarEntrada(x: number): number[];
function procesarEntrada(x: string | number): string[] | number[] {
  if (typeof x === "string") return x.split("");
  return Array.from({ length: x }, (_, i) => i + 1);
}