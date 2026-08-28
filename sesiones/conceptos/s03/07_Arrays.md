# 07. Estructuras de Datos. Arrays en TypeScript 📝\*\* 🖥️

- [07. Estructuras de Datos. Arrays en TypeScript 📝\*\* 🖥️](#07-estructuras-de-datos-arrays-en-typescript--️)
  - [8.1 Introducción](#81-introducción)
  - [8.2 Creación de Arrays](#82-creación-de-arrays)
    - [8.2.1 Arrays Literales](#821-arrays-literales)
    - [8.2.2 Constructor `Array`](#822-constructor-array)
  - [8.3 Acceso y Modificación de Elementos](#83-acceso-y-modificación-de-elementos)
    - [8.3.1 Índices y Elementos](#831-índices-y-elementos)
    - [8.3.2 Modificación de Elementos](#832-modificación-de-elementos)
  - [8.4 Métodos Importantes de Arrays](#84-métodos-importantes-de-arrays)
    - [i. `push()` y `pop()`](#i-push-y-pop)
    - [ii. `shift()` y `unshift()`](#ii-shift-y-unshift)
    - [iii. `Slice()`](#iii-slice)
    - [iv. `splice()`](#iv-splice)
    - [v. `concat()`](#v-concat)
    - [vi. `map()`](#vi-map)
    - [vii. `filter()`](#vii-filter)
    - [viii. `reduce()`](#viii-reduce)
    - [ix. `sort()`](#ix-sort)
    - [x. `forEach()`](#x-foreach)
    - [xi. `at()` (ES2022)](#xi-at-es2022)
    - [xii. `findLast()` y `findLastIndex()` (ES2023)](#xii-findlast-y-findlastindex-es2023)
    - [xiii. Métodos inmutables (ES2023)](#xiii-métodos-inmutables-es2023)
  - [8.5 Arrays Multidimensionales](#85-arrays-multidimensionales)
    - [Ejemplos de Dificultad Media](#ejemplos-de-dificultad-media)
      - [Ejemplo 1: Filtrar Números Pares](#ejemplo-1-filtrar-números-pares)
      - [Ejemplo 2: Suma de Matrices](#ejemplo-2-suma-de-matrices)
    - [Ejemplos de Dificultad Alta](#ejemplos-de-dificultad-alta)
      - [Ejemplo 3: Rotación de Matrices](#ejemplo-3-rotación-de-matrices)
      - [Ejemplo 4: Búsqueda Binaria](#ejemplo-4-búsqueda-binaria)
  - [8.6 Metodos que modifican o no el Array original](#86-metodos-que-modifican-o-no-el-array-original)
    - [8.6.1 Modificar el Array Original](#861-modificar-el-array-original)
    - [8.6.2 Crear una Copia](#862-crear-una-copia)
  - [8.7 Recorrer Arrays en TypeScript](#87-recorrer-arrays-en-typescript)
    - [8.7.1 Usando `for...in`](#871-usando-forin)
    - [8.7.2 Usando `for...of`](#872-usando-forof)
    - [8.7.3 Diferencias entre `for...in` y `for...of`](#873-diferencias-entre-forin-y-forof)
    - [8.7.4 Método `forEach`](#874-método-foreach)
  - [8.8 Clonar un Array](#88-clonar-un-array)
  - [8.9 Destructuring con Arrays](#89-destructuring-con-arrays)
    - [a. Destructuring Básico](#a-destructuring-básico)
    - [b. Asignación por Defecto](#b-asignación-por-defecto)
    - [c. Destructuring Anidado](#c-destructuring-anidado)
    - [d. Rest Parameters](#d-rest-parameters)
  - [8.10 Tipado de arrays: tipos y genéricos](#810-tipado-de-arrays-tipos-y-genéricos)

---

## 8.1 Introducción

Los arrays son una de las estructuras de datos fundamentales en JavaScript. Permiten almacenar y organizar colecciones de elementos de manera ordenada. En este documento, exploraremos en profundidad cómo trabajar con arrays en TypeScript, donde además de los métodos de ES6+ contamos con `T[]`, `Array<T>`, `readonly` y tuplas.

## 8.2 Creación de Arrays

### 8.2.1 Arrays Literales

Puedes crear un array literalmente encerrando elementos entre corchetes `[]` y separándolos por comas. En TypeScript se anota el tipo de los elementos:

```typescript
const frutas: string[] = ["manzana", "plátano", "naranja"];
```

### 8.2.2 Constructor `Array`

También puedes utilizar el constructor `Array` para crear un array vacío o con elementos predeterminados.

```typescript
const miArrayVacio: number[] = new Array<number>();
const numeros: number[] = new Array<number>(1, 2, 3, 4, 5);
```

> [!WARNING]
> `new Array(5)` (un solo argumento numérico) crea un array con 5 huecos, NO `[5]`. TypeScript lo tipa como `number[]` con largo 5 pero sin valores. Prefiere `Array.from({ length: 5 })` o un literal.

## 8.3 Acceso y Modificación de Elementos

### 8.3.1 Índices y Elementos

Los elementos en un array se numeran con índices comenzando desde 0. Puedes acceder a un elemento utilizando su índice.

```typescript
const fruta: string | undefined = frutas[0]; // Acceder a la primera fruta (manzana)
```

> [!NOTE]
> Con la opción `noUncheckedIndexedAccess` (activa en este curso), `frutas[0]` devuelve `string | undefined`, porque un índice puede estar vacío. Es una protección que en JavaScript puro no existe.

### 8.3.2 Modificación de Elementos

Puedes modificar elementos en un array asignando un nuevo valor a través de su índice.

```typescript
frutas[1] = "pera"; // Modificar la segunda fruta (plátano a pera)
```

## 8.4 Métodos Importantes de Arrays

Aunque estos métodos son los mismos que en JavaScript, en TypeScript sus **firmas son genéricas**, de modo que el tipo de los elementos se conserva durante la transformación.

### i. `push()` y `pop()`

- `push(elemento)`: Agrega un elemento al final del array.
- `pop()`: Elimina el último elemento del array y lo retorna.

```typescript
const numeros: number[] = [1, 2, 3];
numeros.push(4); // [1, 2, 3, 4]
const ultimo: number | undefined = numeros.pop(); // último = 4, numeros = [1, 2, 3]
```

### ii. `shift()` y `unshift()`

- `shift()`: Elimina el primer elemento del array y lo retorna.
- `unshift(elemento)`: Agrega un elemento al principio del array.

```typescript
const colores: string[] = ["rojo", "verde", "azul"];
const primerColor: string | undefined = colores.shift(); // primerColor = "rojo", colores = ["verde", "azul"]
colores.unshift("amarillo"); // colores = ["amarillo", "verde", "azul"]
```

### iii. `Slice()`

El método `slice()` en JavaScript se utiliza para extraer una porción de un array y crear un nuevo array con los elementos seleccionados.
`slice()` toma uno o dos argumentos: el índice de inicio (inclusive) y el índice de fin (exclusivo) de la porción que se desea extraer.

**Sintaxis:**

```typescript
array.slice([índiceInicio[, índiceFin]])
```

- `índiceInicio` (opcional): El índice a partir del cual se comenzará a extraer elementos. Si no se especifica, se usará 0 como índice de inicio.
- `índiceFin` (opcional): El índice hasta el cual se extraerán elementos. El elemento en esta posición no se incluirá en el nuevo array. Si no se especifica, se extraerán elementos hasta el final del array.

**Ejemplos:**

```typescript
const frutas: string[] = ["manzana", "banana", "cereza", "dátiles", "uva"];

// Ejemplo 1: Extraer una porción del array original
const porcion1: string[] = frutas.slice(1, 4);
console.log(porcion1); // Resultado: ["banana", "cereza", "dátiles"]

// Ejemplo 2: Extraer elementos desde el índice de inicio
const desdeInicio: string[] = frutas.slice(2);
console.log(desdeInicio); // Resultado: ["cereza", "dátiles", "uva"]

// Ejemplo 3: Copiar un array completo
const copiaFrutas: string[] = frutas.slice();
console.log(copiaFrutas); // Resultado: ["manzana", "banana", "cereza", "dátiles", "uva"]
```

### iv. `splice()`

`splice(indice, cantidad, elemento1, elemento2, ...)`: Permite modificar el array al eliminar, reemplazar o agregar elementos en una posición específica.

```typescript
const numeros: number[] = [1, 2, 3, 4, 5];
numeros.splice(2, 1); // Elimina el elemento en el índice 2: [1, 2, 4, 5]
numeros.splice(2, 0, 6, 7); // Agrega 6 y 7 en el índice 2: [1, 2, 6, 7, 4, 5]
```

### v. `concat()`

`concat(array1, array2, ...)`: Combina dos o más arrays creando uno nuevo.

```typescript
const frutas1: string[] = ["manzana", "plátano"];
const frutas2: string[] = ["naranja", "pera"];
const todasLasFrutas: string[] = frutas1.concat(frutas2); // ["manzana", "plátano", "naranja", "pera"]
```

### vi. `map()`

`map(función)`: Crea un nuevo array aplicando una función a cada elemento del array original. En el callback (los paréntesis) de esta función, podemos utilizar hasta 3 parámetros: el valor de cada elemento, el índice de la iteración, y el array en sí. En TypeScript, `map<U>(fn: (valor: T, índice: number, array: T[]) => U): U[]` devuelve un array **del tipo que devuelva el callback**.

```typescript
const numeros: number[] = [1, 2, 3];
const duplicados: number[] = numeros.map((numero) => numero * 2); // [2, 4, 6]
```

```typescript
const numeros1: number[] = [2, 2, 2];
const numeros2: number[] = [2, 2, 2];
const numerosSumados: number[] = numeros1.map((el, i) => el + numeros2[i]); // [4, 4, 4]
```

> [!TIP]
> En este último ejemplo, `numeros2[i]` es `number | undefined` por `noUncheckedIndexedAccess`. Como `el` es `number`, la expresión `el + numeros2[i]` requiere estrechar: una solución limpia es `numeros1.map((el, i) => el + (numeros2[i] ?? 0))`.

**Cambio de tipo con map:**

```typescript
interface Producto {
  nombre: string;
  precio: number;
}

const productos: Producto[] = [
  { nombre: "Ratón", precio: 12 },
  { nombre: "Teclado", precio: 30 },
];

const nombres: string[] = productos.map((p) => p.nombre); // ["Ratón", "Teclado"]
```

### vii. `filter()`

`filter(función)`: Crea un nuevo array con todos los elementos que cumplan una condición dada por la función. Igual que en map(), podemos utilizar el valor, el índice, y el array.

```typescript
const edades: number[] = [25, 18, 30, 15, 40];
const mayoresDeEdad: number[] = edades.filter((edad) => edad >= 18); // [25, 18, 30, 40]
```

> [!NOTE]
> `filter` devuelve el mismo tipo del array original (o un subtipo si usas un *type guard*: `arr.filter((x): x is T => ...)` — lo veremos en capítulos de Fetch/localStorage).

### viii. `reduce()`

`reduce(función, valorInicial)`: Aplica una función acumulativa a los elementos del array, retornando un único valor acumulado. La función callback recibe `(acumulador, valorActual, índice, array)`. El `valorInicial` (opcional) se pasa como **segundo argumento a `reduce()`**, no al callback. Si se omite, el primer elemento del array se usa como acumulador inicial y la iteración empieza desde el segundo elemento.

```typescript
const initialValue: number = 0;
const numeros: number[] = [1, 2, 3, 4, 5];
const suma: number = numeros.reduce(
  (acumulador, numero) => acumulador + numero,
  initialValue,
); // 15
```

```typescript
const numeros: number[] = [5, 10, 15];
const sumaConInicial: number = numeros.reduce((acumulador, numero) => acumulador + numero, 10); // 40
const sumaSinInicial: number = numeros.reduce((acumulador, numero) => acumulador + numero); // 30
```

> ⚠️ Si llamas a `reduce()` sin valor inicial sobre un **array vacío**, lanza `TypeError`. Usa siempre un valor inicial cuando el array pueda estar vacío. Además, con valor inicial, TypeScript infiere el tipo del acumulador a partir de ese valor: `numeros.reduce((acc, n) => acc + n.toFixed(1), "")` devuelve `string`.

**Acumular otro tipo (agrupar por categoría):**

```typescript
interface Tarea {
  titulo: string;
  estado: "pendiente" | "hecha";
}

const tareas: Tarea[] = [
  { titulo: "Comprar", estado: "pendiente" },
  { titulo: "Estudiar", estado: "hecha" },
  { titulo: "Correr", estado: "pendiente" },
];

const porEstado: Record<string, Tarea[]> = tareas.reduce(
  (acc, tarea) => {
    // acc inicia como { pendiente: [], hecha: [] } gracia al tipo Record<string, Tarea[]>
    acc[tarea.estado].push(tarea);
    return acc;
  },
  { pendiente: [], hecha: [] } as Record<string, Tarea[]>,
);
```

### ix. `sort()`

El método `sort()` en JavaScript se utiliza para ordenar los elementos de un array en su lugar (sin crear un nuevo array). Por defecto, `sort()` ordena los elementos como cadenas de texto y los compara en orden lexicográfico. Sin embargo, puedes proporcionar una función de comparación personalizada para ordenar elementos de acuerdo a criterios específicos. El valor de retorno de esta función debe ser un número cuyo signo indique el orden relativo de los dos elementos: negativo si a es menor que b, positivo si a es mayor que b, y cero si son iguales.

```typescript
array.sort([comparador]);
```

- `array`: El array que deseas ordenar.
- `comparador` (opcional): Una función `(a: T, b: T) => number` que define el criterio de ordenación personalizado.

```typescript
const numeros: number[] = [4, 2, 9, 1, 5];
numeros.sort((a, b) => a - b);
console.log(numeros); // Resultado: [1, 2, 4, 5, 9]
```

```typescript
const letras: string[] = ["b", "d", "a", "c"];
letras.sort().reverse();
console.log(letras); // Resultado: ["d", "c", "b", "a"]
```

Primero ordenamos las letras alfabéticamente y luego invertimos el orden usando `reverse()` para obtener el orden inverso.

> [!WARNING]
> `sort()` y `reverse()` **modifican el array original**. En patrones funcionales (y en estado de React) se prefiere `toSorted()` y `toReversed()`, que devuelven copias (ES2023).

### x. `forEach()`

`forEach(función)`: Ejecuta una función en cada elemento del array sin crear un nuevo array.

```typescript
const frutas: string[] = ["manzana", "plátano", "naranja"];
frutas.forEach((fruta) => console.log(fruta));
```

### xi. `at()` (ES2022)

Permite acceder a elementos desde el final usando índices negativos, más legible que `arr[arr.length - 1]`:

```typescript
const frutas: string[] = ["manzana", "plátano", "naranja"];
console.log(frutas.at(0));   // "manzana"
console.log(frutas.at(-1));  // "naranja" (último elemento)
console.log(frutas.at(-2));  // "plátano"
```

### xii. `findLast()` y `findLastIndex()` (ES2023)

Como `find()` y `findIndex()`, pero recorren el array de derecha a izquierda:

```typescript
const numeros: number[] = [5, 12, 8, 130, 44];
console.log(numeros.findLast((n) => n > 10));       // 44 (type: number | undefined)
console.log(numeros.findLastIndex((n) => n > 10));  // 4
```

### xiii. Métodos inmutables (ES2023)

`toSorted()`, `toReversed()`, `toSpliced()` y `with()` son versiones que **no modifican el array original**, devolviendo una copia:

```typescript
const original: number[] = [3, 1, 2];

// toSorted() — ordena sin mutar
const ordenado: number[] = original.toSorted(); // [1, 2, 3]
console.log(original);                          // [3, 1, 2] (intacto)

// toReversed() — invierte sin mutar
const invertido: number[] = original.toReversed(); // [2, 1, 3]

// toSpliced(start, deleteCount, ...items) — spliced inmutable
const reemplazado: number[] = original.toSpliced(0, 1, 99); // [99, 1, 2]

// with(index, value) — reemplaza un elemento sin mutar
const cambiado: number[] = original.with(1, 42); // [3, 42, 2]
```

> Estos métodos son preferibles a `sort()`, `reverse()` y `splice()` cuando necesitas preservar el array original (patrón funcional / estado inmutable).

## 8.5 Arrays Multidimensionales

Los arrays multidimensionales son arrays que contienen otros arrays como elementos. Pueden utilizarse para representar matrices y estructuras de datos más complejas. En TypeScript se escriben como `number[][]` (array de array de numbers).

```typescript
const matriz: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const primerElemento: number | undefined = matriz[0]?.[0]; // 1
```

> [!NOTE]
> Con `noUncheckedIndexedAccess`, `matriz[0]` es `number[] | undefined`. El acceso seguro es `matriz[0]?.[0]` (optional chaining), que devuelve `number | undefined`.

### Ejemplos de Dificultad Media

#### Ejemplo 1: Filtrar Números Pares

```typescript
const numeros: number[] = [1, 2, 3, 4, 5, 6];
const pares: number[] = numeros.filter((numero) => numero % 2 === 0); // [2, 4, 6]
```

#### Ejemplo 2: Suma de Matrices

```typescript
const matriz: number[][] = [
  [1, 2],
  [3, 4],
];
const suma: number = matriz
  .reduce((total, fila) => total.concat(fila), [])
  .reduce((a, b) => a + b); // 10
```

### Ejemplos de Dificultad Alta

#### Ejemplo 3: Rotación de Matrices

```typescript
function rotarMatriz(matriz: number[][]): number[][] {
  const filas: number = matriz.length;
  const columnas: number = matriz[0]?.length ?? 0;
  const resultado: number[][] = Array.from({ length: columnas }, () => [] as number[]);

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      resultado[j]![filas - 1 - i] = matriz[i][j];
    }
  }

  return resultado;
}

const matrizOriginal: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];
const matrizRotada: number[][] = rotarMatriz(matrizOriginal);
```

> [!NOTE]
> La aserción `!` (`resultado[j]!`) le dice a TypeScript "este índice existe". La omitiremos cuando sea razonable validar antes; aquí es un ejemplo clásico de cuando el algoritmo garantiza por construcción que el índice es válido.

#### Ejemplo 4: Búsqueda Binaria

```typescript
function busquedaBinaria(array: number[], elemento: number): number {
  let inicio: number = 0;
  let fin: number = array.length - 1;

  while (inicio <= fin) {
    const medio: number = Math.floor((inicio + fin) / 2);
    const valorMedio: number | undefined = array[medio];

    if (valorMedio === elemento) {
      return medio;
    } else if ((valorMedio ?? Infinity) < elemento) {
      inicio = medio + 1;
    } else {
      fin = medio - 1;
    }
  }

  return -1;
}

const numerosOrdenados: number[] = [1, 3, 5, 7, 9, 11, 13];
const indice: number = busquedaBinaria(numerosOrdenados, 7); // 3
```

## 8.6 Metodos que modifican o no el Array original

Aquí están los métodos de arrays que pueden modificar el array original y los que crean una copia:

### 8.6.1 Modificar el Array Original

1. `push(elemento)`: Agrega un elemento al final del array. Modifica el array original al agregar un nuevo elemento al final.

2. `pop()`: Elimina el último elemento del array y lo retorna. Modifica el array original al eliminar un elemento.

3. `shift()`: Elimina el primer elemento del array y lo retorna. Modifica el array original al eliminar un elemento.

4. `unshift(elemento)`: Agrega un elemento al principio del array. Modifica el array original al agregar un nuevo elemento al principio.

5. `splice(indice, cantidad, elemento1, elemento2, ...)`: Permite modificar el array al eliminar, reemplazar o agregar elementos en una posición específica. Esto afecta al array original.

6. `forEach(función)`: Ejecuta una función en cada elemento del array sin crear un nuevo array. No crea una copia; en su lugar, permite realizar modificaciones en el lugar.

7. `sort([comparador])`: Ordena los elementos de un array, modificando dicho array y aplicando el comparador para establecer el orden.

### 8.6.2 Crear una Copia

1. `concat(array1, array2, ...)`: Combina dos o más arrays creando uno nuevo sin modificar los arrays originales. El método `concat` no modifica los arrays originales y crea una nueva copia.

2. `map(función)`: Crea un nuevo array aplicando una función a cada elemento del array original sin modificar el array original. `map` crea una copia transformada.

3. `filter(función)`: Crea un nuevo array con todos los elementos que cumplan una condición dada por la función sin modificar el array original. `filter` crea una copia filtrada.

4. `reduce(función, valorInicial)`: Aplica una función acumulativa a los elementos del array, retornando un único valor acumulado sin modificar el array original. No crea una copia, sino que produce un resultado acumulado.

5. `toSorted()`, `toReversed()`, `toSpliced()` y `with()` (ES2023): devuelven copias sin tocar el original.

## 8.7 Recorrer Arrays en TypeScript

En JavaScript, hay varias formas de recorrer un array. Las dos más comunes son utilizando `for...in` y `for...of`. Cada uno tiene sus propias características y diferencias.

### 8.7.1 Usando `for...in`

El bucle `for...in` se utiliza para iterar sobre las propiedades enumerables de un objeto. Aunque es posible utilizarlo para recorrer arrays, no es la forma más recomendada debido a algunas limitaciones.

```typescript
const frutas: string[] = ["manzana", "plátano", "uva"];

for (const indice in frutas) {
  console.log(frutas[indice]);
}
```

**Limitaciones de `for...in` con Arrays:**

1. Itera sobre las propiedades enumerables, incluyendo las propiedades agregadas al prototipo del array.
2. Los índices del array se manejan como cadenas en lugar de números (por eso `frutas[indice]` es `string | undefined` para TS).
3. Aunque desde ES2015 los índices numéricos se iteran en orden ascendente, `for...in` no está diseñado para arrays y puede incluir propiedades heredadas.

> **Recomendación:** para arrays usa siempre `for...of` o `forEach()`. Reserva `for...in` exclusivamente para objetos planos.

### 8.7.2 Usando `for...of`

El bucle `for...of` se introdujo en ECMAScript 6 y es la forma más recomendada de recorrer arrays en JavaScript. Proporciona una forma más limpia y sencilla de acceder a los elementos de un array, y en TypeScript cada elemento queda **tipado automáticamente**.

```typescript
const frutas: string[] = ["manzana", "plátano", "uva"];

for (const fruta of frutas) {
  console.log(fruta); // fruta es string
}
```

**Ventajas de `for...of` con Arrays:**

1. Itera directamente sobre los valores de los elementos del array.
2. Ofrece un código más limpio y legible.
3. Garantiza un orden específico en la iteración.
4. El tipo del elemento se infiere de `T[]` (aquí `string`).

### 8.7.3 Diferencias entre `for...in` y `for...of`

- `for...in` itera sobre las propiedades enumerables de un objeto, mientras que `for...of` itera sobre los valores de los elementos de un iterable (como un array).
- `for...in` se utiliza principalmente para objetos, y puede no comportarse de la manera esperada con arrays debido a las limitaciones mencionadas.
- `for...of` es más adecuado para recorrer arrays, ya que proporciona acceso directo a los valores de los elementos.

En resumen, al recorrer arrays en JavaScript, se recomienda utilizar el bucle `for...of` debido a su simplicidad y claridad, así como a su capacidad para garantizar un orden específico en la iteración.

### 8.7.4 Método `forEach`

El método `forEach()` en JavaScript se utiliza para iterar sobre los elementos de un array y ejecutar una función proporcionada una vez por cada elemento. Es una forma de recorrer el array y realizar operaciones en cada elemento sin necesidad de utilizar bucles `for` o `while`.

**Sintaxis:**

```typescript
array.forEach(function (elemento: T, índice: number, arreglo: T[]) {
  // Código a ejecutar para cada elemento
});
```

- `elemento`: El elemento actual que se está procesando en el array (tipo `T`).
- `índice`: El índice del elemento actual en el array (`number`).
- `arreglo`: El array original que se está recorriendo (`T[]`).

**Ejemplo:**

```typescript
const frutas: string[] = ["manzana", "banana", "cereza"];

frutas.forEach(function (fruta, index) {
  console.log(`Índice ${index}: ${fruta}`);
});
```

**Nota:** Es importante mencionar que el método `forEach()` no modifica el array original y no crea un nuevo array; se utiliza principalmente para realizar tareas de iteración o ejecutar funciones en cada elemento del array.

Otro ejemplo sería:

```typescript
const numeros: number[] = [1, 2, 3, 4, 5];
let suma: number = 0;

numeros.forEach(function (numero) {
  suma += numero;
});

console.log(`La suma de los números es: ${suma}`);
```

## 8.8 Clonar un Array

Puedes clonar (copiar) un array en JavaScript de varias maneras, las más comunes:

1. **Usando el operador de propagación (Spread Operator):**

   El operador de propagación (`...`) se utiliza para copiar elementos de un array a otro. Aquí tienes un ejemplo:

   ```typescript
   const arrayOriginal: number[] = [1, 2, 3];
   const arrayClonado: number[] = [...arrayOriginal];
   ```

   En este caso, `arrayClonado` será una copia exacta de `arrayOriginal`.

2. **Usando el método `Array.from()`:**

   El método `Array.from()` toma un objeto iterable (como un array) y crea un nuevo array a partir de él. Aquí tienes un ejemplo:

   ```typescript
   const arrayOriginal: number[] = [1, 2, 3];
   const arrayClonado: number[] = Array.from(arrayOriginal);
   ```

   Esto también producirá una copia del array original en `arrayClonado`.

3. **Usando el método `slice()`:**

   El método `slice()` se puede utilizar para crear una copia de una porción de un array. Si no se le pasa ningún argumento, copiará todo el array. Aquí tienes un ejemplo:

   ```typescript
   const arrayOriginal: number[] = [1, 2, 3];
   const arrayClonado: number[] = arrayOriginal.slice();
   ```

   Esto clonará todo el array original en `arrayClonado`.

4. **Usando el constructor `Array()` y el método `concat()`:**

   También puedes utilizar el constructor `Array()` y el método `concat()` para crear una copia de un array:

   ```typescript
   const arrayOriginal: number[] = [1, 2, 3];
   const arrayClonado: number[] = [].concat(arrayOriginal);
   ```

   Esto generará una copia de `arrayOriginal` en `arrayClonado`.

**Nota:** Hay que tener en cuenta que los métodos 1 y 2 crean un espacio `undefined` en los huecos que hubiera en el array original, mientras que el 3 y el 4 conservan dichos huecos.

```typescript
const arrayOriginal: number[] = [1, 2, , 3, 4]; // En el array original no existe el elemento de índice 2
console.log(arrayOriginal); // [ 1, 2, <1 empty item>, 3, 4 ]
console.log(2 in arrayOriginal); // false

const arrayClonadoSpread: number[] = [...arrayOriginal];
console.log(arrayClonadoSpread); // [ 1, 2, undefined, 3, 4 ]
console.log(2 in arrayClonadoSpread); // true

const arrayClonadoArrayFrom: number[] = Array.from(arrayOriginal);
console.log(arrayClonadoArrayFrom); // [ 1, 2, undefined, 3, 4 ]
console.log(2 in arrayClonadoArrayFrom); // true

const arrayClonadoSlice: number[] = arrayOriginal.slice();
console.log(arrayClonadoSlice); // [ 1, 2, <1 empty item>, 3, 4 ]
console.log(2 in arrayClonadoSlice); // false

const arrayClonadoConcat: number[] = [].concat(arrayOriginal);
console.log(arrayClonadoConcat); // [ 1, 2, <1 empty item>, 3, 4 ]
console.log(2 in arrayClonadoConcat); // false
```

> **Copia superficial:** todas estas formas hacen una copia superficial. Si el array contiene objetos y mutas uno de ellos, la copia "ve" el cambio. Para copias profundas: `structuredClone(arrayOriginal)` (Node 17+/navegadores modernos).

## 8.9 Destructuring con Arrays

El destructuring es una técnica que permite extraer valores de un array y asignarlos a variables en una sola línea de código. Esto simplifica la extracción de datos de arrays y mejora la legibilidad del código.

### a. Destructuring Básico

```typescript
// Sintaxis básica de destructuring con arrays
const [valor1, valor2] = ["Manzana", "Banana"];
console.log(valor1); // Imprimirá 'Manzana'
console.log(valor2); // Imprimirá 'Banana'
```

### b. Asignación por Defecto

Puedes proporcionar valores por defecto en caso de que un elemento no exista en el array.

```typescript
const [fruta1, fruta2, fruta3 = "Naranja"] = ["Manzana", "Banana"];
console.log(fruta1); // Imprimirá 'Manzana'
console.log(fruta3); // Imprimirá 'Naranja' (valor por defecto)
```

### c. Destructuring Anidado

El destructuring también se puede utilizar para descomponer arrays anidados.

```typescript
const [usuario, [hobby1, hobby2]] = ["Alice", ["Pintura", "Música"]];
console.log(usuario); // Imprimirá 'Alice'
console.log(hobby1); // Imprimirá 'Pintura'
```

### d. Rest Parameters

El operador de propagación `...` (rest) se puede utilizar para capturar elementos restantes en un nuevo array.

```typescript
const [a, b, ...resto]: number[] = [1, 2, 3, 4, 5];
console.log(a); // Imprimirá 1
console.log(b); // Imprimirá 2
console.log(resto); // Imprimirá [3, 4, 5]
```

## 8.10 Tipado de arrays: tipos y genéricos

Para cerrar el capítulo, estas son las formas de tipar los arrays en TypeScript:

```typescript
// 1. Sintaxis T[]
const nombres: string[] = ["a", "b"];

// 2. Sintaxis genérica Array<T>
const numeros: Array<number> = [1, 2, 3];

// 3. Arrays de objetos/ interfaces
interface Persona {
  nombre: string;
}
const personas: Persona[] = [{ nombre: "Ana" }];

// 4. readonly: array inmutable (no se puede mutar el array)
const config: readonly string[] = ["a", "b"];
// config.push("c"); // Error TS: Property 'push' does not exist on type 'readonly string[]'

// 5. Tuplas: longitud y posición fijas
type Coordenadas = [number, number];
const punto: Coordenadas = [10, 20];
const dato: [nombre: string, ciudad: string] = ["Profe", "Granada"];

// 6. Arrays con union
const mezcla: (string | number)[] = ["a", 1, 2, "b"];
```

> [!IMPORTANT]
> Regla mental: `T[]` y `Array<T>` son lo mismo. `readonly T[]` protege el array (no las propiedades de los objetos que contiene). Las **tuplas** se usan cuando la posición importa (pares clave-valor, coordenadas, desestructurado de `Object.entries`).

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-02-arrays-tuples.ts`)

```typescript
export {};

/**
 * Fichero 02: Arrays y Tuplas en TypeScript
 * -------------------------------------------
 * Ejemplos extraidos de Sesion 2 (concepto 4):
 * - Arrays (ambas sintaxises, multidimensional, union, readonly)
 * - Tuplas (basica, opcional, etiquetas, destructuracion)
 */

// ============================================================================
// ARRAYS
// ============================================================================

// Sintaxis 1: Tipo[]
let numeros: number[] = [1, 2, 3, 4, 5];
let nombres: string[] = ["Ana", "Luis", "Maria"];

// Sintaxis 2: Array<Tipo>
let edades: Array<number> = [25, 30, 35, 40];

// Array multidimensional
let matriz: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Metodos de array preservan el tipo
let numerosDoblados: number[] = numeros.map(n => n * 2);

// Arrays con union
let mixto: (string | number)[] = ["texto", 42, "otro", 100];

// READONLY Array
let inamovible: ReadonlyArray<number> = [1, 2, 3];
// inamovible.push(4);  // Error: Property 'push' does not exist
let inamovible2: readonly number[] = [1, 2, 3];

// ============================================================================
// TUPLAS
// ============================================================================

// Tupla basica
let coordenada: [number, number] = [10.5, 20.3];
let usuario: [number, string, boolean] = [1, "Juan", true];

// Tupla con elementos opcionales
let entrada: [string, number?] = ["solo texto"];
entrada = ["con numero", 42];

// Tuplas con etiquetas (TS 4.0+)
let punto: [x: number, y: number, z: number] = [1, 2, 3];

// Destructuracion de tuplas
const [id, nombreCompleto, activo] = usuario;
console.log(id);            // 1
console.log(nombreCompleto); // "Juan"
console.log(activo);        // true

// Array VS Tupla
let arr: number[] = [1, 2, 3];        // cualquier longitud
let tup: [number, number] = [1, 2];   // exactamente 2 elementos
```

---

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-15-arrays-avanzado.ts`)

```typescript
export {};

/**
 * Fichero 15: Arrays Avanzado, Set, Map y Objetos
 * ------------------------------------------------
 * Ejemplos extraidos de Sesion 3 (conceptos 11, 12, 13 y 14):
 * - Arrays: push/pop/splice, map/filter/reduce, at(), toSorted/toReversed
 * - Arrays: sort/reverse, destructuring, busqueda binaria
 * - Set: creacion, operaciones, ES2025 nativas
 * - Map: creacion, iteracion, Map.groupBy, WeakMap
 * - Objetos: Object.keys/values/entries, freeze, hasOwn
 * - Objetos: destructuring avanzado, JSON tipado, structuredClone, Object.groupBy
 */

// ============================================================================
// ARRAYS: METODOS DE MUTACION
// ============================================================================

const numeros: number[] = [1, 2, 3];

// Anadir/eliminar al final
numeros.push(4);     // [1, 2, 3, 4]
const ultimo = numeros.pop();   // 4

// Anadir/eliminar al inicio
numeros.unshift(0);  // [0, 1, 2, 3]
const primeroShift = numeros.shift(); // 0

// splice: eliminar/insertar en cualquier posicion
numeros.splice(1, 1);       // elimina 1 elemento en indice 1
numeros.splice(1, 0, 99);   // inserta 99 en indice 1

// ============================================================================
// ARRAYS: METODOS DE ITERACION (inmutables)
// ============================================================================

const nums: number[] = [1, 2, 3, 4, 5];

// map: transforma cada elemento
const duplicados: number[] = nums.map((n) => n * 2); // [2, 4, 6, 8, 10]

// filter: selecciona elementos
const pares: number[] = nums.filter((n) => n % 2 === 0); // [2, 4]

// reduce: acumula valores
const suma: number = nums.reduce((acc, n) => acc + n, 0); // 15

// forEach: efecto secundario
nums.forEach((n) => console.log(n));

// find / findIndex
const mayor3: number | undefined = nums.find((n) => n > 3);
const idx: number = nums.findIndex((n) => n > 3);

// findLast / findLastIndex (ES2023)
const ultimoMayor3: number | undefined = nums.findLast((n) => n > 3);

// some / every
const hayPares: boolean = nums.some((n) => n % 2 === 0);
const todosPositivos: boolean = nums.every((n) => n > 0);

// ============================================================================
// AT() (ES2022) - indices negativos
// ============================================================================

const frutas: string[] = ["manzana", "platano", "naranja"];

console.log(frutas.at(0));   // "manzana"
console.log(frutas.at(-1));  // "naranja" (ultimo)
console.log(frutas.at(-2));  // "platano"

// ============================================================================
// METODOS INMUTABLES ES2023
// ============================================================================

const original: number[] = [3, 1, 2];

// toSorted - copia ordenada
const ordenado: number[] = original.toSorted(); // [1, 2, 3]
console.log(original); // [3, 1, 2] (intacto)

// toReversed - copia invertida
const invertido: number[] = original.toReversed(); // [2, 1, 3]

// toSpliced - copia con splice
const modificado: number[] = original.toSpliced(0, 1, 99); // [99, 1, 2]

// with - reemplaza en una posicion
const cambiado: number[] = original.with(1, 42); // [3, 42, 2]

// ============================================================================
// ORDENACION
// ============================================================================

const desordenados: number[] = [4, 2, 9, 1, 5];

// sort MUTA el original (pasar copia con spread o toSorted)
const copiaOrdenada = [...desordenados].sort((a, b) => a - b);
console.log(copiaOrdenada);  // [1, 2, 4, 5, 9]

// reverse
const descendente = [...copiaOrdenada].reverse();
// [9, 5, 4, 2, 1]

// ============================================================================
// DESTRUCTURING DE ARRAYS
// ============================================================================

const [a, b] = ["Manzana", "Banana"];
console.log(a); // "Manzana"

// Valores por defecto
const [x, y, z = "Naranja"] = ["Manzana", "Banana"];
console.log(z); // "Naranja"

// Rest operator
const [primero, segundo, ...resto] = [1, 2, 3, 4, 5];
console.log(resto); // [3, 4, 5]

// Nested
const [usuarioArr, [hobby]] = ["Alice", ["Pintura"]];
console.log(hobby); // "Pintura"

// ============================================================================
// BUSQUEDA BINARIA TIPADA
// ============================================================================

function busquedaBinaria(array: number[], elemento: number): number {
    let inicio: number = 0;
    let fin: number = array.length - 1;

    while (inicio <= fin) {
        const medio = Math.floor((inicio + fin) / 2);
        const valor = array[medio];
        if (valor === undefined) break;
        if (valor === elemento) return medio;
        if (valor < elemento) inicio = medio + 1;
        else fin = medio - 1;
    }
    return -1;
}

const numsBusqueda: number[] = [1, 3, 5, 7, 9, 11, 13];
console.log(busquedaBinaria(numsBusqueda, 7)); // 3

// ============================================================================
// SET: CONJUNTO DE VALORES UNICOS
// ============================================================================

// Creacion
const animales: Set<string> = new Set(["perro", "gato", "canario"]);

// Operaciones basicas
animales.add("conejo");
animales.delete("gato");
console.log(animales.has("perro")); // true
console.log(animales.size);          // 2

// Iteracion
for (const animal of animales) {
    console.log(animal);
}

// Convertir a array
const arrayAnimales: string[] = Array.from(animales);
const arrayAnimales2: string[] = [...animales];

// Eliminar duplicados de un array
const conDuplicados: number[] = [1, 2, 2, 3, 4, 4, 5];
const sinDuplicados: number[] = [...new Set(conDuplicados)];
console.log(sinDuplicados); // [1, 2, 3, 4, 5]

// Operaciones entre conjuntos
const A: Set<number> = new Set([1, 2, 3, 4]);
const B: Set<number> = new Set([3, 4, 5, 6]);

// Union
const union: Set<number> = new Set([...A, ...B]);

// Interseccion
const interseccion: Set<number> = new Set(
    [...A].filter((x) => B.has(x))
);

// Diferencia (A - B)
const diferencia: Set<number> = new Set(
    [...A].filter((x) => !B.has(x))
);

console.log(union);         // Set {1, 2, 3, 4, 5, 6}
console.log(interseccion);  // Set {3, 4}
console.log(diferencia);    // Set {1, 2}

// Metodos nativos ES2025
console.log(A.union(B));              // Set {1, 2, 3, 4, 5, 6}
console.log(A.intersection(B));       // Set {3, 4}
console.log(A.difference(B));         // Set {1, 2}
console.log(A.symmetricDifference(B)); // Set {1, 2, 5, 6}
console.log(A.isSubsetOf(B));         // false
console.log(A.isSupersetOf(B));       // false
console.log(A.isDisjointFrom(B));     // false

// ============================================================================
// MAP: DICCIONARIO CLAVE-VALOR
// ============================================================================

// Creacion
const miMapa: Map<string, number> = new Map();

// Operaciones
miMapa.set("uno", 1);
miMapa.set("dos", 2);
console.log(miMapa.get("uno"));    // 1
console.log(miMapa.has("tres"));   // false
console.log(miMapa.size);          // 2
miMapa.delete("dos");
miMapa.clear();

// Inicializar con pares
const config: Map<string, string | number> = new Map<string, string | number>([
    ["color", "azul"],
    ["idioma", "espanol"],
    ["volumen", 80],
] as [string, string | number][]);

// Iteracion
for (const [clave, valor] of config) {
    console.log(`${clave}: ${valor}`);
}

// keys(), values(), entries()
for (const key of config.keys()) console.log(key);
for (const val of config.values()) console.log(val);
for (const [k, v] of config.entries()) console.log(k, v);

// forEach
config.forEach((valor, clave) => console.log(clave, valor));

// Map.groupBy() (ES2024)
interface Alumno {
    nombre: string;
    curso: string;
}

const alumnos: Alumno[] = [
    { nombre: "PROFE", curso: "DI" },
    { nombre: "Ana", curso: "DI" },
    { nombre: "Luis", curso: "DIW" },
];

const porCurso: Map<string, Alumno[]> = Map.groupBy(
    alumnos,
    (a: Alumno) => a.curso
);
// Map { "DI" => [Alumno, Alumno], "DIW" => [Alumno] }

// WeakMap
const metadatos: WeakMap<object, { clicks: number }> = new WeakMap();

const boton = { id: "btn-1" };
metadatos.set(boton, { clicks: 0 });
// Si boton pierde todas las referencias, el GC limpia el WeakMap

// Casos de uso reales
// Cache de datos
const cache: Map<string, { data: unknown; timestamp: number }> = new Map();

async function obtenerDatos(id: string): Promise<unknown> {
    if (cache.has(id)) {
        return cache.get(id)!.data;
    }
    const response = await fetch(`https://api.com/data/${id}`);
    const data: unknown = await response.json();
    cache.set(id, { data, timestamp: Date.now() });
    return data;
}

// Enrutado SPA
type Componente = () => string;
const rutas: Map<string, Componente> = new Map([
    ["/inicio", () => "<h1>Inicio</h1>"],
    ["/perfil", () => "<h1>Perfil</h1>"],
]);

// ============================================================================
// OBJETOS EN PROFUNDIDAD
// ============================================================================

// Metodos estaticos de Object
interface PersonaObj {
    nombre: string;
    edad: number;
    profesion: string;
}

const persona: PersonaObj = {
    nombre: "Juan",
    edad: 30,
    profesion: "Desarrollador",
};

// keys, values, entries
const claves: string[] = Object.keys(persona);
const valores: unknown[] = Object.values(persona);
const entradas: [string, unknown][] = Object.entries(persona);

// assign: copia propiedades
const destino: Partial<PersonaObj> = {};
Object.assign(destino, persona);

// freeze: objeto inmutable (en runtime)
const congelado: Readonly<PersonaObj> = Object.freeze({ ...persona });

// hasOwn (ES2022)
console.log(Object.hasOwn(persona, "nombre")); // true

// ============================================================================
// DESTRUCTURING AVANZADO DE OBJETOS
// ============================================================================

const libro = {
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafon",
    anio: 2001,
} as const;

// Destructuring con alias
const { titulo: nombreLibro, autor: nombreAutor, anio: publicadoEn } = libro;

// Destructuring anidado
interface Producto {
    nombre: string;
    detalles: { peso: string; precio: number };
}

const producto: Producto = {
    nombre: "Portatil",
    detalles: { peso: "1.5 kg", precio: 950 },
};

const {
    nombre: prodNombre,
    detalles: { peso, precio },
} = producto;

// Parametros con destructuring
function mostrarInfo({ nombre, edad }: { nombre: string; edad: number }): string {
    return `${nombre} tiene ${edad} anios`;
}

// ============================================================================
// JSON: stringify y parse tipados
// ============================================================================

const usuarioJson = {
    nombre: "Ana",
    edad: 28,
    isAdmin: true,
} as const;

// Con formato
const jsonStr: string = JSON.stringify(usuarioJson, null, 2);
console.log(jsonStr);

// Reviver: transformar durante el parse
const cadenaJSON = '{"fechaNacimiento": "1990-05-15"}';
const conFecha = JSON.parse(cadenaJSON, (clave: string, valor: unknown) => {
    return clave === "fechaNacimiento" ? new Date(valor as string) : valor;
}) as { fechaNacimiento: Date };
console.log(conFecha.fechaNacimiento.getFullYear()); // 1990

// ============================================================================
// STRUCTUREDCLONE (ES2022+)
// ============================================================================

const originalClon: Record<string, unknown> = {
    nombre: "PROFE",
    fecha: new Date(),
    datos: new Map([["clave", "valor"]]),
    numeros: new Set([1, 2, 3]),
};

const copiaClon = structuredClone(originalClon);
// A diferencia de JSON.parse(JSON.stringify(x)):
// - Preserva Date, Map, Set, RegExp, ArrayBuffer
// - Es clon profundo real (no comparte referencias)

console.log(copiaClon.fecha instanceof Date);   // true
console.log(originalClon.datos === copiaClon.datos); // false

// ============================================================================
// OBJECT.GROUPBY() (ES2024)
// ============================================================================

interface ProductoGroupBy {
    nombre: string;
    categoria: string;
}

const productos: ProductoGroupBy[] = [
    { nombre: "Laptop", categoria: "electronica" },
    { nombre: "Raton", categoria: "electronica" },
    { nombre: "Mesa", categoria: "muebles" },
];

const agrupado: Record<string, ProductoGroupBy[]> = Object.groupBy(
    productos,
    (p: ProductoGroupBy) => p.categoria
) as Record<string, ProductoGroupBy[]>;
// {
//   electronica: [ProductoGroupBy, ProductoGroupBy],
//   muebles: [ProductoGroupBy]
// }

// Ejemplos de uso
console.log(mostrarInfo({ nombre: "Carlos", edad: 35 }));
console.log(agrupado);
```

---

[Volver al índice general](../../index.md)