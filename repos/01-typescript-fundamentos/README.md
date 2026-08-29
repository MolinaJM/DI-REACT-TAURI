# Fundamentos de TypeScript

![Sesiones](https://img.shields.io/badge/Sesiones-S02--S03-blue)
![Tecnologia](https://img.shields.io/badge/Tecnologia-TypeScript-3178C6?logo=typescript&logoColor=white)
![Runner](https://img.shields.io/badge/Runner-tsx-000?logo=node.js&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Ejemplos y ejercicios de los conceptos fundamentales de TypeScript, desde tipos primitivos hasta async/await y módulos.

> **Ruta obligatoria** para el curso DI-RT (React + Tauri). Se ha recortado el material optativo (OOP, enums, template literal types, `.d.ts`/namespace, DOM directo y Web APIs) para quedarnos solo con lo estrictamente necesario para React + Tauri.

## Estructura

```
├── src/
│   ├── REPO-01-tipos-primitivos.ts       string, number, boolean, null, undefined, any, unknown, symbol, bigint
│   ├── REPO-02-arrays-tuples.ts          Array<T>, ReadonlyArray, tuples, destructuring
│   ├── REPO-03-tipos-especiales.ts      any, unknown, void, never, type assertions
│   ├── REPO-04-unions-intersections.ts   uniones, intersecciones, type narrowing
│   ├── REPO-05-interfaces-types.ts       interfaces, type aliases, extension, readonly
│   ├── REPO-06-funciones.ts              parametros, retorno, opcionales, sobrecarga
│   ├── REPO-07-type-guards-conversion.ts typeof, instanceof, in, narrowing, as
│   ├── REPO-08-control-flow-scope.ts     let/const, var, blocks, closures
│   ├── REPO-12-modulos.ts                module: export/import, import type, default
│   ├── REPO-13-async-await.ts            Promise, async/await, AbortController, Fetch
│   ├── REPO-15-arrays-avanzado.ts        Set, Map, WeakMap, structuredClone, Object.groupBy
│   ├── REPO-17-que-es-typescript.ts      JS vs TS, ventajas del tipado
│   └── REPO-18-instalacion-configuracion.ts  Comandos tsc, tsconfig.json
├── package.json
└── tsconfig.json
```

## Ejecutar

```bash
npm install
npx tsx src/REPO-01-tipos-primitivos.ts
```

Cambiar el numero del fichero para ejecutar otro ejemplo.

## Dependencias

- `typescript`
- `tsx` (ejecutor de TypeScript)
