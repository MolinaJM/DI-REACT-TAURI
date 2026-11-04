export {};
//JMM:// ============================================================
//JMM:// BLOQUE 09 - Funciones en Profundidad
//JMM:// ============================================================

//JMM:// --- Ejercicio 1: Parámetro obligatorio, opcional y con default ---

interface ConfigProducto {
  nombre: string;
  precio: number;
  categoria?: string; //JMM: opcional (puede ser undefined)
  descuento?: number;
}

function crearProducto( nombre: string, precio: number, categoria?: string, descuento: number = 0        
): ConfigProducto {
  return { nombre, precio, categoria, descuento };
}

function probarParametros(): void {
  console.log("=== Ejercicio 1: Parámetros obligatorios, opcionales y con default ===");

  const p1 = crearProducto("Teclado", 59.99, "perifericos", 0.1);
  console.log(`Producto 1: ${JSON.stringify(p1)}`); //SERIALIZAMOS

  const p2 = crearProducto("Ratón", 29.99, "perifericos");
  console.log(`Producto 2: ${JSON.stringify(p2)}`);

  //JMM: Sin categoría ni descuento (ambos opcionales / con default)
  const p3 = crearProducto("Monitor", 199);
  console.log(`Producto 3: ${JSON.stringify(p3)}`);

  console.log();
  console.log("Obligatorio: hay que pasarlo. Opcional: puede faltar (undefined). Default: si no se pasa, usa el valor.");
  console.log("Orden: siempre obligatorios primero, luego opcionales, luego con default.");
  console.log();
}

probarParametros();
console.log("\n\n");

//JMM:// --- Ejercicio 2: Rest parameters para sumar precios ---

function sumarPrecios(...precios: number[]): number {
  let total = 0;
  for (const precio of precios) {
    total += precio;
  }
  return total;
}


function probarRestParams(): void {
  console.log("=== Ejercicio 2: Rest parameters ===");

  const carrito1 = [19.99, 59.99, 9.99, 149.99];
  console.log(`Carrito 1: ${sumarPrecios(...carrito1)} €`);

  const carrito2 = [5.50, 3.20];
  console.log(`Carrito 2: ${sumarPrecios(...carrito2)} €`);

  console.log(`Sin productos: ${sumarPrecios()} €`);

  console.log();
  console.log("...precios: recorre un número variable de argumentos como un array.");
  console.log("Podéis pasar 0, 1, o N argumentos y siempre funciona.");
  console.log();
}

probarRestParams();
console.log("\n\n");

//JMM:// --- Ejercicio 3: calcularTotal con impuesto ---

function calcularTotal(precioBase: number, impuesto: number = 0.21): number {
  return precioBase + precioBase * impuesto;
}

function probarCalcularTotal(): void {
  console.log("=== Ejercicio 3: calcularTotal con impuesto ===");

  console.log(`Producto 100€ (IVA 21%): ${calcularTotal(100)} €`);
  console.log(`Producto 100€ (IVA 10%): ${calcularTotal(100, 0.10)} €`);
  console.log(`Producto 100€ (sin IVA): ${calcularTotal(100, 0)} €`);

  console.log();
  console.log("El impuesto tiene default 0.21 (IVA español). Se puede sobreescribir.");
  console.log();
}

probarCalcularTotal();
console.log("\n\n");

//JMM:// --- Ejercicio 4: Closure crearAcumulador (estado oculto) ---

//JMM: La interfaz define el contrato: qué métodos ofrece el acumulador
interface AcumuladorTexto {
  anadir(texto: string): void;
  ver(): string;
  tama(): number;
}

function crearAcumulador(inicial: string = ""): AcumuladorTexto {
  //JMM: `texto` es una variable privada: solo existe dentro de esta closure
  let texto: string = inicial;

  return {
    anadir(nuevo: string): void {
      texto += nuevo;
    },
    ver:(): string => texto, //Usamos arrow (por hacer algo distinto)
    tama(): number {
      return texto.length;
    },
  };
}

function probarAcumulador(): void {
  console.log("=== Ejercicio 4: Closure crearAcumulador ===");

  const acc = crearAcumulador("Hola");
  console.log(`Ver: "${acc.ver()}" · Tamaño: ${acc.tama()}`);

  acc.anadir(", ");
  acc.anadir("mundo");
  console.log(`Ver: "${acc.ver()}" · Tamaño: ${acc.tama()}`);

  //JMM: El string inicial es opcional: sin argumento, arranca vacío
  const vacio = crearAcumulador();
  vacio.anadir("TypeScript");
  console.log(`Desde vacío: "${vacio.ver()}" · Tamaño: ${vacio.tama()}`);

  //JMM: Cada llamada a crearAcumulador crea su propio `texto`, son independientes
  const otro = crearAcumulador("A");
  otro.anadir("B");
  console.log(`Otro acumulador: "${otro.ver()}" · Tamaño: ${otro.tama()}`);
  console.log(`El primero no se entera: "${acc.ver()}" · Tamaño: ${acc.tama()}`);

  console.log();
  console.log("La variable `texto` queda oculta dentro de crearAcumulador (closure).");
  console.log("Desde fuera solo se ve la interfaz AcumuladorTexto: anadir, ver y tama.");
  console.log("No se puede leer ni reasignar `texto`, así el estado queda controlado.");
  console.log();
}

probarAcumulador();
console.log("\n\n");

//JMM:// --- Ejercicio 5: Function para formatearEntrada ---

function formatearEntrada(entrada: string | number[]): string {
  if (typeof entrada === "string") {
    //JMM: Formatear texto: mayúsculas y quitar espacios extra
    return entrada.trim().toUpperCase();
  } else {
    //JMM: Formatear array de números: lista separada por comas
    return entrada.map((n) => n.toFixed(2)).join(", ");
  }
}

function probarE5(): void {
  console.log("=== Ejercicio 5: Función con unión de tipos ===");

  console.log(`String: "${formatearEntrada("  hola mundo  ")}"`);
  console.log(`Array: [${formatearEntrada([1, 2.5, 10])}]`);
  console.log(`Array: [${formatearEntrada([0.1, 0.2, 0.3])}]`);

  console.log();
  console.log("Al usar una unión de tipos (string | number[]), no necesitamos firmas de overload.");
  console.log("TypeScript infiere y estrecha (narrowing) el tipo dentro del bloque if/else.");
  console.log();
}
probarE5();
console.log("\n\n");

//JMM:// --- Ejercicio 6: Asignar función a variable (expresión y arrow) ---

function saludar(nombre: string): string {
  return `¡Hola, ${nombre}!`;
}

function probarFuncionesComoVariables(): void {
  console.log("=== Ejercicio 6: Funciones como variables ===");

  //JMM: Expresión funcional: asignamos la función a una variable
  const miSaludo: (nombre: string) => string = saludar;
  console.log(`Expresión funcional: ${miSaludo("Ana")}`);

  //JMM: Arrow function: también podemos crearla inline
  const despedir = (nombre: string): string => `Adiós, ${nombre}!`;
  console.log(`Arrow function: ${despedir("Carlos")}`);

  //JMM: Arrow function que no usa el parámetro explícito pero el tipo lo exige
  //JMM: El tipo dice (nombre: string) => string, pero no usamos nombre
  const siempreIgual: (nombre: string) => string = (_: string): string => {
    return "Mensaje fijo";
  };
  console.log(`Arrow sin usar parámetro: ${siempreIgual("cualquiera")}`);

  console.log();
  console.log("Las funciones son valores de primera clase: se pueden asignar a variables.");
  console.log("El tipo (nombre: string) => string describe la firma de la función.");
  console.log();
}

probarFuncionesComoVariables();

//JMM:// --- Ejercicio 7: Tipo Operacion y array de funciones ---

type Operacion = (a: number, b: number) => number;

function sumar(a: number, b: number): number {
  return a + b;
}

function restar(a: number, b: number): number {
  return a - b;
}

function multiplicar(a: number, b: number): number {
  return a * b;
}

function probarOperaciones(): void {
  console.log("=== Ejercicio 7: Tipo Operacion y array de funciones ===");

  //JMM: Guardamos las funciones en un array
  const operaciones: Operacion[] = [sumar, restar, multiplicar];

  const nombres = ["Sumar", "Restar", "Multiplicar"];
  const a = 10;
  const b = 3;

  for (let i = 0; i < operaciones.length; i++) {
    const resultado = operaciones[i](a, b);
    console.log(`${nombres[i]}(${a}, ${b}) = ${resultado}`);
  }

  console.log();

  //JMM: También se puede usar map para obtener todos los resultados
  const resultados = operaciones.map((op) => op(10, 3));
  console.log(`Todos los resultados: [${resultados}]`);

  console.log();
  console.log("Operacion es un tipo que describe una función que recibe 2 números y devuelve un número.");
  console.log("Podemos guardar funciones en arrays y recorrerlas como si fueran datos.");
  console.log();
}

probarOperaciones();
