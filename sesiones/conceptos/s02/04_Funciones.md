# **Capítulo 04. Contenido 📝** 🖥️

- [4. Funciones en TypeScript](#4-funciones-en-typescript)
  - [1. Declaración de funciones](#1-declaraci%C3%B3n-de-funciones)
  - [2. Expresiones de funciones o expresiones funcionales.](#2-expresiones-de-funciones-o-expresiones-funcionales)
  - [3. Funciones de flecha](#3-funciones-de-flecha)
    - [3.1. Funciones de Flecha como Argumentos](#31-funciones-de-flecha-como-argumentos)
    - [3.2. Funciones de Flecha Multilínea](#32-funciones-de-flecha-multil%C3%ADnea)
  - [4. Diferencia Entre Parámetros y Argumentos](#4-diferencia-entre-par%C3%A1metros-y-argumentos-en-typescript)
    - [4.1 Parámetros](#41-par%C3%A1metros)
      - [Ejemplo de Declaración de Función con Parámetros](#ejemplo-de-declaraci%C3%B3n-de-funci%C3%B3n-con-par%C3%A1metros)
    - [4.2 Argumentos](#42-argumentos)
      - [Ejemplo de Llamada de Función con Argumentos](#ejemplo-de-llamada-de-funci%C3%B3n-con-argumentos)
    - [Resumen](#resumen)
  - [5. Valores predeterminados de parámetros](#5-valores-predeterminados-de-par%C3%A1metros)
  - [6. Rest parameters y operador spread](#6-rest-parameters-y-operador-spread)
  - [7. Funciones como expresiones (y tipos de función)](#7-funciones-como-expresiones-y-tipos-de-funci%C3%B3n)
  - [8. Funciones anónimas](#8-funciones-an%C3%B3nimas)
  - [9. Cierres (closures)](#9-cierres-closures)
  - [10. Funciones recursivas](#10-funciones-recursivas)
  - [11. Tipos de función, callbacks y genéricos](#11-tipos-de-funci%C3%B3n-callbacks-y-gen%C3%A9ricos)

---

# 4. Funciones en TypeScript

Las funciones son bloques de código reutilizables que pueden realizar tareas específicas en JavaScript. En TypeScript además podemos declarar el tipo de los **parámetros** y del **retorno**, de manera que el compilador comprueba cada llamada.
Las funciones son los principales "bloques de construcción" del programa. Permiten que el código se llame muchas veces sin repetición.

> ECMAScript 6 (también conocido como ES6 o ES2015) introdujo nuevas características que hacen que trabajar con funciones sea más poderoso y flexible. TypeScript añade encima las **anotaciones de tipo** y los **genéricos**.

## 1. Declaración de funciones

En JavaScript, puedes declarar una función de la siguiente manera. En TypeScript tipamos parámetros y retorno:

```typescript
function saludar(): void {
  console.log("¡Hola, mundo!, Bienvenido Profe");
}

// Llamada a la función
saludar(); // Imprime: ¡Hola, mundo!, Bienvenido Profe
```

> [!NOTE]
> `void` indica que la función no devuelve ningún valor. Si una función devuelve algo, anotamos ese tipo: `function sumar(a: number, b: number): number { return a + b; }`.

## 2. Expresiones de funciones o expresiones funcionales.

Las expresiones de funciones son funciones definidas dentro de una expresión, y pueden asignarse a variables. Por ejemplo:

```typescript
const suma = function (a: number, b: number): number {
  return a + b;
};

const resultado: number = suma(5, 3);
console.log(resultado); // Imprime: 8
```

TypeScript infiere el tipo de `suma` (la firma `(a: number, b: number) => number`) a partir de la asignación.

## 3. Funciones de flecha

Las funciones de flecha son una forma más concisa de escribir funciones anónimas. Se definen utilizando la sintaxis `() => {}`. Ejemplo:

```typescript
const duplicar = (numero: number): number => {
  return numero * 2;
};

console.log(duplicar(4)); // Imprime: 8
```

Las funciones flecha de `una sóla línea` no necesitan el `return` porque sería **implícito** y por tanto la función anterior se podría crear así:

```typescript
const duplicar = (numero: number): number => numero * 2;

console.log(duplicar(9)); // Imprime: 18
```

Las funciones de flecha pueden usarse también en situaciones más avanzadas, como funciones de orden superior (higher-order functions) y para reducir la sintaxis.

### 3.1. Funciones de Flecha como Argumentos

Las funciones de flecha son útiles para funciones de orden superior, como `map`, `filter` y `reduce` que veremos más adelante:

```typescript
const numeros: number[] = [1, 2, 3, 4, 5];

const cuadrados: number[] = numeros.map((numero: number): number => numero ** 2);
console.log(cuadrados); // [1, 4, 9, 16, 25]
```

> [!TIP]
> Con `map`, `filter` y `reduce`, TypeScript suele **inferir** el tipo del parámetro a partir del array. El código anterior se puede simplificar a `numeros.map((numero) => numero ** 2)` y aun así sigue siendo `number[]`.

### 3.2. Funciones de Flecha Multilínea

Las funciones de flecha pueden manejar bloques de código multilínea siempre que los encerremos en `{}`. Además en este caso es **obligatorio el uso de return**:

```typescript
const operacionCompleja = (a: number, b: number): number => {
  const resultado: number = a + b;
  return resultado * 2;
};
```

**Más Ejemplos:**

```typescript
const nombreFuncion = (parametro1: number, parametro2: number): string => {
  // Múltiples instrucciones o expresiones
  // Puedes hacer lo que necesites aquí
  return resultado;
};
```

```typescript
const operacionCompleja = (a: number, b: number): string => {
  const suma: number = a + b;
  const resta: number = a - b;
  const producto: number = a * b;

  return `Suma: ${suma}, Resta: ${resta}, Producto: ${producto}`;
};

const resultado: string = operacionCompleja(5, 3);
console.log(resultado);
```

En este ejemplo, la función `operacionCompleja` toma dos parámetros `a` y `b`, y dentro del bloque de la función, realizamos varias operaciones matemáticas. La función finalmente devuelve una cadena que muestra los resultados de esas operaciones.

La ventaja de usar una función de flecha multilínea aquí es que nos permite escribir un código más limpio y legible al agrupar todas las operaciones relacionadas en un solo bloque de código. Además, TypeScript verifica que el retorno sea `string`.

## 4. Diferencia Entre Parámetros y Argumentos en TypeScript

En JavaScript, los términos "parámetros" y "argumentos" se utilizan en el contexto de las funciones, pero se refieren a conceptos diferentes. Es importante comprender la diferencia entre ellos para escribir funciones efectivas y comprender cómo funcionan. A continuación, se proporciona una explicación de cada uno con ejemplos.

### 4.1 Parámetros

Los parámetros son nombres de variables que se definen en la declaración de una función. Estos actúan como marcadores de posición para los valores que se pasarán a la función cuando se invoque. Los parámetros se encuentran en la definición de la función y actúan como variables locales dentro de la función. En TypeScript, cada parámetro puede llevar su tipo.

#### Ejemplo de Declaración de Función con Parámetros

```typescript
function saludar(nombre: string): void {
  console.log(`Hola, ${nombre}!`);
}

saludar("Profe"); // imprime Hola, Profe!
```

En este ejemplo, `nombre` es un parámetro de la función `saludar`. Es un marcador de posición para el valor que se pasará cuando se llame a la función, y además tiene que ser de tipo `string`.

```typescript
// saludar(35); // Error TS: Argument of type 'number' is not assignable to parameter of type 'string'
```

### 4.2 Argumentos

Los argumentos son los valores reales que se pasan a una función cuando se la llama. Los argumentos se utilizan para proporcionar valores concretos a los parámetros de la función. Los argumentos se encuentran en la llamada de la función.

#### Ejemplo de Llamada de Función con Argumentos

```typescript
saludar("Profe");
```

En este ejemplo, `"Profe"` es un argumento que se pasa a la función `saludar`. Cuando se llama a la función, el valor del argumento se asigna al parámetro `nombre` dentro de la función.

### Resumen

En resumen, la diferencia clave entre parámetros y argumentos es la siguiente:

- **Parámetros:** Son nombres de variables en la definición de la función y actúan como marcadores de posición para los valores que se pasarán. Pueden tener tipos.

- **Argumentos:** Son los valores reales que se pasan a la función cuando se la llama y se asignan a los parámetros correspondientes. Deben respetar los tipos declarados.

## 5. Valores predeterminados de parámetros

ES6 permite asignar valores predeterminados a los parámetros de una función. Esto es útil cuando un parámetro es opcional:

```typescript
function saludar(nombre: string = "Usuario"): void {
  console.log(`¡Hola, ${nombre}!`);
}

saludar(); // Imprime: ¡Hola, Usuario!
saludar("Lorena"); // Imprime: ¡Hola, Lorena!
```

> [!NOTE]
> Un parámetro con valor por defecto se vuelve **opcional** automáticamente: su tipo inferido es `string` (no `string | undefined`), aunque se le puede pasar `undefined` para que use el valor por defecto.

> **Nota histórica:** antes de ES6 se usaba el operador `||` para simular valores por defecto:
> ```typescript
> function mensaje(texto: string): void {
>   texto = texto || "Bienvenido!!"; // ❌ problema: texto = "" también se reemplaza
> }
> ```
> Este patrón es frágil porque `0`, `""`, `false` y `null` son todos *falsy* y se sustituirían. Los parámetros por defecto de ES6+ evitan ese problema:
> ```typescript
> function mensaje(texto: string = "Bienvenido!!"): void {
>   console.log(texto);
> }
> mensaje("");        // "" (respeta la cadena vacía)
> mensaje(undefined); // "Bienvenido!!"
> mensaje();          // "Bienvenido!!"
> ```
> Si necesitas distinguir `null`/`undefined` específicamente, usa el operador nullish coalescing `??` (ES2020):
> ```typescript
> function mensaje(texto: string | null | undefined): void {
>   const final = texto ?? "Bienvenido!!"; // solo reemplaza null o undefined
>   console.log(final);
> }
> ```

## 6. Rest parameters y operador spread

Los rest parameters y el operador spread (`...`) permiten trabajar con un número variable de argumentos en una función. En TypeScript, un rest parameter es un array tipado:

```typescript
function sumar(...numeros: number[]): number {
  return numeros.reduce((total, numero) => total + numero, 0);
}

const resultado: number = sumar(1, 2, 3, 4, 5);
console.log(resultado); // Imprime: 15
```

> `reduce()` lo veremos más adelante.

> [!TIP]
> TypeScript garantiza que solo se pasen `number`s: `sumar(1, "dos")` sería un error de compilación. El rest parameter también puede ser una tupla para tipos mixtos: `function crearUsuario(...datos: [nombre: string, edad: number])`.

## 7. Funciones como expresiones (y tipos de función)

Las funciones pueden asignarse a variables y pasarse como argumentos a otras funciones. Esto es fundamental para conceptos como callbacks y promesas. En TypeScript podemos tipar la función que se recibe:

```typescript
const funcionSaludo = (nombre: string): void => {
  console.log(`¡Hola, ${nombre}!`);
};

function ejecutarFuncion(funcion: (nombre: string) => void): void {
  funcion("D. Profe");
}

ejecutarFuncion(funcionSaludo); // Imprime: ¡Hola, D. Profe!
```

El tipo del parámetro `funcion` es `(nombre: string) => void`: "una función que recibe un `string` y no devuelve nada". Si `funcionSaludo` no encajara con esa firma, `tsc` daría error.

## 8. Funciones anónimas

Las funciones anónimas son funciones sin nombre que se pueden definir y utilizar inmediatamente. A menudo se usan para encapsular código:

```typescript
(function (): void {
  console.log("Esta es una función anónima autoejecutada.");
})();
```

En TypeScript moderno y con módulos ES este patrón IIFE se usa mucho menos, porque cada archivo de módulo ya es un ámbito propio.

## 9. Cierres (closures)

Los cierres o `Closures` son funciones que tienen acceso a variables de su ámbito externo incluso después de que ese ámbito haya terminado su ejecución. Esto permite mantener datos privados en una función:

```typescript
function contador(): () => number {
  let count: number = 0;
  return function (): number {
    count++;
    return count;
  };
}

const incrementar: () => number = contador();
console.log(incrementar()); // Imprime: 1
console.log(incrementar()); // Imprime: 2
```

> [!NOTE]
> El tipo de retorno `() => number` describe el closure: "una función sin parámetros que devuelve `number`". TypeScript comprueba que `count` solo se modifica a través del closure, lo que da seguridad sobre el estado privado.

## 10. Funciones recursivas

Una función recursiva es aquella que se llama a sí misma para resolver un problema. Esto es útil en situaciones donde una tarea se puede dividir en subproblemas similares:

```typescript
function factorial(n: number): number | undefined {
  if (n < 0) return undefined; // No existe factorial de números negativos
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));  // Imprime: 120
console.log(factorial(0));  // Imprime: 1
console.log(factorial(-3)); // Imprime: undefined
```

En TS el retorno se declara como `number | undefined` porque hay un camino que devuelve `undefined`.

## 11. Tipos de función, callbacks y genéricos

Para terminar el capítulo, estos son los patrones TypeScript que usaremos en el resto del curso:

```typescript
// Tipo de función reutilizable
type Operacion = (a: number, b: number) => number;

const sumar: Operacion = (a, b) => a + b;
const multiplicar: Operacion = (a, b) => a * b;

// Callback con tipos
function procesar(numeros: number[], callback: (n: number) => void): void {
  numeros.forEach(callback);
}

// Genérico: el tipo se decide en la llamada
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

const n: number | undefined = primero([10, 20, 30]);
const s: string | undefined = primero(["a", "b"]);
```

> [!IMPORTANT]
> Los **genéricos** (`<T>`) son la herramienta de TypeScript para escribir funciones que funcionan con muchos tipos sin perder la seguridad. Verás el patrón `identidad<T>`, `map<T, U>` y en el capítulo de Fetch API `fetch<T>`.

---

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-06-funciones.ts`)

```typescript
export {};

/**
 * Fichero 06: Funciones en TypeScript
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 2 (concepto 13):
 * - Parametros obligatorios, opcionales, por defecto, rest
 * - Arrow functions
 * - Callbacks y closures
 * - Function overloads
 */

// ============================================================================
// FUNCIONES EN PROFUNDIDAD
// ============================================================================

// Parametros obligatorios
function saludar(nombre: string, edad: number): string {
    return `Hola, soy ${nombre} y tengo ${edad} anios`;
}

// Parametros opcionales (?)
function configurarURL(base: string, puerto?: number): string {
    if (puerto) return `${base}:${puerto}`;
    return base;
}

// Parametros por defecto
function crearUsuario(nombre: string, activo: boolean = true): object {
    return { nombre, activo };
}

// Rest parameters
function sumarTodo(...numeros: number[]): number {
    return numeros.reduce((total, n) => total + n, 0);
}
console.log(sumarTodo(1, 2, 3, 4, 5)); // 15

// Arrow functions
const duplicar = (x: number): number => x * 2;

// Callbacks
function ejecutarOperacion(
    a: number, b: number,
    operacion: (x: number, y: number) => number
): number {
    return operacion(a, b);
}

// Closures
function crearMultiplicador(factor: number): (valor: number) => number {
    return (valor: number) => valor * factor;
}
const duplicar2 = crearMultiplicador(2);
console.log(duplicar2(5));  // 10

// ============================================================================
// FUNCTION OVERLOADS
// ============================================================================

function procesarEntrada(x: string): string[];
function procesarEntrada(x: number): number[];
function procesarEntrada(x: string | number): string[] | number[] {
    if (typeof x === "string") return x.split("");
    return Array.from({ length: x }, (_, i) => i + 1);
}

console.log(procesarEntrada("hola")); // ["h","o","l","a"]
console.log(procesarEntrada(5));       // [1,2,3,4,5]

// Ejemplo de uso
console.log(saludar("Juan", 25));
console.log(configurarURL("http://localhost"));
console.log(configurarURL("http://localhost", 3000));
console.log(crearUsuario("Luis"));
console.log(ejecutarOperacion(5, 3, (a, b) => a + b));
```

---

[Volver al índice general](../../index.md)