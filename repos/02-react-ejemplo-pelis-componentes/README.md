# React Pelis UI: AppCine con componentes personalizados (composición y `<T>`)

![Tecnologia](https://img.shields.io/badge/Tecnologia-React-61DAFB?logo=react&logoColor=black)
![Framework](https://img.shields.io/badge/Framework-Vite-646CFF?logo=vite&logoColor=white)
![Curso](https://img.shields.io/badge/Curso-DI--RT-FF6B35)

Proyecto Vite + React que es la **evolución de la app del apunte [15 · Gestión de estado y formularios](../../sesiones/apuntes/s05/15_React_Gestion_Estado_y_Formularios.md)** (`repos/02-react-ejemplo-pelis-api`) hacia el [apunte 16 · Creación de componentes personalizados](../../sesiones/apuntes/s06/16_React_Creacion_de_Componentes_Personalizados.md): la misma AppCine con backend, pero construida con **componentes reutilizables** (buscador, tabla, botón, modal, spinner y tabla genérica).

## Qué añade o cambia respecto a la app de 15

| Qué cambia | Antes (15 · `02-react-ejemplo-pelis-api`) | Ahora (16 · este repo) |
|---|---|---|
| **Tabla** | JSX plano + `PeliculaRow` | `PeliculaTable` (listas con `key`) — §13.8 y §16.3.3 |
| **Botones** | `<button>` nativo | `Boton extends ButtonHTMLAttributes` — §16.5 |
| **Buscador** | `<input>` inline en `App` | Componente `Buscador` controlado con `onBuscar` — §16.3.1 |
| **Carga/estados** | Texto `Cargando…` | `Spinner` + renderizado condicional — §12.1.3 |
| **Formulario** | `PeliculaForm` con `modo` y `onCancelar` | `PeliculaForm` controlado con `inicial` — §16.3.2 |
| **Modal** | Overlay + panel | Añade botón `×` y prop `tamano` — §16.6 |
| **Pantalla** | `App` monolítica | Composición de piezas — §16.4 |
| **Extra** | — | `TablaGenerica<T>` con otro tipo (`ResumenGenero`) — §16.7 |

Se mantienen de 15: `api.ts` (§15.1.1), la carga con `useEffect` y tres estados (§15.2), la búsqueda persistida en `localStorage` (§15.8), el patrón modal (§15.5) y los handlers async.

## Estructura

```
├── peliculas.json                Datos de json-server (colección "peliculas")
├── src/
│   ├── api.ts                    Cliente fetch: GET, POST, PUT y DELETE — §15.1.1
│   ├── components/
│   │   ├── Boton.tsx             extends ButtonHTMLAttributes — §16.5
│   │   ├── Buscador.tsx          Input controlado + onBuscar — §16.3.1
│   │   ├── Modal.tsx             Overlay + children + cleanup — §16.6
│   │   ├── PeliculaForm.tsx      Formulario controlado — §16.3.2
│   │   ├── PeliculaRow.tsx       Fila de la tabla — §13.8
│   │   ├── PeliculaTable.tsx     Listas con key — §13.8 y §16.3.3
│   │   ├── Spinner.tsx           Renderizado condicional (loading) — §12.1.3
│   │   └── TablaGenerica.tsx     Componente genérico <T> — §16.7
│   ├── App.tsx                   Composición de la pantalla — §16.4
│   ├── colorGenero.ts            Record<string, string> + colorDeGenero() — §13.3.1
│   ├── tipos.ts                  Pelicula, NuevaPelicula, FilaMinima, Cambios — §13.1
│   └── main.tsx                  Punto de entrada (lo crea Vite)
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

# terminal 2: app en http://localhost:5175
npm run dev
```

## Dependencias

- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`
- `typescript`
- `json-server` (solo desarrollo, para el backend de prueba)
