//JMM:// ============================================================
//JMM:// BLOQUE 03 — Tipos Especiales: any, unknown, void, never
//JMM:// ============================================================

//JMM:// ---------------------------------------------------------------
//JMM:// 1) any  ENTONCES  flexibilidad total, cero seguridad
//JMM:// ---------------------------------------------------------------
console.log("=== 1) any ===\n");

let dato: any = "Hola mundo";
console.log("dato =", dato, " ENTONCES  tipo:", typeof dato);

dato = 42;
console.log("dato =", dato, " ENTONCES  ahora es number");

dato = { nombre: "Ana", edad: 28 };
console.log("dato =", dato, " ENTONCES  ahora es object");

//JMM: Con any puedes llamar a lo que sea y TS no se queja.
//JM: Esto es peligroso porque el error saldrá en runtime, no en compile time.
try {
  dato.metodoInexistente();
} catch (e) {
  console.log("Runtime error (como era de esperar con any):", (e as Error).message);
}
//JMM: En compilación:  no hay error (TS confía en ti ciegamente)
//JMM: En runtime:  TypeError: dato.metodoInexistente is not a function

//JMM://Ejemplo realista: datos de una API legacy o JSON sin schema
let respuestaAPI: any = { status: 200, data: [1, 2, 3] };
console.log("\nrespuestaAPI =", respuestaAPI);
console.log("respuestaAPI.data.length =", respuestaAPI.data.length);
//JMM: Con any, puedes hacer lo que quieras... pero también puedes equivocarte sin que TS te avise.

//JMM:// ---------------------------------------------------------------
//JMM:// 2) unknown  ENTONCES  flexible pero seguro
//JMM:// ---------------------------------------------------------------
console.log("\n=== 2) unknown ===\n");

let datoUnknown: unknown = "Hola mundo";
console.log("datoUnknown =", datoUnknown, " ENTONCES  tipo:", typeof datoUnknown);

datoUnknown = 42;
console.log("datoUnknown =", datoUnknown, " ENTONCES  ahora es number");

datoUnknown = { nombre: "Ana", edad: 28 };
console.log("datoUnknown =", datoUnknown, " ENTONCES  ahora es object");

//JMM: Con unknown NO puedes llamar métodos directamente.
//JMM: Primero tienes que verificar el tipo. Esto es la clave de la seguridad.
//JMM: datoUnknown.metodoInexistente(); //  Error: Property 'metodoInexistente' does not exist on type 'unknown'

//JMM://Para usar unknown, necesitas hacer narrowing (type guard):
if (typeof datoUnknown === "string") {
  console.log("Es string, longitud:", datoUnknown.length);
  //JMM: Ahora TS sabe que datoUnknown es string dentro del if
}

if (typeof datoUnknown === "number") {
  console.log("Es number, duplicado:", datoUnknown * 2);
}

if (typeof datoUnknown === "object" && datoUnknown !== null) {
  console.log("Es object, claves:", Object.keys(datoUnknown));
}

//JMM: unknown es any con seguridad. Úsalo cuando no sepas el tipo de entrada
//JMM: (ej: datos de API, JSON parseado, inputs de usuario).

//JMM:// ---------------------------------------------------------------
//JMM:// 3) void  ENTONCES  función que no devuelve nada
//JMM:// ---------------------------------------------------------------
console.log("\n=== 3) void y never ===\n");

function saludar(nombre: string): void {
  console.log(`¡Hola, ${nombre}!`);
  //JMM: No hay return, o return sin valor  ENTONCES  void
}

saludar("Ana");
saludar("Carlos");

//JMM: void significa "no hay valor de retorno".
//JMM: Pero ojo: una función void SÍ puede tener side effects (console.log, modificar DOM, etc.)

//JMM:// ---------------------------------------------------------------
//JMM:// 4) never  ENTONCES  función que nunca devuelve (siempre lanza o bucle infinito)
//JMM:// ---------------------------------------------------------------

function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
  //JMM: Nunca llega aquí, pero TS necesita que el tipo sea never
  //JMM: Si quitamos el throw, TS se queja porque cree que la función podría terminar normalmente
}

try {
  lanzarError("¡Algo salió mal!");
} catch (e) {
  console.log("Error capturado:", (e as Error).message);
}

//JMM: never es útil para:
//JMM: a) Funciones que siempre lanzan (como lanzarError arriba)
//JMM: b) Exhaustiveness checks en switch con union types
//JMM: c) Bucles infinitos (aunque esto es raro en producción)

//JMM:// ---------------------------------------------------------------
//JMM:// 4) logMensaje  ENTONCES  sistema de logging
//JMM:// ---------------------------------------------------------------
console.log("\n=== 4) logMensaje ===\n");

function logMensaje(texto: string): void {
  console.log(`[LOG] ${texto}`);
}

logMensaje("Sistema iniciado");
logMensaje("Usuario Ana conectada");
logMensaje("Petición GET /api/productos recibida");

//JMM:// ---------------------------------------------------------------
//JMM:// 5) lanzarError  ENTONCES  manejador de errores
//JMM:// ---------------------------------------------------------------
console.log("\n=== 5) lanzarError ===\n");

function lanzarErrorSistema(mensaje: string): never {
  throw new Error(mensaje);
}

//JMM://Ejemplo de uso real: validación de datos obligatorios
function validarCampo(valor: string, nombreCampo: string): string {
  if (!valor) {
    lanzarErrorSistema(`El campo '${nombreCampo}' es obligatorio`);
  }
  return valor;
}

try {
  let nombre = validarCampo("Ana", "nombre");
  console.log("nombre válido:", nombre);

  let email = validarCampo("", "email");
  console.log("email válido:", email);
} catch (e) {
  console.log("Error de validación!!");
}

//JMM: any  ENTONCES  flexibilidad total, sin seguridad. Evitar.
//JMM: unknown  ENTONCES  flexibilidad con seguridad. Usar cuando no sepas el tipo.
//JMM: void  ENTONCES  funciones sin retorno (side effects). Muy común.
//JMM: never  ENTONCES  funciones que nunca devuelven (siempre lanzan). Útil para exhaustiveness checks.
