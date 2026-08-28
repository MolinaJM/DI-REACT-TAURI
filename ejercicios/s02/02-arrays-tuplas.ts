// ============================================================
// S02 · Ejercicio 2 · Arrays, tuplas y readonly
// ============================================================
// Completa el código. Solución: soluciones/s02/02-arrays-tuplas.ts

// 1) Declara un array de números con sintaxis `number[]` y otro con `Array<number>`, y una matriz 2D
export const numeros: unknown[] = []; // TODO: number[]
export const edades: unknown[] = []; // TODO: Array<number>
export const matriz: unknown[][] = []; // TODO: number[][]

// 2) Usa métodos con tipos: duplica cada número, filtra pares, suma el total
export const duplicados: unknown = numeros; // TODO: numeros.map(n => n * 2)
export const pares: unknown = numeros; // TODO: numeros.filter(n => n % 2 === 0)
export const total: unknown = numeros; // TODO: numeros.reduce((acc, n) => acc + n, 0)

// 3) Tupla: una coordenada [number, number] y un usuario [number, string, boolean]
export const coordenada: unknown[] = []; // TODO: [number, number]
export const usuario: unknown[] = []; // TODO: [number, string, boolean]

// 4) Desestructura la tupla `usuario` en id, nombreUsuario, activo
export const id: unknown = undefined; // TODO
export const nombreUsuario: unknown = undefined; // TODO
export const activo: unknown = undefined; // TODO

// 5) Array de solo lectura: define `inamovible` como readonly number[]
export const inamovible: unknown[] = []; // TODO: readonly number[]