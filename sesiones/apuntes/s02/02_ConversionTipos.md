# **Capítulo 02. Contenido 📝**🖥️

- [2. Conversiones de Tipos en TypeScript](#2-conversiones-de-tipos-en-typescript)
  - [2.1 Conversión a String](#21-conversi%C3%B3n-a-string)
    - [1. Usando `String()`](#1-usando-string)
    - [2. Usando Template Literals (Template Strings)](#2-usando-template-literals-template-strings)
  - [2.2 Conversión a Number](#22-conversi%C3%B3n-a-number)
    - [1. Usando `Number()`](#1-usando-number)
    - [2. Usando `parseInt()` o `parseFloat()`](#2-usando-parseint-o-parsefloat-para-conversiones-m%C3%A1s-espec%C3%ADficas)
  - [Conversión a Boolean](#conversi%C3%B3n-a-boolean)
    - [1. Usando `Boolean()`](#1-usando-boolean)
    - [2. Conversión implícita en condiciones](#2-conversi%C3%B3n-impl%C3%ADcita-en-condiciones)
  - [Conversión a Array](#conversi%C3%B3n-a-array)
    - [1. Usando el operador de propagación (Spread Operator)](#1-usando-el-operador-de-propagaci%C3%B3n-spread-operator)
    - [2. Usando `Array.from()`](#2-usando-arrayfrom)
  - [Conversión a Objeto](#conversi%C3%B3n-a-objeto)
    - [1. Usando `Object.fromEntries()` (ES2019)](#1-usando-objectfromentries-es2019)
    - [2. De objeto a string y viceversa (JSON)](#2-de-objeto-a-string-y-viceversa-json)
  - [Trucos rápidos de conversión](#trucos-r%C3%A1pidos-de-conversi%C3%B3n)
  - [Valores truthy y falsy](#valores-truthy-y-falsy)
  - [Conversión con tipos en TypeScript](#conversi%C3%B3n-con-tipos-en-typescript)

---

# 2. Conversiones de Tipos en TypeScript

En JavaScript ES6, existen varias formas de convertir entre diferentes tipos de datos. Estas conversiones son útiles para realizar operaciones específicas o garantizar que los tipos sean los adecuados para una función o cálculo. A continuación, se presentan las conversiones más comunes, adaptadas a TypeScript.

> [!NOTE]
> En JavaScript las conversiones son **dinámicas** (el motor decide el tipo en tiempo de ejecución). TypeScript no inventa conversiones nuevas: añade **comprobaciones estáticas**, de modo que muchas conversiones "peligrosas" se detectan antes de ejecutar. Además, `tsc` exige ser explícito cuando una conversión no es segura a nivel de tipos.

## 2.1 Conversión a String

### 1. Usando `String()`

```typescript
const numero: number = 42;
const texto: string = String(numero);
```

`String()` devuelve siempre `string`, por lo que la asignación es segura. TypeScript conoce la firma: `String(value?: any): string`.

### 2. Usando Template Literals (Template Strings)

```typescript
const numero: number = 42;
const texto: string = `${numero}`;
```

Los template literals convierten cualquier valor interpolado a `string` dentro de la cadena.

## 2.2 Conversión a Number

### 1. Usando `Number()`

```typescript
const texto: string = "42";
const numero: number = Number(texto);
```

Cuidado: `Number()` puede devolver `NaN` (de tipo `number` en tiempo de ejecución). TypeScript no lo detecta automáticamente; conviene validar el resultado.

### 2. Usando `parseInt()` o `parseFloat()` para conversiones más específicas

```typescript
const texto: string = "42.5";
const entero: number = parseInt(texto, 10);
const decimal: number = parseFloat(texto);
```

> [!TIP]
> En TypeScript, `parseInt` sin la base (radix) es válido, pero los linters oficiales lo marcan (TS/JS) porque el comportamiento con cadenas tipo `"0x10"` depende de la base. Lo idiomático en TS moderno es pasar explícitamente la base: `parseInt(texto, 10)`.

## Conversión a Boolean

### 1. Usando `Boolean()`

```typescript
const valor: number = 42;
const esVerdadero: boolean = Boolean(valor); // true
```

### 2. Conversión implícita en condiciones

```typescript
const valor: number = 0;
if (valor) {
  // Esto no se ejecutará, ya que 0 se evalúa como falso
} else {
  // Esto se ejecutará
}
```

En TypeScript, la condición de un `if` acepta cualquier valor (los truthy/falsy se aplican igual que en JS), pero si el bloque depende del valor, TypeScript realiza **narrowing**: dentro del `if (valor)` sabe que `valor` no es `0` ni `NaN`, etc. Un detalle útil: en `strict` mode, condiciones con tipos que excluyen `null`/`undefined` estrechan el tipo automáticamente.

```typescript
const respuesta: string | null = obtenerRespuesta();

if (respuesta) {
  console.log(respuesta.length); // aquí respuesta es string (no null)
}
```

## Conversión a Array

### 1. Usando el operador de propagación (Spread Operator)

```typescript
const cadena: string = "Hola";
const arreglo: string[] = [...cadena]; // ["H", "o", "l", "a"]
```

### 2. Usando `Array.from()`

```typescript
const cadena: string = "Hola";
const arreglo: string[] = Array.from(cadena); // ["H", "o", "l", "a"]
```

En TypeScript, `Array.from` es genérico: `Array.from<T>(iterable: Iterable<T>): T[]`. Se puede pasar el tipo: `Array.from<string>(cadena)`.

## Conversión a Objeto

### 1. Usando `Object.fromEntries()` (ES2019)

Convierte un array de pares `[clave, valor]` o un `Map` en un objeto:

```typescript
const entradas: Array<[string, number]> = [["nombre", "Profe"], ["edad", 35]];
const objeto = Object.fromEntries(entradas);
console.log(objeto); // { nombre: "Profe", edad: 35 }
```

> [!NOTE]
> `Object.fromEntries` devuelve `{ [k: string]: string | number }` según el tipo de las entradas; simplemente declarando bien la tupla `[string, ...]` el resultado se infiere con mejor precisión.

### 2. De objeto a string y viceversa (JSON)

Para serializar y deserializar objetos, usa `JSON.stringify()` y `JSON.parse()`:

```typescript
interface Usuario {
  nombre: string;
  edad: number;
}

const usuario: Usuario = { nombre: "Profe", edad: 35 };

// Objeto → String JSON
const json: string = JSON.stringify(usuario);
console.log(json); // '{"nombre":"Profe","edad":35}'

// String JSON → Objeto
const recuperado: Usuario = JSON.parse(json) as Usuario;
console.log(recuperado.nombre); // "Profe"
```

> [!IMPORTANT]
> En TypeScript, `JSON.parse()` devuelve **`any`**, lo que rompe la seguridad de tipos si se asigna directamente. En este capítulo usamos `as Usuario` para simplicidad, pero la práctica recomendada (y que veremos en los capítulos de localStorage y Fetch API) es tratar el resultado como `unknown` y validarlo con *type guards*.

> `Object(numero)` como en `Object(42)` crea un **objeto envoltorio** (`Number { 42 }`), no un objeto literal. Esto tiene usos muy específicos y no se recomienda como "conversión a objeto" de uso general. En TypeScript, el resultado se tipa como `Number` (el tipo objeto), no como `number`.

## Trucos rápidos de conversión

| De → A | Método explícito | Forma abreviada |
|--------|-----------------|-----------------|
| → String | `String(x)` | `x.toString()` o `` `${x}` `` |
| → Number | `Number(x)` | `+x` (unario) |
| → Boolean | `Boolean(x)` | `!!x` (doble negación) |

```typescript
console.log(+"42");      // 42 (string → number)
console.log(!!"Hola");   // true (string → boolean)
console.log(!!0);        // false (número → boolean)
console.log(`${true}`);   // "true" (boolean → string)
```

> [!WARNING]
> La forma abreviada `+x` rompe la tipización de TypeScript si `x` no es `number`/`string`. Si el código debe mantener tipos seguros, prefiere las formas explícitas `Number(x)` y luego valida que el resultado no sea `NaN`.

## Valores truthy y falsy

En contextos booleanos (condiciones de `if`, `while`, etc.), JavaScript evalúa los valores como `true` o `false`:

**Falsy** (se evalúan como `false`):

```typescript
false, 0, -0, 0n, "", null, undefined, NaN
```

**Truthy** (se evalúan como `true`): todos los demás, incluyendo:

```typescript
true, 1, -1, "0", "false", [], {}, function () {}, Infinity
```

```typescript
// Ejemplos prácticos
if ("") console.log("No se ejecuta");       // "" es falsy
if ([]) console.log("¡Sí se ejecuta!");      // [] es truthy
if (0) console.log("No se ejecuta");        // 0 es falsy
if ("0") console.log("¡Sí se ejecuta!");     // "0" es truthy (es un string no vacío)
```

> [!TIP]
> Una buena práctica en TypeScript con `strict` es **no** depender de la "vacuidad" de strings o números en condiciones de negocio. Si quieres comprobar "cadena no vacía", escribe `if (texto.length > 0)` y si quieres "número presente", `if (valor !== 0)`. ¿Por qué? Porque TypeScript **estrocha** (`narrowing`) mejor cuando la condición expresa la intención real.

## Conversión con tipos en TypeScript

En TypeScript conviene distinguir tres situaciones distintas que en JS se ven "iguales":

1. **Conversión de runtime** (`Number`, `String`, `Boolean`, `parseInt`, spread...): cambia el valor; el tipo resultante se sobreescribe.
2. **Aserción de tipos** (`as`): le dices a TypeScript "confía en mí, esto es de este tipo". NO cambia nada en runtime. Se usa con cuidado.
3. **Narrowing** (typeof, instanceof, `===`): TypeScript deduce el tipo por el flujo del programa. Es la vía segura y preferida.

```typescript
// Aserción de tipos (no es conversión de runtime)
const dato: unknown = JSON.parse('{"a":1}');
const objeto = dato as { a: number }; // confiamos, peligroso sin validar

// Narrowing (seguro)
function esNumero(valor: unknown): void {
  if (typeof valor === "number") {
    console.log(valor.toFixed(2)); // aquí valor es number, seguro
  }
}
```

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-07-type-guards-conversion.ts`)

```typescript
export {};

/**
 * Fichero 07: Type Guards Avanzados, Conversion de Tipos y Operadores
 * -------------------------------------------------------------------
 * - Custom Type Guards (funciones predictoras)
 * - Assertion functions
 * - Conversion explícita de tipos
 * - JSON stringify/parse tipados
 * - Truthy/Falsy
 * - Nullish coalescing (??)
 * - Operadores logicos y asignacion
 */

// ============================================================================
// TYPE GUARDS AVANZADOS
// ============================================================================

// Custom Type Guards (funciones predictoras)
interface Pez { tipo: "pez"; profundidadMaxima: number; }
interface Ave { tipo: "ave"; envergadura: number; }
type Animal = Pez | Ave;

function esPez(animal: Animal): animal is Pez {
    return animal.tipo === "pez";
}

function describirAnimal(animal: Animal): string {
    if (esPez(animal)) {
        return `Pez que nada hasta ${animal.profundidadMaxima}m`;
    }
    return `Ave con envergadura de ${animal.envergadura}cm`;
}

// Type predicate con filtros
interface UsuarioActivo { activo: true; ultimoAcceso: Date; }
interface UsuarioInactivo { activo: false; }
type UsuarioEstado = UsuarioActivo | UsuarioInactivo;

function filtrarActivos(usuarios: UsuarioEstado[]): UsuarioActivo[] {
    return usuarios.filter((u): u is UsuarioActivo => u.activo === true);
}

// Assertion functions
function afirmarString(valor: unknown): asserts valor is string {
    if (typeof valor !== "string") {
        throw new Error("Se esperaba un string");
    }
}

function procesarMensaje(mensaje: unknown): void {
    afirmarString(mensaje);
    console.log(mensaje.toUpperCase()); // mensaje es string aqui
}

// ============================================================================
// CONVERSION EXPLICADA DE TIPOS
// ============================================================================

const numero: number = 42;
const texto: string = String(numero);

const cadena: string = "42";
const entero: number = Number(cadena);     // 42
const decimal: number = parseFloat("42.5"); // 42.5

const valor: number = 0;
const booleano: boolean = Boolean(valor); // false

// Trucos rapidos (type coercion controlada)
const xConv: number = +"42";          // string -> number: 42
// @ts-expect-error demostracion: !! sobre string no vacio siempre es true
const yConv: boolean = !!"Hola";      // string -> boolean: true
const zConv: string = `${true}`;      // boolean -> string: "true"

// ============================================================================
// CONVERSION ENTRE OBJETOS Y JSON
// ============================================================================

interface Usuario {
    nombre: string;
    edad: number;
}

const usuario: Usuario = { nombre: "PROFE", edad: 35 };

// Objeto -> string JSON
const json: string = JSON.stringify(usuario);

// string JSON -> objeto (con type assertion)
const recuperado: Usuario = JSON.parse(json) as Usuario;
console.log(recuperado.nombre); // "PROFE"

// ============================================================================
// TRUTHY Y FALSY
// ============================================================================

// Falsy: false, 0, -0, 0n, "", null, undefined, NaN
// Truthy: todo lo demas

function mostrarMensaje(mensaje?: string): void {
    if (mensaje) {
        console.log(mensaje);
    }
}

function procesarValor(valor: number | null | undefined): number {
    return valor ?? 0; // nullish coalescing: solo null/undefined
}

console.log(procesarValor(null));   // 0
console.log(procesarValor(0));      // 0 (no se reemplaza)
console.log(procesarValor(42));     // 42

// ============================================================================
// OPERADORES
// ============================================================================

// Comparacion estricta vs. abstracta
const a: number = 5;
const b: string = "5";
// @ts-expect-error demostracion: number vs string en comparaciones
console.log(a == b);   // true (coercion de tipo)
// @ts-expect-error demostracion: number vs string en comparaciones
console.log(a === b);  // false (tipos diferentes)
// @ts-expect-error demostracion: number vs string en comparaciones
console.log(a !== b);  // true

// Operadores logicos y short-circuit
// @ts-expect-error demostracion: expresiones siempre truthy/falsy en JS
console.log("Hola" && 42);           // 42 (ultimo truthy)
// @ts-expect-error demostracion: expresiones siempre truthy/falsy en JS
console.log(null || "defecto");      // "defecto" (primer truthy)

function obtenerNombre(nombre?: string): string {
    return nombre || "Invitado"; // fallback si es falsy
}

// Nullish Coalescing (??)
const volumen: number = 0;
console.log(volumen || 50);  // 50 (0 es falsy)
console.log(volumen ?? 50);  // 0 (0 no es null/undefined)

interface Config {
    nombre?: string;
    volumen: number;
}

function iniciar(config: Config): Config {
    return {
        nombre: config.nombre ?? "Anonimo",
        volumen: config.volumen ?? 50,
    };
}

// Operadores de asignacion logica (ES2021)
let nombreAsig: string = "";
nombreAsig ||= "Anonimo";                         // "" es falsy -> "Anonimo"
console.log(nombreAsig);

let usuarioAsig: unknown = { id: 1 };
usuarioAsig &&= usuarioAsig;                          // solo si es truthy

let puntuacion: number | null = null;
puntuacion ??= 100;                           // solo si null/undefined
console.log(puntuacion);                      // 100

// Operador ternario
const edad: number = 20;
const puedeVotar: string = edad >= 18 ? "Si" : "No";
console.log(`Puede votar? ${puedeVotar}`);

// Ejemplos de uso
console.log(describirAnimal({ tipo: "pez", profundidadMaxima: 10 }));
console.log(describirAnimal({ tipo: "ave", envergadura: 50 }));
```

> ▶ **Cómo probarlo en el repositorio:** ejecuta `npx tsx src/REPO-07-type-guards-conversion.ts` dentro de `repos/01-typescript-fundamentos/` y experimenta modificando valores.

---

[Volver al índice general](../../index.md)