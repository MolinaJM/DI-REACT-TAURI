# **Capítulo 05. Contenido 📝** 🖥️

- [6. Estructuras de Control de Flujo en TypeScript](#6-estructuras-de-control-de-flujo-en-typescript)
  - [6.1. Estructuras Condicionales](#61-estructuras-condicionales)
    - [6.1.1. Declaración `if`](#611-declaraci%C3%B3n-if)
    - [6.1.2. Declaración `else`](#612-declaraci%C3%B3n-else)
    - [6.1.3. `else if`](#613-else-if)
  - [6.2. Bucles](#62-bucles)
    - [6.2.1. `for` Loop](#621-for-loop)
    - [6.2.2. `while` Loop](#622-while-loop)
    - [6.2.3. `do...while` Loop](#623-dowhile-loop)
    - [6.2.4. `for...of` Loop (ES6)](#624-forof-loop-es6)
  - [6.3. Estructuras de Control Avanzadas](#63-estructuras-de-control-avanzadas)
    - [6.3.1. `switch` Statement](#631-switch-statement)
    - [6.3.2. `break` y `continue`](#632-break-y-continue)
  - [6.4. Narrowing: el control de flujo tipado](#64-narrowing-el-control-de-flujo-tipado)
  - [6.5 Ejercicios 😑 📖:](#65-ejercicios--)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 6. Estructuras de Control de Flujo en TypeScript

Las estructuras de control de flujo en JavaScript permiten tomar decisiones y repetir acciones según sea necesario en un programa. Estas estructuras son fundamentales para el flujo de ejecución de un programa. En TypeScript, además, las estructuras condicionales y los `switch` **refinan los tipos** de las variables (narrowing), lo que hace el código más seguro.

## 6.1. Estructuras Condicionales

### 6.1.1. Declaración `if`

La estructura `if` se utiliza para ejecutar un bloque de código si una condición es verdadera.

```typescript
let edad: number = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
}
```

### 6.1.2. Declaración `else`

El bloque `else` se ejecuta si la condición en `if` es falsa.

```typescript
let edad: number = 15;

if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}
```

### 6.1.3. `else if`

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

**_Recordemos:**_

`El número 0, un string vacío "", null, undefined, y NaN se convierte en false. Por esto son llamados valores "falso".`

`El resto de los valores se convierten en true, entonces los llamaremos valores "verdadero".`

> [!TIP]
> En TypeScript con `strict`, un `if (valor)` comprobando un tipo que incluye `null` o `undefined` provoca *narrowing*: dentro del bloque, el tipo de `valor` queda reducido. Es la base para manejar datos opcionales de forma segura.

## 6.2. Bucles

### 6.2.1. `for` Loop

El bucle `for` permite ejecutar un bloque de código un número específico de veces.

```typescript
for (let i: number = 0; i < 5; i++) {
  console.log("Iteración #" + (i + 1));
}
```

> [!NOTE]
> TypeScript **no permite usar un bucle `for` clásico (indexado) para recorrer strings o arrays** sin más: `for (let i = 0; i < texto.length; i++)` funciona, pero recorrer arrays con `for...of` es más seguro porque cada elemento queda tipado automáticamente.

### 6.2.2. `while` Loop

El bucle `while` se ejecuta mientras una condición sea verdadera.

```typescript
let contador: number = 0;

while (contador < 5) {
  console.log("Contador: " + contador);
  contador++;
}
```

### 6.2.3. `do...while` Loop

`do...while` es similar a `while`, pero garantiza que el bloque se ejecute al menos una vez.

```typescript
let x: number = 5;

do {
  console.log("El valor de x es: " + x);
  x--;
} while (x > 0);
```

### 6.2.4. `for...of` Loop (ES6)

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

## 6.3. Estructuras de Control Avanzadas

### 6.3.1. `switch` Statement

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
> En `strict` mode, un `switch` sobre un tipo **unión** (p. ej. `type Estado = "ok" | "cargando" | "error"`) estrecha el tipo en cada `case`. Si además usamos el patrón *exhaustive check* con `never`, TypeScript nos avisa si falta un caso (lo veremos en el capítulo de POO).

### 6.3.2. `break` y `continue`

`break` se utiliza para salir de un bucle o `switch`, mientras que `continue` se utiliza para saltar a la siguiente iteración en un bucle.

```typescript
for (let i: number = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Salta la iteración actual cuando i es 2
  }
  console.log("Valor de i: " + i);
}
```

## 6.4. Narrowing: el control de flujo tipado

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
```

Otros guards habituales: `Array.isArray(x)`, `x instanceof Error`, `"prop" in objeto`, o *type guards* definidos por el usuario (ver capítulos de Fetch API y localStorage).

> [!IMPORTANT]
> Preferir **narrowing** a `as`. Una aserción `as` le dice a TypeScript "confía en mí"; el narrowing le permite **comprobar** las ramas. La diferencia es que el narrowing se puede equivocar menos porque está basado en el flujo real del programa.

## 6.5 Ejercicios 😑 📖:

**Ejercicio 1:**

```
Calcular la letra del Documento Nacional de Identidad (DNI) sabiendo que es un proceso matemático que se basa en obtener el resto de la división entera del número de DNI y el número 23. A partir del resto de la división, se obtiene la letra seleccionándola dentro de un array de letras.

El array de letras es el siguiente:

letras: string[] = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

Se debe validar que el número que se pretende calcular su letra es entero y de la longitud correcta.

Pista: tipa la función como function calcularLetraDNI(dni: number): string | null y valida la longitud primero.
```

**Ejercicio 2:**

```
Programa para calcular el factorial de un número entero. Se debe de validar que es un número entero al que se le va a aplicar el factorial.

Pista: declara el parámetro como number y devuelve number | undefined para los casos no válidos (factorial de negativos), como vimos en el capítulo de funciones.
```

---

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-08-control-flow-scope.ts`)

```typescript
export {};

/**
 * Fichero 08: Control de Flujo, Scope y This
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 2 (conceptos 17 y 18):
 * - Condicionales (if/else, switch exhaustivo)
 * - Bucles (for, for...of, while, do...while)
 * - break y continue
 * - var vs let/const
 * - Hoisting y Temporal Dead Zone
 * - Clausuras (Closures)
 * - La palabra clave this
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

// for clasico
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}

// for...of (iterables)
for (const fruta of frutas) {
    console.log(fruta);
}

// for...of con strings
for (const letra of "TypeScript") {
    console.log(letra);
}

// while
let contador: number = 0;
while (contador < 3) {
    console.log(contador);
    contador++;
}

// do...while
let x: number = 5;
do {
    console.log(x);
    x--;
} while (x > 0);

// break y continue
for (let i: number = 0; i < 5; i++) {
    if (i === 2) continue; // salta iteracion
    if (i === 4) break;    // sale del bucle
    console.log(i);        // 0, 1, 3
}

// ============================================================================
// AMBITO (SCOPE) Y HOISTING
// ============================================================================

// var: ambito de funcion, hoisting con undefined
function ejemploVar(): void {
    // @ts-expect-error demostracion: var hoisting (variable usada antes de asignar)
    console.log("var hoisting:", typeof xVar); // undefined (hoisting)
    var xVar: number = 5;
}

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

// ============================================================================
// LA PALABRA CLAVE 'THIS'
// ============================================================================

// this en metodos tradicionales vs arrow functions
interface UsuarioThis {
    nombre: string;
    asignaturas: string[];
    mostrarFlecha: () => void;
    mostrarTradicional: () => void;
}

const usuarioThis: UsuarioThis = {
    nombre: "PROFE",
    asignaturas: ["DI", "DIW"],
    mostrarFlecha(): void {
        this.asignaturas.forEach((asig) => {
            console.log(this.nombre, asig); // this = usuarioThis
        });
    },
    mostrarTradicional(): void {
        this.asignaturas.forEach(function (asig) {
            // this = undefined (strict mode) o window
            // @ts-expect-error demostracion: this pierde contexto en function callback
            console.log(this?.nombre, asig);
        });
    },
};

// Perdida de this y soluciones (sin clases: metodos de objeto)
const saludador = {
    nombre: "Ana",
    saludar(): void {
        console.log(`Hola, soy ${this.nombre}`);
    },
};

// Se pierde el this
setTimeout(saludador.saludar, 100); // "Hola, soy undefined"

// Arrow wrapper
setTimeout(() => saludador.saludar(), 100); // "Hola, soy Ana"

// bind
setTimeout(saludador.saludar.bind(saludador), 100); // "Hola, soy Ana"

// Ejecutar ejemplos
ejemploVar();
ejemploLet();
console.log(actividad("Lunes"));
usuarioThis.mostrarFlecha();
```

---

[Volver al índice general](../../index.md)