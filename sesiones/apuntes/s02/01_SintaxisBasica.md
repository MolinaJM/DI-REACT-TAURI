# **Capítulo 01. Sintaxis Básica de TypeScript 📝**🖥️

- [**Capítulo 01. Sintaxis Básica de TypeScript 📝**🖥️](#capítulo-01-sintaxis-básica-de-typescript)
- [1. **Sintaxis Básica de TypeScript**](#1-sintaxis-básica-de-typescript)
  - [1.1 Declaración de Variables en TypeScript](#11-declaración-de-variables-en-typescript)
    - [i. `let`](#i-let)
    - [ii. `const`](#ii-const)
  - [1.2 Tipos de datos en TypeScript.💎 (Sesión 2)](#12-tipos-de-datos-en-typescript-sesión-2)
    - [Tipos de datos primitivos en TypeScript](#tipos-de-datos-primitivos-en-typescript)
    - [Anotaciones de tipo: el valor añadido de TypeScript](#anotaciones-de-tipo-el-valor-añadido-de-typescript)
    - [Inferencia de tipos (Type Inference)](#inferencia-de-tipos-type-inference)
    - [Tipos especiales: `any`, `unknown`, `never` y `void`](#tipos-especiales-any-unknown-never-y-void)
    - [Aserciones de tipo (type assertions)](#aserciones-de-tipo-type-assertions)
  - [1.3 Tipos avanzados (Sesión 3)](#13-tipos-avanzados-sesión-3)
    - [Unión de tipos](#unión-de-tipos)
    - [Intersección de tipos (`&`)](#intersección-de-tipos-)
    - [Tipos de datos no primitivos (objetos):](#tipos-de-datos-no-primitivos-objetos)
  - [Interfaces y Type Aliases](#interfaces-y-type-aliases)
- 🧪 **Ejercicios (Sesión 2):** [Tipos Primitivos](../../ejerciciosTS.md#1-tipos-primitivos) · [Type Inference](../../ejerciciosTS.md#2-type-inference) · [Tipos Especiales](../../ejerciciosTS.md#3-tipos-especiales)
- 🧪 **Ejercicios (Sesión 3):** [Union Types](../../ejerciciosTS.md#13-union-types) · [Interfaces](../../ejerciciosTS.md#4-interfaces) · [Type Aliases](../../ejerciciosTS.md#5-type-aliases)

# 1. **Sintaxis Básica de TypeScript**

TypeScript es un superconjunto tipado de JavaScript. Toda la sintaxis de JavaScript es válida, pero TypeScript añade **anotaciones de tipo** (`tipo:`) que el compilador `tsc` valida en tiempo de compilación y que luego se eliminan (en la mayoría de los casos, salvo por ejemplo con los enums) al ejecutar. JS no sabe lo que es un enum, por lo que la ejecución fallaría. Esto es lo que se llama "Erasable Syntax". Este capítulo parte del contenido original de JavaScript y lo enriquece con tipos.

## 1.1 Declaración de Variables en TypeScript

JavaScript ofrece varias formas de declarar variables, siendo `let` y `const` las más usadas en JavaScript moderno y en TypeScript. Cada una de ellas tiene características específicas, y en TypeScript además se les puede añadir una anotación de tipo.

### i. `let`

- Declaración con alcance de bloque (`block scope`).
- Puede ser reasignada, pero no redeclarada en el mismo ámbito.

Ejemplo:

```typescript
let edad: number = 25;
edad = 30; // Se puede reasignar
```

La anotación : number le dice a TypeScript que edad solo puede contener números, por lo que intentar asignarle un string generará un error de tipado. Sin embargo, el código podría llegar a ejecutarse sin problemas dependiendo del entorno. Esto ocurre porque el proceso de compilación (o transpilación) se limita a aplicar la Erasable Syntax —es decir, borra las anotaciones de tipo para generar JavaScript válido— y, por defecto, el compilador (tsc) y la mayoría de herramientas de empaquetado no bloquean la generación ni la ejecución del código ejecutable aunque existan fallos de tipos.

```typescript
let edad: number = 25;
// edad = "treinta"; // Error TS: Type 'string' is not assignable to type 'number'
```

### ii. `const`

- Declaración con alcance de bloque (`block scope`).
- No puede ser reasignada ni redeclarada en el mismo ámbito.
- Debe ser inicializada en el momento de la declaración.

Ejemplo:

```typescript
const pi: number = 3.1416;
```

Se recomienda usar let y const para definir variables de forma limpia evitando problemas de ámbito. Al añadir anotaciones de tipo, TypeScript potencia el autocompletado y la detección temprana de errores en el editor.

En resumen:

| Tipo  | Scope de bloque | Redeclarar | Reasignar |
| :---: | :-------------: | :--------: | :-------: |
  let  |       Sí        |     No     |    Sí     |   
| const |       Sí        |     No     |    No     |  

## 1.2 Tipos de datos en TypeScript.💎 (Sesión 2)

### Tipos de datos primitivos en TypeScript

A partir de ES6 y versiones posteriores, los tipos de datos primitivos en JavaScript son, y en TypeScript se escriben en minúscula (no confundir con los constructores `String`, `Number`, `Boolean` que usan mayúscula) En TypeScript no se suelen utilizar los objetos tipo, solo para casos muy rebuscados.:

1. **`undefined`**: Representa la ausencia de valor. Una variable que ha sido declarada pero no inicializada tiene el valor `undefined`. En TS: `let x: undefined;` . Si ponemos let a; console.log(typeof a); dará `undefined`.
2. **`null`**: Representa intencionalmente "ningún valor" o "valor vacío". Es considerado un tipo primitivo aunque su tipo es un objeto (`typeof null` es `'object'` debido a un error histórico en el lenguaje). Mencionar que typeof(var) devuelve el valor. En TS se utiliza así: `let v: null = null;`
3. **`boolean`**: Representa un valor lógico que puede ser `true` o `false`. En TS: `let activo: boolean = true;`
4. **`number`**: Representa números enteros y de punto flotante. TypeScript no distingue entre enteros y números de punto flotante. En TS: `let precio: number = 12.5; negative: number = -3;`.
6. **`string`**: Representa una cadena de caracteres. Las cadenas son inmutables. En TS: `let nombre: string = "Ana";`

> [!TIP]
> En TypeScript **no se debe usar** `String`, `Number`, `Boolean`... con la primera letra mayúscula como anotación: se refieren a los objetos envoltorio (`wrapper objects`) y su uso como tipo está desaconsejado por el linter oficial. Las anotaciones correctas son minúsculas: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`.


### Anotaciones de tipo: el valor añadido de TypeScript

Como este repositorio está adaptado a TypeScript, todos los ejemplos anteriores usan anotaciones explícitas. Es importante matizar dos estilos:


### Inferencia de tipos (Type Inference)

- **Inferencia**: `let precio = 12.5;` TypeScript deduce solo `number`. Se recomienda dejar que infiera en variables locales.
- **Anotación**: `let precio: number = 12.5;` se usa para ser explícito, especialmente en **firmas de funciones**, **parámetros** y **retornos**:

```typescript
function calcularIVA(precio: number, iva: number): number {
  return precio * iva;
}
```


### Tipos especiales: `any`, `unknown`, `never` y `void`

Estos cuatro tipos cubren casos "frontera" del sistema de tipos. Tres de ellos se explican aquí; `void` (ausencia de retorno) se detalla en el capítulo de [funciones](../s02/04_Funciones.md#1-declaración-de-funciones).

**`any`: desactiva el chequeo de tipos (EVITAR).** Acepta cualquier valor y permite llamar a cualquier método sin error en compilación, devolviendo silenciosamente `undefined` cuando el método no existe en runtime. Con `any`, TypeScript no te protege: es el "modo JavaScript" dentro de TS. Fuera de ejemplos de contraste como este capítulo, **no se usa en el curso**.

```typescript
let cualquierCosa: any = "texto";
cualquierCosa = 42;                   // OK: puede cambiar de tipo
cualquierCosa.metodoInexistente();    // sin error en compilación, pero TypeError en runtime
```

**`unknown`: el tipo seguro para valores desconocidos.** Representa "algo que aún no sabemos qué es" (p. ej. datos que llegan del exterior: `JSON.parse`, respuestas de la API, comandos de Tauri). A diferencia de `any`, **obliga a reducir el tipo** (*narrowing*) antes de usarlo: no puedes llamar métodos ni asignarlo a otra cosa sin comprobar qué es antes. Es la alternativa correcta a `any`.

```typescript
let dato: unknown = JSON.parse('{"edad": 30}');
console.log(dato.edad); // Error: Object is of type 'unknown'. No peta, pero no está bien hecho
if (typeof dato === "object" && dato !== null) {
    // aquí `dato` ya está estrechado a object y se puede usar
    const obj = dato as Record<string, unknown>;// ESTE CONCEPTO SE VERÁ MÁS ADELANTE
    console.log(obj.edad); // Sin error
}
```

**`never`: indica que una función jamás termina con éxito.** Se usa en funciones que solo lanzan errores (el programa aborta antes de devolver nada). También se usa en las exhaustiveness checks: 

```typescript
function errorFatal(mensaje: string): never {
  throw new Error(mensaje);  // nunca llega un return
}

type Forma = "circulo" | "cuadrado"; //union type
function area(forma: Forma): number {
  switch (forma) {
    case "circulo":  return 3.14;
    case "cuadrado": return 4;
    default:
      const _nunca: never = forma;  // si falta un caso, ¡error de compilación! Esto es el exhaustiveness check
      return _nunca;
  }
}
```

> > **¿Por qué el *exhaustiveness check* con `never` funciona?** Mientras los `case` cubren todos los literales de la unión, el `default` es **inalcanzable**: por *narrowing*, TypeScript sabe que `forma` ya quedó agotada en las ramas y el único tipo que puede "caer" ahí es `never`. Y `never` es asignable a `never`, así que `const _exhaustivo: never = forma;` es correcto y compila. El momento en que se enciende la alarma: añades un literal nuevo a la unión (p. ej. `"triangulo"`) sin añadir su `case`. Entonces al `default` ya no llega `never`, sino `"triangulo"` (un tipo **no vacío**), y asignar un `"triangulo"` a una variable `never` es inválido → **error de compilación**. Es decir: TS no te deja simplemente "olvidar" un caso; te obliga a añadirlo o el código no compila. El patrón en cada componente/sesión: los estados de una petición o evento (`"ok" | "cargando" | "error"`) con su `switch` exhaustivo = la semilla de `useReducer` de React.

> > [!TIP]
> Regla memorizable: **`any` te quita la protección de tipos; `unknown` te obliga a comprobarla; `never` certifica que algo no puede ocurrir; `void` declara que una función no devuelve valor.**

> [!IMPORTANT]
> En todo este repositorio los ejemplos se escriben en **erasable-only TypeScript**: solo sintaxis que Node 24 puede ejecutar directamente (type stripping) sin paso previo de compilación. Es decir, nada de `enum;` sí `interface`, `type`, uniones y genéricos.


### Aserciones de tipo (type assertions)

Una **aserción de tipo** le dice a TypeScript: "yo controlo...confía en mí, que yo sé que este valor es de este tipo". TypeScript **no hace ninguna comprobación en runtime**; solo cambia lo que el compilador cree. Por eso se usan con moderación: si te equivocas, el código compila pero falla en ejecución.

Las cuatro variantes que usarás en el curso:

**1. `as` (recomendada)** — la sintaxis preferida porque funciona en cualquier fichero, incluido `.tsx` (React).

```typescript
// JSON.parse devuelve unknown; le decimos a TS que es un objeto con esa forma
const json = '{"id": 1, "titulo": "Dune"}';
const datos = JSON.parse(json) as { id: number; titulo: string };
console.log(datos.titulo); // "Dune"
```

**2. `<tipo>valor` (sintaxis angular, por tanto NO LA VAMOS A USAR)** — equivalente a `as`, pero **no funciona en ficheros `.tsx`** ni cuando choca con genéricos de JSX. Por eso `as` es la única que siempre compila en React.

```typescript
// En un fichero .ts normal funciona:
const valor = <string>"hola";

// En un fichero .tsx falla (JSX confunde los < >):
// const valor = <string>"hola";  // Error: JSX no esperado
// Solución en .tsx: usar `as` siempre.
```

**3. `!` (non-null assertion)** — le dice a TS "este valor no es `null` ni `undefined` aunque el tipo lo diga". En runtime **no hace nada**: no elimina el `null`, solo le quita la advertencia al compilador. Hay que usarlo con moderación solo si está muy justificado.

```typescript
interface Servidor {
  puerto?: number | null;
}

function obtenerPuerto(servidor: Servidor): number {
  return servidor.puerto!; // le digo a TS: "sé que puerto existe"
}
```

**4. `as const` (literal inmutable)** — convierte un objeto o array en un tipo completamente inmutable, es decir, en un **literal de solo lectura**. Ideal para configuraciones, rutas o listas que no van a cambiar.

```typescript
const CONFIG = { servicio: "api", version: 3 } as const;
// Tipo: { readonly servicio: "api"; readonly version: 3 }
// CONFIG.version = 4;  
// Error: readonly: Cannot assign to 'version' because it is a read-only property.

const RUTAS = ["/inicio", "/catalogo"] as const;
// Tipo: readonly ["/inicio", "/catalogo"]
```

> [!TIP]
> `as` y `as const` son *erasable-only*: no generan código en runtime. `!` tampoco genera código, pero **sí puede causar errores en ejecución** si tu suposición es falsa (el valor sí es `null`). Solución? Siempre usar narrowing (`if (valor !== null)`) sobre `!`.


> ⚠️ **ESTE CONCEPTO SE TRABAJARÁ MÁS ADELANTE:** La práctica profunda de aserciones (`as`, `as const`, `!`) con `invoke` de Tauri, refs de React y constantes tipadas se desarrolla en las sesiones de React y Tauri (S04-S06). Aquí se presenta la sintaxis básica; los casos de uso reales se verán en los apuntes de React.


## 1.3 Tipos avanzados (Sesión 3)

### Unión de tipos

Una variable puede admitir **más de un tipo** usando el operador **unión (`|`)**: se escribe el tipo como `string | null`, que se lee "string o null". TypeScript estrecha **(narrowing)** el tipo según el flujo para saber, en cada punto del código, cuál es el real. Lo verás mucho al manejar valores opcionales, como `const respuesta: string | null = obtenerRespuesta();`o a la hora de declarar distintos valores con type `type EstadoCarga = 'idle' | 'loading' | 'success' | 'error'`

> [!TIP] Como ya se ha comentado antes, no se pueden usar los enums. ; 


### Intersección de tipos (`&`)

La **intersección (`&`)** combina tipos exigiendo que la variable cumpla **todos a la vez**: `A & B` se lee "A y B". Es la forma de componer varias `interface` en un solo objeto (las interfaces se verán un poco después):

```typescript
// ⚠️ ESTE CONCEPTO SE DESARROLLARÁ MÁS ADELANTE:
// - `interface` → 01_SintaxisBasica.md §1.3 (Interfaces y Type Aliases)
interface Persona { 
  nombre: string; 
}

interface Empleado { 
  cargo: string; 
}

const profe: Persona & Empleado = {
  nombre: "Ana",
  cargo: "Profesora",
};
```

> [!TIP]
> Regla de memoria: **`|` es "o" (unión → al menos uno)**, **`&` es "y" (intersección → todos)**. 


### Tipos de datos no primitivos (objetos):

Los **tipos de datos no primitivos** son aquellos que **almacenan referencias** a objetos en lugar de valores directos. Esto significa que cuando asignas o pasas un objeto, lo que se copia es una referencia al objeto, no el objeto en sí (los famosos punteros). Los tipos no primitivos son mutables, lo que significa que puedes cambiar sus propiedades o el contenido de las colecciones sin cambiar la referencia al objeto.

Algunos ejemplos de tipos no primitivos son:

- **Objetos**: Representan colecciones de pares clave-valor. En TS se modelan con `interface` o `type`.
- **Arrays**: Son objetos especializados para almacenar listas de elementos. En TS: `number[]`.
- **Funciones**: Son objetos de primera clase (*first class citizen*). En TS se tipan como `(args) => retorno`.
- **Colecciones**: `Set`, `Map`, `Date`, etc.


### Interfaces y Type Aliases

Los objetos se modelan con `interface` o `type`:

- **`interface`** describe la *forma* de un objeto: propiedades y métodos. Admite propiedades **opcionales** (`?`), de **solo lectura** (`readonly`) e **index signatures** (claves dinámicas). Se puede **extender** con `extends` (equivalente a la herencia de otros lenguajes):

```typescript
interface Cancion {
  readonly id: number;            // no se puede modificar despues de crear
  titulo: string;
  artista: string;
  duracion?: number;              // opcional (puede faltar)
  reproducir(): void;             // metodo obligatorio
}

interface Podcast extends Cancion {
  episodio: number;
  descripcion: string;
}
```

- **`type`** (o type aliases) sirve para lo mismo en objetos, para llamar a un conjunto de datos con un nombre (un alias). Pero además permite **uniones**, **tuplas** y **alias** de estructuras más complejas:

```typescript
type Cancion = {
  readonly id: number;            // no se puede modificar despues de crear
  titulo: string;
  artista: string;
  duracion?: number;              // opcional (puede faltar)
  reproducir(): void;             // metodo obligatorio
}

type ID = string | number;                              // union
type Coordenadas = { x: number; y: number };            // objeto
type reproducir = () => void; // firma de funcion. Indica la forma que tiene una función, 
//por si la quieres llamar desde más de un sitio
```

> [!TIP]
> Regla práctica del curso: en React modela las entidades con `interface` (se autocompletan y tienen `extends`); se refiere al concepto de *Declaration Merging* (fusión de declaraciones). to significa que si defines dos o más interfaces con exactamente el mismo nombre en diferentes partes de tu código (o incluso en diferentes archivos), TypeScript las junta automáticas en una sola interfaz combinada. 

``` typescript
//En un archivo o paquete (ej. api/user.ts)
interface User {
  id: string;
  name: string;
}

//En otro archivo o más abajo (ej. types/global.ts)
interface User {
  role: 'admin' | 'user';
}

//TypeScript las fusiona internamente
// Resultado interno de TypeScript:
interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}

```
 
> [!TIP]
> Usa `interface` para entidades y props de React; usa `type` para uniones, tuplas y alias. Ni `interface` ni `type` generan código en runtime (sintaxis *erasable-only*), así que puedes usarlos sin restricción.

> [!NOTE]
> **Características raras o innecesarias en React y Tauri:**
> - **Index signatures** (claves dinámicas como `[key: string]: string`) — en React y Tauri los datos suelen tener estructura conocida. Si necesitas un diccionario genérico, usa `Record<K, V>` en su lugar.
> - **`Readonly<T>`** — rara vez se usa de forma explícita. En la práctica, `as const` cubre la mayoría de casos (constantes inmutables).
> - **Declaration Merging** — es interesante pero no es algo que hagas a propósito: ocurre automáticamente cuando defines dos interfaces con el mismo nombre. No es un patrón de diseño, sino un comportamiento del compilador.
> - **`Pick<T, K>` y `Omit<T, K>`** — se mencionan en los utility types pero en la práctica se usan poco en React. Suele ser más claro definir la interfaz completa y destructurar lo que necesitas.
> - **Propiedades de solo lectura (`readonly`)** — se usan de vez en cuando para datos que no deben mutar (IDs, claves), pero no es un patrón frecuente.


---
### 📦 Ejemplo completo-resumen 

Tipos especiales (any, unknown, void, never).

```typescript

/**
 * Fichero 03: Tipos Especiales
 * -------------------------------------------
 * - any, unknown, void, never
 * (Enums: optativo, fuera de la ruta React + Tauri)
 */

// ============================================================================
// TIPOS ESPECIALES: any, unknown, never, void
// ============================================================================

// any: desactiva el chequeo de tipos (EVITAR)
let cualquierCosa: any = "texto";
cualquierCosa = 42;
// ⚠️ ATENCIÓN: el script SE CORTA AQUÍ a propósito.
// En compilación `any` no avisa (ese era el objetivo), pero en ejecución
// esto lanza un TypeError (metodoInexistente no existe) y detiene el fichero.
// Comenta esta línea si quieres ver el resto de ejemplos (unknown, never).
cualquierCosa.metodoInexistente(); // sin error en compilacion

// unknown: tipo seguro para valores desconocidos
let valorDesconocido: unknown = "Hola";
// valorDesconocido.toUpperCase();  // Error: Object is of type 'unknown'
if (typeof valorDesconocido === "string") {
    console.log(valorDesconocido.toUpperCase()); // seguro
}

// void: ausencia de valor de retorno
function logMensaje(mensaje: string): void {
    console.log(mensaje);
}

// never: NUNCA ocurre un retorno
function errorFatal(mensaje: string): never {
    throw new Error(mensaje);
}

// never en exhaustiveness checking
type Forma = "circulo" | "cuadrado";
function area(forma: Forma): number {
    switch (forma) {
        case "circulo": return 3.14;
        case "cuadrado": return 4;
        default:
            const _exhaustivo: never = forma;
            return _exhaustivo;
    }
}

```



> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `01_SintaxisBasica.ts` y ejecuta `npx tsx 01_SintaxisBasica.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).

### 📦 Ejemplo completo: 

Qué es TS vs JS, tipos primitivos básicos e inferencia de tipos.

```typescript

/**
 * Tipos Primitivos en TypeScript
 * -------------------------------------------
 * - Que es TypeScript (comparacion JS vs TS)
 * - Tipos primitivos basicos
 * - Inferencia de tipos (Type Inference)
 */

// ============================================================================
// 1. QUE ES TYPESCRIPT - Problemas que soluciona
// ============================================================================

// JAVASCRIPT: errores silenciosos en tiempo de ejecucion
function sumar(a: any, b: any): any {
    return a + b;
}
console.log(sumar(5, "3"));          // "53" (concatenacion, no suma)
console.log(sumar([], {}));          // "[object Object]" (sin sentido)
// @ts-expect-error demostrando error de JS: falta el segundo argumento
console.log(sumar(5));               // NaN (falta el segundo argumento)

// TYPESCRIPT: detecta estos errores al escribir
function sumarTS(a: number, b: number): number {
    return a + b;
}
// sumarTS(5, "3");  // Error: Argument of type 'string' not assignable to 'number'
// sumarTS(5);       // Error: Expected 2 arguments, but got 1
console.log(sumarTS(5, 3));    // 8 - correcto

// ============================================================================
// 2. TIPOS PRIMITIVOS BASICOS
// ============================================================================

let nombre: string = "Juan Perez";
let edad: number = 30;
let esActivo: boolean = true;
let indefinido: undefined = undefined;
let nulo: null = null;

// ============================================================================
// 3. INFERENCIA DE TIPOS (Type Inference)
// ============================================================================

// In basica: TypeScript infiere el tipo a partir del valor
let x = 3;              // inferido: number
let nombreInferido = "Ana";     // inferido: string
let arrInferido = [1, 2, 3];    // inferido: number[]
let esValido = false;            // inferido: boolean

// Inferencia contextual
const numeros = [1, 2, 3];
const dobles = numeros.map((n) => n * 2);  // n es number

// Best common type
let animales = ["perro", "gato", 42];  // (string | number)[]

// Literal types (inferencia exacta)
const constante = "Hola";    // tipo: "Hola" (literal)
let variable = "Hola";       // tipo: "string" (se amplia)

// Inferencia en desestructuracion
function procesar({ nombre, edad }: { nombre: string; edad: number }) {
    return `${nombre} tiene ${edad} anios`;
}
console.log(procesar({ nombre: "Ana", edad: 30 }));
```

> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `01_SintaxisBasica.ts` y ejecuta `npx tsx 01_SintaxisBasica.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
