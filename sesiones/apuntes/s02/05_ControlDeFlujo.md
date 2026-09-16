# **Capítulo 05. Contenido 📝** 🖥️

- [5. Estructuras de Control de Flujo en TypeScript](#5-estructuras-de-control-de-flujo-en-typescript)
  - [5.1. Estructuras Condicionales](#51-estructuras-condicionales)
    - [5.1.1. Declaración `if`](#511-declaraci%C3%B3n-if)
    - [5.1.2. Declaración `else`](#512-declaraci%C3%B3n-else)
    - [5.1.3. `else if`](#513-else-if)
  - [5.2. Bucles](#52-bucles)
    - [5.2.4. `for...of` Loop (ES6)](#524-forof-loop-es6)
  - [5.3. Estructuras de Control Avanzadas](#53-estructuras-de-control-avanzadas)
    - [5.3.1. `switch` Statement](#531-switch-statement)
  - [5.4. Narrowing: el control de flujo tipado](#54-narrowing-el-control-de-flujo-tipado)
- 🧪 **Ejercicios:** [Estructuras de control de flujo](../../ejerciciosTS.md#14-estructuras-de-control-de-flujo) · [Literal Types y Narrowing](../../ejerciciosTS.md#15-literal-types-y-type-narrowing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 5. Estructuras de Control de Flujo en TypeScript

Las estructuras de control de flujo en JavaScript permiten tomar decisiones y repetir acciones según sea necesario en un programa. Estas estructuras son fundamentales para el flujo de ejecución de un programa. En TypeScript, además, las estructuras condicionales y los `switch` **refinan los tipos** de las variables (narrowing), lo que hace el código más seguro.

## 5.1. Estructuras Condicionales

### 5.1.1. Declaración `if`

La estructura `if` se utiliza para ejecutar un bloque de código si una condición es verdadera.

```typescript
let edad: number = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
}
```

### 5.1.2. Declaración `else`

El bloque `else` se ejecuta si la condición en `if` es falsa.

```typescript
let edad: number = 15;

if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}
```

### 5.1.3. `else if`

`else if` se utiliza para evaluar múltiples condiciones secuencialmente.

```typescript
let puntuacion: number = 85;

if (puntuacion >= 90) {
  console.log("Excelente");
} else if (puntuacion >= 70) {
  console.log("Aprobado");
} else {
  console.log("Reprobado");
}
```

**Recordemos:**

`El número 0, un string vacío "", null, undefined, y NaN se convierte en false. Por esto son llamados valores "falsy".`

`El resto de los valores se convierten en true, entonces los llamaremos valores "truthy".`

> [!TIP]
> En TypeScript con `strict`, un `if (valor)` comprobando un tipo que incluye `null` o `undefined` provoca *narrowing*: dentro del bloque, el tipo de `valor` queda reducido. Es la base para manejar datos opcionales de forma segura.

## 5.2. Bucles

### 5.2.4. `for...of` Loop (ES6)

El bucle `for...of` itera sobre los **valores** de un iterable (arrays, strings, Map, Set, etc.). Es la forma moderna y recomendada para recorrer arrays:

```typescript
const frutas: string[] = ["manzana", "pera", "uva"];

for (const fruta of frutas) {
  console.log(fruta);
}
// Imprime: manzana, pera, uva

// También funciona con strings
for (const letra of "Hola") {
  console.log(letra);
}
// Imprime: H, o, l, a
```

> `for...of` obtiene directamente el **valor** de cada elemento, a diferencia de `for...in` que itera sobre las **claves** (índices). Para arrays, usa siempre `for...of`.

> [!TIP]
> Con `for...of`, cada `fruta` es automáticamente `string` (inferido del array). Al recorrer un `Map<string, number>` con `for (const [clave, valor] of mapa)`, TypeScript ya sabe que `clave: string` y `valor: number`.

## 5.3. Estructuras de Control Avanzadas

### 5.3.1. `switch` Statement

`switch` se utiliza para evaluar múltiples casos y ejecutar código según el caso que coincida.

```typescript
let diaSemana: string = "Lunes";

switch (diaSemana) {
  case "Lunes":
    console.log("Hoy es lunes.");
    break;
  case "Martes":
    console.log("Hoy es martes.");
    break;
  default:
    console.log("Es otro día de la semana.");
}
```

> [!NOTE]
> En `strict` mode, un `switch` sobre un tipo **unión** (p. ej. `type Estado = "ok" | "cargando" | "error"`) estrecha el tipo en cada `case`. Si además usamos el patrón *exhaustive check* con `never`, TypeScript nos avisa si falta un caso. Ya lo viste en el bloque "Ejemplo completo-resumen" al final de [`01_SintaxisBasica.md`](01_SintaxisBasica.md) (sección *never en exhaustiveness checking*), con una variable `_exhaustivo: never` en el `default`.

## 5.4. Narrowing: el control de flujo tipado

TypeScript analiza el flujo del programa y **reduce el tipo** de una variable según las condiciones por las que pasa. Esto se llama *type narrowing* y es la forma segura de "filtrar" tipos unión.

```typescript
function mostrarLongitud(valor: string | number): void {
  if (typeof valor === "string") {
    // aquí valor es string
    console.log(valor.toUpperCase());
  } else {
    // aquí valor es number
    console.log(valor.toFixed(2));
  }
}

function procesar(dato: Usuario | null): string {
  if (dato === null) {
    return "Sin datos";
  }
  // aquí dato es Usuario
  return dato.nombre;
}

interface Usuario {
  nombre: string;
}

mostrarLongitud(3);
mostrarLongitud("TRES");
console.log(procesar(null)); 
let u:Usuario={nombre:"Profe"};
console.log(procesar(u)); 
```

Otros guards habituales: `Array.isArray(x)`, `x instanceof Error`, `"prop" in objeto`, o *type guards* definidos por el usuario (ver capítulos de Fetch API y localStorage).

> [!IMPORTANT]
> Preferir **narrowing** a `as`. Una aserción `as` le dice a TypeScript "confía en mí"; el narrowing le permite **comprobar** las ramas. La diferencia es que el narrowing se puede equivocar menos porque está basado en el flujo real del programa.

---
### 📦 Ejemplo completo: `unions-intersections.ts`

Union types, intersección, literal types y type narrowing.

```typescript
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
```

> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `05_ControlDeFlujo.ts` y ejecuta `npx tsx 05_ControlDeFlujo.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).

### 📦 Ejemplo completo: `control-flow-scope.ts`

Control de flujo (switch exhaustivo, bucles), hoisting, TDZ y closures.

```typescript
export {};

/**
 * Fichero 08: Control de Flujo y Scope
 * -------------------------------------------
 * - Condicionales (if/else, switch exhaustivo)
 * - Bucles (for...of)
 * - Hoisting y Temporal Dead Zone
 * - Clausuras (Closures)
 */

// ============================================================================
// CONDICIONALES
// ============================================================================

const puntuacion: number = 85;

if (puntuacion >= 90) {
    console.log("Excelente");
} else if (puntuacion >= 70) {
    console.log("Aprobado");
} else {
    console.log("Reprobado");
}

// Switch exhaustivo con tipos
type DiaSemana = "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes";

function actividad(dia: DiaSemana): string {
    switch (dia) {
        case "Lunes":     return "Reunion semanal";
        case "Martes":    return "Desarrollo";
        case "Miercoles": return "Code review";
        case "Jueves":    return "Desarrollo";
        case "Viernes":   return "Deploy";
        default:
            // Exhaustiveness check
            const _exhaustivo: never = dia;
            return _exhaustivo;
    }
}

// ============================================================================
// BUCLES
// ============================================================================

const frutas: string[] = ["manzana", "pera", "uva"];


// for...of (iterables)
for (const fruta of frutas) {
    console.log(fruta);
}

// for...of con strings
for (const letra of "TypeScript") {
    console.log(letra);
}



// ============================================================================
// AMBITO (SCOPE) Y HOISTING
// ============================================================================


// let/const: ambito de bloque, Temporal Dead Zone (TDZ)
function ejemploLet(): void {
    // console.log(y); // ReferenceError: TDZ
    let y: number = 10;
    const z: number = 15;
}

// Block scope con let
if (true) {
    let blockVar: string = "Solo aqui";
    console.log(blockVar); // OK
}
// console.log(blockVar); // Error: no definida fuera

// ============================================================================
// CLAUSURAS (CLOSURES)
// ============================================================================

function crearContador(inicial: number = 0): {
    incrementar: () => number;
    decrementar: () => number;
    valor: () => number;
} {
    let contador: number = inicial;

    return {
        incrementar: () => ++contador,
        decrementar: () => --contador,
        valor: () => contador,
    };
}

const c = crearContador(10);
console.log(c.incrementar()); // 11
console.log(c.incrementar()); // 12
console.log(c.decrementar()); // 11
console.log(c.valor());       // 11


// Ejecutar ejemplos
ejemploLet();
console.log(actividad("Lunes"));
```

> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `05_ControlDeFlujo.ts` y ejecuta `npx tsx 05_ControlDeFlujo.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).
> ✏️ **Práctica:** [`s02/11-control-de-flujo.ts`](../../../ejercicios/s02/11-control-de-flujo.ts) (switch exhaustivo `never` = patrón reducer de React) · [`s02/04-unions-narrowing.ts`](../../../ejercicios/s02/04-unions-narrowing.ts) (narrowing §5.4) · [catálogo S2·14 y S2·15](../../../sesiones/ejerciciosTS.md).

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
