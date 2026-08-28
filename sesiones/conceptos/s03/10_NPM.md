# 10. Node.js, npm, pnpm y Vite en TypeScript 📝 🖥️

- [10. Node.js, npm, pnpm y Vite en TypeScript 📝 🖥️](#10-nodejs-npm-pnpm-y-vite-en-typescript)
  - [10.1. Instalación de Node.js con nvm](#101-instalación-de-nodejs-con-nvm)
  - [10.2. Creación de un Proyecto de TypeScript](#102-creación-de-un-proyecto-de-typescript)
  - [10.3. Uso Básico de npm](#103-uso-básico-de-npm)
  - [10.4. pnpm y Corepack](#104-pnpm-y-corepack)
  - [10.5. Uso de Paquetes en un Proyecto de TypeScript](#105-uso-de-paquetes-en-un-proyecto-de-typescript)
  - [10.6. Scripts Personalizados](#106-scripts-personalizados)
  - [10.7. Creación de un Proyecto con Vite](#107-creación-de-un-proyecto-con-vite)
    - [10.7.1. Estructura del Proyecto](#1071-estructura-del-proyecto)
    - [10.7.2. Iniciar el Servidor de Desarrollo](#1072-iniciar-el-servidor-de-desarrollo)
    - [10.7.3. Crear un Proyecto de Producción](#1073-crear-un-proyecto-de-producción)
    - [10.7.4. Personalizar Configuraciones](#1074-personalizar-configuraciones)
  - [10.8. TypeScript como Dependencia de Desarrollo](#108-typescript-como-dependencia-de-desarrollo)

---

## 10.1. Instalación de Node.js con nvm

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

## 10.2. Creación de un Proyecto de TypeScript

Para empezar, creamos un directorio para el proyecto y nos posicionamos sobre él a través de una terminal:

```bash
mkdir mi-proyecto
cd mi-proyecto
```

Este curso trabaja con TypeScript y módulos ES ejecutados por Node (origen: Node 24 + *erasable-only*). La configuración base del repositorio está en `tsconfig.json` (puedes ver la del curso en la raíz):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "types": ["node"]
  }
}
```

> [!IMPORTANT]
> Con `"noEmit": true` + Node 24 no generamos archivos `.js`: Node ejecuta directamente los `.ts` borrando los tipos. Por eso el código debe ser *erasable-only* (sin `enum`, `namespace` ni parámetros de propiedad), como indica `CONTRIBUTING.md`.

Ejecutamos tu primer archivo TypeScript directamente:

```bash
node main.ts
```

## 10.3. Uso Básico de npm

Antes de instalar paquetes, puedes iniciar un proyecto npm ejecutando:

```bash
npm init -y
```

Esto creará un archivo `package.json` que almacena información sobre el proyecto y sus dependencias. Añadele el campo `"scripts"` cuando quieras automatizar comandos.

## 10.4. pnpm y Corepack

`npm` viene instalado con Node. `pnpm` es otro gestor de paquetes moderno, rápido y eficiente con el espacio en disco. En proyectos actuales es habitual usar `pnpm` para instalar dependencias y ejecutar scripts.

Node incluye Corepack, una herramienta que permite activar gestores como pnpm:

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```

Instalar dependencias en un proyecto:

```bash
pnpm install
```

Instalar un paquete:

```bash
pnpm add nombre-del-paquete
```

Instalar una dependencia solo para desarrollo:

```bash
pnpm add -D nombre-del-paquete
```

Equivalencias básicas:

| npm | pnpm | Uso |
| --- | --- | --- |
| `npm install` | `pnpm install` | Instalar dependencias |
| `npm install paquete` | `pnpm add paquete` | Añadir dependencia |
| `npm run dev` | `pnpm dev` | Ejecutar script |
| `npm run build` | `pnpm build` | Crear build |

> [!TIP]
> En este curso usamos `npm` en los ejemplos genéricos; en el repositorio los scripts están pensados para ejecutarse igual con `npm run X` o `pnpm X`.

## 10.5. Uso de Paquetes en un Proyecto de TypeScript

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

## 10.6. Scripts Personalizados

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

## 10.7. Creación de un Proyecto con Vite

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

### 10.7.1. Estructura del Proyecto

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

### 10.7.2. Iniciar el Servidor de Desarrollo

Para iniciar el servidor de desarrollo proporcionado por Vite, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm run dev
```

Esto iniciará un servidor de desarrollo local. Vite suele usar `http://localhost:5173` por defecto si el puerto está libre. Puedes ver los cambios en tiempo real mientras desarrollas.

### 10.7.3. Crear un Proyecto de Producción

Para crear una versión de producción optimizada de tu proyecto, utiliza el siguiente comando:

```bash
npm run build
```

Esto generará una carpeta `dist/` que contiene los archivos optimizados (ya convertidos a JavaScript para el navegador) listos para ser desplegados en un servidor web.

> [!NOTE]
> En este caso sí hay compilación real: los `.ts` se convierten a `.js` optimizado. Vite se encarga de ello (bajo el capó usa esbuild/rollup), así que el navegador recibe JavaScript estándar.

### 10.7.4. Personalizar Configuraciones

Puedes personalizar la configuración de un proyecto Vite creando o editando `vite.config.js` (o `vite.config.ts`). Para proyectos iniciales de TypeScript Vanilla normalmente no hace falta tocarlo.

## 10.8. TypeScript como Dependencia de Desarrollo

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

### 📦 En el repositorio (`repos/01-typescript-fundamentos/src/REPO-18-instalacion-configuracion.ts`)

```typescript
export {};

/**
 * Fichero 18: Instalacion y Configuracion de TypeScript
 * -------------------------------------------
 * Este fichero documenta los comandos de instalacion y
 * configuracion basica de TypeScript.
 *
 * Ejemplos extraidos de Sesion 2 (concepto 2):
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

// Compilar solo un fichero:
// tsc src/REPO-01-tipos-primitivos.ts

// ========================================
// tsconfig.json BASICO
// ========================================

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

---

[Volver al índice general](../../index.md)