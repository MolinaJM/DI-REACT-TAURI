//JMM:// ============================================================
//JMM:// BLOQUE 01 — Tipos Primitivos
//JMM:// ============================================================

//JMM:// ---------------------------------------------------------------
//JMM:// 1) Perfil de usuario  ENTONCES  variables primitivas reales
//JMM:// ---------------------------------------------------------------
console.log("=== 1) Perfil de usuario ===\n");

const nombre: string = "Ana García";
const edad: number = 28;
const activo: boolean = true;
const fotoPerfil: null = null;
const ultimaConexion: undefined = undefined;

console.log("Nombre:", nombre, " ENTONCES  tipo:", typeof nombre);
console.log("Edad:", edad, " ENTONCES  tipo:", typeof edad);
console.log("Activo:", activo, " ENTONCES  tipo:", typeof activo);
console.log("Foto perfil:", fotoPerfil, " ENTONCES  tipo:", typeof fotoPerfil);
console.log("Última conexión:", ultimaConexion, " ENTONCES  tipo:", typeof ultimaConexion);

//JMM: string, number, boolean, null, undefined son los 5 primitivos de TS.
//JMM: null y undefined son tipos únicos, no se pueden mezclar con otros.
//JMM: En React, null es muy común para "no hay dato aún" (loading state).

//JMM:// ---------------------------------------------------------------
//JMM:// 2) Reasignación incompatible  ENTONCES  error de TS
//JMM:// ---------------------------------------------------------------
console.log("\n=== 2) Reasignación incompatible ===\n");

let numero = 42;
console.log("numero =", numero, " ENTONCES  TS infiere: number");

//JMM: Si intentamos hacer numero = "hola", TS da error en compile time:
//JMM:  Cannot assign to 'numero' because it is a constant. o
//JMM:  Type 'string' is not assignable to type 'number'.
//JMM: Fijaos que TS protege contra este error ANTES de ejecutar.
console.log("Intentar numero = 'hola'  ENTONCES  TS error: Type 'string' is not assignable to type 'number'");

//JMM:// ---------------------------------------------------------------
//JMM:// 3) Tipado explícito vs inferencia  ENTONCES  ¿qué diferencia?
//JMM:// ---------------------------------------------------------------
console.log("\n=== 3) Tipado explícito vs inferencia ===\n");

const precio: number = 99.99;
const activo2 = true;

console.log("precio =", precio, " ENTONCES  tipo explícito: number");
console.log("activo =", activo2, " ENTONCES  tipo inferido: boolean");

//JMM: precio: number = 99.99  ENTONCES  TS exige que sea number SIEMPRE.
//JMM: activo = true  ENTONCES  TS infiere boolean, pero si luego hago activo = "si", TS da error.
//JMM: La diferencia es clara: con anotación explícita, el contrato es visible para quien lea el código.
//JMM: Con inferencia, TS lo deduce pero no queda explícito.
//JMM: En React, se usa inferencia cuando es obvio y explícito cuando no.

//JMM:// ---------------------------------------------------------------
//JMM:// 4) Estructura de perfil con tipos explícitos  ENTONCES  array de números
//JMM:// ---------------------------------------------------------------
console.log("\n=== 4) Estructura de perfil ===\n");

const miNombre: string = "Carlos";
const miEdad: number = 30;
const aprendiendoTS: boolean = true;
const numerosFavoritos: number[] = [7, 23, 42];

console.log("Nombre:", miNombre, " ENTONCES  tipo:", typeof miNombre);
console.log("Edad:", miEdad, " ENTONCES  tipo:", typeof miEdad);
console.log("Aprendiendo TS:", aprendiendoTS, " ENTONCES  tipo:", typeof aprendiendoTS);
console.log("Números favoritos:", numerosFavoritos, " ENTONCES  tipo:", typeof numerosFavoritos, " con elementos:", numerosFavoritos.length);

//JMM: number[] es la sintaxis de array de números.
//JMM: También se puede escribir Array<number>, pero number[] es más común en TS.
//JMM: En React, los arrays se usan para listas de elementos, datos de tablas, etc.

//JMM:// ---------------------------------------------------------------
//JMM:// 5) Template literal para nombre completo  ENTONCES  interpolación
//JMM:// ---------------------------------------------------------------
console.log("\n=== 5) Template literal ===\n");

const nombreP: string = "Ana";
const apellidoP: string = "Martínez";
const nombreCompleto = `${nombreP} ${apellidoP}`;

console.log("nombre:", nombreP, " ENTONCES  tipo:", typeof nombreP);
console.log("apellido:", apellidoP, " ENTONCES  tipo:", typeof apellidoP);
console.log("nombreCompleto:", nombreCompleto, " ENTONCES  tipo:", typeof nombreCompleto);

//JMM: Las template literals (backticks) permiten interpolación de variables con ${}.
//JMM: TS infiere que nombreCompleto es string.
//JMM: En React, se usan mucho en JSX: <p>{nombreCompleto}</p>

//JMM:// ---------------------------------------------------------------
//JMM:// 6) longitudTexto  ENTONCES  función que cuenta dígitos
//JMM:// ---------------------------------------------------------------
console.log("\n=== 6) longitudTexto ===\n");

function longitudTexto(numero: number): number {
  return String(numero).length;
  //JMM: Convertimos el número a string y usamos .length para contar caracteres.
  //JMM: Esto cuenta todos los dígitos, incluyendo el signo negativo si lo hay.
}

console.log("longitudTexto(42) =", longitudTexto(42), " ENTONCES  42 tiene 2 dígitos");
console.log("longitudTexto(12345) =", longitudTexto(12345), " ENTONCES  12345 tiene 5 dígitos");
console.log("longitudTexto(-789) =", longitudTexto(-789), " ENTONCES  -789 tiene 4 caracteres (incluye el signo)");

//JMM: String(numero) convierte el número a string.
//JMM: .length devuelve el número de caracteres.
//JMM: Si el número es negativo, el signo '-' también se cuenta.
//JMM: En React, esta función podría usarse para validar longitud de campos numéricos.

//JMM:// ---------------------------------------------------------------
//JMM:// Resumen de tipos primitivos
//JMM:// ---------------------------------------------------------------
console.log("\n--- Resumen Bloque 01 ---");
console.log("string  ENTONCES  texto: 'hola', `template ${variable}`");
console.log("number  ENTONCES  números: 42, 3.14, -7");
console.log("boolean  ENTONCES  true / false");
console.log("null  ENTONCES  ausencia intencional de valor");
console.log("undefined  ENTONCES  variable sin asignar");
console.log("number[]  ENTONCES  array de números: [1, 2, 3]");
console.log("String(numero)  ENTONCES  convierte número a string");
console.log("Tipado explícito  ENTONCES  contrato visible: const x: number = 5");
console.log("Inferencia  ENTONCES  TS deduce: const x = 5  ENTONCES  number");
