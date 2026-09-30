// ============================================================
// S02 · Ejercicio 4b · SOLUCIÓN — Union types, literales e intersección
// ============================================================
import assert from "node:assert/strict";

// 1) Union type
type Id = string | number;

function mostrarId(id: string | number): string {
  return `ID: ${id}`;
}

// 2) Intersección de tipos
interface Persona {
  nombre: string;
  edad: number;
}

interface Empleado {
  departamento: string;
  salario: number;
}

const personaEmpleado: Persona & Empleado = {
  nombre: "Ana",
  edad: 30,
  departamento: "Ingeniería",
  salario: 50000,
};

// 3) Union de literales
type EstadoPedido = "pendiente" | "enviado" | "entregado";

function mostrarEstados(): void {
  let estado: EstadoPedido = "pendiente";
  console.log(estado);
  estado = "enviado";
  console.log(estado);
  estado = "entregado";
  console.log(estado);
  // estado = "cancelado";  // Error: no está en el tipo
}

mostrarEstados();

// ---- Comprobaciones ----
assert.equal(mostrarId("abc"), "ID: abc");
assert.equal(mostrarId(123), "ID: 123");
assert.equal(personaEmpleado.nombre, "Ana");
assert.equal(personaEmpleado.departamento, "Ingeniería");
console.log("S02 · Ejercicio 4b · ¡OK!");
