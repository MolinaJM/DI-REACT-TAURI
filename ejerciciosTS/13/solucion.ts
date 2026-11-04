export {};
//JMM: Bloque 13 - Arrays y Tuplas

//JMM:// Ejercicio 1: Arrays de diferentes tipos
const numeros: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ["hola", "mundo", "typescript"];
const mixto: (string | number)[] = ["texto", 42, "otro", 100];

console.log("Ejercicio 1 - Arrays de diferentes tipos:");
console.log("Números:", numeros);
console.log("Strings:", strings);
console.log("Mixto:", mixto);

//JMM:// Ejercicio 2: Tupla con datos de usuario y desestructuración
const usuario: [string, number, boolean] = ["Ana", 28, true];
const [nombre, edad, activo] = usuario;

console.log("\nEjercicio 2 - Tupla desestructurada:");
console.log("Nombre:", nombre, "- Edad:", edad, "- Activo:", activo);

//JMM:// Ejercicio 3: Tupla etiquetada y readonly array
const coordenada: [lat: number, lng: number] = [40.4168, -3.7038]; //No puedo asignar una tupla, pero sí cambiar su contenido
let readonlyNumeros: readonly number[] = [10, 20, 30, 40];//incluso si es let, no puedo modificar!!
coordenada[0]=38; //Pero sí se puede por índice
coordenada[1]=-5; //Pero sí se puede por índice
/* coordenada = [37.3891, -5.9844]; //No podemos asignanado una nueva tupla porque es const
coordenada.lat = 38.3891; // Tuplas etiquetadas solo valen para autocompletar y documentar, pero no permiten la modificación
readonlyNumeros[0] = 99; //Error: Index signature... only permits reading
 */console.log("Coordenada es "+coordenada);

//JMM:// Ejercicio 4: Función que recibe un array readonly y suma accediendo por índice
function sumarReadonly(arr: readonly number[]): number {
  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    suma += arr[i];
  }
  return suma;
}

console.log("\nEjercicio 4 - Suma de array readonly:");
console.log("Suma:", sumarReadonly([1, 2, 3, 4, 5]));

//JMM:// Ejercicio 5: Tupla Coordenadas2D y función moverPunto
type Coordenadas2D = [x: number, y: number];

function moverPunto(tupla: Coordenadas2D, dx: number, dy: number): Coordenadas2D {
  return [tupla[0] + dx, tupla[1] + dy];
}

console.log("\nEjercicio 5 - Mover punto en plano 2D:");
const puntoInicial: Coordenadas2D = [0, 0];
console.log("Punto inicial:", puntoInicial);
const puntoMovido = moverPunto(puntoInicial, 5, 3);
console.log("Punto después de mover(5, 3):", puntoMovido);

//JMM:// Ejercicio 6: Array con sintaxis genérica explícita
const ciudades: Array<string> = ["Madrid", "Paris", "Tokio"];
//const ciudades: string[] = ["Madrid", "Paris", "Tokio"];

console.log("\nEjercicio 6 - Array con sintaxis Array<T>:");
console.log("Ciudades:", ciudades);

//JMM:// Ejercicio 7: Array de boolean | number
const respuestas: (boolean | number)[] = [true, 42, false, 0, true, 100];

console.log("\nEjercicio 7 - Array boolean | number:");
console.log("Respuestas:", respuestas);

//JMM:// Ejercicio 8: Tupla RespuestaHTTP con campo opcional
type RespuestaHTTP = [statusCode: number, errorMessage?: string];

const respuestaOk: RespuestaHTTP = [200];
const respuestaError: RespuestaHTTP = [404, "Página no encontrada"];
const respuestaServerError: RespuestaHTTP = [500, "Error interno del servidor"];

console.log("\nEjercicio 8 - Tupla RespuestaHTTP:");
console.log("OK:", respuestaOk);
console.log("Error 404:", respuestaError);
console.log("Error 500:", respuestaServerError);

//JMM:// Ejercicio 9: Readonly tuple y intento de modificación
const puntoCartesiano: readonly [number, number] = [10, 20];

console.log("\nEjercicio 9 - Readonly tuple:");
console.log("Punto cartesiano:", puntoCartesiano);
console.log("Intentando modificar... (esto da error de compilación)");
//JMM: Esta línea da error de compilación:
/* puntoCartesiano[0] = 15; // Error: Cannot assign to '0' because it is a read-only property.
 */console.log("El error impide la compilación. El punto sigue siendo:", puntoCartesiano);

//JMM:// Ejercicio 10: Desestructuración con tipos explícitos
const usuario2: [number, string, boolean] = [1, "Ana", true];
const [idUsuario, nombreUsuario, activoUsuario]: [number, string, boolean] = usuario2;

console.log("\nEjercicio 10 - Desestructuración con tipos explícitos:");
console.log("idUsuario:", idUsuario, "- tipo:", typeof idUsuario);
console.log("nombreUsuario:", nombreUsuario, "- tipo:", typeof nombreUsuario);
console.log("activoUsuario:", activoUsuario, "- tipo:", typeof activoUsuario);
