# **Capítulo 01. Contenido 📝**🖥️

- [**Capítulo 01. Contenido 📝**🖥️](#capítulo-01-contenido-️)
- [1. **Sintaxis Básica de TypeScript**](#1-sintaxis-básica-de-typescript)
  - [1.1 Declaración de Variables en TypeScript](#11-declaración-de-variables-en-typescript)
    - [i. `var`](#i-var)
    - [ii. `let`](#ii-let)
    - [iii. `const`](#iii-const)
  - [1.2 Tipos de datos en TypeScript.💎](#12-tipos-de-datos-en-typescript)
    - [Tipos de datos primitivos en TypeScript](#tipos-de-datos-primitivos-en-typescript)
    - [Características distintivas de los tipos primitivos:](#características-distintivas-de-los-tipos-primitivos)
    - [Tipos de datos no primitivos (objetos):](#tipos-de-datos-no-primitivos-objetos)
    - [Diferencias clave entre primitivos y no primitivos:](#diferencias-clave-entre-primitivos-y-no-primitivos)
    - [Anotaciones de tipo: el valor añadido de TypeScript](#anotaciones-de-tipo-el-valor-añadido-de-typescript)

# 1. **Sintaxis Básica de TypeScript**

TypeScript es un superconjunto tipado de JavaScript. Toda la sintaxis de JavaScript es válida, pero TypeScript añade **anotaciones de tipo** (`tipo:`) que el compilador `tsc` valida en tiempo de compilación y que luego se eliminan (en la mayoría de los casos) al ejecutar. Este capítulo mantiene el contenido original de JavaScript y lo enriquece con tipos.

## 1.1 Declaración de Variables en TypeScript

JavaScript ofrece tres formas de declarar variables: `var`, `let` y `const`. Cada una de ellas tiene características específicas, y en TypeScript además se les puede añadir una anotación de tipo.

### i. `var`

- Declaración global o de función.
- No respeta el bloque de alcance (`block scope`).
- Puede ser reasignada y redeclarada.
- **Evitar en TypeScript moderno:** su ámbito impredecible dificulta el razonamiento de tipos. `tsc` lo permite por compatibilidad, pero los linters lo marcan como desaconsejado.

Ejemplo:

```typescript
var numero: number = 5;
numero = 10; // Se puede reasignar
```

### ii. `let`

- Declaración con alcance de bloque (`block scope`).
- Puede ser reasignada, pero no redeclarada en el mismo ámbito.

Ejemplo:

```typescript
let edad: number = 25;
edad = 30; // Se puede reasignar
```

La anotación `: number` le dice a TypeScript que `edad` solo puede contener números. Intentar asignar un `string` es un error de compilación:

```typescript
let edad: number = 25;
// edad = "treinta"; // Error TS: Type 'string' is not assignable to type 'number'
```

### iii. `const`

- Declaración con alcance de bloque (`block scope`).
- No puede ser reasignada ni redeclarada en el mismo ámbito.
- Debe ser inicializada en el momento de la declaración.

Ejemplo:

```typescript
const pi: number = 3.1416;
```

> [!TIP]
> Con `const` TypeScript suele **inferir** el tipo literal cuando el valor es inmutable. `const pi = 3.1416;` infiere `pi: 3.1416` (literal), aunque en la práctica se comporta como `number` en casi todos los usos. Con `let`, en cambio, infiere el tipo base: `let edad = 25;` infiere `edad: number`.

El uso de `let` y `const` es preferido en ECMAScript 6 (ES6) para evitar problemas relacionados con el ámbito y proporcionar mayor inmutabilidad en las variables cuando sea necesario. En TypeScript, además, el hecho de poder anotar el tipo hace que el autocompletado y el control de errores funcionen mejor que con JavaScript puro.

En resumen:

| Tipo  | Scope de bloque | Redeclarar | Reasignar |       Hoisting       |
| :---: | :-------------: | :--------: | :-------: | :------------------: |
|  var  |       No        |     Sí     |    Sí     | Sí (inicializa como `undefined`) |
|  let  |       Sí        |     No     |    Sí     |   Sí (pero no se inicializa — TDZ)   |
| const |       Sí        |     No     |    No     |   Sí (pero no se inicializa — TDZ)   |

> **TDZ (Temporal Dead Zone / Zona Muerta Temporal):** `let` y `const` sí se elevan (hoisting), pero a diferencia de `var` no se inicializan con `undefined`. Permanecen en un estado "no inicializado" desde el inicio del bloque hasta que se ejecuta su declaración. Acceder a la variable durante ese intervalo lanza un `ReferenceError`. Por tanto no es que "no tengan hoisting", sino que el motor las registra pero las marca como inaccesibles hasta su inicialización.

```typescript
console.log(a); // undefined (var se eleva e inicializa como undefined)
var a: number = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b: number = 10;
```

> [!NOTE]
> TypeScript marca con error la mayoría de accesos a variables antes de su declaración (TS2448), incluso cuando el motor permitiría el *hoisting* de `var`. Es una protección adicional que no existe en JavaScript puro.

## 1.2 Tipos de datos en TypeScript.💎

En TypeScript, **un tipo de dato primitivo** es un tipo de dato que representa un valor atómico e inmutable. Esto significa que no puede ser alterado ni dividido en subcomponentes. Los tipos primitivos se caracterizan por ser valores directos, no objetos, y no tienen métodos o propiedades intrínsecas (aunque el motor de JavaScript a veces temporalmente convierte estos valores en objetos para realizar ciertas operaciones).

### Tipos de datos primitivos en TypeScript

A partir de ES6 y versiones posteriores, los tipos de datos primitivos en JavaScript son, y en TypeScript se escriben en minúscula (no confundir con los constructores `String`, `Number`, `Boolean` que usan mayúscula):

1. **`undefined`**: Representa la ausencia de valor. Una variable que ha sido declarada pero no inicializada tiene el valor `undefined`. En TS: `let x: undefined;`
2. **`null`**: Representa intencionalmente "ningún valor" o "valor vacío". Es considerado un tipo primitivo aunque su tipo es un objeto (`typeof null` es `'object'` debido a un error histórico en el lenguaje). En TS: `let v: null = null;`
3. **`boolean`**: Representa un valor lógico que puede ser `true` o `false`. En TS: `let activo: boolean = true;`
4. **`number`**: Representa números enteros y de punto flotante. TypeScript no distingue entre enteros y números de punto flotante. En TS: `let precio: number = 12.5; negative: number = -3;`.
5. **`bigint`** (introducido en ES2020): Representa enteros de tamaño arbitrario. Permite trabajar con números enteros más grandes que los que puede manejar el tipo `number`. En TS: `let grande: bigint = 9007199254740992n;`
6. **`string`**: Representa una cadena de caracteres. Las cadenas son inmutables. En TS: `let nombre: string = "Ana";`
7. **`symbol`** (introducido en ES6): Representa un valor único e inmutable que puede ser usado como clave de propiedades de objetos, garantizando que no habrá colisión con otras claves. En TS: `const id: symbol = Symbol("id");`

> [!TIP]
> En TypeScript **no se debe usar** `string`, `Number`, `Boolean`... con la primera letra mayúscula como anotación: se refieren a los objetos envoltorio (`wrapper objects`) y su uso como tipo está desaconsejado por el linter oficial. Las anotaciones correctas son minúsculas: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`.

### Características distintivas de los tipos primitivos:

1. **Inmutabilidad**: Los valores primitivos son inmutables. No pueden ser alterados una vez creados. Si intentas modificar un valor primitivo, en realidad estás creando un nuevo valor.

   Ejemplo:

   ```typescript
   let a: string = "hello Profe";
   a[0] = "H"; // No ocurre ningún cambio, ya que las cadenas son inmutables
   console.log(a); // 'hello Profe'
   ```

   TypeScript además lo avisa en compilación: asignar a un índice de `string` es un error de tipo.

2. **Almacenamiento por valor**: Los tipos primitivos son almacenados directamente en la memoria (stack), lo que significa que cuando asignas o pasas un valor primitivo, estás trabajando con una copia del valor.

   Ejemplo:

   ```typescript
   let x: number = 50;
   let y: number = x; // y es una copia de x
   x = 30;
   console.log(y); // 50 (no cambia aunque x cambie)
   ```

### Tipos de datos no primitivos (objetos):

Los **tipos de datos no primitivos** son aquellos que **almacenan referencias** a objetos en lugar de valores directos. Esto significa que cuando asignas o pasas un objeto, lo que se copia es una referencia al objeto, no el objeto en sí. Los tipos no primitivos son mutables, lo que significa que puedes cambiar sus propiedades o el contenido de las colecciones sin cambiar la referencia al objeto.

Algunos ejemplos de tipos no primitivos son:

- **Objetos**: Representan colecciones de pares clave-valor. En TS se modelan con `interface` o `type`.
- **Arrays**: Son objetos especializados para almacenar listas de elementos. En TS: `number[]`.
- **Funciones**: Son objetos de primera clase en JavaScript. En TS se tipan como `(args) => retorno`.
- **Colecciones**: `Set`, `Map`, `Date`, etc.

### Diferencias clave entre primitivos y no primitivos:

| Característica |                     Primitivos                      |                                       No primitivos                                        |
| :------------: | :-------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|  Mutabilidad   |                     Inmutables                      |                                          Mutables                                          |
| Almacenamiento | Almacenados por valor en la pila de memoria (stack) |                 Almacenados por referencia en el montón (heap) de memoria                  |
|  Comparación   |                Comparación por valor                | Comparación por referencia (dos objetos son iguales solo si comparten la misma referencia) |
       |      Tipado en TS       |         `string`, `number`, `boolean`...          |                  `interface`, `type`, `number[]`, `Map<K,V>`...                           |

Ejemplo:

```typescript
interface Usuario {
  name: string;
}

let user1: Usuario = { name: "Profe" };
let user2: Usuario = { name: "Profe" };
console.log(user1 === user2); // false (diferentes referencias aunque la clave name contenga el mismo nombre 'Profe')

let numero1: number = 10;
let numero2: number = 10;
console.log(numero1 === numero2); // true (mismo valor)
```

### Anotaciones de tipo: el valor añadido de TypeScript

Como este repositorio está adaptado a TypeScript, todos los ejemplos anteriores usan anotaciones explícitas. Es importante matizar dos estilos:

- **Inferencia**: `let precio = 12.5;` TypeScript deduce solo `number`. Se recomienda dejar que infiera en variables locales.
- **Anotación**: `let precio: number = 12.5;` se usa para ser explícito, especialmente en **firmas de funciones**, **parámetros** y **retornos**:

```typescript
function calcularIVA(precio: number, iva: number): number {
  return precio * iva;
}
```

> [!IMPORTANT]
> En todo este repositorio los ejemplos se escriben en **erasable-only TypeScript**: solo sintaxis que Node 24 puede ejecutar directamente (type stripping) sin paso previo de compilación. Es decir, nada de `enum`, `namespace` ni *parameter properties* en constructores; sí `interface`, `type`, uniones y genéricos.

---

[Volver al índice general](../../index.md)