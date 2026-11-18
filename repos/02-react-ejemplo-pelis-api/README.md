# React Pelis API: gestor de películas con backend (efectos, modal y fetch)

![Tecnologia](https://img.shields.io/badge/Tecnologia-React-61DAFB?logo=react&logoColor=black)
![Framework](https://img.shields.io/badge/Framework-Vite-646CFF?logo=vite&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto Vite + React que es la **evolución del ejemplo del apunte [13 · TypeScript aplicado a React](../../sesiones/apuntes/s04/13_Tipado_en_React_TS.md)** (`repos/02-react-ejemplo-pelis`) hacia el [apunte 15 · Gestión de estado y formularios](../../sesiones/apuntes/s05/15_React_Gestion_Estado_y_Formularios.md): la misma AppCine, pero con **backend real** (`json-server`), **carga con `useEffect`**, **modal** y **CRUD asíncrono**.

## Qué añade o cambia respecto a la app de 13

| Qué cambia | Antes (13 · `02-react-ejemplo-pelis`) | Ahora (15 · este repo) |
|---|---|---|
| **Datos** | Array fijo `LISTA_PELICULAS` en memoria | `fetch` a `json-server` (`peliculas.json`) vía cliente `api` — §15.1.1 |
| **Carga inicial** | Ninguna | `useEffect` + tres estados (`peliculas`/`cargando`/`error`) — §15.2 |
| **CRUD** | Handlers síncronos, `id: Date.now()` | `api.crear/actualizar/eliminar` async, `id` del servidor |
| **Formulario** | Incrustado en la página | En `Modal` (overlay + panel) — §15.5 |
| **Búsqueda** | Filtro directo en el render | Igual + `debounce` con `useRef` — §15.9 |
| **Handlers** | Funciones simples | Eventos por props — §15.5 |

Se mantienen de 13: `tipos.ts` (§13.1/§13.3.2), `PeliculaRow` (§13.2/§13.3.1), `colorGenero.ts` (§13.3.1) y `PeliculaForm` (§13.4/§13.6.2/§13.7).

## Estructura

```
├── peliculas.json             Datos de json-server (colección "peliculas")
├── src/
│   ├── api.ts                 Cliente fetch: GET, POST, PUT y DELETE — §15.1.1
│   ├── components/
│   │   ├── Modal.tsx          Overlay + panel con children y cleanup — §15.5
│   │   ├── PeliculaForm.tsx   Formulario crear/editar (heredado de 13)
│   │   └── PeliculaRow.tsx    Fila de la tabla (heredada de 13)
│   ├── App.tsx                Carga con useEffect, debounce, modal y CRUD async
│   ├── colorGenero.ts         Record<string, string> + colorDeGenero() — §13.3.1
│   ├── tipos.ts               Pelicula, NuevaPelicula, FilaMinima, Cambios — §13.1
│   └── main.tsx               Punto de entrada (lo crea Vite)
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Ejecutar

Hacen falta **dos terminales**:

```bash
npm install

# terminal 1: backend en http://localhost:3000/peliculas
npm run api

# terminal 2: app en http://localhost:5174
npm run dev
```

> `json-server` toma la ruta `/peliculas` de la clave del fichero `peliculas.json`.

## Dependencias

- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`
- `typescript`
- `json-server` (solo desarrollo, para el backend de prueba)
