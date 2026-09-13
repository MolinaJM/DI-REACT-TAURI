# **Capítulo 04. Contenido 📝** 🖥️

- [4. Funciones en TypeScript](#4-funciones-en-typescript)
  - [1. Declaración de funciones](#1-declaraci%C3%B3n-de-funciones)
  - [2. Expresiones de funciones o expresiones funcionales.](#2-expresiones-de-funciones-o-expresiones-funcionales)
  - [3. Funciones de flecha](#3-funciones-de-flecha)
    - [3.1. Funciones de Flecha como Argumentos](#31-funciones-de-flecha-como-argumentos)
  - [4. Valores predeterminados de parámetros](#4-valores-predeterminados-de-par%C3%A1metros)
  - [5. Rest parameters y operador spread](#5-rest-parameters-y-operador-spread)
  - [6. Funciones como expresiones (y tipos de función)](#6-funciones-como-expresiones-y-tipos-de-funci%C3%B3n)
  - [7. Cierres (closures)](#7-cierres-closures)
  - [8. Tipos de función, callbacks y genéricos](#8-tipos-de-funci%C3%B3n-callbacks-y-gen%C3%A9ricos)
- 🧪 **Ejercicios:** [Funciones en Profundidad](../../ejerciciosTS.md#13-funciones-en-profundidad) · [Generics](../../ejerciciosTS.md#7-generics-genéricos)

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

### 3.1. Funciones de Flecha como Argumentos

Las funciones de flecha son útiles para funciones de orden superior, como `map`, `filter` y `reduce` que veremos más adelante. 

```typescript
//Aún no hemos visto arrays, pero sigue una forma muy convencional tipo[]=[....]
const numeros: number[] = [1, 2, 3, 4, 5];

const cuadrados: number[] = numeros.map((numero: number): number => numero ** 2);
console.log(cuadrados); // [1, 4, 9, 16, 25]
```

> [!TIP]
> Con `map`, `filter` y `reduce`, TypeScript suele **inferir** el tipo del parámetro a partir del array. El código anterior se puede simplificar a `numeros.map((numero) => numero ** 2)` y aun así sigue siendo `number[]`.

## 4. Valores predeterminados de parámetros

ES6 permite asignar valores predeterminados a los parámetros de una función. Esto es útil cuando un parámetro es opcional:

```typescript
function saludar(nombre: string = "Usuario"): void {
  console.log(`¡Hola, ${nombre}!`);
}

saludar(); // Imprime: ¡Hola, Usuario!
saludar("Lara"); // Imprime: ¡Hola, Lara!
```

## 5. Rest parameters y operador spread

Los rest parameters y el operador spread (`...`) permiten trabajar con un número variable de argumentos en una función. En TypeScript, un rest parameter es un array tipado, le dice a TypeScript: "Empaqueta todos los argumentos que me pasen sueltos y mételos dentro de un Array llamado 'lo que sea'".:

```typescript
//Rest parameter ni spread. Utilizado cuando creo los datos al vuelo
function sumar(...numeros: number[]): number {
  return numeros.reduce((total, numero) => total + numero, 0);
}

const resultado: number = sumar(1, 2, 3, 4, 5);
console.log(resultado); // Imprime: 15

//Sin rest parameter ni spread. Utilizado cuando ya tengo los datos previamente creados
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

## 6. Funciones como expresiones (y tipos de función)

Las funciones pueden asignarse a variables y pasarse como argumentos a otras funciones. Esto es **fundamental para conceptos como callbacks y promesas**. En TypeScript podemos tipar la función que se recibe:

```typescript
const funcionSaludo = (nombre: string): void => {
  console.log(`¡Hola, ${nombre}!`);
};

const ejecutarFuncion = (f: (nombre: string) => void): void => {
  f("Don Tancredo");//f se puede llamar como queramos, se instancia en ese momento
}

ejecutarFuncion(funcionSaludo); // Imprime: ¡Hola, Don Tancredo!
```

El tipo del parámetro `funcion` es `(nombre: string) => void`: "una función que recibe un `string` y no devuelve nada". Si `funcionSaludo` no encajara con esa firma, `tsc` daría error.

## 7. Cierres o clausuras (closures)





Los cierres o `Closures` son comportamientos de funciones que tienen acceso a variables de su ámbito externo incluso después de que ese ámbito haya terminado su ejecución. Esto permite mantener datos privados en una función. Se llama "closure" porque "guarda" la variable para ser accedida desde fuera.

Otra explicación, un closure ocurre en JS/TS cuando una función interna accede a variables que están definidas en el ámbito (scope) de su función padre, incluso después de que la función externa se haya ejecutado.

```typescript
function contador(): () => number {
  let count: number = 0;
  return function (): number { //Esta función "guarda/closure" la variable count
    count++;
    return count;
  };
}

const incrementar: () => number = contador();
console.log(incrementar()); // Imprime: 1
console.log(incrementar()); // Imprime: 2
```

> [!NOTE]
>En React, cada renderizado de un componente es una llamada a una función. Los closures son la razón por la que Hooks como useState, useEffect o useCallback recuerdan la información entre renderizados.
## 8. Tipos de función, callbacks y genéricos

Para terminar el capítulo, hay más tipos de funciones que veremos en siguientes capítulos:

```typescript
// Tipo de función reutilizable
type Operacion = (a: number, b: number) => number;

const sumar: Operacion = (a, b) => a + b;
const multiplicar: Operacion = (a, b) => a * b;

// Callback con tipos. Es una función a la que se le pasa otra para que haga algo a posteri con los datos.
//El desarrollo del ejemplo sería muy largo. Se verá más adelante.
function procesar(numeros: number[], callback: (n: number) => void): void {
  numeros.forEach(callback);
}

// Genérico: el tipo se decide en la llamada
function primero<T>(lista: T[]): T | undefined {
  return lista[0];
}

const n: number | undefined = console.log(primero([10, 20, 30]));//10
const s: string | undefined = console.log(primero(["a", "b"])); //"a"
```

> [!IMPORTANT]
> Los **genéricos** (`<T>`) son la herramienta de TypeScript para escribir funciones que funcionan con muchos tipos sin perder la seguridad. Verás el patrón `identidad<T>`, `map<T, U>` y en capítulos posteriores.

---
### 📦 Ejemplo completo: `funciones.ts`

Funciones tipadas: parámetros, arrow functions, callbacks y overloads.

```typescript
export {};

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

### 📦 Ejemplo completo: `generics-utility-types.ts`

Generics (identidad, filtros, constraints, factorías) y utility types (Partial, Pick, Omit, Record, ReturnType…).

```typescript
export {};

/**
 * Fichero 19: Generics y Utility Types
 * -------------------------------------------
 * - Generics: identidad, primero, filtros, constraints (extends), factorias
 * - Utility Types: Partial, Pick, Omit, Record, Parameters, ReturnType, NonNullable
 *
 * Son la base del TS aplicado a React y Tauri:
 * - `useState<T>`, `useRef<T>`, `invoke<T>`, componentes genericos `<T>`
 * - `Partial<Pelicula>` (formularios), `Omit` (crear sin id), `Record` (tablas de
 *   correspondencias), `ReturnType` (tipar hooks/resultados)
 */

// ============================================================================
// GENERICS: el tipo se decide en la llamada
// ============================================================================

// Funcion identidad: devuelve el valor con SU tipo, sin cambiarlo
function identidad<T>(valor: T): T {
    return valor;
}

const n = identidad(42);        // number
const s = identidad("hola");    // string
console.log(n, s);

// primero<T>: el primer elemento o undefined (noUncheckedIndexedAccess)
function primero<T>(arr: T[]): T | undefined {
    return arr[0];
}

const primeroN = primero([10, 20, 30]); // number | undefined
const primeroS = primero(["a", "b"]);   // string | undefined
console.log(primeroN, primeroS);

// Filtro generico con predicado tipado
function filtrarPor<T>(arr: T[], predicado: (item: T) => boolean): T[] {
    return arr.filter(predicado);
}

const pares = filtrarPor([1, 2, 3, 4, 5], (x) => x % 2 === 0);
console.log(pares); // [2, 4]

// Constraints con extends: solo tipos que tengan .length
function esLargo<T extends { length: number }>(valor: T, max: number): boolean {
    return valor.length <= max;
}

console.log(esLargo("prueba", 10));    // true (string tiene length)
console.log(esLargo([1, 2, 3], 2));    // false (array tiene length)

// Acceso indexado seguro: K queda restringido a las claves reales de T
function obtenerValor<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const usuario = { id: 1, nombre: "Ana", email: "ana@mail.com" };
console.log(obtenerValor(usuario, "nombre"));    // "Ana"
// obtenerValor(usuario, "telefono");             // Error: no existe en Usuario

// Factoria generica sin clases: devuelve un objeto con metodos
function crearCola<T>() {
    const items: T[] = [];

    return {
        encolar(item: T): void {
            items.push(item);
        },
        desencolar(): T | undefined {
            return items.shift();
        },
        estaVacia(): boolean {
            return items.length === 0;
        }
    };
}

const cola = crearCola<string>();
cola.encolar("primero");
cola.encolar("segundo");
console.log(cola.desencolar()); // "primero"
console.log(cola.estaVacia());  // false

// ----------------------------------------------------------------------------
// Generics en React / Tauri (patron que veras a diario)
// ----------------------------------------------------------------------------
// type RespuestaApi<T>      -> invoke<T> tipa lo que devuelve el backend Rust
// useState<Todo[]>([])      -> el estado sabe su tipo desde el inicio
// function TablaGenerica<T>(...) -> un componente sirve para cualquier entidad

// ============================================================================
// UTILITY TYPES: tipos derivados sin escribirlos a mano
// ============================================================================

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string;
}

const productoBase: Producto = { id: 1, nombre: "Teclado", precio: 49.9 };

// Partial<T>: todas las props opcionales (perfecto para "editar")
const edicion: Partial<Producto> = { precio: 35 }; // solo tocas lo que cambia
console.log({ ...productoBase, ...edicion });

// Pick<T, K>: solo las props indicadas
type ResumenProducto = Pick<Producto, "id" | "nombre">;
const resumen: ResumenProducto = { id: 1, nombre: "Teclado" };
console.log(resumen);

// Omit<T, K>: quita props (en React: crear una Pelicula sin el id auto)
type ProductoSinDescripcion = Omit<Producto, "descripcion">;
const sinDesc: ProductoSinDescripcion = { id: 2, nombre: "Raton", precio: 12 };
console.log(sinDesc);

// Record<K, V>: diccionario con claves conocidas (tablas de correspondencias)
type Semana = Record<"lunes" | "martes" | "miercoles", string>;
const horarios: Semana = {
    lunes: "9:00",
    martes: "10:00",
    miercoles: "11:00"
};
console.log(horarios);

// Parameters<T> y ReturnType<T>: extraer tipos de una funcion
function crearProducto(nombre: string, precio: number): Producto {
    return { id: 0, nombre, precio } as Producto;
}

type ParamsCrear = Parameters<typeof crearProducto>;      // [string, number]
type RetornoCrear = ReturnType<typeof crearProducto>;     // Producto

function usarParams(args: ParamsCrear): Producto {
    return crearProducto(...args);
}
console.log(usarParams(["Monitor", 199]));

// NonNullable<T>: elimina null | undefined de una union
type ValorPosible = string | null | undefined;
type ValorLimpio = NonNullable<ValorPosible>;  // string
const limpio: ValorLimpio = "texto seguro";
console.log(limpio);
```

> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `04_Funciones.ts` y ejecuta `npx tsx 04_Funciones.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).
> ✏️ **Práctica:** [`s02/06-funciones.ts`](../../../ejercicios/s02/06-funciones.ts) (params, rest, callbacks, closures) · 🔑 [`s03/09-desestructuracion-spread-optional.ts`](../../../ejercicios/s03/09-desestructuracion-spread-optional.ts) (rest/spread, puente a React) · [`s03/02-generics.ts`](../../../ejercicios/s03/02-generics.ts) (genéricos) · [`s03/03-utility-types.ts`](../../../ejercicios/s03/03-utility-types.ts) (`Partial`/`Pick`/`Omit`/`Record`) · [catálogo S2·13, S3·7–S3·8 y S3·12](../../../sesiones/ejerciciosTS.md).

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
