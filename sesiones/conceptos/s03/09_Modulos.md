# 09. Importaciones y Exportaciones en TypeScript 📝 🖥️

- [09. Importaciones y Exportaciones en TypeScript 📝 🖥️](#09-importaciones-y-exportaciones-en-typescript--️)
  - [12.1. Exportar desde un Módulo](#121-exportar-desde-un-módulo)
  - [12.2. Importar en otro Módulo](#122-importar-en-otro-módulo)
  - [12.3. Exportar e Importar Funciones](#123-exportar-e-importar-funciones)
  - [12.4. Exportar e Importar Clases](#124-exportar-e-importar-clases)
  - [12.5. Módulos con Exportaciones Nombradas y Por Defecto](#125-módulos-con-exportaciones-nombradas-y-por-defecto)
  - [12.6. Reexportación y Agregación de Módulos](#126-reexportación-y-agregación-de-módulos)
  - [12.7. Cargar Módulos Dinámicamente](#127-cargar-módulos-dinámicamente)
  - [12.8. `import.meta` y Top-level await](#128-importmeta-y-top-level-await)
    - [`import.meta`](#importmeta)
    - [Top-level await (ES2022)](#top-level-await-es2022)
  - [12.9. Importaciones de Solo Tipos (`import type`)](#129-importaciones-de-solo-tipos-import-type)

---

## 12.1. Exportar desde un Módulo

Puedes exportar múltiples elementos desde un módulo, incluyendo variables, funciones, clases y **tipos**. Aquí hay un ejemplo con múltiples exportaciones:

```typescript
// En archivo: miModulo.ts
export const nombre = "Juan";
export let edad = 30;

export function saludar(): string {
  return `Hola, soy ${nombre} y tengo ${edad} años.`;
}
```

> [!NOTE]
> Los módulos ES son lo mismo en TypeScript, con una diferencia clave: al ejecutarlos con Node (que borra los tipos en tiempo de ejecución, *erasable-only*), usan la extensión `.ts`. Por eso aquí importamos `./miModulo.ts` y no `./miModulo.js`.

## 12.2. Importar en otro Módulo

Puedes importar múltiples elementos desde un módulo en otro. Aquí importamos el nombre, la edad y la función `saludar` desde el módulo anterior:

```typescript
// En otro archivo
import { nombre, edad, saludar } from "./miModulo.ts";

console.log(nombre); // Imprime "Juan"
console.log(edad); // Imprime 30
console.log(saludar()); // Imprime "Hola, soy Juan y tengo 30 años."
```

**Importación de espacio de nombres (`import * as`)**:

Cuando un módulo exporta muchos elementos, puedes importarlos todos bajo un namespace:

```typescript
import * as MiModulo from "./miModulo.ts";

console.log(MiModulo.nombre);   // "Juan"
console.log(MiModulo.edad);     // 30
console.log(MiModulo.saludar()); // "Hola, soy Juan y tengo 30 años."
```

> **NOTA:**
>
> > Para que los módulos funcionen hay que colocar en la llamada del script de html la propiedad: `type="module"` o dará error en el import 😧
> > `<script src="app.js" type="module"></script>` (si es TypeScript transpilado) o, en el navegador, usando los *type stripping* de los navegadores modernos: `<script src="app.ts" type="module"></script>`.

> [!TIP]
> Los tipos viajan con las mismas sentencias `import/export`, pero para verlos en el editor el remoto de `miModulo.ts` debe ser resuelto: con `moduleResolution: "bundler"` + `allowImportingTsExtensions` (como en el `tsconfig.json` del curso) TypeScript comprueba que las rutas y los nombres exportados coinciden.

## 12.3. Exportar e Importar Funciones

Las funciones también pueden exportarse e importarse de manera avanzada. Aquí se exporta una función con parámetros tipados y se importa con un alias:

```typescript
// En archivo: funciones.ts
export function sumar(a: number, b: number): number {
  return a + b;
}

// En otro archivo
import { sumar as add } from "./funciones.ts";

console.log(add(5, 3)); // Imprime 8
```

> [!IMPORTANT]
> La firma tipada viaja con la función: si en el archivo que importa llamas `add("5", 3)`, TypeScript te lo advierte antes de ejecutar.

## 12.4. Exportar e Importar Clases

Las clases son elementos importantes para la programación orientada a objetos en JavaScript. Pueden exportarse e importarse de la siguiente manera:

```typescript
// En archivo: clase.ts
export class Persona {
  nombre: string;
  edad: number;

  constructor(nombre: string, edad: number) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar(): string {
    return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
  }
}

// En otro archivo
import { Persona } from "./clase.ts";

const persona = new Persona("Ana", 25);
console.log(persona.saludar()); // Imprime "Hola, soy Ana y tengo 25 años."
```

## 12.5. Módulos con Exportaciones Nombradas y Por Defecto

Un módulo puede exportar elementos tanto nombrados como por defecto. Aquí se exporta una función por defecto junto con exportaciones nombradas:

```typescript
// En archivo: moduloCompleto.ts
export default function (): string {
  return "Exportación por defecto";
}

export const nombre = "Juan";
export let edad = 30;

// En otro archivo
import funcionPorDefecto, { nombre, edad } from "./moduloCompleto.ts";

console.log(funcionPorDefecto()); // Imprime "Exportación por defecto"
console.log(nombre); // Imprime "Juan"
```

## 12.6. Reexportación y Agregación de Módulos

Puedes reexportar elementos de otros módulos y agregarlos en un nuevo módulo. Esto facilita la organización de tus importaciones:

```typescript
// En archivo: moduloA.ts
export const variableA = "Valor de A";

// En archivo: moduloB.ts
export const variableB = "Valor de B";

// En archivo: moduloC.ts
export { variableA } from "./moduloA.ts"; // reexporta valores y sus tipos
export { variableB } from "./moduloB.ts";

// En otro archivo
import { variableA, variableB } from "./moduloC.ts";

console.log(variableA); // Imprime "Valor de A"
console.log(variableB); // Imprime "Valor de B"
```

## 12.7. Cargar Módulos Dinámicamente

Puedes cargar módulos dinámicamente utilizando la función `import()`. Esto es útil para cargar módulos de forma asincrónica:

```typescript
// En archivo: dinamico.ts
export function mostrarMensaje(): void {
  console.log("Mensaje desde el módulo dinámico");
}

// En otro archivo
const boton = document.querySelector("button");
boton?.addEventListener("click", async () => {
  const moduloDinamico = await import("./dinamico.ts");
  moduloDinamico.mostrarMensaje();
});
```

> `import()` devuelve una `Promise`. Envuelve la llamada en `try/catch` para manejar errores si el módulo no se encuentra.

> [!TIP]
> `import()` tipa el namespace importado: aquí `moduloDinamico` ya "sabe" que tiene `mostrarMensaje(): void`.

## 12.8. `import.meta` y Top-level await

### `import.meta`

El objeto `import.meta` expone metadatos del módulo actual. El más usado es `import.meta.url`:

```typescript
console.log(import.meta.url); // "file:///ruta/al/modulo.ts" o "https://..."

// Útil para resolver rutas relativas al módulo actual
const rutaBase = new URL(".", import.meta.url).href;
```

### Top-level await (ES2022)

En módulos ES puedes usar `await` en el nivel superior, sin necesidad de envolverlo en una `async function`:

```typescript
// En un archivo .ts (módulo ES)
const config = await fetch("/api/config").then((r) => r.json());
console.log("Configuración cargada:", config);

// El módulo no termina de cargarse hasta que se resuelve el await
export { config };
```

> Solo funciona en módulos ES (`type="module"` o extensión `.mjs`; en Node, `.ts` bajo ESM). En scripts comunes (`<script>` sin type) no está permitido.

## 12.9. Importaciones de Solo Tipos (`import type`)

En TypeScript puedes distinguir qué se importa como **tipo** y qué como **valor**. Con `verbatimModuleSyntax` (activo en el `tsconfig.json` del curso) TypeScript obliga a escribir `import type` para los tipos:

```typescript
// En archivo: tipos.ts
export interface Config {
  url: string;
  puerto: number;
}

export const version = "1.0.0";

// En otro archivo
import type { Config } from "./tipos.ts"; // solo tipo: se borra al ejecutar
import { version } from "./tipos.ts";     // valor: sí existe en runtime

const config: Config = { url: "localhost", puerto: 3000 };
console.log(version, config);
```

> [!IMPORTANT]
> `import type` se elimina por completo en tiempo de ejecución (es *erasable*). Esto es ideal junto al type stripping de Node: la sentencia de tipos no cuesta nada al ejecutar y evita cargas circulares de tipo. Regla: si solo necesitas un tipo de otro módulo, usa `import type`. Y recuerda el alias de reexportación de tipos: `export type { Config } from "./tipos.ts";`.

---

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-12-modulos.ts`)

```typescript
export {};

/**
 * Fichero 12: Modulos
 * --------------------
 * Ejemplos extraidos de Sesion 3 (concepto 7):
 * - Modulos: export, import, default, re-export
 * - import type (modulos type-only)
 * (Declaraciones .d.ts / namespace / ambient modules: optativo, fuera de la ruta React + Tauri)
 */

// ============================================================================
// MODULOS EN TYPESCRIPT
// ============================================================================

// --- archivo: matematica.ts ---
export function sumar(a: number, b: number): number {
    return a + b;
}

export const PI = 3.14159;

export interface Operacion {
    (a: number, b: number): number;
}

// export default: se puede exportar por defecto una funcion o constante
export default function multiplicar(a: number, b: number): number {
    return a * b;
}

// --- archivo: app.ts ---
// import multiplicar, { sumar, PI } from "./matematica";
// import type { Operacion } from "./matematica";

console.log(sumar(5, 3));        // 8
console.log(multiplicar(4, 2));  // 8

// Re-exportar
// export { sumar, restar } from "./matematica";
// export * from "./matematica";

// ============================================================================
// STRICT MODE Y CONFIGURACION (referencia)
// ============================================================================

// strict: true activa:
// - strictNullChecks: no permite null/undefined donde no se espera
// - noImplicitAny: exige tipar parametros
// - strictFunctionTypes: funciones covariantes/contravariantes
// - noImplicitThis: this debe estar tipado
// (strictPropertyInitialization se aplica a clases, fuera de la ruta)

// strictNullChecks
let nombre: string | null = "Juan";
nombre = null;
// nombre.length;  // Error: Object is possibly 'null'

// noImplicitAny
// function procesar(param) {}  // Error: implicit any
```

---

[Volver al índice general](../../index.md)