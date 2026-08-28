# Ejercicios del curso DI-RT

Batería de ejercicios **por sesión** con sus soluciones. Cada carpeta `sXX/` contiene los enunciados (y, cuando son TypeScript puro, los ficheros `.ts/.tsx` que debes completar). Las soluciones completas viven en [`soluciones/`](soluciones/), una carpeta por sesión.

```
ejercicios/
├── s00/   Fundamentos, arquitectura y entorno      (teoría)
├── s01/   Instalación del entorno                  (teoría/comandos)
├── s01-s/ Scaffolding Tauri                        (teoría/Rust)
├── s02/   TypeScript I  (8 ficheros .ts)
├── s03/   TypeScript II (7 ejercicios, incl. módulos)
├── s04/   Componentes y funciones  (closures, clean code, JSX)
├── s05/   Estado y formularios      (reducer, validación, localStorage)
├── s06/   Componentes personalizados (Boton, Modal, Tabla genérica)
├── s07/…s12/  Tauri, estado global, CRUD, Tailwind, PDF, testing (teoría + código)
└── soluciones/  → un subdirectorio por sesión
```

## Cómo ejecutar

### TypeScript puro (S02, S03 y la lógica de S04/S05)

Desde esta carpeta:

```bash
npm install            # una vez
npx tsx soluciones/s02/01-tipos-primitivos.ts
npm run run:s02        # ejecuta todas las soluciones de S02
npm run run:s03        # ejecuta todas las soluciones de S03
npm run typecheck      # valida tipos de todos los ejercicios y soluciones
```

Los enunciados `.ts` se completan en el propio fichero y después se comparan con `soluciones/sXX/`.

### React (S04, S05, S06)

Los `.tsx` son componentes que se **prueban en el proyecto Vite** de la sesión correspondiente:

```bash
# desde el repo de trabajo
npm run dev             # repos/02-react-componentes (S04–S06)
```

Copia el componente del enunciado a `repos/02-react-componentes/src/ejercicios/`, impleméntalo según las instrucciones y muéstralo en `App.tsx`. La solución está en `ejercicios/soluciones/sXX/`.

### Tauri / Rust (S07) y avanzadas (S08–S12)

Los ejercicios de estas sesiones son enunciados con el código a escribir dentro de los repositorios 03, 04 y 05 del curso. Las soluciones están en `ejercicios/soluciones/sXX/`.

> **Estilo del curso:** todo el código es *erasable-only* (sin `enum`, `namespace` ni *parameter properties*) para que corra con Node 24 (`node archivo.ts`) o con `tsx`.