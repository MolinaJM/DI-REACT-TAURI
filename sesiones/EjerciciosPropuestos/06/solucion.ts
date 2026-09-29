//JMM: Bloque 06 - Union Types e Intersección

//JMM: Ejercicio 1 - Define un tipo unión ID (string | number) y una función que lo formatee.
type ID = string | number;

function mostrarId(id: ID): string {
  return `ID: ${id}`;
}

console.log("=== Ejercicio 1: ID string | number ===");
console.log(mostrarId("ABC123"));   //JMM:// ID: ABC123
console.log(mostrarId(42));         //JMM:// ID: 42
console.log(mostrarId(""));         //JMM:// ID:
console.log(mostrarId(0));          //JMM:// ID: 0

//JMM: Con template literals el valor se convierte a string solo,
//JMM: así que la unión funciona para ambos tipos sin hacer nada especial (ninguna comprobación extra).

//JMM: Ejercicio 2 - Intersección de interfaces Persona y Empleado.
interface Persona {
  nombre: string;
  edad: number;
  email: string;
}

interface Empleado {
  idEmpleado: string;
  departamento: string;
  salario: number;
}

//JMM: Fijaos que con & combinamos AMBAS interfaces en una sola.
type PersonaEmpleado = Persona & Empleado;

function crearPersonaEmpleado(
  nombre: string,
  edad: number,
  email: string,
  idEmpleado: string,
  departamento: string,
  salario: number
): PersonaEmpleado {
  return { nombre, edad, email, idEmpleado, departamento, salario };
}

console.log("\n=== Ejercicio 2: Intersección Persona & Empleado ===");
const maria: PersonaEmpleado = crearPersonaEmpleado(
  "María",
  32,
  "maria@ejemplo.com",
  "EMP-001",
  "Ingeniería",
  55000
);

console.log("Nombre:", maria.nombre);           //JMM:// de Persona
console.log("Departamento:", maria.departamento); //JMM:// de Empleado
console.log("Salario:", maria.salario);         //JMM:// de Empleado
console.log("Email:", maria.email);             //JMM:// de Persona

//JMM: Esto es importante porque la intersección exige TODAS las propiedades de ambas.
//JMM:// console.log({} as PersonaEmpleado); // ERROR: faltan propiedades

//JMM: Ejercicio 3 - Union de literales para el estado de un pedido.
type EstadoPedido = "pendiente" | "enviado" | "entregado";

function mostrarEstados(): void {
  let estado: EstadoPedido = "pendiente";
  console.log(estado);
  estado = "enviado";
  console.log(estado);
  estado = "entregado";
  console.log(estado);
  estado = "cancelado"; // ERROR: no está en el tipo
  console.log(estado); //saca el tipo no contemplado
}

console.log("\n=== Ejercicio 3: EstadoPedido (literales) ===");
mostrarEstados();

//JMM: Los union de literales son la base de las discriminated unions,
//JMM: que usaremos en los estados de una petición o de un evento en React.