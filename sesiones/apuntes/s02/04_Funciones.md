# **Capítulo 04. Contenido 📝** 🖥️

- [4. Funciones en TypeScript](#4-funciones-en-typescript)
  - [1. Declaración de funciones](#1-declaraci%C3%B3n-de-funciones)
  - [2. Expresiones de funciones o expresiones funcionales.](#2-expresiones-de-funciones-o-expresiones-funcionales)
  - [3. Funciones de flecha](#3-funciones-de-flecha)
    - [3.1. Funciones de Flecha como Argumentos](#31-funciones-de-flecha-como-argumentos)
  - [4. Valores predeterminados de parámetros](#4-valores-predeterminados-de-par%C3%A1metros)
  - [5. Rest parameters y operador spread](#5-rest-parameters-y-operador-spread)
  - [6. Funciones como expresiones (y tipos de función)](#6-funciones-como-expresiones-y-tipos-de-funci%C3%B3n)
  - [7. Otros tipos de función: callbacks](#7-otros-tipos-de-funci%C3%B3n-callbacks)
  - [8. Ámbito (Scope) en TypeScript](#8-%C3%A1mbito-scope-en-typescript)
    - [8.1. Ámbito (Scope)](#81-%C3%A1mbito-scope)
      - [8.1.1 Ámbito Global](#811-%C3%A1mbito-global)
      - [8.1.2 Ámbito de Función](#812-%C3%A1mbito-de-funci%C3%B3n)
      - [8.1.3 Ámbito de Bloque](#813-%C3%A1mbito-de-bloque)
      - [8.1.4 Ámbito de Cierre (Closures)](#814-%C3%A1mbito-de-cierre-closures)
    - [8.2. Ejemplos Prácticos](#82-ejemplos-pr%C3%A1cticos)
- 🧪 **Ejercicios:** [Funciones en Profundidad](../../EjerciciosPropuestos/ejerciciosTS.md#9-funciones-en-profundidad)

---

<a id="4-funciones-en-typescript"></a>
# 4. Funciones en TypeScript

Las funciones son bloques de código reutilizables que pueden realizar tareas específicas en JavaScript. En TypeScript además podemos declarar el tipo de los **parámetros** y del **retorno**, de manera que el compilador comprueba cada llamada.
Las funciones son los principales "bloques de construcción" del programa. Permiten que el código se llame muchas veces sin repetición.

> ECMAScript 6 (también conocido como ES6 o ES2015) introdujo nuevas características que hacen que trabajar con funciones sea más poderoso y flexible. TypeScript añade encima las **anotaciones de tipo** y los **genéricos**.

<a id="1-declaración-de-funciones"></a>
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

<a id="2-expresiones-de-funciones-o-expresiones-funcionales"></a>
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

<a id="3-funciones-de-flecha"></a>
## 3. Funciones de flecha

Las funciones de flecha (arrow o lambda) son una forma más concisa de escribir funciones anónimas. Se definen utilizando la sintaxis `() => {}`. Ejemplo:

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

<a id="31-funciones-de-flecha-como-argumentos"></a>
### 3.1. Funciones de Flecha como Argumentos

Las funciones de flecha son útiles para funciones de orden superior, como `map`, `filter` y `reduce` que veremos más adelante. 

```typescript
//Aún no hemos visto arrays, pero sigue una forma muy convencional tipo[]=[....]
const numeros: number[] = [1, 2, 3, 4, 5];

const cuadrados: number[] = numeros.map((numero: number): number => numero ** 2);// ** eleva al cuadrado 
console.log(cuadrados); // [1, 4, 9, 16, 25]

//Otra forma usando una firma de función: permite reutilización de firma
type ff=(numero: number) => number;

const mifuncion:ff = (numero) => numero**2;
const cuadrados2: number[] = numeros.map(mifuncion);
console.log(cuadrados2); // [1, 4, 9, 16, 25]

const mifuncioncubo:ff = (numero) => numero**3;
const cubos: number[] = numeros.map(mifuncioncubo);
console.log(cubos); // [1, 8, 27, 64, 125]
```

> [!TIP]
> Con `map`, `filter` y `reduce`, TypeScript suele **inferir** el tipo del parámetro a partir del array. El código anterior (línea 2)  se puede simplificar a `numeros.map((numero) => numero ** 2)` y aun así sigue siendo `number[]`.

<a id="4-valores-predeterminados-de-parámetros"></a>
## 4. Valores predeterminados de parámetros

ES6 permite asignar valores predeterminados a los parámetros de una función. Esto es útil cuando un parámetro es opcional:

```typescript
function saludar(nombre: string = "Usuario"): void {
  console.log(`¡Hola, ${nombre}!`);
}

saludar(); // Imprime: ¡Hola, Usuario!
saludar("Lara"); // Imprime: ¡Hola, Lara!
```

<a id="5-rest-parameters-y-operador-spread"></a>
## 5. Rest parameters y operador spread

Los rest parameters y el operador spread (`...`) permiten trabajar con un número variable de argumentos en una función. En TypeScript, un rest parameter es un array tipado, le dice a TypeScript: "Empaqueta todos los argumentos que me pasen sueltos y mételos dentro de un Array llamado 'lo que sea'".:

```typescript
//CON rest parameter y spread. Utilizado cuando creo los datos al vuelo
// ESTE CONCEPTO SE DESARROLLARÁ MÁS ADELANTE:
// - `reduce()` --> 06_Arrays.md
function sumar(...numeros: number[]): number {
  return numeros.reduce((total, numero) => total + numero, 0); //REDUCE a un único valor
}

//Aquí el DETALLE, es que no le paso un ARRAY!!!
const resultado: number = sumar(1, 2, 3, 4, 5);
console.log(resultado); // Imprime: 15

//SIN rest parameter ni spread. Utilizado cuando ya tengo los datos previamente creados
// ESTE CONCEPTO SE DESARROLLARÁ MÁS ADELANTE:
// - `reduce()` --> 06_Arrays.md
function sumar2(numeros: number[]): number {
  return numeros.reduce((total, numero) => total + numero, 0);
}

let otro: number[] = [1, 2, 3, 4, 5];
console.log(sumar2(otro));
//Otra forma de pasarle un vector ya creado:
console.log(sumar(...otro));
```

> `reduce()` lo veremos más adelante.

> [!TIP]
>  El rest parameter también puede ser una tupla para tipos mixtos: `function crearUsuario(...datos: [nombre: string, edad: number])`.

<a id="6-funciones-como-expresiones-y-tipos-de-función"></a>
## 6. Funciones como expresiones (y tipos de función)

Las funciones pueden asignarse a variables y pasarse como argumentos a otras funciones. Esto es **fundamental para conceptos como callbacks y promesas**. En TypeScript podemos tipar la función que se recibe:

```typescript
const funcionSaludo = (nombre: string): void => {
  console.log(`¡Hola, ${nombre}!`);
};

// --- OPCIÓN 1: Tipado 'inline' (directo en la firma) ---
const ejecutarFuncion = (f: (nombre: string) => void): void => {
  f("Don Tancredo");//f se puede llamar como queramos, se instancia en ese momento
}
ejecutarFuncion(funcionSaludo); // Imprime: ¡Hola, Don Tancredo!

// --- OPCIÓN 2: Usando un tipo explícito (alias de firma) ---
// Recordamos la Firma: Tipo de función reutilizable (la "firma" que ya conocemos).
type Operacion = (a: number, b: number) => number;
// Reutilizamos
const sumar: Operacion = (a, b) => a + b;
const multiplicar: Operacion = (a, b) => a * b;


type firmafuncion=(nombre: string) => void; //Firma
const funcionSaluda:firmafuncion=(nombre) => { //Se instancia en una función
    console.log(`¡Hola, ${nombre}!`);
};
const ejecutarFuncion2 = (f: firmafuncion): void => {
  f("Doña Tancreda");//f se puede llamar como queramos, se instancia en ese momento
}

ejecutarFuncion(funcionSaludo); // Imprime: ¡Hola, Don Tancredo!
ejecutarFuncion2(funcionSaluda); // Imprime: ¡Hola, Doña Tancreda!
```

El tipo del parámetro `funcion` es `(nombre: string) => void`: "una función que recibe un `string` y no devuelve nada". Si `funcionSaludo` no encajara con esa firma, `tsc` daría error.

## 7. Otros tipos de función: callbacks

Para terminar esta sección comentar que hay otros tipos de funcinoes:  los callbacks. Un callback es sencillamente una función que se le pasa a otra como argumento (al igual que pasarías un número o un texto) para que sea ejecutada dentro de ella.

Históricamente usábamos callbacks para gestionar tareas que tardaban un tiempo en responder (como peticiones HTTP o temporizadores). Hoy en día, para operaciones asíncronas preferimos usar **Promesas y async/await** para evitar el código anidado (callback hell). Un ejemplo de esta sintaxis moderna es el que ya vimos en 00_introduccion.md cuando probamos la llamada a una API (swapi).

### 📦 Ejemplo completo: `funciones.ts`

Funciones tipadas: parámetros, arrow functions, callbacks y overloads.

```typescript

/**
 * Fichero 06: Funciones en TypeScript
 * -------------------------------------------
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
// 🔁 Function overloads: se definen justo debajo; se practican en
// EjerciciosPropuestos/ejerciciosTS.md §9 (Funciones) P5

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

> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `04_Funciones.ts` y ejecuta `npx tsx 04_Funciones.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).

> ✏️ **Práctica:** [`s02/09-funciones.ts`](../../../ejercicios/s02/09-funciones.ts) (params, rest, callbacks, closures) · 🔑 [`s03/08-desestructuracion-spread-optional.ts`](../../../ejercicios/s03/08-desestructuracion-spread-optional.ts) (rest/spread, puente a React) · [`s03/06-utility-types.ts`](../../../ejercicios/s03/06-utility-types.ts) (`Partial`/`Pick`/`Omit`/`Record`) · [catálogo S2·10, S3·25, S3·23 y S3·18](../../../sesiones/EjerciciosPropuestos/ejerciciosTS.md).

---

<a id="8-ámbito-scope-en-typescript"></a>
## 8. Ámbito (Scope) en TypeScript

En JavaScript, el ámbito (scope) se refiere a las reglas que determinan dónde pueden ser accedidas las variables y funciones dentro de un programa. Comprender el ámbito y el uso de `this` es fundamental para escribir código JavaScript efectivo.
// ⚠️ `this` no se cubre en este curso: modern TS/React evita `this` (arrow functions y hooks).
Este manual explora los conceptos de ámbito y `this` en ECMAScript 6 y versiones posteriores, y muestra cómo TypeScript los tipa y protege.

<a id="81-ámbito-scope"></a>
### 8.1. Ámbito (Scope)

El ámbito en JavaScript determina dónde una variable o función es accesible en un programa. ECMAScript 6 introduce nuevos tipos de ámbito, como el ámbito de bloque.

<a id="811-ámbito-global"></a>
#### 8.1.1 Ámbito Global

Las variables declaradas fuera de cualquier función tienen un ámbito global y pueden ser accedidas desde cualquier lugar del código.

Ejemplo:

```typescript
let globalVar: string = "Soy global";

function exampleFunction(): void {
  console.log(globalVar); // Acceso a globalVar desde la función
}

exampleFunction(); // Imprime "Soy global"
console.log(globalVar); // También se puede acceder aquí
```


<a id="812-ámbito-de-función"></a>
#### 8.1.2 Ámbito de Función

Las variables declaradas dentro de una función tienen un ámbito local y solo pueden ser accedidas desde dentro de esa función.

Ejemplo:

```typescript
function exampleFunction(): void {
  let localVar: string = "Soy local";
  console.log(localVar); // Acceso a localVar dentro de la función
}

exampleFunction(); // Imprime "Soy local"
// console.log(localVar); // Error: localVar no está definida fuera de la función
```

<a id="813-ámbito-de-bloque"></a>
#### 8.1.3 Ámbito de Bloque

ECMAScript 6 introduce el ámbito de bloque, que se aplica a variables declaradas con `let` y `const`. Estas variables solo son accesibles dentro del bloque en el que se declaran.

Ejemplo:

```typescript
if (true) {
  let blockVar: string = "Soy local de bloque";
  console.log(blockVar); // Acceso a blockVar dentro del bloque
}

// console.log(blockVar); // Error: blockVar no está definida fuera del bloque
```

<a id="814-ámbito-de-cierre-closures"></a>
#### 8.1.4 Ámbito de Cierre (Closures)

Un componente padre en React puede pasarle datos (props) a sus hijos, pero la comunicación en sentido inverso no ocurre mediante el envío directo de datos del hijo al padre, sino a través de funciones **callback** pasadas como props. 

Cuando un hijo (como un botón dentro de un formulario) ejecuta esa función recibida, esta se ejecuta dentro del contexto del padre gracias a los closures de JavaScript: la función **callback** *retiene el acceso al ámbito  donde fue creada en el padre* (incluyendo sus variables y funciones para actualizar el estado), permitiendo que la interacción ocurrida en el hijo modifique y actualice el estado del componente superior..




> [!NOTE]
>En React, cada renderizado de un componente es una llamada a una función. Los closures son la razón por la que Hooks como useState, useEffect o useCallback recuerdan la información entre renderizados.
<a id="7-otros-tipos-de-función-callbacks"></a>
> 
Ejemplo:

```typescript
function outerFunction(): () => void {
  let outerVar: string = "Externa";

  function innerFunction(): void {
    console.log(outerVar); // Acceso a outerVar dentro del closure
  }

  return innerFunction;
}

const closureExample: () => void = outerFunction();
closureExample(); // Imprime "Externa" ¿cómo es posible si la función ya se ejecutó y acabó?
```

<a id="82-ejemplos-prácticos"></a>
### 8.2. Ejemplos Prácticos

<a id="ejemplo-1-closure-contador-ámbito-léxico-en-acción"></a>
#### 8.2.1 Ejemplo: Closure contador 

```typescript
interface Contador {
  incrementar: () => number;
  decrementar: () => number;
  valor: () => number;
}

function crearContador(inicial: number = 0): Contador {
  let contador: number = inicial; // Variable privada dentro del closure

  return {
    incrementar: () => ++contador,
    decrementar: () => --contador,
    valor: () => contador,
  };
}

const c: Contador = crearContador(10);
console.log(c.incrementar()); // 11
console.log(c.incrementar()); // 12
console.log(c.decrementar()); // 11
console.log(c.valor());       // 11
```


> 📖 **Los closures** (§8.1.4 y §8.2.1) son también la lógica interna de los hooks de React: cada renderizado es una llamada a función y por eso el estado se captura por cierre.

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)


