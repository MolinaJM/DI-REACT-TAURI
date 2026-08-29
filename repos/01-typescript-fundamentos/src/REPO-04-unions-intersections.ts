export {};

/**
 * Fichero 04: Union Types, Interseccion, Literales y Type Narrowing
 * -----------------------------------------------------------------
 * - Union Types (|)
 * - Interseccion de Tipos (&)
 * - Literal Types
 * - Type Narrowing (typeof, in, discriminated unions)
 */

// ============================================================================
// UNION TYPES (|)
// ============================================================================

type Id = string | number;
let userId: Id = 123;
userId = "ABC-123";

// Union en parametros
function imprimirId(id: string | number): void {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}

// Union de literales
type EstadoPedido = "pendiente" | "enviado" | "entregado" | "cancelado";
let estado: EstadoPedido = "pendiente";

// ============================================================================
// INTERSECCION DE TIPOS (&)
// ============================================================================

interface Persona { nombre: string; edad: number; }
interface Empleado { empresa: string; salario: number; }

type EmpleadoPersona = Persona & Empleado;

const trabajador: EmpleadoPersona = {
    nombre: "Luis",
    edad: 30,
    empresa: "Tech Corp",
    salario: 50000
};

// ============================================================================
// LITERAL TYPES
// ============================================================================

let saludo: "hola" = "hola";
// saludo = "adios";  // Error
let puerto: 3000 | 3001 | 8080 = 3000;

// ============================================================================
// TYPE NARROWING
// ============================================================================

// TYPEOF
function procesarValor(valor: string | number | boolean) {
    if (typeof valor === "string") return valor.toUpperCase();
    if (typeof valor === "number") return valor.toFixed(2);
    return valor ? "si" : "no";
}

// IN NARROWING
interface Casa { jardin: boolean; }
interface Piso { piso: number; }
type Vivienda = Casa | Piso;

function describir(v: Vivienda) {
    if ("jardin" in v) {
        console.log("Casa con jardin");
    } else {
        console.log("Piso");
    }
}

// DISCRIMINATED UNIONS
interface Circulo { tipo: "circulo"; radio: number; }
interface Rectangulo { tipo: "rectangulo"; ancho: number; alto: number; }
type Figura = Circulo | Rectangulo;

function calcularArea(fig: Figura): number {
    switch (fig.tipo) {
        case "circulo": return Math.PI * fig.radio ** 2;
        case "rectangulo": return fig.ancho * fig.alto;
    }
}

console.log(imprimirId(123));
console.log(imprimirId("ABC"));
console.log(procesarValor("hola"));
console.log(procesarValor(42));
console.log(calcularArea({ tipo: "circulo", radio: 5 }));
console.log(calcularArea({ tipo: "rectangulo", ancho: 4, alto: 6 }));
