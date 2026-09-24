// ============================================================
// S02 · Ejercicio 4b · Union types, literales e intersección
// ============================================================
// Completa. Solución: soluciones/s02/04b-unions-intersection.ts

// 1) Union type: define `ID` como `string | number`
type Id = unknown; // TODO: string | number

// Función que formatea un ID con una template literal
function mostrarId(id: string | number): string {
  return "TODO";
}

// 2) Intersección de tipos: crea interfaces `Persona` y `Empleado`
interface Persona {
  nombre: string;
  edad: number;
}

interface Empleado {
  departamento: string;
  salario: number;
}

// Crea un objeto que cumpla ambas interfaces
const personaEmpleado: Persona & Empleado = {
  // TODO: completa con nombre, edad, departamento y salario
};

// 3) Union de literales: define `EstadoPedido` como "pendiente" | "enviado" | "entregado"
type EstadoPedido = unknown; // TODO: "pendiente" | "enviado" | "entregado"

// Declara una variable `estado` de tipo EstadoPedido y asígnale cada valor
function mostrarEstados(): void {
  let estado: EstadoPedido = "pendiente";
  console.log(estado);
}
