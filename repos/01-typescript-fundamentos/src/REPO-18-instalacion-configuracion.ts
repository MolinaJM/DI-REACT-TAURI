export {};

/**
 * Fichero 18: Instalacion y Configuracion de TypeScript
 * -------------------------------------------
 * Este fichero documenta los comandos de instalacion y
 * configuracion basica de TypeScript.
 *
 * Ejemplos extraidos de Sesion 2 (concepto 2):
 * - Instalacion global
 * - Comandos基本icos
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
// COMANDOS基本ICOS
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
