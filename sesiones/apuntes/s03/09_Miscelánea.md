
<a id="09-miscelánea-modulos-y-npm"></a>
# 09. Miscelánea: Módulos y NPM 📝 🖥️

- [09. Miscelánea: Módulos y NPM 📝 🖥️](#09-miscelánea-modulos-y-npm)
  - **Parte A · Módulos ES (import/export)**
    - [9.1. Exportar desde un Módulo](#91-exportar-desde-un-módulo)
    - [9.2. Importar en otro Módulo](#92-importar-en-otro-módulo)
    - [9.3. Exportar e Importar Funciones](#93-exportar-e-importar-funciones)
    - [9.4. Módulos con Exportaciones Nombradas y Por Defecto](#94-módulos-con-exportaciones-nombradas-y-por-defecto)
    - [9.5. Importaciones de Solo Tipos (`import type`)](#95-importaciones-de-solo-tipos-import-type)
  - **Parte B · Node.js, npm y Vite**
    - [9.6. Instalación de Node.js con nvm](#96-instalación-de-nodejs-con-nvm)
    - [9.7. Creación de un Proyecto de TypeScript](#97-creación-de-un-proyecto-de-typescript)
    - [9.8. Uso Básico de npm](#98-uso-básico-de-npm)
    - [9.9. Uso de Paquetes en un Proyecto de TypeScript](#99-uso-de-paquetes-en-un-proyecto-de-typescript)
    - [9.10. Scripts Personalizados](#910-scripts-personalizados)
    - [9.11. Creación de un Proyecto con Vite](#911-creación-de-un-proyecto-con-vite)
      - [9.11.1 Estructura del Proyecto](#9111-estructura-del-proyecto)
      - [9.11.2 Iniciar el Servidor de Desarrollo](#9112-iniciar-el-servidor-de-desarrollo)
      - [9.11.3 Crear un Proyecto de Producción](#9113-crear-un-proyecto-de-producción)
      - [9.11.4 Personalizar Configuraciones](#9114-personalizar-configuraciones)
    - [9.12 TypeScript como Dependencia de Desarrollo](#912-typescript-como-dependencia-de-desarrollo)
- ℹ️ **Sin bloque de ejercicios:** este apunte no tiene ejercicios asociados. Se imparte dentro del mismo bloque que *Estructuras de Datos* y queda como material de consulta: no aporta contenido que merezca trabajarse a fondo.

---

## Parte A · Módulos ES (import/export)

<a id="91-exportar-desde-un-módulo"></a>
### 9.1 Exportar desde un Módulo

Al añadir export {} al final o al principio de un archivo de pruebas, le dices a TypeScript:

*Este archivo es un módulo independiente. obligar a TypeScript a tratar ese archivo como un Módulo ES y no como un script global.*

Un ES Module aísla todas sus variables, tipos e interfaces para que no interfieran con ningún otro archivo del proyecto."

Puedes exportar múltiples elementos desde un módulo, incluyendo variables, funciones, clases y **tipos**. Aquí hay un ejemplo con múltiples exportaciones:

```typescript
// En archivo: miModulo.ts
export const nombre = "Juan";

export function saludar(): string {
  return `Hola, soy ${nombre}.`;
}
```

<a id="92-importar-en-otro-módulo"></a>
### 9.2 Importar en otro Módulo

Puedes importar múltiples elementos desde un módulo en otro. Aquí importamos el nombre, la edad y la función `saludar` desde el módulo anterior:

```typescript
// En otro archivo
import { nombre, saludar } from "./miModulo.ts";

console.log(nombre);    // "Juan"
console.log(saludar()); // "Hola, soy Juan."
```

<a id="93-exportar-e-importar-funciones"></a>
### 9.3 Exportar e Importar Funciones

Las funciones también pueden exportarse e importarse de manera avanzada. Aquí se exporta una función con parámetros tipados:

```typescript
// En archivo: funciones.ts
export function sumar(a: number, b: number): number {
  return a + b;
}

// En otro archivo
import { sumar } from "./funciones.ts";

console.log(sumar(5, 3)); // Imprime 8
```

> [!IMPORTANT]
> La firma tipada viaja con la función: si en el archivo que importa llamas `sumar("5", 3)`, TypeScript te lo advierte antes de ejecutar.

<a id="94-módulos-con-exportaciones-nombradas-y-por-defecto"></a>
### 9.4 Módulos con Exportaciones Nombradas y Por Defecto

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

<a id="95-importaciones-de-solo-tipos-import-type"></a>
### 9.5 Importaciones de Solo Tipos (`import type`)

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

---
### 📦 Ejemplo completo: `modulos.ts`

Módulos: export/import, default, re-export e import type.

```typescript

/**
 * Fichero 12: Modulos
 * --------------------
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
```

> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `09_Modulos.ts` y ejecuta `npx tsx 09_Modulos.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).
> 📖 **Material de consulta:** se imparte junto a *Arrays*, sin bloque de ejercicios propio (export/import se ve en la práctica al montar cada proyecto React).

---

## Parte B · Node.js, npm y Vite


<a id="96-instalación-de-nodejs-con-nvm"></a>
### 9.6  Instalación de Node.js con nvm

Node.js permite ejecutar JavaScript fuera del navegador. En desarrollo frontend se usa para ejecutar herramientas como Vite, npm, pnpm, linters, tests y procesos de build. Además, **Node 24 puede ejecutar TypeScript directamente** (eliminando los tipos en tiempo de ejecución), por lo que muchas herramientas del curso funcionan sin transpilar.

Para clase se recomienda usar **Node.js 24 LTS**. Una versión LTS es una versión estable con soporte a largo plazo.

La forma más cómoda de instalar y cambiar versiones de Node es usar `nvm`:

```bash
# Instalar la versión LTS recomendada para el curso
nvm install 24

# Activar esa versión en la terminal actual
nvm use 24

# Dejar Node 24 como versión por defecto
nvm alias default 24
```

Comprobamos la instalación:

```bash
node -v
npm -v
```

También se pueden tener varias versiones instaladas:

```bash
nvm install 22
nvm install 24
nvm use 22
nvm use 24
```

Esto es útil cuando un proyecto antiguo necesita una versión y un proyecto moderno necesita otra.

> [!NOTE]
> Para fijar la versión de Node en un equipo concreto del equipo, usamos el archivo `.nvmrc` con el contenido `24`. Así `nvm use` activa la versión correcta en el proyecto.

<a id="97-creación-de-un-proyecto-de-typescript"></a>
### 9.7  Creación de un Proyecto de TypeScript

Para empezar, creamos un directorio para el proyecto y nos posicionamos sobre él a través de una terminal:

```bash
mkdir mi-proyecto
cd mi-proyecto
```

Este curso trabaja con TypeScript y módulos ES ejecutados por Node (origen: Node 24 + *erasable-only*). La configuración base está en el `tsconfig.json` de cada proyecto. Este es el **canónico del curso** (la misma configuración que usan todos los ejercicios, repos y proyectos):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2024", "ESNext", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "verbatimModuleSyntax": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  }
}
```

> [!NOTE]
> Cada proyecto del curso (`bancop/`, `repos/*`) usa **este mismo `compilerOptions`** y solo cambia el campo `include` según lo que compile (p. ej. `repos/*` → `"include": ["src"]`). El flag `"type": "module"` **no** va aquí: se declara en el `package.json` (lo vemos un poco más abajo).

> [!IMPORTANT]
> **`strict: true`** — Activa un conjunto de verificaciones de tipos que ayudan a detectar errores en tiempo de compilación:
>
> | Flag | Qué hace |
> |---|---|
> | `strictNullChecks` | `null` y `undefined` son tipos propios; no se asignan implícitamente a otros tipos |
> | `noImplicitAny` | Prohíbe variables/parámetros con tipo `any` implícito (obliga a escribir el tipo) |
> | `strictFunctionTypes` | Comprobación estricta de tipos en funciones (contravarianza en parámetros) |
> | `strictBindCallApply` | Comprobación estricta de tipos en `.bind()`, `.call()`, `.apply()` |
> | `strictPropertyInitialization` | Las propiedades de clase deben inicializarse en el constructor |
> | `noImplicitThis` | Prohíbe `this` implícito sin tipo (obliga a anotarlo) |
> | `alwaysStrict` | Añade `"use strict"` en cada fichero |
>
> **`noUncheckedIndexedAccess: true`** — Al acceder a un array u objeto por índice, el resultado incluye `| undefined`:
>
> ```typescript
> const nums = [10, 20, 30];
> const x = nums[0]; // number | undefined (¡no solo number!)
> ```
>
> Esto obliga a comprobar siempre que el índice existe antes de usar el valor, evitando errores silenciosos.
>
> **`verbatimModuleSyntax: true`** — Obliga a usar `import type` para importar tipos (no valores). Esto hace evidente qué se importa solo para el chequeo de tipos y qué se importa para ejecutar código:
>
> ```typescript
> import type { Persona } from "./modelos"; // Solo existe en compilación
> import { crear } from "./modelos";        // Existe en ejecución
> ```

> [!IMPORTANT]
> Con `"noEmit": true` + Node 24 no generamos archivos `.js`: Node ejecuta directamente los `.ts` borrando los tipos. Por eso el código debe ser *erasable-only* (sin `enum`, `namespace` ni parámetros de propiedad), como se explica en la **sesión 02** (capítulo 1) y en `REPOS.md`.

> [!NOTE]
> **Para que cada `.ts` se trate como un módulo ES:** la clave `"type": "module"` va en el **`package.json`** (no en `tsconfig.json`). En `tsconfig.json` el equivalente es `"module": "ESNext"` + `"moduleResolution": "bundler"`, como muestra el esquema de arriba:
> ```json
> // package.json
> { "type": "module" }
> ```
> Sin `"type": "module"` en `package.json`, Node/tsx interpretan los ficheros `.ts` con `import`/`export` como CommonJS y pueden fallar (de ahí que `bancop/` lo declare).

Ejecutamos tu primer archivo TypeScript directamente:

```bash
node main.ts
```

<a id="98-uso-básico-de-npm"></a>
### 9.8  Uso Básico de npm

Antes de instalar paquetes, puedes iniciar un proyecto npm ejecutando:

```bash
npm init -y
```

Esto creará un archivo `package.json` que almacena información sobre el proyecto y sus dependencias. Añadele el campo `"scripts"` cuando quieras automatizar comandos.

<a id="99-uso-de-paquetes-en-un-proyecto-de-typescript"></a>
### 9.9  Uso de Paquetes en un Proyecto de TypeScript

Puedes usar paquetes instalados en tu proyecto TypeScript (ejecutado por el navegador vía Vite o por Node) mediante módulos ES. Aquí hay un ejemplo:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ejemplo de uso de paquetes con NPM</title>
  </head>
  <body>
    <button id="paquetes">Haciendo prueba del uso de paquetes</button>

    <script src="app.ts" type="module"></script>
  </body>
</html>
```

En tu archivo TypeScript `app.ts`, puedes importar y usar el paquete `nombre-del-paquete` de la siguiente manera:

```typescript
// Importamos una funcionalidad desde un paquete instalado.
import utilidad from "nombre-del-paquete";

// Muchos paquetes traen sus propios tipos o los obtienen de @types/...
import type { AlgunTipo } from "nombre-del-paquete";

// Usamos la funcionalidad dentro de nuestro código.
utilidad();
```

> [!IMPORTANT]
> Los paquetes modernos suelen distribuir sus propios tipos (campo `"types"` o `exports` con `"types"`). Si un paquete no trae tipos, se instalan por separado como `@types/<paquete>` (p. ej. `@types/node`) y se declaran en `tsconfig.json` dentro de `"types"`.

<a id="910-scripts-personalizados"></a>
### 9.10  Scripts Personalizados

Puedes definir scripts personalizados en tu `package.json` para automatizar tareas comunes. Por ejemplo, puedes agregar un script para ejecutar tu aplicación y otro para comprobar tipos:

```json
"scripts": {
    "start": "node app.ts",
    "check": "tsc"
},
```

Luego, puedes ejecutar tu aplicación con:

```bash
npm start
```

Y comprobar los tipos de todo el proyecto con:

```bash
npm run check
```

> [!NOTE]
> `tsc` (el compilador de TypeScript) con `--noEmit` únicamente **valida tipos**, no genera archivos. Con Node 24 no necesitas transpilar para ejecutar.

<a id="911-creación-de-un-proyecto-con-vite"></a>
### 9.11  Creación de un Proyecto con Vite

[Vite](https://vite.dev/) es una herramienta de desarrollo que facilita la creación de proyectos web modernos. Puedes crear un nuevo proyecto de **TypeScript** con Vite usando npm:

```bash
npm create vite@latest nombre-del-proyecto -- --template vanilla-ts
```

O usando pnpm:

```bash
pnpm create vite nombre-del-proyecto --template vanilla-ts
```

> [!NOTE]
> El template para TypeScript se llama `vanilla-ts` (no `vanilla`). También existen `react-ts`, `vue-ts`, `preact-ts`, etc. Si eliges `vanilla`, obtendrás JavaScript puro; nosotros queremos TypeScript.

Esto creará un proyecto de TypeScript Vanilla con una estructura y configuración predefinidas.

<a id="9111-estructura-del-proyecto"></a>
#### 9.11.1 Estructura del Proyecto

Una vez que se ha creado el proyecto, la estructura de directorios se verá así:

```
nombre-del-proyecto/
  ├── node_modules/
  ├── public/
  │   ├── vite.svg
  │   └── favicon.ico
  ├── src/
  │   ├── main.ts
  │   ├── style.css
  │   ├── counter.ts
  │   ├── typescript.svg
  │   └── vite-env.d.ts
  ├── index.html
  ├── package.json
  ├── tsconfig.json
  ├── README.md
  └── .gitignore
```

- `public/`: Contiene archivos públicos, como `index.html` y `favicon.ico`.
- `src/`: Aquí se encuentra tu código fuente TypeScript, CSS y otros recursos.
- `package.json`: Archivo de configuración del proyecto.
- `src/main.ts`: Punto de entrada de la aplicación.
- `tsconfig.json`: Configuración del compilador de TypeScript (el template de Vite ya lo incluye).
- `src/vite-env.d.ts`: Declaraciones de tipos para los módulos de Vite en el navegador.

<a id="9112-iniciar-el-servidor-de-desarrollo"></a>
#### 9.11.2 Iniciar el Servidor de Desarrollo

Para iniciar el servidor de desarrollo proporcionado por Vite, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm run dev
```

Esto iniciará un servidor de desarrollo local. Vite suele usar `http://localhost:5173` por defecto si el puerto está libre. Puedes ver los cambios en tiempo real mientras desarrollas.

<a id="9113-crear-un-proyecto-de-producción"></a>
#### 9.11.3 Crear un Proyecto de Producción

Para crear una versión de producción optimizada de tu proyecto, utiliza el siguiente comando:

```bash
npm run build
```

Esto generará una carpeta `dist/` que contiene los archivos optimizados (ya convertidos a JavaScript para el navegador) listos para ser desplegados en un servidor web.

> [!NOTE]
> En este caso sí hay compilación real: los `.ts` se convierten a `.js` optimizado. Vite se encarga de ello (bajo el capó usa esbuild/rollup), así que el navegador recibe JavaScript estándar.

<a id="9114-personalizar-configuraciones"></a>
#### 9.11.4 Personalizar Configuraciones

Puedes personalizar la configuración de un proyecto Vite creando o editando `vite.config.js` (o `vite.config.ts`). Para proyectos iniciales de TypeScript Vanilla normalmente no hace falta tocarlo.

<a id="912-typescript-como-dependencia-de-desarrollo"></a>
### 9.12 TypeScript como Dependencia de Desarrollo

`typescript` es una dependencia de desarrollo (con `-D`). No forma parte del "código de producción": es una herramienta de compilación y validación.

```bash
npm install -D typescript @types/node
```

Por qué:

- **`typescript`**: proporciona el comando `tsc` (validación de tipos) que usamos en `npm run check`.
- **`@types/node`**: los tipos de la API de Node (módulos como `process`, `fs`, `path`, `node:`...), necesarios si escribes TypeScript para ejecutar con Node.
- La versión recomendada en el curso es la **5.8 o superior** (para que el editor y Node 24 trabajen con el mismo estándar de *erasable-only*).

Ejemplo de script que combina validación y ejecución:

```json
"scripts": {
    "check": "tsc",
    "start": "node main.ts"
}
```

> [!IMPORTANT]
> En el navegador (con Vite) no usas `process` ni `fs` (no existen). Ahí los tipos "web" vienen del `lib: ["DOM"]` del `tsconfig`. En Node sí usas `@types/node` y `import.meta`, como vimos en el capítulo de módulos.

---
### 📦 Ejemplo completo: `instalacion-configuracion.ts`

Instalación, comandos básicos y tsconfig.json.

```typescript

/**
 * Fichero 18: Instalacion y Configuracion de TypeScript
 * -------------------------------------------
 * Este fichero documenta los comandos de instalacion y
 * configuracion basica de TypeScript.
 *
 * - Instalacion global
 * - Comandos básicos
 * - tsconfig.json basico
 *
 * NOTA: Este fichero contiene solo comentarios con referencia
 * a comandos de terminal. Ejecutar los comandos en la terminal.
 */

// ========================================
// INSTALACION
// ========================================

// Instalacion global (una sola vez):
// npm install -g typescript

// Verificar version:
// tsc --version
// Version 5.x

// ========================================
// COMANDOS BÁSICOS
// ========================================

// Compilar un archivo:
// tsc archivo.ts
// Genera archivo.js

// Compilar en modo watch (recompila automaticamente):
// tsc archivo.ts --watch

// Inicializar configuracion de proyecto:
// tsc --init
// Genera tsconfig.json

// Compilar todo el proyecto:
// tsc

// Compilar solo un fichero (uno que hayas copiado a bancop/):
// tsc bancop/00_Introduccion.ts

// ========================================
// tsconfig.json BASICO
// ========================================
// NOTA: ejemplo generico generado por "tsc --init".
// El config del CURSO es el canonico de la seccion 9.2 (noEmit,
// erasable-only, sin outDir/rootDir: Node ejecuta los .ts tal cual).

// {
//     "compilerOptions": {
//         "target": "ES2020",
//         "module": "ESNext",
//         "strict": true,
//         "outDir": "./dist",
//         "rootDir": "./src",
//         "esModuleInterop": true,
//         "skipLibCheck": true,
//         "forceConsistentCasingInFileNames": true
//     },
//     "include": ["src/**/*"],
//     "exclude": ["node_modules", "dist"]
// }

// ========================================
// OPCIONES IMPORTANTES
// ========================================

// "strict": true
// Habilita todas las verificaciones estrictas de tipos.
// Incluye: strictNullChecks, noImplicitAny, strictFunctionTypes, etc.

// "target": "ES2020"
// Version de JavaScript a la que compila.
// ES2020 soporta optional chaining (?.), nullish coalescing (??), etc.

// "module": "ESNext"
// Sistema de modulos (import/export).

// "outDir": "./dist"
// Directorio de salida del codigo compilado.

// "rootDir": "./src"
// Directorio raiz de los fuentes TypeScript.

// "esModuleInterop": true
// Permite importar modulos CommonJS con sintaxis ES6.

// "skipLibCheck": true
// Omite verificacion de tipos en archivos .d.ts de librerias.

// ========================================
// ARCHIVOS CLAVE EN UN PROYECTO TS
// ========================================

// tsconfig.json          Configuracion del compilador
// tsconfig.app.json      Configuracion para la app (Vite)
// tsconfig.node.json     Configuracion para scripts de node (Vite)
// *.ts                   Fuentes TypeScript
// *.tsx                  TypeScript + JSX (React)
// *.d.ts                 Declaraciones de tipos (ambient)

console.log("Fichero de referencia: ejecuta los comandos en la terminal");
console.log("Ver README.md del repo para mas detalles");
```

> ▶ **Cómo probarlo:** copia este bloque a `bancop` como `10_NPM.ts` y ejecuta `npx tsx 10_NPM.ts` (desde `bancop/`; entorno estricto + lib ES2024 ya en su tsconfig).
> ⚙️ **Configuración activa:** [`bancop/tsconfig.json`](../../../bancop/tsconfig.json) · [catálogo S3·180](../../../ejerciciosTS/ejerciciosTS.md).


---

[Volver al índice general](../../../README.md#5-distribución-temporal-y-contenidos-s00s13)
