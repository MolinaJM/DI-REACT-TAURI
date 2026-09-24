//JMM:// ============================================================
//JMM:// BLOQUE 02 — Type Inference
//JMM:// ============================================================

//JMM:// ---------------------------------------------------------------
//JMM:// 1) Variables sin anotación de tipo  ENTONCES  observamos qué infiere TS
//JMM:// ---------------------------------------------------------------
console.log("=== 1) Inferencia básica ===\n");

let nombre = "Ana";
console.log("nombre =", nombre, " ENTONCES  TS infiere:", typeof nombre);
//JMM: TS deduce string sin que le hayamos dicho nada.
//JMM: Si luego intentamos hacer nombre = 42, nos da error. Fijaos que la inferencia es estricta.

let edad = 28;
console.log("edad =", edad, " ENTONCES  TS infiere:", typeof edad);

let esEstudiante = true;
console.log("esEstudiante =", esEstudiante, " ENTONCES  TS infiere:", typeof esEstudiante);

let notaAlgebraica = null;
console.log("notaAlgebraica =", notaAlgebraica, " ENTONCES  TS infiere:", typeof notaAlgebraica);

let sinValor = undefined;
console.log("sinValor =", sinValor, " ENTONCES  TS infiere:", typeof sinValor);

//JMM: Si cambiamos el valor después, TS actualiza la inferencia
//JMM: (siempre que sea compatible con strict mode).

//JMM:// ---------------------------------------------------------------
//JMM:// 2) Array con números y strings mezclados  ENTONCES  ¿qué tipo infiere?
//JMM:// ---------------------------------------------------------------
console.log("\n=== 2) Array heterogéneo ===\n");

let datosMixtos = [42, "Hola", 7, "Mundo"];
console.log("datosMixtos =", datosMixtos);
console.log("Tipo inferido por TS: (string | number)[]");
//JMM: Al mezclar tipos, TS sube a la unión más general.
//JMM: Luego no podrás llamar a .toUpperCase() directamente sin hacer narrowing.
console.log("Primer elemento:", datosMixtos[0], " ENTONCES  tipo:", typeof datosMixtos[0]);
console.log("Segundo elemento:", datosMixtos[1], " ENTONCES  tipo:", typeof datosMixtos[1]);

//JMM:// ---------------------------------------------------------------
//JMM:// 3) const vs let con el mismo literal  ENTONCES  diferencia de inferencia
//JMM:// ---------------------------------------------------------------
console.log("\n=== 3) const vs let ===\n");

const nombreConst = "Carlos";
let nombreLet = "Carlos";

console.log("nombreConst =", nombreConst);
console.log("   ENTONCES  TS infiere literal: 'Carlos' (tipo string literal, no solo string)");
console.log("nombreLet =", nombreLet);
console.log("   ENTONCES  TS infiere: string (puede reasignarse)");

//JMM: En React los props y las constantes de config
//JMM: suelen ser const para que TS las trate como literales exactos.
//JMM: Con let, TS es más permisivo y pierde esa precisión.

//JMM:// ---------------------------------------------------------------
//JMM:// 4) Inferencia contextual con map  ENTONCES  ¿cómo sabe TS el tipo del parámetro?
//JMM:// ---------------------------------------------------------------
console.log("\n=== 4) Inferencia contextual con map ===\n");

let numeros = [1, 2, 3, 4, 5];
//JMM: NO anotamos el tipo de n en la flecha. TS lo deduce de numeros.
let doblados = numeros.map(n => n * 2);
console.log("numeros =", numeros);
console.log("doblados =", doblados);
console.log("Tipo de doblados:", typeof doblados[0], " ENTONCES  TS infiere number[]");

//JMM:// Ahora un ejemplo más real: mapear un array de objetos (como en React)
interface Producto {
  nombre: string;
  precio: number;
}

let productos: Producto[] = [
  { nombre: "Teclado", precio: 49.99 },
  { nombre: "Ratón", precio: 29.99 },
  { nombre: "Monitor", precio: 299.99 },
];

//JMM: TS sabe que p es Producto porque productos es Producto[]
let nombresProductos = productos.map(p => p.nombre);
console.log("\nnombresProductos =", nombresProductos);
console.log("Tipo inferido de p en map: Producto");

//JMM://Y si intentamos acceder a una propiedad que no existe, TS nos avisa:
//JMM:// let error = productos.map(p => p.precioConIva); //  Error: propiedad 'precioConIva' no existe

//JMM: Esta inferencia contextual es la base de los hooks de React.
//JMM: Cuando haces useState([1,2,3]), TS infiere que el estado es number[].
//JMM: Cuando haces lista.map(item => ...), TS sabe que item es del tipo del array.

console.log("\n--- Resumen Bloque 02 ---");
console.log("TS infiere tipos por asignación (inferencia de tipo)");
console.log("const con literales  ENTONCES  tipo literal (ej: 'Carlos' en vez de string)");
console.log("let  ENTONCES  tipo más general (ej: string)");
console.log("map usa inferencia contextual: el tipo del parámetro viene del array");
console.log("Arrays heterogéneos  ENTONCES  unión de tipos (string | number)[]");
