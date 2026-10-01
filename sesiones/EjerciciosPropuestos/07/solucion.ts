//JMM:// ============================================================
//JMM:// BLOQUE 07 - Conversión de Tipos
//JMM:// ============================================================

//JMM:// --- Ejercicio 1: Conversiones explícitas ---

function conversionesBasicas(): void {
  console.log("=== Ejercicio 1: Conversiones explícitas ===");

  //JMM: number  -->  string
  const numero: number = 42;
  const numeroComoTexto: string = String(numero);
  console.log(`number  -->  string: ${numero} (type: ${typeof numero})  -->  "${numeroComoTexto}" (type: ${typeof numeroComoTexto})`);

  //JMM: string  -->  number
  const texto: string = "123";
  const textoComoNumero: number = Number(texto);
  console.log(`string  -->  number: "${texto}" (type: ${typeof texto})  -->  ${textoComoNumero} (type: ${typeof textoComoNumero})`);

  //JMM: string  -->  boolean
  const textoBool: string = "true";
  const textoComoBool: boolean = Boolean(textoBool);
  console.log(`string  -->  boolean: "${textoBool}" (type: ${typeof textoBool})  -->  ${textoComoBool} (type: ${typeof textoComoBool})`);

  console.log();
}

conversionesBasicas();

//JMM:// --- Ejercicio 2: Convertir number  -->  string  -->  boolean  -->  number

function cadenaDeConversiones(): void {
  console.log("=== Ejercicio 2: Cadena de conversiones con String(), Boolean(), Number() ===");

  let valor: number = 7;
  console.log(`Original (number): ${valor} (type: ${typeof valor})`);

  //JMM: number  -->  string con String()
  valor = Number(String(valor)); //JMM: primero a string, luego de vuelta a number
  console.log(`Después de String(): ${valor} (type: ${typeof valor})`);

  //JMM: string  -->  boolean con Boolean()
  //JMM: Ojo: Boolean("7") es true porque cualquier string no vacío es true
  const esNoVacio: boolean = Boolean(String(valor));
  console.log(`Boolean(String(7)): ${esNoVacio} (type: ${typeof esNoVacio})`);

  //JMM: boolean  -->  number con Number()
  //JMM: Number(true) = 1, Number(false) = 0
  const boolComoNumero: number = Number(Boolean(String(valor)));
  console.log(`Number(Boolean("7")): ${boolComoNumero} (type: ${typeof boolComoNumero})`);

  //JMM: Truco: fijaos que Boolean("") es false, pero Boolean("0") es true
  console.log(`Boolean("") = ${Boolean("")}, Boolean("0") = ${Boolean("0")}`);
  console.log("Cuidado: cualquier string no vacío es true, incluso '0' o 'false'.");
  console.log();
}

cadenaDeConversiones();

//JMM:// --- Ejercicio 3: JSON.stringify y JSON.parse con interfaz tipada ---

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}

function jsonConversion(): void {
  console.log("=== Ejercicio 3: JSON.stringify y JSON.parse con interfaz tipada ===");

  const usuario: Usuario = {
    id: 1,
    nombre: "María",
    email: "maria@ejemplo.com",
    activo: true,
  };

  //JMM: Convertir objeto a string JSON (para localStorage, enviar a servidor, etc.)
  const jsonStr: string = JSON.stringify(usuario);
  console.log(`JSON.stringify: ${jsonStr}`);

  //JMM: Convertir string JSON de vuelta a objeto tipado
  //JMM: JSON.parse devuelve any, así que necesitamos un as para tiparlo
  const usuarioRestaurado: Usuario = JSON.parse(jsonStr) as Usuario;
  console.log(`JSON.parse  -->  nombre: ${usuarioRestaurado.nombre}, email: ${usuarioRestaurado.email}`);
  //JMM: Lo correcto aquí hubiera sido usar typeguards

  //JMM: Esto es super útil para persistir datos en localStorage:
  //JMM: localStorage.setItem("usuario", JSON.stringify(usuario));
  //JMM: const guardado = JSON.parse(localStorage.getItem("usuario")!) as Usuario;

  console.log("JSON.stringify convierte objetos a texto; JSON.parse hace lo contrario.");
  console.log("JSON.parse devuelve any, así que hay que usar `as` para tiparlo.");
  console.log();
}

jsonConversion();

//JMM:// --- Ejercicio 4: Función con ?? para valores por defecto ---

function obtenerNombre(usuario: { nombre?: string }): string {
  //JMM: El operador ?? devuelve el valor de la derecha SI la izquierda es null o undefined.
  //JMM: A diferencia de ||, NO trata 0, false o "" como falsy.
  return usuario.nombre ?? "Anónimo";
}

function pruebaNullishCoalescing(): void {
  console.log("=== Ejercicio 4: Función con ?? para valores por defecto ===");

  console.log(`Sin nombre: "${obtenerNombre({})}"`);
  console.log(`Con nombre vacío: "${obtenerNombre({ nombre: "" })}"`);
  console.log(`Con nombre: "${obtenerNombre({ nombre: "Carlos" })}"`);

  //JMM: Fijaos que "" pasa a través de ?? porque no es null ni undefined.
  //JMM: Si quisiéramos tratar "" como vacío, tendríamos que usar || o una condición.
  console.log("?? solo actúa cuando el valor es null o undefined, no cuando es '' o 0.");
  console.log();
}

pruebaNullishCoalescing();

//JMM:// --- Ejercicio 5: Diferencia entre || y ?? con 0 como valor válido ---

function compararOrYDoubleQuestion(): void {
  console.log("=== Ejercicio 5: Diferencia entre || y ?? ===");

  //JMM: Situación: un sistema de puntuación donde 0 es un valor válido (baja puntuación)
  function mostrarPuntuacion(puntuacion: number): string {
    //JMM: Con ||: si puntuacion es 0, usa 50 (¡mal! 0 es válido)
    const puntuacionOr = puntuacion || 50;

    //JMM: Con ??: si puntuacion es 0, se queda 0 (¡correcto! 0 no es null/undefined)
    const puntuacionNullish = puntuacion ?? 50;

    return `||  -->  ${puntuacionOr}, ??  -->  ${puntuacionNullish}`;
  }

  console.log(`Puntuación 5: ${mostrarPuntuacion(5)}`);
  console.log(`Puntuación 0: ${mostrarPuntuacion(0)}`);
  console.log(`Puntuación undefined: ${mostrarPuntuacion(0 as any)}`);

  //JMM: Otro ejemplo con string vacío:
  function mostrarMensaje(texto: string): string {
    return (texto || "(sin mensaje)") ?? "(sin mensaje)";
  }

  console.log(`Texto "Hola": ${mostrarMensaje("Hola")}`);
  console.log(`Texto "": ${mostrarMensaje("")}`);

  console.log("|| trata 0, false, '' como falsy y los reemplaza.");
  console.log("?? solo reemplaza null y undefined. 0, false, '' se mantienen.");
  console.log("Usad ?? cuando 0, false o '' sean valores válidos.");
  console.log();
}

compararOrYDoubleQuestion();
