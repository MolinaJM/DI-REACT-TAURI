# Repositorios del Curso DI-RT

Tabla resumen de sesiones, repositorios y tecnologias.

## Orden de sesiones

| Sesion | Titulo | Repositorio | Tecnologias |
|--------|--------|-------------|-------------|
| S00 | Fundamentos de Arquitectura y Configuracion del Entorno | — | nvm, Node.js, npm, Vite, React, Tailwind CSS, Rust, Tauri (panoramica) |
| S01 | Instalacion del Entorno de Desarrollo | — | Microsoft C++ Build Tools, Rustup, nvm-windows/nvm, WSLg, Xcode CLT, Homebrew |
| S01-S | Scaffolding de un Proyecto Tauri con React y Rust | — | Estructura de archivos Tauri, Cargo.toml, tauri.conf.json, invoke, IPC |
| S02 | Introduccion a TypeScript (Parte 1) | — (ejemplos en apuntes) | Tipos primitivos, arrays, tuples, enums, interfaces, type aliases, funciones, type guards, operadores, control flow, scope |
| S03 | Introduccion a TypeScript (Parte 2) | — (ejemplos en apuntes) | Clases, herencia, abstractas, generics, modulos, declaraciones .d.ts, async/await, Promises, Fetch, DOM tipado, Set, Map, Web APIs |
| S04 | Anatomia de Componentes y Funciones con TypeScript | `02-react-componentes` | Functional components, FC\<Props\>, props children, useState, useEffect, composicion |
| S05 | Gestion de Estado Basico y Tipado de Formularios | `02-react-componentes` | useReducer, formularios controlados, validacion tipada |
| S06 | Creacion de Componentes Personalizados | `02-react-componentes` | ButtonHTMLAttributes, generic Table\<T\>, Modal, composicion, slots |
| S07 | El Puente de Comunicacion (Tauri IPC) y Sistema de Archivos | `03-tauri-ipc-filesystem` | #[tauri::command], invoke(), eventos Tauri, std::fs, leer/escribir archivos, listar directorios, CRUD con invoke |
| S08 | Persistencia de Estado Global y Enrutado | `04-react-avanzado` | Context API, Zustand, persist middleware, React Router v7, Layout/Outlet, structuredClone |
| S09 | Formulario CRUD con invoke (Tauri) | `04-react-avanzado` | Servicio genérico sobre invoke (`crud.tsx`), comandos listar/obtener/crear/actualizar/borrar, validación de formularios, Omit\<T\>, Partial |
| S10 | Estilizacion Avanzada y Diseno de Interfaces | `04-react-avanzado` | Tailwind CSS, responsive design, grid, hamburger menu, animaciones, transiciones, conditional styling |
| S11 | Creacion de Informes en PDF con React | `04-react-avanzado` | @react-pdf/renderer, Document/Page/Text/View, StyleSheet, PDFViewer, PDFDownloadLink, tablas |
| S12 | Prueba automatizada | `05-testing` | Vitest, Testing Library, renderHook, act, waitFor, vi.fn, Playwright E2E, ejercicios autoevaluables TS |

## Repositorios

```
repos/
├── 02-react-componentes/         S04 + S05 + S06
│   ├── src/
│   │   ├── components/
│   │   │   ├── Saludo.tsx            S04
│   │   │   ├── Card.tsx              S04
│   │   │   ├── ListaTareas.tsx       S04
│   │   │   ├── ListaUsuarios.tsx     S04
│   │   │   ├── Boton.tsx             S06
│   │   │   ├── Modal.tsx             S06
│   │   │   └── TablaGenerica.tsx     S06
│   │   ├── hooks/
│   │   │   └── useForm.ts            S05
│   │   ├── state/
│   │   │   ├── useReducerEjemplo.tsx S05
│   │   │   └── FormularioRegistro.tsx S05
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│   Ejecucion: npm run dev
│   Dependencias: react, react-dom, tailwindcss, vite, typescript
│   Requisito: Node.js
│
├── 02-react-ejemplo-minimo/       S04 (arranque)
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormularioNombre.tsx   Caja de texto + botón (estado local + callback)
│   │   │   └── Saludo.tsx             Muestra "¡Hola, {nombre}!" (solo props)
│   │   ├── App.tsx                    Padre: estado + composición (lifting state up)
│   │   └── main.tsx                   Punto de entrada
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│   Ejecucion: npm run dev
│   Dependencias: react, react-dom, vite, typescript
│   Requisito: Node.js
│   Nota: el mínimo absoluto de React (dos componentes, estado y props), sin Tailwind. Complementa a `02-react-componentes`.
│
├── 03-tauri-ejemplo-minimo/       S07 (arranque Tauri)
│   ├── src/
│   │   ├── components/
│   │   │   └── FormularioNombre.tsx   Caja de texto + botón (igual que el ejemplo React)
│   │   ├── App.tsx                    Estado + invoke("saludar") → saludo desde Rust
│   │   └── main.tsx                   Punto de entrada
│   ├── src-tauri/
│   │   ├── src/
│   │   │   ├── main.rs
│   │   │   └── lib.rs                 comando saludar(nombre) -> String
│   │   ├── Cargo.toml
│   │   ├── tauri.conf.json
│   │   └── capabilities/default.json
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│   Ejecucion: npx tauri dev
│   Dependencias: @tauri-apps/api, react, vite, rust/cargo
│   Requisito: Node.js + Rust + Microsoft C++ Build Tools (o build-essential)
│   Nota: la versión Tauri de `02-react-ejemplo-minimo`. Mismo UI, pero el saludo lo devuelve el backend Rust vía invoke(). Ver la evolución React → Tauri.
│
├── 03-tauri-ipc-filesystem/      S07
│   ├── src/
│   │   ├── components/
│   │   │   ├── ComponenteIPC.tsx     invoke saludar/sumar
│   │   │   ├── EventosTauri.tsx      listen/emit de eventos
│   │   │   ├── Filesystem.tsx        listar/leer/escribir con std::fs
│   │   │   └── InvokeCRUD.tsx        CRUD con invoke (posts_listar/crear/borrar)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── src-tauri/
│   │   ├── src/
│   │   │   ├── main.rs
│   │   │   └── lib.rs               greet, saludar, sumar, info_sistema,
│   │   │                            tarea_larga (emit "progreso"),
│   │   │                            leer_archivo, escribir_archivo,
│   │   │                            listar_directorio,
│   │   │                            posts_listar/obtener/crear/actualizar/borrar
│   │   ├── Cargo.toml
│   │   ├── tauri.conf.json
│   │   ├── capabilities/default.json
│   │   └── build.rs
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│   Ejecucion: npx tauri dev
│   Dependencias: @tauri-apps/cli, @tauri-apps/api, react, vite, rust/cargo
│   Requisito: Node.js + Rust + Microsoft C++ Build Tools (o build-essential)
│
├── 04-react-avanzado/            S08 + S09 + S10 + S11
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthProvider.tsx      S08
│   │   ├── store/
│   │   │   └── carritoStore.ts       S08
│   │   ├── api/
│   │   │   └── crud.tsx              S09
│   │   ├── styles/
│   │   │   ├── Dashboard.tsx         S10
│   │   │   ├── Navbar.tsx            S10
│   │   │   └── Animations.tsx        S10
│   │   ├── pdf/
│   │   │   ├── InformePDF.tsx        S11
│   │   │   └── PDFViewer.tsx         S11
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│   Ejecucion: npm run dev
│   Dependencias: react, zustand, react-router-dom, @react-pdf/renderer, tailwindcss, vite
│   Requisito: Node.js
│
└── 05-testing/                   S12
    ├── src/
    │   ├── components/
    │   │   ├── Contador.tsx
    │   │   ├── Saludo.tsx
    │   │   └── FormularioLogin.tsx
    │   ├── hooks/
    │   │   └── useForm.ts
    │   ├── utils/
    │   │   └── matematicas.ts
    │   ├── test/
    │   │   └── setup.ts
    │   ├── __tests__/
    │   │   ├── Contador.test.tsx
    │   │   ├── Saludo.test.tsx
    │   │   ├── useForm.test.ts
    │   │   ├── matematicas.test.ts
    │   │   └── FormularioLogin.test.tsx
    │   ├── App.tsx
    │   └── main.tsx
    ├── e2e/
    │   └── navegacion.spec.ts
    ├── tests-ejercicios-ts/
    │   ├── 01-arrays.test.ts
    │   ├── 02-objetos.test.ts
    │   ├── 03-funciones.test.ts
    │   └── 04-estado-reducer.test.ts
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── playwright.config.ts
    Ejecucion: npx vitest | npx playwright test
    Dependencias: vitest, @testing-library/react, @testing-library/jest-dom, @playwright/test
    Requisito: Node.js (+ Playwright browsers: npx playwright install)
```

## Leyenda: ejemplo completo (REPO-*) ↔ apunte

Los ejemplos interactivos de TypeScript ya no viven en un repositorio aparte: cada **`REPO-*.ts`** está incrustado como bloque **"📦 Ejemplo completo"** al final del apunte de su capítulo. Para ejecutarlos, copia el bloque en `ejercicios/tmp/REPO-XX.ts` y lanza `npx tsx tmp/REPO-XX.ts` desde `ejercicios/`.

| Bloque `REPO-*.ts` (en los apuntes) | Sección "📦 Ejemplo completo" en |
|---|---|
| `REPO-01-tipos-primitivos.ts` | `s02/01_SintaxisBasica.md` |
| `REPO-02-arrays-tuples.ts` | `s03/07_Arrays.md` |
| `REPO-03-tipos-especiales.ts` | `s02/01_SintaxisBasica.md` |
| `REPO-04-unions-intersections.ts` | `s02/05_ControlDeFlujo.md` |
| `REPO-05-interfaces-types.ts` | `s03/08_Estructuras_de_Datos.md` |
| `REPO-06-funciones.ts` | `s02/04_Funciones.md` |
| `REPO-07-type-guards-conversion.ts` | `s02/02_ConversionTipos.md` |
| `REPO-08-control-flow-scope.ts` | `s02/05_ControlDeFlujo.md` |
| `REPO-12-modulos.ts` | `s03/09_Modulos.md` |
| `REPO-13-async-await.ts` | `s03/11_Asincronismo_Callbacks_Promesas_AsyncAwait.md` |
| `REPO-15-arrays-avanzado.ts` | `s03/07_Arrays.md` |
| `REPO-17-que-es-typescript.ts` | `s02/00_Introduccion.md` |
| `REPO-18-instalacion-configuracion.ts` | `s03/10_NPM.md` |
| `REPO-19-generics-utility-types.ts` | `s02/04_Funciones.md` |

## Matriz: sesión ⇄ apuntes ⇄ repositorio ⇄ ejercicios

Vista rápida de qué material corresponde a cada sesión:

| Sesión | Apuntes (teoría) | Repositorio (código) | Ejercicios |
|---:|---|---|---|
| S02 | [`apuntes/s02`](sesiones/apuntes/s02/) (A0–A6) | — (bloques en apuntes) | [`ejercicios/s02`](ejercicios/s02/) |
| S03 | [`apuntes/s03`](sesiones/apuntes/s03/) (A7–A11) | — (bloques en apuntes) | [`ejercicios/s03`](ejercicios/s03/) |
| S04 | [`apuntes/s04`](sesiones/apuntes/s04/) (A12 · A13) | [`repos/02-react-componentes`](repos/02-react-componentes/) | [`ejercicios/s04`](ejercicios/s04/) |
| S05 | [`apuntes/s05`](sesiones/apuntes/s05/) (A15) | [`repos/02-react-componentes`](repos/02-react-componentes/) | [`ejercicios/s05`](ejercicios/s05/) |
| S06 | [`apuntes/s06`](sesiones/apuntes/s06/) (A14) | [`repos/02-react-componentes`](repos/02-react-componentes/) | [`ejercicios/s06`](ejercicios/s06/) |
| S07 | — | [`repos/03-tauri-ipc-filesystem`](repos/03-tauri-ipc-filesystem/) + [`repos/03-tauri-ejemplo-minimo`](repos/03-tauri-ejemplo-minimo/) | [`ejercicios/s07`](ejercicios/s07/) |
| S08 | — | [`repos/04-react-avanzado`](repos/04-react-avanzado/) + [`repos/02`](repos/02-react-componentes/) | [`ejercicios/s08`](ejercicios/s08/) |
| S09 | — | [`repos/04-react-avanzado`](repos/04-react-avanzado/) | [`ejercicios/s09`](ejercicios/s09/) |
| S10 | — | [`repos/04-react-avanzado`](repos/04-react-avanzado/) | [`ejercicios/s10`](ejercicios/s10/) |
| S11 | — | [`repos/04-react-avanzado`](repos/04-react-avanzado/) | [`ejercicios/s11`](ejercicios/s11/) |
| S12 | — | [`repos/05-testing`](repos/05-testing/) + [`repos/04`](repos/04-react-avanzado/) | [`ejercicios/s12`](ejercicios/s12/) |
| S13 | — | [`repos/03-tauri-ipc-filesystem`](repos/03-tauri-ipc-filesystem/) | [Proyecto final AppCine](REPOS.md#proyecto-final-appcine) |


## Flujo de dependencias

```
S00  ──  Panoramica (sin codigo)
S01  ──  Instalacion del entorno (sin repos)
 │
 ├──  02-react-componentes         S04, S05, S06
 │     Solo necesita Node.js
 │
 ├──  03-tauri-ipc-filesystem      S07
 │     Necesita Node.js + Rust + Build Tools
 │
 ├──  03-tauri-ejemplo-minimo      S07 (arranque Tauri)
 │     Necesita Node.js + Rust + Build Tools
 │
 ├──  04-react-avanzado            S08, S09, S10, S11
 │     Solo necesita Node.js
 │
 └──  05-testing                   S12
       Solo necesita Node.js (+ Playwright)
```

## Estándares del curso

Versiones de referencia para todo el material (sesiones, apuntes y repos):

| Herramienta | Versión | Notas |
|---|---|
| Node.js | **24 LTS** | Ejecuta TypeScript por *type stripping* (`node archivo.ts`) |
| TypeScript | **5.8** | `strict: true`, `noUncheckedIndexedAccess` |
| React | **19** | Components funcionales + hooks |
| Vite | 6/7 | Tooling TS + React |
| Tauri | **2.x** | webview + backend Rust (`invoke()`) |
| Estilo TS | **erasable-only** | Sin `enum`/`namespace`/parameter properties: el mismo código corre en Node 24 y en Vite |

> Nota: los ejemplos `REPO-*.ts` de S02/S03 (bloques "📦 Ejemplo completo" en los apuntes) son *erasable-only* para que corran en Node 24 sin compilar con el runner `tsx`. S02/S03 no tienen repositorio propio: se ejecutan copiando el bloque en `ejercicios/tmp/`.

Flujo de ejecución: los bloques `REPO-*` de S02/S03 copiados a `ejercicios/tmp/` con `npx tsx tmp/REPO-XX.ts` (desde `ejercicios/`); `repos/02`/`04` con `npm run dev`, `repos/03` con `npx tauri dev`, `repos/05` con `npx vitest` / `npx playwright test`, y `ejercicios/` con `npm run typecheck` (valida `soluciones/s02…s06`) + `npm run run:s02` / `npm run run:s03` (Node 24). Catálogo de ejercicios: [`sesiones/EjerciciosPropuestos/ejerciciosTS.md`](sesiones/EjerciciosPropuestos/ejerciciosTS.md).

## Proyecto final: AppCine

**AppCine** (`temario-appcine.md`, pendiente de redactar para el cierre del curso) es el **proyecto integrador de cierre del curso** (≈ 40 h): una app de escritorio **Tauri + React + TypeScript** con **CRUD completo** contra una **API REST Spring Boot** y **MySQL en Docker**.

- Constructor del frontend: componentes, props, `useState`/`useEffect`/`useCallback`/`useRef`, formularios controlados, modal y búsqueda con debounce (S04–S06, `repos/02`).
- CRUD inicial con `fetch` (S09) migrado a **comandos Rust** (`invoke("listar_peliculas")`, etc.) con `reqwest` (S07, `repos/03`).
- Estilización con CSS variables / Flexbox / SVG inline (bloque 4 del temario); opcional Tailwind (S10).
- Diálogos nativos con `@tauri-apps/plugin-dialog` (`confirm`, `save`, `open`) y persistencia JSON con `std::fs`.
- Backend: Docker Compose (MySQL 8 + phpMyAdmin), script `init.sql` y endpoints REST con CORS (`tauri://localhost`).
- Cierre: `tauri build` + funcionalidad extra obligatoria (campo nuevo, ordenación o toasts).

Recomendación: montar el prototipo como nuevo repo `repos/06-appcine` en F6.
