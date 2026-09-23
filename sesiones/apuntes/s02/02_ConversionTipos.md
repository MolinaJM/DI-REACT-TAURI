# **Capítulo 02. Contenido 📝**🖥️

- [2. Conversiones de Tipos en TypeScript](#2-conversiones-de-tipos-en-typescript)
  - [2.1 Conversión a String](#21-conversi%C3%B3n-a-string)
    - [1. Usando `String()`](#1-usando-string)
    - [2. Usando Template Literals (Template Strings)](#2-usando-template-literals-template-strings)
  - [2.2 Conversión a Number](#22-conversi%C3%B3n-a-number)
    - [1. Usando `Number()`](#1-usando-number)
    - [2. Usando `parseInt()` o `parseFloat()`](#2-usando-parseint-o-parsefloat-para-conversiones-m%C3%A1s-espec%C3%ADficas)
  - [Conversión a Boolean](#conversi%C3%B3n-a-boolean)
    - [Conversión implícita en condiciones](#conversi%C3%B3n-impl%C3%ADcita-en-condiciones)
  - [Conversión a Array](#conversi%C3%B3n-a-array)
    - [Usando el operador de propagación (Spread Operator)](#usando-el-operador-de-propagaci%C3%B3n-spread-operator)
  - [Conversión a Objeto](#conversi%C3%B3n-a-objeto)
    - [De objeto a string y viceversa (JSON)](#de-objeto-a-string-y-viceversa-json)
  - [Valores truthy y falsy](#valores-truthy-y-falsy)
  - [Conversión con tipos en TypeScript](#conversi%C3%B3n-con-tipos-en-typescript)
    - [Aserciones de tipo (type assertions)](#aserciones-de-tipo-type-assertions)
- 🧪 **Ejercicios:** [Conversión de tipos](../../EjerciciosPropuestos/ejerciciosTS.md#7-conversión-de-tipos)

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

`String()` devuelve siempre `string`, por lo que la asignación es segura. TypeScript conoce la firma: `String(value?: any): string`. Es decir, es un valor opcional que puede ser de cualquier tipo, y siempre devuelve un string.

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

Cuidado: `Number()` puede devolver `NaN` (de tipo `number` en tiempo de ejecución). TypeScript no lo detecta automáticamente; conviene validar el resultado. Eso se hace con Number.isNaN(x)

### 2. Usando `parseInt()` o `parseFloat()` para conversiones más específicas

```typescript
const texto: string = "42.5";
const entero: number = parseInt(texto, 10);
const decimal: number = parseFloat(texto);
```

> [!TIP]
> En TypeScript, `parseInt` sin la base (radix) es válido, pero los linters oficiales podrían marcarlo (TS/JS).  Lo mejor en TS moderno es pasar explícitamente la base: `parseInt(texto, 10)`.

## Conversión a Boolean

### Conversión implícita en condiciones

```typescript
const valor: number = 0;
if (valor) {
  // Esto no se ejecutará, ya que 0 se evalúa como falso
} else {
  // Esto se ejecutará
}
```

En TypeScript, la condición de un `if` acepta cualquier valor (son los truthy/falsy). Se verá más adelante, pero un valor truthy o falsy es cualquier dato (un número, un texto o un objeto) que, sin ser un booleano puro (true o false), el lenguaje interpreta como verdadero o falso cuando se evalúa en una condición.

Pero si el bloque va a usar el valor de la variable, TypeScript realiza **narrowing** (estrechamiento de tipo): el mecanismo mediante el cual TypeScript analiza la condición y reduce las posibilidades de un tipo compuesto a un tipo más específico dentro de ese bloque. Es decir, dentro del `if (valor)` sabe que `valor` no es `0` ni `NaN`, etc (porque ha entrado al ser truthy). 

```typescript
const respuesta: string | null = obtenerRespuesta();

if (respuesta) {
  console.log(respuesta.length); // aquí respuesta es string (no null). Sabe que al ser un valor truthy descarta que sea null...
}
```
El modo strict te prohíbe usar variables que puedan ser null/undefined. Cuando pones if (variable), TypeScript entiende que ya comprobaste la existencia del valor y "limpia" la posibilidad de que sea null, dejándote usar sus propiedades sin protestar.

```typescript
const obtenerUsuario = (): { nombre: string } | null => {
  return { nombre: "Profe" }; // Devolvemos un objeto con la estructura { nombre: string }
};

// La variable 'usuario' anotada inline: puede ser un objeto O ser null
const usuario: { nombre: string } | null = obtenerUsuario();

// ============================================================================
// CASO 1: Modo "strict" DESACTIVADO (strictNullChecks: false)
// ============================================================================
console.log(usuario.nombre); 
// TypeScript: NO da ningún error de compilación. Si 'usuario' fuera null, la app SE ROMPERÍA en runtime.

// ============================================================================
// CASO 2: Modo "strict" ACTIVADO (strictNullChecks: true)
// ============================================================================
// --- Intento A: Sin comprobación ---
console.log(usuario.nombre); // Error de compilación: Object is possibly 'null'.
// --- Intento B: Con comprobación de condición (Narrowing / Estrechamiento) ---
if (usuario) {
  // ANTES del if:  usuario es ({ nombre: string } | null)
  // DENTRO del if: TypeScript descarta 'null' porque es falsy.
  //                El tipo se estrecha automáticamente a solo ({ nombre: string }).
  
  console.log(usuario.nombre); // ✅ TypeScript lo permite sin errores.
} else {
  // DENTRO del else: TypeScript sabe que 'usuario' es (null).
  console.log("No se encontró ningún usuario");
}
```

## Conversión a Array

### Usando el operador de propagación (Spread Operator)

```typescript
const cadena: string = "Hola";
const arreglo: string[] = [...cadena]; // ["H", "o", "l", "a"]
```

## Conversión a Objeto

### De objeto a string y viceversa (JSON)

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
> Al programar con el modo strict en TypeScript, es preferible no usar expresiones implícitas como if (texto) o if (valor) para evaluar cadenas o números en reglas de negocio (lógica humana detrás del código), sino hacer la comprobación de forma explícita escribiendo if (texto.length > 0) para verificar que un texto no esté vacío o if (valor !== 0) para confirmar que un número es distinto de cero. Esto se debe a que las condiciones explícitas comunican claramente la intención del código y permiten que TypeScript aplique el ajuste de tipos (narrowing) con mayor precisión, evitando errores sutiles cuando los valores válidos son 0 o cadenas vacías "".

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

### Aserciones de tipo (type assertions)

> 💡 **No es necesario realizar los ejercicios de Type Assertions de este bloque.** En React es raro usar aserciones y, cuando se usan, siempre de la misma forma (`as` con `JSON.parse` o `invoke`). Sobre todo usaremos `as`. Se trabajará en profundidad más adelante con casos reales.

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

---
### 📦 Ejemplo completo: `type-guards-conversion.ts`

Type guards avanzados, conversión explícita, JSON tipado y operadores (??, truthy/falsy).

```typescript

/**
 * Type Guards Avanzados, Conversion de Tipos y Operadores
 * -------------------------------------------------------------------
 * - Custom Type Guards (funciones predictoras)
 * - Assertion functions
 * - Conversion explícita de tipos
 * - JSON stringify/parse tipados
 * - Truthy/Falsy
 * - Nullish coalescing (??)
 * - Operadores logicos y asignacion
 *
 * (Basico para Tauri: `x is T`, `as`, tipos con `??`, `JSON.parse` tipado.
 *  Las assertion functions (`asserts`) y la coercion/truthy a fondo son
 *  optativos: no son necesarios para `invoke<T>`.)
 */

// ============================================================================
// TYPE GUARDS AVANZADOS
// ============================================================================

// Custom Type Guards (funciones predictoras)
// ⚠️ ESTOS CONCEPTOS SE DESARROLLARÁN MÁS ADELANTE:
// - `x is T` (type predicate) → EjerciciosPropuestos/ejerciciosTS.md §9 (Type Guards Avanzados)
// - `interface` → 01_SintaxisBasica.md §1.3
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
// ⚠️ ESTE CONCEPTO SE DESARROLLARÁ MÁS ADELANTE:
// - `u is T` en filter → EjerciciosPropuestos/ejerciciosTS.md §9 (Type Guards Avanzados)
interface UsuarioActivo { activo: true; ultimoAcceso: Date; }
interface UsuarioInactivo { activo: false; }
type UsuarioEstado = UsuarioActivo | UsuarioInactivo;

function filtrarActivos(usuarios: UsuarioEstado[]): UsuarioActivo[] {
    return usuarios.filter((u): u is UsuarioActivo => u.activo === true);
}

// Assertion functions
// ⚠️ ESTE CONCEPTO SE DESARROLLARÁ MÁS ADELANTE:
// - `asserts valor is T` → EjerciciosPropuestos/ejerciciosTS.md §9 (Type Guards Avanzados)
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
    // ⚠️ ESTE CONCEPTO SE DESARROLLARÁ MÁS ADELANTE:
    // - `??` (nullish coalescing) → 03_Operadores.md §3.4
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
// ⚠️ ESTE CONCEPTO SE DESARROLLARÁ MÁS ADELANTE:
// - `??` (nullish coalescing) → 03_Operadores.md §3.4
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

// Operador ternario
const edad: number = 20;
const puedeVotar: string = edad >= 18 ? "Si" : "No";
console.log(`Puede votar? ${puedeVotar}`);

// Ejemplos de uso
console.log(describirAnimal({ tipo: "pez", profundidadMaxima: 10 }));
console.log(describirAnimal({ tipo: "ave", envergadura: 50 }));
```

> ✏️ **Práctica:** [`s02/10-conversion-operadores.ts`](../../../ejercicios/s02/10-conversion-operadores.ts) (JSON, `??`) · [catálogo S2·7](../../../sesiones/EjerciciosPropuestos/ejerciciosTS.md).

---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
