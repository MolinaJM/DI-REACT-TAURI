export {};
import type { Estado } from "./tipos.ts";
//JMM: Bloque 10 - Control de Flujo

//JMM: Ejercicio 1 - if/else if/else que clasifica una nota numérica en calificaciones.
function clasificarNota(nota: number): string {
  if (nota >= 9) {
    return "Sobresaliente";
  } else if (nota >= 7) {
    return "Notable";
  } else if (nota >= 5) {
    return "Aprobado";
  } else {
    return "Suspenso";
  }
}

console.log("=== Ejercicio 1: Clasificar notas ===");
console.log("Nota 9.5  ENTONCES ", clasificarNota(9.5));  //JMM:// Sobresaliente
console.log("Nota 8    ENTONCES ", clasificarNota(8));    //JMM:// Notable
console.log("Nota 6    ENTONCES ", clasificarNota(6));    //JMM:// Aprobado
console.log("Nota 4    ENTONCES ", clasificarNota(4));    //JMM:// Suspenso
console.log("Nota 10   ENTONCES ", clasificarNota(10));   //JMM:// Sobresaliente
console.log("Nota 5    ENTONCES ", clasificarNota(5));    //JMM:// Aprobado (el límite cuenta)

//JMM: Ejercicio 2 - manejador de estados HTTP con exhaustiveness check.
//JMM: Los interfaces y el type Estado viven en tipos.ts (modularidad).

function procesarEstado(state: Estado): string {
  switch (state.estado) {
    case "cargando":
      return `Cargando... ${state.progreso}%`;
    case "exito":
      return `Datos recibidos: ${state.datos}`;
    case "error":
      return `Error ${state.codigo}: ${state.mensaje}`;
    case "cancelado":
      return `Cancelado: ${state.razon}`;
    default: {
      //JMM: Esto es importante porque si añadimos un nuevo estado y olvidamos el case,
      //JMM:// el compilador nos avisa gracias al exhaustiveness check.
      const _check: never = state;
      return `Estado desconocido: ${_check}`;
    }
  }
}

console.log("\n=== Ejercicio 2: Switch exhaustivo ===");
console.log(
  procesarEstado({ estado: "cargando", progreso: 45 })
);  //JMM:// Cargando... 45%
console.log(
  procesarEstado({ estado: "exito", datos: "Hola mundo" })
);  //JMM:// Datos recibidos: Hola mundo
console.log(
  procesarEstado({ estado: "error", mensaje: "No encontrado", codigo: 404 })
);  //JMM:// Error 404: No encontrado
console.log(
  procesarEstado({ estado: "cancelado", razon: "timeout" })
);  //JMM:// Cancelado: timeout

//JMM: Ejercicio 3 - recorrer array con for...of y sumar longitudes.
function sumarLongitudes(nombres: string[]): number {
  let total = 0;
  for (const nombre of nombres) {
    total += nombre.length;
  }
  return total;
}

console.log("\n=== Ejercicio 3: Sumar longitudes ===");
const listaNombres = ["Ana", "Carlos", "María", "Pedro"];
console.log("Nombres:", listaNombres);
console.log("Longitud total:", sumarLongitudes(listaNombres));  //JMM:// 3 + 6 + 5 + 5 = 19

