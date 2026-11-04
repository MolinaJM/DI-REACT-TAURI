export {};
import type { Figura, Contacto } from "./tipos.ts";
//JMM: Bloque 11 - Literal Types y Type Narrowing
//JMM: Cada ejercicio resuelve un enunciado del bloque 11

//JMM:// ============================================================
//JMM:// Ejercicio 1: Tipo literal Direccion con nombre completo
//JMM:// ============================================================

type Direccion = "N" | "S" | "E" | "O";

function nombreCompletoDireccion(dir: Direccion): string {
  switch (dir) {
    case "N":
      return "Norte";
    case "S":
      return "Sur";
    case "E":
      return "Este";
    case "O":
      return "Oeste";
  }
}

console.log("--- Ejercicio 1: Direccion ---");
console.log(nombreCompletoDireccion("N")); //JMM:// Norte
console.log(nombreCompletoDireccion("S")); //JMM:// Sur
console.log(nombreCompletoDireccion("E")); //JMM:// Este
console.log(nombreCompletoDireccion("O")); //JMM:// Oeste

//JMM:// ============================================================
//JMM:// Ejercicio 2: Discriminated union Triangulo | Cuadrado
//JMM:// ============================================================
//JMM: Los interfaces Triangulo, Cuadrado y el type Figura viven en tipos.ts.

function calcularArea(figura: Figura): number {
  if (figura.tipo === "triangulo") {
    return (figura.base * figura.altura) / 2;
  } else {
    return figura.lado * figura.lado;
  }
}

console.log("\n--- Ejercicio 2: Calcular Area ---");
console.log(calcularArea({ tipo: "triangulo", base: 10, altura: 5 })); //JMM:// 25
console.log(calcularArea({ tipo: "cuadrado", lado: 4 })); //JMM:// 16

//JMM:// ============================================================
//JMM:// Ejercicio 3: typeof narrowing con string | number | boolean
//JMM:// ============================================================

function procesarTipo(valor: string | number | boolean): string {
  if (typeof valor === "string") {
    return `Es un string: ${valor}`;
  } else if (typeof valor === "number") {
    return `Es un numero: ${valor * 2}`;
  } else {
    return `Es un boolean: ${valor ? "verdadero" : "falso"}`;
  }
}

console.log("\n--- Ejercicio 3: typeof narrowing ---");
console.log(procesarTipo("hola")); //JMM:// Es un string: hola
console.log(procesarTipo(7)); //JMM:// Es un numero: 14
console.log(procesarTipo(true)); //JMM:// Es un boolean: verdadero
console.log(procesarTipo(false)); //JMM:// Es un boolean: falso

//JMM:// ============================================================
//JMM:// Ejercicio 4: in narrowing entre dos interfaces
//JMM:// ============================================================
//JMM: Los interfaces ConEmail, ConTelefono y el type Contacto viven en tipos.ts.

function contactar(contacto: Contacto): string {
  if ("email" in contacto) {
    return `Contactar por email a ${contacto.nombre}: ${contacto.email}`;
  } else {
    return `Contactar por telefono a ${contacto.nombre}: ${contacto.telefono}`;
  }
}

console.log("\n--- Ejercicio 4: in narrowing ---");
console.log(contactar({ nombre: "Ana", email: "ana@mail.com" })); //JMM:// Contactar por email a Ana: ana@mail.com
console.log(contactar({ nombre: "Luis", telefono: 600123456 })); //JMM:// Contactar por telefono a Luis: 600123456

//JMM:// ============================================================
//JMM:// Ejercicio 5: EstadoPedido con notificaciones
//JMM:// ============================================================

type EstadoPedido = "pendiente" | "enviado" | "entregado";

function actualizarEstado(estado: EstadoPedido): void {
  switch (estado) {
    case "pendiente":
      console.log("El pedido esta pendiente de procesamiento.");
      break;
    case "enviado":
      console.log("El pedido ha sido enviado.");
      break;
    case "entregado":
      console.log("El pedido ha sido entregado.");
      break;
  }
}

console.log("\n--- Ejercicio 5: Estado Pedido ---");
actualizarEstado("pendiente"); //JMM:// El pedido esta pendiente de procesamiento.
actualizarEstado("enviado"); //JMM:// El pedido ha sido enviado.
actualizarEstado("entregado"); //JMM:// El pedido ha sido entregado.

//JMM:// ============================================================
//JMM:// Ejercicio 6: procesarEntrada con string | number
//JMM:// ============================================================

function procesarEntrada(entrada: string | number): string | number {
  if (typeof entrada === "string") {
    return entrada.toUpperCase();
  } else {
    return entrada * 2;
  }
}

console.log("\n--- Ejercicio 6: procesarEntrada ---");
console.log(procesarEntrada("hola mundo")); //JMM:// HOLA MUNDO
console.log(procesarEntrada(21)); //JMM:// 42

//JMM:// ============================================================
//JMM:// Ejercicio 7: procesar con unknown
//JMM:// ============================================================

function procesar(valor: unknown): string {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  } else if (typeof valor === "number") {
    return String(valor * 2);
  } else {
    return "desconocido";
  }
}

console.log("\n--- Ejercicio 7: procesar con unknown ---");
console.log(procesar("hola")); //JMM:// HOLA
console.log(procesar(50)); //JMM:// 100
console.log(procesar(true)); //JMM:// desconocido
console.log(procesar(null)); //JMM:// desconocido
console.log(procesar({ key: "value" })); //JMM:// desconocido
