// ============================================================
// S03 · Ejercicio 4 · Módulos ES · main.ts
// ============================================================
// Completa los otros 3 ficheros y después arregla los imports de aquí.
// Solución completa: soluciones/s03/04-modulos/main.ts

import { sumar, esPar } from "./funciones.js";
import NOMBRE_APP, { VERSION } from "./constantes.js";
import type { Producto } from "./tipos.js"; // TODO: también importa `Estado`

const producto: Producto = { id: 1, nombre: "Ratón", precio: 19.9 };

function formatearProducto(p: Producto): string {
  return `${p.nombre}: ${p.precio.toFixed(2)} €`;
}

console.log(NOMBRE_APP, VERSION);
console.log(sumar(1, 2));
console.log(esPar(4));
console.log(formatearProducto(producto));