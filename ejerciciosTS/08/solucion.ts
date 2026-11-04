export {};
//JMM:// ============================================================
//JMM:// BLOQUE 08 - Operadores
//JMM:// ============================================================

//JMM: --- Ejercicio 1: == vs === con 5 y "5" ---

function compararIgualdad(): void {
  console.log("=== Ejercicio 1: == vs === con 5 y '5' ===");

  const numero = 5;
  const texto = "5";

  console.log(`numero = ${numero} (type: ${typeof numero})`);
  console.log(`texto  = "${texto}" (type: ${typeof texto})`);
  console.log();

  //JMM: == hace coerción de tipos: convierte "5" a 5 antes de comparar
  console.log(`5 == "5"   -->  ${numero == texto}  (coerción: convierte string a number)`);

  //JMM: === NO hace coerción: compara valor Y tipo
  console.log(`5 === "5"  -->  ${numero === texto}  (sin coerción: number != string)`);

  console.log();

  //JMM: Más ejemplos para que lo veáis bien:
  console.log(`0 == false    -->  ${0 == false}   (coerción: 0 se convierte a false)`);
  console.log(`0 === false   -->  ${0 === false}  (sin coerción: number != boolean)`);
  console.log(`"" == 0       -->  ${"" == 0}      (coerción: "" se convierte a 0)`);
  console.log(`"" === 0      -->  ${"" === 0}     (sin coerción: string != number)`);
  console.log(`null == undefined  -->  ${null == undefined}  (¡estos SÍ son iguales con ==!)`);
  console.log(`null === undefined  -->  ${null === undefined} (con === son diferentes)`);

  console.log();
  console.log("Truco: usad siempre === para evitar sorpresas por coerción de tipos.");
  console.log("== puede ser útil cuando queréis explícitamente ignorar el tipo, pero cuidado.");
  console.log();
}

compararIgualdad();

//JMM: --- Ejercicio 2: Operador ternario para asignar valor según condición ---

function estadoUsuario(email: string): void {
  console.log("=== Ejercicio 2: Operador ternario ===");

  //JMM: Situación: mostrar un badge de estado según si el email está verificado
  function obtenerBadge(email: string): string {
    //JMM: Ternario: condición ? valorSiVerdadero : valorSiFalso
    return email.includes("@verificado") ? "Verificado" : "No verificado";
  }

  console.log(`maria@verificado  -->  ${obtenerBadge("maria@verificado")}`);
  console.log(`carlos@gmail.com  -->  ${obtenerBadge("carlos@gmail.com")}`);

  //JMM: Podéis encadenar ternarios, pero ojo, que se lian mucho:
  function obtenerNivel(email: string): string {
    return email.includes("@admin")
      ? "Admin"
      : email.includes("@verificado")
        ? "Verificado"
        : "No verificado";
  }

  console.log(`ana@admin  -->  ${obtenerNivel("ana@admin")}`);
  console.log(`pedro@verificado  -->  ${obtenerNivel("pedro@verificado")}`);
  console.log(`luis@gmail.com  -->  ${obtenerNivel("luis@gmail.com")}`);

  console.log("El ternario es compacto pero si encadenáis mucho, mejor un switch o if/else.");
  console.log();
}

estadoUsuario("");

//JMM: --- Ejercicio 3: Short-circuit evaluation para evitar llamada costosa ---

function logCostoso(mensaje: string): string {
  console.log(`  [LOG COSTOSO] Generando mensaje: "${mensaje}"`);
  return mensaje;
}

function procesarEvento(conDebug: boolean): void {
  console.log("=== Ejercicio 3: Short-circuit evaluation ===");

  console.log("--- conDebug = false ---");
  //JMM: El && corta la evaluación si la primera parte es false.
  //JMM: Si conDebug es false, logCostoso NUNCA se llama.
  conDebug && logCostoso("Detalle del evento procesado");
  console.log("logCostoso no se ejecutó porque conDebug es false.");

  console.log();
  console.log("--- conDebug = true ---");
  conDebug && logCostoso("Detalle del evento procesado");
  console.log("logCostoso SÍ se ejecutó porque conDebug es true.");

  console.log();

  //JMM: También se puede usar con || para un valor por defecto:
  const config = { debug: false };
  const modo = config.debug || false;
  console.log(`config.debug || false  -->  ${modo}`);

  //JMM: Y con ?? para nullish:
  const config2 = { debug: null };
  const modo2 = config2.debug ?? false;
  console.log(`config.debug ?? false  -->  ${modo2}`);

  console.log();
  console.log("Short-circuit con &&: si la primera parte es false, no evalúa la segunda.");
  console.log("Short-circuit con ||: si la primera parte es true, no evalúa la segunda.");
  console.log("Esto es útil para evitar llamadas costosas o errores de null.");
  console.log();
}

procesarEvento(false);
procesarEvento(true);
